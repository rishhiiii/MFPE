const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isDbConnected } = require('../config/db');
const upload = require('../config/multer');
const { uploadToCloudinary } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Temporary in-memory storage when MongoDB not available
let tempProducts = [];
let nextProductId = 1;

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

// Get all products
router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      console.log('Using in-memory product storage');
      return res.json(tempProducts);
    }

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
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Unable to fetch products' });
  }
});

// Create product with Cloudinary image upload + local fallback
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received create product request');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    let productData = normalizeProductPayload(req.body);
    
    // If file was uploaded, try Cloudinary first, else use local path
    if (req.file) {
      let imageUrl = `/uploads/${req.file.filename}`; // Local path by default
      
      // Try to upload to Cloudinary
      try {
        console.log('Uploading image to Cloudinary...');
        // Read the file from disk to buffer for Cloudinary
        const fileBuffer = fs.readFileSync(req.file.path);
        imageUrl = await uploadToCloudinary(fileBuffer);
        console.log('Upload complete! Image URL:', imageUrl);
        
        // Delete local file if Cloudinary upload successful
        fs.unlinkSync(req.file.path);
      } catch (cloudErr) {
        console.error('Cloudinary upload failed, using local path:', cloudErr);
        // Keep local file if Cloudinary fails
      }
      
      productData.image = imageUrl;
    }

    if (!isDbConnected()) {
      console.log('Saving product to in-memory storage');
      const newProduct = {
        _id: `temp-${nextProductId++}`,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tempProducts.unshift(newProduct); // Add to beginning for newest first
      console.log('Saved new product:', newProduct);
      return res.status(201).json(newProduct);
    }

    const product = new Product(productData);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message || 'Unable to create product' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const product = tempProducts.find(p => p._id === req.params.id);
      if (product) {
        return res.json(product);
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch product' });
  }
});

// Update product with Cloudinary image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    console.log('Received update product request');
    console.log('req.params.id:', req.params.id);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    let productData = normalizeProductPayload(req.body);
    
    // Get existing product to preserve image if we don't have a new one
    let existingProduct;
    if (!isDbConnected()) {
      existingProduct = tempProducts.find(p => p._id === req.params.id);
    } else {
      existingProduct = await Product.findById(req.params.id);
    }
    
    // If file was uploaded, upload to Cloudinary
    if (req.file) {
      console.log('Uploading image to Cloudinary...');
      try {
        productData.image = await uploadToCloudinary(req.file.buffer);
        console.log('Upload complete! Image URL:', productData.image);
      } catch (cloudErr) {
        console.error('Cloudinary upload error:', cloudErr);
        // Keep existing image if Cloudinary fails
        if (existingProduct) {
          productData.image = existingProduct.image;
        }
      }
    } else if (existingProduct && !productData.image) {
      // If no new file and no new image URL, keep existing image
      productData.image = existingProduct.image;
    }

    if (!isDbConnected()) {
      const index = tempProducts.findIndex(p => p._id === req.params.id);
      if (index !== -1) {
        tempProducts[index] = {
          ...tempProducts[index],
          ...productData,
          updatedAt: new Date()
        };
        console.log('Updated product:', tempProducts[index]);
        return res.json(tempProducts[index]);
      }
      console.log('Product not found in temp array');
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message || 'Unable to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const initialLength = tempProducts.length;
      tempProducts = tempProducts.filter(p => p._id !== req.params.id);
      if (tempProducts.length < initialLength) {
        return res.json({ message: 'Product deleted successfully' });
      }
      return res.status(404).json({ message: 'Product not found' });
    }

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
