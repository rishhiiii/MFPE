const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isDbConnected } = require('../config/db');
const upload = require('../config/multer');
const { uploadToCloudinary } = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const { escapeRegex } = require('../utils/regexEscape');
const fs = require('fs');

// The database is the single source of truth for products. If Mongo is
// unreachable we fail loudly with 503 rather than silently accepting writes
// that would be lost on restart. There is deliberately NO in-memory fallback.
const requireDb = (res) => {
  if (!isDbConnected()) {
    res.status(503).json({ message: 'Store is temporarily unavailable. Please try again shortly.' });
    return false;
  }
  return true;
};

const normalizeProductPayload = (payload) => ({
  name: payload.name?.trim() || '',
  description: payload.description?.trim() || '',
  category: payload.category?.trim() || '',
  image: (typeof payload.image === 'string') ? payload.image.trim() : '',
  price: Number(payload.price) || 0,
  stock: Number(payload.stock) || 0,
  ingredients: payload.ingredients?.trim() || '',
  shelfLife: payload.shelfLife?.trim() || '',
  weight: payload.weight?.trim() || '',
  storage: payload.storage?.trim() || '',
  origin: payload.origin?.trim() || '',
  packaging: payload.packaging?.trim() || '',
});

// Enforce the fields a real product must have before it can be saved.
const validateProduct = (data) => {
  const missing = [];
  if (!data.name) missing.push('name');
  if (!data.description) missing.push('description');
  if (!data.category) missing.push('category');
  if (!(data.price > 0)) missing.push('price (must be greater than 0)');
  return missing;
};

// Resolve an uploaded file to an image URL: Cloudinary first (permanent, CDN),
// local /uploads path only as a fallback if Cloudinary is unreachable.
const resolveImageUrl = async (file) => {
  let imageUrl = `/uploads/${file.filename}`;
  try {
    const fileBuffer = fs.readFileSync(file.path);
    imageUrl = await uploadToCloudinary(fileBuffer);
    fs.unlinkSync(file.path); // drop the local copy once it's safely on Cloudinary
  } catch (cloudErr) {
    console.error('Cloudinary upload failed, keeping local image:', cloudErr.message);
  }
  return imageUrl;
};

// @desc   Get all products (with optional search + category filter)
// @route  GET /api/products
// @access Public
router.get('/', async (req, res) => {
  if (!requireDb(res)) return;
  try {
    const { search = '', category = '' } = req.query;
    const filters = {};

    if (search) {
      const safeSearch = escapeRegex(String(search).slice(0, 100));
      filters.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
      ];
    }
    if (category) {
      filters.category = category;
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Unable to fetch products' });
  }
});

// @desc   Get a single product
// @route  GET /api/products/:id
// @access Public
router.get('/:id', async (req, res) => {
  if (!requireDb(res)) return;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    // e.g. a malformed ObjectId in the URL
    res.status(400).json({ message: 'Invalid product id' });
  }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  if (!requireDb(res)) return;
  try {
    const productData = normalizeProductPayload(req.body);
    if (req.file) {
      productData.image = await resolveImageUrl(req.file);
    }

    const missing = validateProduct(productData);
    if (missing.length) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }

    const createdProduct = await Product.create(productData);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(400).json({ message: error.message || 'Unable to create product' });
  }
});

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  if (!requireDb(res)) return;
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productData = normalizeProductPayload(req.body);

    if (req.file) {
      productData.image = await resolveImageUrl(req.file);
    } else if (!productData.image) {
      // No new file and no new URL: keep the current image.
      productData.image = existingProduct.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(400).json({ message: error.message || 'Unable to update product' });
  }
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  if (!requireDb(res)) return;
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to delete product' });
  }
});

module.exports = router;
