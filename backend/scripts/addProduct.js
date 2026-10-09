// Add a single product to the database, uploading its image to Cloudinary.
//
// Usage (from the backend/ folder):
//   node scripts/addProduct.js \
//     --name "Organic Jaggery Cubes" \
//     --description "Traditional chemical-free jaggery cubes." \
//     --category "Jaggery" \
//     --mrp 149 --discount 15 \
//     --stock 100 \
//     --image ../path/to/photo.jpg \
//     [--weight 500g] [--shelfLife "12 months"] [--origin "Maharashtra, India"]
//     [--ingredients "100% Sugarcane"] [--packaging "Resealable pouch"] [--storage "Cool, dry place"]
//
// The selling price is derived as mrp * (1 - discount/100), matching
// derivePricing() in routes/productRoutes.js. Pass --price instead of
// --mrp/--discount for a flat price with no MRP on record.
//
// Requires MONGO_URI and the CLOUDINARY_* vars in backend/.env.

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { uploadToCloudinary } = require('../config/cloudinary');

// Parse "--key value" pairs off argv into a plain object.
const parseArgs = (argv) => {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    args[key] = (next && !next.startsWith('--')) ? next : 'true';
  }
  return args;
};

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

const derivePricing = ({ mrp, discount, price }) => {
  const m = Number(mrp) || 0;
  if (m <= 0) return { mrp: 0, discount: 0, price: round2(Number(price) || 0) };
  const d = Math.min(100, Math.max(0, Number(discount) || 0));
  return { mrp: round2(m), discount: d, price: round2(m * (1 - d / 100)) };
};

const addProduct = async () => {
  const args = parseArgs(process.argv.slice(2));
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MONGO_URI is not set in backend/.env — nothing to connect to.');
    process.exitCode = 1;
    return;
  }

  const pricing = derivePricing(args);
  const missing = [];
  if (!args.name) missing.push('--name');
  if (!args.description) missing.push('--description');
  if (!args.category) missing.push('--category');
  if (!(pricing.price > 0)) missing.push('--mrp (or --price) greater than 0');
  if (missing.length) {
    console.error(`Missing required argument(s): ${missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }

  // Upload the image first: if this fails we bail out before touching the DB,
  // rather than creating a product with a broken image reference.
  let image = '';
  if (args.image) {
    const imagePath = path.resolve(process.cwd(), args.image);
    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`);
      process.exitCode = 1;
      return;
    }
    try {
      image = await uploadToCloudinary(fs.readFileSync(imagePath));
      console.log(`Uploaded image -> ${image}`);
    } catch (err) {
      console.error(`Cloudinary upload failed: ${err.message}`);
      process.exitCode = 1;
      return;
    }
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

    const existing = await Product.findOne({ name: args.name.trim() });
    if (existing) {
      console.log(`Skipping: a product named "${args.name}" already exists (${existing._id}).`);
      return;
    }

    const product = await Product.create({
      name: args.name.trim(),
      description: args.description.trim(),
      category: args.category.trim(),
      image,
      stock: Number(args.stock) || 0,
      ingredients: args.ingredients || '',
      shelfLife: args.shelfLife || '',
      weight: args.weight || '',
      storage: args.storage || '',
      origin: args.origin || '',
      packaging: args.packaging || '',
      ...pricing,
    });

    const saving = product.mrp > product.price
      ? ` (MRP ₹${product.mrp}, ${product.discount}% off)`
      : '';
    console.log(`Created "${product.name}" at ₹${product.price}${saving} — id ${product._id}`);
  } catch (error) {
    console.error('Add product failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
};

addProduct();
