const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { isDbConnected } = require('../config/db');
const { protect } = require('../middleware/authMiddleware');
const { escapeRegex } = require('../utils/regexEscape');

// Mounted at /api/products/:productId/reviews
const router = express.Router({ mergeParams: true });

const reviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many reviews submitted. Please try again later.' },
});

const requireDb = (res) => {
    if (!isDbConnected()) {
        res.status(503).json({ message: 'Store is temporarily unavailable. Please try again shortly.' });
        return false;
    }
    return true;
};

// "Arpit Jain" -> "Arpit J." so full names aren't published.
const displayName = (fullName = '') => {
    const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'Customer';
    return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
};

// Keep Product.rating / Product.numReviews in sync with its reviews.
const recalcProductRating = async (productId) => {
    const [stats] = await Review.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(String(productId)) } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    await Product.updateOne(
        { _id: productId },
        { $set: { rating: stats ? Math.round(stats.avg * 10) / 10 : 0, numReviews: stats ? stats.count : 0 } }
    );
};

// Has this user paid for an order containing the product? Orders placed
// before accounts were linked are matched by shipping email.
const hasPurchased = async (user, productId) => {
    const emailRegex = new RegExp(`^${escapeRegex(user.email)}$`, 'i');
    return Boolean(await Order.exists({
        isPaid: true,
        status: { $ne: 'Cancelled' },
        'orderItems.product': productId,
        $or: [{ user: user._id }, { 'shippingAddress.email': emailRegex }],
    }));
};

const validProductId = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
        res.status(400).json({ message: 'Invalid product id' });
        return false;
    }
    return true;
};

// @desc   List a product's reviews (newest first) with a rating summary
// @route  GET /api/products/:productId/reviews
// @access Public
router.get('/', async (req, res) => {
    if (!requireDb(res) || !validProductId(req, res)) return;
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .select('user name rating comment verifiedPurchase createdAt updatedAt')
            .sort({ createdAt: -1 })
            .lean();
        const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((r) => { breakdown[r.rating] += 1; });
        const average = reviews.length
            ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
            : 0;
        res.json({ reviews, summary: { average, count: reviews.length, breakdown } });
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ message: 'Unable to load reviews' });
    }
});

// @desc   Create or update the logged-in user's review of a product
// @route  POST /api/products/:productId/reviews
// @access Private
router.post('/', protect, reviewLimiter, async (req, res) => {
    if (!requireDb(res) || !validProductId(req, res)) return;
    const rating = Number(req.body?.rating);
    const comment = String(req.body?.comment || '').trim();

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Please choose a rating from 1 to 5 stars.' });
    }
    if (comment.length < 3) {
        return res.status(400).json({ message: 'Please write a few words about the product.' });
    }
    if (comment.length > 1000) {
        return res.status(400).json({ message: 'Reviews can be up to 1000 characters.' });
    }

    try {
        const productId = req.params.productId;
        if (!(await Product.exists({ _id: productId }))) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = await Review.findOneAndUpdate(
            { product: productId, user: req.user._id },
            {
                $set: {
                    name: displayName(req.user.name),
                    rating,
                    comment,
                    verifiedPurchase: await hasPurchased(req.user, productId),
                },
            },
            { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
        );
        await recalcProductRating(productId);
        res.status(201).json(review);
    } catch (error) {
        console.error('Error saving review:', error.message);
        res.status(500).json({ message: 'Unable to save your review' });
    }
});

// @desc   Delete a review (its author, or an admin)
// @route  DELETE /api/products/:productId/reviews/:reviewId
// @access Private
router.delete('/:reviewId', protect, async (req, res) => {
    if (!requireDb(res) || !validProductId(req, res)) return;
    if (!mongoose.Types.ObjectId.isValid(req.params.reviewId)) {
        return res.status(400).json({ message: 'Invalid review id' });
    }
    try {
        const review = await Review.findOne({ _id: req.params.reviewId, product: req.params.productId });
        if (!review) return res.status(404).json({ message: 'Review not found' });

        const isOwner = String(review.user) === String(req.user._id);
        if (!isOwner && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You can only delete your own review' });
        }

        await review.deleteOne();
        await recalcProductRating(req.params.productId);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ message: 'Unable to delete review' });
    }
});

module.exports = router;
