const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Jaggery', 'Papad'
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
