const mongoose = require('mongoose');

// A customer's review of a product. One review per user per product; posting
// again updates it. The product's average rating and review count are kept on
// the Product document (see recalcProductRating in routes/reviewRoutes.js).
const reviewSchema = mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        // Public display name, e.g. "Arpit J." (first name + last initial).
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true, maxlength: 1000 },
        // True when the reviewer has a paid order containing this product.
        verifiedPurchase: { type: Boolean, default: false },
    },
    { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
