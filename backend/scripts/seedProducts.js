// Seed the database with sample products for the admin panel / storefront.
//
// Usage (from the backend/ folder):
//   npm run seed:products            -> inserts only if the collection is empty
//   npm run seed:products -- --force -> inserts even if products already exist
//   npm run seed:products -- --reset -> deletes ALL products, then inserts fresh
//
// Requires MONGO_URI in .env to point at a reachable database.

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const dummyProducts = [
  {
    name: 'Organic Sugarcane Jaggery (Gud)',
    description:
      'Traditional chemical-free jaggery made from pure sugarcane juice. Rich, earthy sweetness and a natural source of iron and minerals.',
    price: 120,
    category: 'Jaggery',
    stock: 150,
    image: '',
    ingredients: '100% Sugarcane Juice',
    shelfLife: '12 months',
    weight: '500g',
    storage: 'Store in a cool, dry place away from direct sunlight',
    origin: 'Maharashtra, India',
    packaging: 'Food-grade vacuum-sealed pouch',
  },
  {
    name: 'Jaggery Powder (Shakkar)',
    description:
      'Finely granulated jaggery powder that dissolves easily. A healthier golden-brown alternative to refined white sugar for tea, coffee and desserts.',
    price: 140,
    category: 'Jaggery',
    stock: 200,
    image: '',
    ingredients: '100% Sugarcane Jaggery',
    shelfLife: '12 months',
    weight: '500g',
    storage: 'Keep in an airtight container in a dry place',
    origin: 'Maharashtra, India',
    packaging: 'Resealable stand-up pouch',
  },
  {
    name: 'Handmade Urad Dal Papad',
    description:
      'Crispy, sun-dried papads made from premium urad dal and a hint of black pepper. Roast or fry for the perfect accompaniment to any meal.',
    price: 90,
    category: 'Papad',
    stock: 120,
    image: '',
    ingredients: 'Urad Dal, Salt, Black Pepper, Asafoetida, Edible Oil',
    shelfLife: '9 months',
    weight: '200g (approx. 15 pieces)',
    storage: 'Store in an airtight container away from moisture',
    origin: 'Rajasthan, India',
    packaging: 'Sealed moisture-proof packet',
  },
  {
    name: 'Masala Moong Papad',
    description:
      'Zesty moong dal papads with a spicy masala blend. Light, crunchy and full of flavour — a favourite Indian snack.',
    price: 95,
    category: 'Papad',
    stock: 100,
    image: '',
    ingredients: 'Moong Dal, Spices, Salt, Asafoetida',
    shelfLife: '9 months',
    weight: '200g',
    storage: 'Keep sealed in a cool, dry place',
    origin: 'Rajasthan, India',
    packaging: 'Sealed moisture-proof packet',
  },
  {
    name: 'Pure Forest Honey',
    description:
      'Raw, unprocessed multi-floral honey harvested from forest beehives. Unpasteurised to retain natural enzymes and antioxidants.',
    price: 350,
    category: 'Honey',
    stock: 80,
    image: '',
    ingredients: '100% Raw Honey',
    shelfLife: '24 months',
    weight: '500g',
    storage: 'Store at room temperature; natural crystallisation is normal',
    origin: 'Himalayan Foothills, India',
    packaging: 'Glass jar with tamper-proof lid',
  },
  {
    name: 'Cold-Pressed Groundnut Oil',
    description:
      'Wood-pressed (kachi ghani) groundnut oil extracted at low temperature to preserve natural aroma and nutrients. Ideal for everyday Indian cooking.',
    price: 280,
    category: 'Oils',
    stock: 60,
    image: '',
    ingredients: '100% Groundnuts',
    shelfLife: '9 months',
    weight: '1 Litre',
    storage: 'Store in a cool, dark place; keep tightly closed',
    origin: 'Gujarat, India',
    packaging: 'Food-grade PET bottle',
  },
  {
    name: 'Turmeric Powder (Haldi)',
    description:
      'Single-origin turmeric ground from premium Salem roots with high curcumin content. Vibrant colour, earthy aroma and no added colourants.',
    price: 110,
    category: 'Spices',
    stock: 140,
    image: '',
    ingredients: '100% Turmeric',
    shelfLife: '18 months',
    weight: '250g',
    storage: 'Keep in an airtight container away from sunlight',
    origin: 'Tamil Nadu, India',
    packaging: 'Resealable pouch',
  },
  {
    name: 'Roasted Chana Namkeen',
    description:
      'Lightly spiced roasted gram — a wholesome, protein-rich snack with no deep frying. Perfect for guilt-free munching any time of day.',
    price: 75,
    category: 'Snacks',
    stock: 110,
    image: '',
    ingredients: 'Bengal Gram, Salt, Spices',
    shelfLife: '6 months',
    weight: '200g',
    storage: 'Store in an airtight container after opening',
    origin: 'Madhya Pradesh, India',
    packaging: 'Sealed snack pack',
  },
];

const seed = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set in .env — cannot seed.');
    process.exit(1);
  }

  const force = process.argv.includes('--force');
  const reset = process.argv.includes('--reset');

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

    if (reset) {
      const { deletedCount } = await Product.deleteMany({});
      console.log(`--reset: removed ${deletedCount} existing product(s).`);
    }

    const count = await Product.countDocuments();
    if (count > 0 && !force && !reset) {
      console.log(
        `Skipping: ${count} product(s) already exist. ` +
        `Re-run with "-- --force" to add anyway or "-- --reset" to replace all.`
      );
      return;
    }

    const inserted = await Product.insertMany(dummyProducts);
    console.log(`Inserted ${inserted.length} sample product(s).`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
};

seed();
