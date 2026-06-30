const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isDbConnected } = require('../config/db');
const upload = require('../config/multer');

// In-memory store for products when MongoDB is not available
let tempProducts = [];
let tempProductId = 1;

const normalizeProductPayload = (payload) => ({
  name: payload.name?.trim(),
  description: payload.description?.trim(),
  category: payload.category?.trim(),
  image: payload.image?.trim(),
  price: Number(payload.price),
  stock: Number(payload.stock),
});

// Get all products
router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const { search = '', category = '' } = req.query;
      const filters = {};

      if (search) {
        filters.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      if (category) {
        filters.category = category;
      }

      const products = await Product.find(filters).sort({ createdAt: -1 });
      res.json(products);
    } else {
      // Return in-memory products if no DB
      res.json(tempProducts);
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Unable to fetch products' });
  }
});

// Create product with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let productData = normalizeProductPayload(req.body);
    
    // If file was uploaded, use that instead of URL
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    if (isDbConnected()) {
      const product = new Product(productData);
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } else {
      // Use in-memory store for testing
      const newProduct = {
        _id: tempProductId++,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tempProducts.unshift(newProduct); // Add to beginning like MongoDB sort
      res.status(201).json(newProduct);
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message || 'Unable to create product' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    if (isDbConnected()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } else {
      const product = tempProducts.find(p => p._id == req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Unable to fetch product' });
  }
});

// Update product with file upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let productData = normalizeProductPayload(req.body);
    
    // If file was uploaded, use that instead of URL
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    if (isDbConnected()) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        productData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(updatedProduct);
    } else {
      const productIndex = tempProducts.findIndex(p => p._id == req.params.id);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      tempProducts[productIndex] = {
        ...tempProducts[productIndex],
        ...productData,
        updatedAt: new Date()
      };
      res.json(tempProducts[productIndex]);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message || 'Unable to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    if (isDbConnected()) {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } else {
      const productIndex = tempProducts.findIndex(p => p._id == req.params.id);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      tempProducts.splice(productIndex, 1);
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Unable to delete product' });
  }
});

module.exports = router;
