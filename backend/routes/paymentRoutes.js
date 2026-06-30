const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { isDbConnected } = require('../config/db');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'missing_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'missing_secret'
});

if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id') {
    console.warn('WARNING: Razorpay Key ID is missing or using placeholder value in .env');
}

// Create Order
router.post('/order', async (req, res) => {
    const { amount } = req.body;
    console.log('Creating order with amount (INR):', amount);
    try {
        // Validate amount
        if (!amount || amount < 1) {
            return res.status(400).json({ error: 'Minimum order amount is ₹1' });
        }
        
        const amountInPaise = Math.round(amount * 100);
        console.log('Amount in paise:', amountInPaise);
        
        // Razorpay requires minimum 100 paise (₹1)
        if (amountInPaise < 100) {
            return res.status(400).json({ error: 'Minimum order amount is ₹1' });
        }
        
        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        
        console.log('Razorpay order options:', options);
        const order = await razorpay.orders.create(options);
        console.log('Razorpay order created successfully:', order);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: error.message, details: error });
    }
});

// Verify Payment and Save Order
router.post('/verify', async (req, res) => {
    const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        shippingAddress,
        orderItems,
        totalPrice
    } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        try {
            if (!isDbConnected()) {
                return res.status(503).json({ success: false, message: 'Database is unavailable' });
            }

            // Save order to database
            const order = new Order({
                shippingAddress,
                orderItems,
                totalPrice,
                isPaid: true,
                paidAt: Date.now(),
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature
            });

            const savedOrder = await order.save();
            
            res.json({ 
                success: true, 
                message: "Payment verified and order saved successfully",
                orderId: savedOrder._id
            });
        } catch (error) {
            console.error('Error saving order:', error);
            res.status(500).json({ success: false, message: "Payment verified but error saving order" });
        }
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
});

// Get all orders (for admin)
router.get('/orders', async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json([]);
        }

        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Unable to fetch orders' });
    }
});

module.exports = router;
