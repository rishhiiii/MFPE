const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

const dummyProducts = [
    { _id: '1', name: 'Premium Chia Seeds', price: 299, category: 'Superfoods', description: 'Nature’s Superfood - Rich in fiber, protein, omega-3 fatty acids, antioxidants, vitamins, and minerals.', image: '/src/assets/jaggery1.jpeg', stock: 50 },
    { _id: '2', name: 'Organic Turmeric Powder', price: 189, category: 'Spices', description: 'Pure Golden Nutrition - Sourced from quality farms and processed with care to retain natural color, aroma, and nutritional value.', image: '/src/assets/jaggery2.jpeg', stock: 100 },
    { _id: '3', name: 'Organic Cane Jaggery', price: 149, category: 'Natural Sweeteners', description: '100% Pure Sugarcane Cane Jaggery - Made with whole organic and Jain process, handmade.', image: '/src/assets/jaggery3.jpeg', stock: 45 },
    { _id: '4', name: 'Flax Seeds', price: 249, category: 'Superfoods', description: 'Premium quality flax seeds, rich in omega-3 fatty acids and dietary fiber.', image: '/src/assets/jaggery1.jpeg', stock: 60 },
    { _id: '5', name: 'Pumpkin Seeds', price: 279, category: 'Superfoods', description: 'Nutrient-dense pumpkin seeds, perfect for healthy snacking and cooking.', image: '/src/assets/jaggery2.jpeg', stock: 40 },
    { _id: '6', name: 'Sunflower Seeds', price: 199, category: 'Superfoods', description: 'Crunchy and nutritious sunflower seeds, packed with vitamins and minerals.', image: '/src/assets/jaggery3.jpeg', stock: 70 },
    { _id: '7', name: 'Red Chilli Powder', price: 159, category: 'Spices', description: 'Premium quality red chilli powder, rich in color and flavor.', image: '/src/assets/jaggery1.jpeg', stock: 80 },
    { _id: '8', name: 'Coriander Powder', price: 129, category: 'Spices', description: 'Freshly ground coriander powder, perfect for authentic Indian cooking.', image: '/src/assets/jaggery2.jpeg', stock: 90 },
];

// Get all products
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(dummyProducts);
        }
        const products = await Product.find({});
        if (products.length === 0) {
            return res.json(dummyProducts);
        }
        res.json(products);
    } catch (error) {
        console.error('API Error:', error.message);
        res.json(dummyProducts);
    }
});

// Create product (Admin)
router.post('/', async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;
    try {
        const product = new Product({ name, description, price, category, image, stock });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const dummy = dummyProducts.find(p => p._id === req.params.id);
            if (dummy) return res.json(dummy);
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            const dummy = dummyProducts.find(p => p._id === req.params.id);
            if (dummy) return res.json(dummy);
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        const dummy = dummyProducts.find(p => p._id === req.params.id);
        if (dummy) return res.json(dummy);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
