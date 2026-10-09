const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // Account that placed the order (unset for orders placed before this was
    // recorded; those are matched to customers by shipping email instead).
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    shippingAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true, default: 'India' }
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, default: '' },
            price: { type: Number, required: true },
            gstRate: { type: Number, default: 0 }, // percent, as charged on this order
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    itemsPrice: { type: Number, default: 0.0 }, // subtotal before shipping
    taxPrice: { type: Number, default: 0.0 }, // GST on the items
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 }, // itemsPrice + taxPrice + shippingPrice
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    // Fulfilment workflow for the admin panel. A freshly paid order starts at
    // 'Processing'; admins advance it through the lifecycle.
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    trackingNumber: { type: String, default: '' },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    // When the customer was sent the order-confirmed / payment-failed messages.
    // Set atomically before sending so each goes out at most once.
    confirmationNotifiedAt: { type: Date, default: null },
    failureNotifiedAt: { type: Date, default: null }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
