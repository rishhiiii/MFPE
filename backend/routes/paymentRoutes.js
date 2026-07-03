const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { isDbConnected } = require('../config/db');
const { protect, admin } = require('../middleware/authMiddleware');

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret || keyId === 'your_razorpay_key_id') {
    console.warn('WARNING: Razorpay keys are missing or using placeholder values in .env');
}

const razorpay = new Razorpay({
    key_id: keyId || 'missing_key',
    key_secret: keySecret || 'missing_secret',
});

// Validate that the shipping address contains every field the Order schema needs.
const requiredAddressFields = ['name', 'phone', 'email', 'address', 'city', 'state', 'pincode'];
const validateShippingAddress = (address = {}) => {
    const missing = requiredAddressFields.filter((f) => !String(address[f] || '').trim());
    return missing;
};

// Recompute the authoritative order total from the database. The client only
// sends product ids + quantities; prices, names and images always come from the
// DB so the amount can never be tampered with in the browser.
const buildOrderFromItems = async (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('No items provided');
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
        const productId = item.product || item._id;
        const qty = Number(item.qty);

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error(`Invalid product id: ${productId}`);
        }
        if (!Number.isInteger(qty) || qty < 1) {
            throw new Error('Invalid quantity');
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('One or more products no longer exist');
        }
        if (product.stock !== undefined && product.stock < qty) {
            throw new Error(`Insufficient stock for ${product.name}`);
        }

        totalPrice += product.price * qty;
        orderItems.push({
            name: product.name,
            qty,
            image: product.image || '',
            price: product.price,
            product: product._id,
        });
    }

    // Round to 2 decimals to avoid floating point noise in the amount.
    totalPrice = Math.round(totalPrice * 100) / 100;
    return { orderItems, totalPrice };
};

// Create Razorpay order (server computes the amount + saves a pending order)
router.post('/order', async (req, res) => {
    const { items, shippingAddress } = req.body;

    if (!isDbConnected()) {
        return res.status(503).json({ error: 'Store is temporarily unavailable. Please try again shortly.' });
    }

    const missingFields = validateShippingAddress(shippingAddress);
    if (missingFields.length) {
        return res.status(400).json({ error: `Missing shipping details: ${missingFields.join(', ')}` });
    }

    try {
        const { orderItems, totalPrice } = await buildOrderFromItems(items);

        const amountInPaise = Math.round(totalPrice * 100);
        if (amountInPaise < 100) {
            return res.status(400).json({ error: 'Minimum order amount is ₹1' });
        }

        const rzpOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        });

        // Persist a pending order so /verify never has to trust a client amount.
        await Order.create({
            shippingAddress: {
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                email: shippingAddress.email,
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode,
                country: shippingAddress.country || 'India',
            },
            orderItems,
            totalPrice,
            isPaid: false,
            razorpayOrderId: rzpOrder.id,
        });

        res.json({
            id: rzpOrder.id,
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
            keyId,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error.message);
        res.status(400).json({ error: error.message || 'Unable to create order' });
    }
});

// Mark a pending order as paid + decrement stock. Idempotent: calling it twice
// (e.g. from both /verify and the webhook) only processes the payment once.
const finalizeOrder = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const order = await Order.findOne({ razorpayOrderId });
    if (!order) {
        return { found: false };
    }

    if (order.isPaid) {
        return { found: true, order, alreadyPaid: true };
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.razorpayPaymentId = razorpayPaymentId;
    if (razorpaySignature) order.razorpaySignature = razorpaySignature;
    order.paymentResult = { id: razorpayPaymentId, status: 'captured' };
    // Move a just-paid order into the fulfilment queue (unless already advanced).
    if (order.status === 'Pending') order.status = 'Processing';
    await order.save();

    // Decrement stock for each purchased item with a floor check.
    await Promise.all(
        order.orderItems.map(async (item) => {
            const result = await Product.updateOne(
                { _id: item.product, stock: { $gte: item.qty } },
                { $inc: { stock: -item.qty } }
            );
            if (result.matchedCount === 0) {
                console.warn(`Stock floor hit finalizing order ${order._id}: product ${item.product} had insufficient stock for qty ${item.qty}. Order remains marked paid — flag for manual fulfillment review.`);
            }
        })
    );

    return { found: true, order, alreadyPaid: false };
};

// Verify payment signature and finalize the previously created pending order.
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    // Constant-time comparison to avoid signature timing attacks.
    const signaturesMatch =
        expectedSignature.length === razorpay_signature.length &&
        crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

    if (!signaturesMatch) {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    try {
        if (!isDbConnected()) {
            return res.status(503).json({ success: false, message: 'Database is unavailable' });
        }

        const result = await finalizeOrder(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        if (!result.found) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({
            success: true,
            message: 'Payment verified and order saved successfully',
            orderId: result.order._id,
        });
    } catch (error) {
        console.error('Error finalizing order:', error.message);
        res.status(500).json({ success: false, message: 'Payment verified but error saving order' });
    }
});

// Razorpay webhook backstop: finalizes an order even if the customer's browser
// closes before /verify runs. Configure this URL + secret in the Razorpay
// dashboard (Settings > Webhooks) and subscribe to the `payment.captured` event.
// NOTE: this route needs the raw request body (see req.rawBody in server.js).
router.post('/webhook', async (req, res) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (!webhookSecret) {
        console.error('Webhook received but RAZORPAY_WEBHOOK_SECRET is not set');
        return res.status(500).json({ received: false });
    }
    if (!signature || !req.rawBody) {
        return res.status(400).json({ received: false });
    }

    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.rawBody)
        .digest('hex');

    const signatureBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    const valid =
        signatureBuf.length === expectedBuf.length &&
        crypto.timingSafeEqual(signatureBuf, expectedBuf);

    if (!valid) {
        return res.status(400).json({ received: false });
    }

    // Always ack a valid webhook quickly so Razorpay doesn't retry; do the work
    // inside a try so a DB hiccup doesn't turn into a 4xx/5xx.
    try {
        const event = req.body?.event;
        const payment = req.body?.payload?.payment?.entity;

        if ((event === 'payment.captured' || event === 'order.paid') && payment?.order_id && isDbConnected()) {
            const result = await finalizeOrder(payment.order_id, payment.id);
            if (result.found && !result.alreadyPaid) {
                console.log(`Order finalized via webhook: ${payment.order_id}`);
            }
        }
    } catch (error) {
        console.error('Error handling webhook:', error.message);
    }

    res.json({ received: true });
});

// Get all orders (for admin)
router.get('/orders', protect, admin, async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json([]);
        }

        // Only surface paid orders; unpaid rows are abandoned/failed checkouts.
        const orders = await Order.find({ isPaid: true }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Unable to fetch orders' });
    }
});

// Update an order's fulfilment status / tracking number (admin only)
const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
router.patch('/orders/:id', protect, admin, async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(503).json({ message: 'Database is unavailable' });
        }

        const { status, trackingNumber } = req.body;
        if (status !== undefined && !ORDER_STATUSES.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed: ${ORDER_STATUSES.join(', ')}` });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status !== undefined) order.status = status;
        if (trackingNumber !== undefined) order.trackingNumber = String(trackingNumber).trim();
        await order.save();

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(400).json({ message: error.message || 'Unable to update order' });
    }
});

module.exports = router;
