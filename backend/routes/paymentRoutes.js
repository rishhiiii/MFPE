const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { isDbConnected } = require('../config/db');
const { protect, admin, optionalAuth } = require('../middleware/authMiddleware');
const { notifyOrderConfirmed, notifyPaymentFailed, notifyOrderStatus } = require('../utils/orderNotifications');
const { escapeRegex } = require('../utils/regexEscape');

// Throttle order creation: each call hits the Razorpay API and writes a
// pending Order document, so this needs the same kind of protection as the
// other write endpoints (auth, contact, reviews).
const orderLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many order attempts. Please try again later.' },
});

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

// Flat shipping charge (₹) added once per order. Keep in sync with
// SHIPPING_CHARGE in frontend/src/context/CartContext.jsx.
const SHIPPING_CHARGE = 30;

// Recompute the authoritative order total from the database. The client only
// sends product ids + quantities; prices, names and images always come from the
// DB so the amount can never be tampered with in the browser.
const buildOrderFromItems = async (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('No items provided');
    }

    const orderItems = [];
    let totalPrice = 0;
    let taxTotal = 0;

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

        const gstRate = Number(product.gstRate) || 0;
        totalPrice += product.price * qty;
        taxTotal += (product.price * qty * gstRate) / 100;
        orderItems.push({
            name: product.name,
            qty,
            image: product.image || '',
            price: product.price,
            gstRate,
            product: product._id,
        });
    }

    // Round to 2 decimals to avoid floating point noise in the amount.
    // GST is added on top of the selling price, per product rate. Keep in sync
    // with the totals in frontend/src/context/CartContext.jsx.
    const itemsPrice = Math.round(totalPrice * 100) / 100;
    const taxPrice = Math.round(taxTotal * 100) / 100;
    const shippingPrice = SHIPPING_CHARGE;
    totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;
    return { orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice };
};

// Create Razorpay order (server computes the amount + saves a pending order)
router.post('/order', orderLimiter, optionalAuth, async (req, res) => {
    const { items, shippingAddress } = req.body;

    if (!isDbConnected()) {
        return res.status(503).json({ error: 'Store is temporarily unavailable. Please try again shortly.' });
    }

    const missingFields = validateShippingAddress(shippingAddress);
    if (missingFields.length) {
        return res.status(400).json({ error: `Missing shipping details: ${missingFields.join(', ')}` });
    }

    try {
        const { orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = await buildOrderFromItems(items);

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
            user: req.user?._id,
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
            itemsPrice,
            taxPrice,
            shippingPrice,
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

    // Email the customer and the store. Runs in the background so a slow mail
    // server never delays the payment response; it de-duplicates itself.
    notifyOrderConfirmed(order._id).catch((err) =>
        console.error('[notify] confirmation error:', err.message)
    );

    return { found: true, order, alreadyPaid: false };
};

// Confirm with Razorpay that an order really has a failed payment (and nothing
// paid) before telling the customer, so this can't be triggered with a guessed id.
const confirmFailedWithRazorpay = async (razorpayOrderId) => {
    const { items = [] } = await razorpay.orders.fetchPayments(razorpayOrderId);
    if (items.some((p) => p.status === 'captured' || p.status === 'authorized')) return null;
    const failed = items.filter((p) => p.status === 'failed').sort((a, b) => b.created_at - a.created_at)[0];
    return failed ? { reason: failed.error_description || '' } : null;
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

// Called by the checkout page when Razorpay reports a failed payment. Emails the
// customer that the payment failed (once per order).
router.post('/failed', async (req, res) => {
    const { razorpay_order_id } = req.body || {};
    if (!razorpay_order_id || typeof razorpay_order_id !== 'string') {
        return res.status(400).json({ received: false });
    }
    try {
        if (!isDbConnected()) return res.status(503).json({ received: false });
        const failed = await confirmFailedWithRazorpay(razorpay_order_id);
        if (failed) {
            notifyPaymentFailed(razorpay_order_id, failed.reason).catch((err) =>
                console.error('[notify] payment-failed error:', err.message)
            );
        }
        res.json({ received: true });
    } catch (error) {
        console.error('Error handling failed payment:', error.message);
        res.status(500).json({ received: false });
    }
});

// Razorpay webhook backstop: finalizes an order even if the customer's browser
// closes before /verify runs. Configure this URL + secret in the Razorpay
// dashboard (Settings > Webhooks) and subscribe to the `payment.captured` and
// `payment.failed` events.
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
        } else if (event === 'payment.failed' && payment?.order_id && isDbConnected()) {
            // Backstop for the checkout page's /failed call (e.g. browser closed).
            const failed = await confirmFailedWithRazorpay(payment.order_id);
            if (failed) await notifyPaymentFailed(payment.order_id, payment.error_description || failed.reason);
        }
    } catch (error) {
        console.error('Error handling webhook:', error.message);
    }

    res.json({ received: true });
});

// Paid orders of the logged-in customer, newest first. Matches orders linked to
// the account and, for orders placed before that link existed, orders whose
// shipping email is the account's email.
router.get('/my-orders', protect, async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(503).json({ message: 'Database is unavailable' });
        }
        const emailRegex = new RegExp(`^${escapeRegex(req.user.email)}$`, 'i');
        const orders = await Order.find({
            isPaid: true,
            $or: [{ user: req.user._id }, { 'shippingAddress.email': emailRegex }],
        })
            .select('-razorpaySignature -paymentResult')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching customer orders:', error.message);
        res.status(500).json({ message: 'Unable to fetch your orders' });
    }
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

        const previousStatus = order.status;
        const previousTracking = order.trackingNumber || '';
        if (status !== undefined) order.status = status;
        if (trackingNumber !== undefined) order.trackingNumber = String(trackingNumber).trim();
        await order.save();

        // Let the customer know (in the background; never blocks the admin).
        const statusChanged = order.status !== previousStatus;
        const trackingAdded = Boolean(order.trackingNumber) && order.trackingNumber !== previousTracking;
        if (statusChanged || trackingAdded) {
            notifyOrderStatus(order, { statusChanged, trackingAdded }).catch((err) =>
                console.error('[notify] status email error:', err.message)
            );
        }

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(400).json({ message: error.message || 'Unable to update order' });
    }
});

module.exports = router;
