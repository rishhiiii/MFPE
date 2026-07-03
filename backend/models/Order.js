const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
    totalPrice: { type: Number, required: true, default: 0.0 },
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
    razorpaySignature: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
