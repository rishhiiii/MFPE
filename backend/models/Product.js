const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // `price` is the actual selling price and stays the single source of truth
    // for cart, orders and structured data. When `mrp` is set it is derived
    // from mrp/discount server-side so the three can never drift apart.
    price: { type: Number, required: true },
    mrp: { type: Number, required: false, default: 0 }, // 0 = no MRP on record
    discount: { type: Number, required: false, default: 0, min: 0, max: 100 }, // percent off MRP
    // GST percent charged on top of `price` at checkout (e.g. 0, 5, 18). Varies by product.
    gstRate: { type: Number, required: false, default: 0, min: 0, max: 100 },
    // Kept in sync from the Review collection (routes/reviewRoutes.js).
    rating: { type: Number, default: 0 },      // average stars, 0 when unrated
    numReviews: { type: Number, default: 0 },
    category: { type: String, required: true, index: true }, // e.g. 'Jaggery', 'Papad'
    image: { type: String, required: false }, // Optional, since we might have placeholder
    stock: { type: Number, required: true, default: 0 },
    ingredients: { type: String, required: false, default: '' },
    shelfLife: { type: String, required: false, default: '' },
    weight: { type: String, required: false, default: '' },
    storage: { type: String, required: false, default: '' },
    origin: { type: String, required: false, default: '' },
    packaging: { type: String, required: false, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
