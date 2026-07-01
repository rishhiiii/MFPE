// Dummy product catalog used when test mode is on (VITE_TEST_MODE=true).
// These let the storefront display real-looking products without a backend.
// They are automatically replaced by live database products when test mode is
// off. Edit the names, prices, and details below to match your actual catalog.
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';
import jNew1 from '../assets/jaggery new 1.jpeg';
import jNew2 from '../assets/jaggery new 2.jpeg';
import jNew3 from '../assets/jaggery new 3.jpeg';
import jNew4 from '../assets/jaggery new 4.jpeg';
import jNew5 from '../assets/jaggery new 5.jpeg';

const dummyProducts = [
  {
    _id: 'p1',
    name: 'Premium Cane Jaggery Blocks',
    description:
      'Traditional cane jaggery made from carefully selected sugarcane using time-honoured Jain methods. Chemical-free, with a rich natural colour and authentic taste.',
    price: 120,
    category: 'Natural Sweeteners',
    image: jaggery1,
    stock: 150,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '1 kg',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade sealed pack',
  },
  {
    _id: 'p2',
    name: 'Organic Jaggery Powder',
    description:
      'Finely granulated jaggery powder that dissolves easily in tea, coffee, and recipes. A wholesome, natural alternative to refined sugar.',
    price: 85,
    category: 'Natural Sweeteners',
    image: jaggery2,
    stock: 200,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '500 g',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade resealable pouch',
  },
  {
    _id: 'p3',
    name: 'Natural Jaggery Cubes',
    description:
      'Convenient bite-sized jaggery cubes, perfect for everyday use and portion control. Pure, natural, and free from additives.',
    price: 140,
    category: 'Natural Sweeteners',
    image: jaggery3,
    stock: 120,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '1 kg',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade sealed pack',
  },
  {
    _id: 'p4',
    name: 'Traditional Round Jaggery (Bheli)',
    description:
      'Classic round jaggery prepared the traditional way, retaining its natural minerals and aroma. Ideal for festivals, sweets, and daily cooking.',
    price: 110,
    category: 'Natural Sweeteners',
    image: jNew1,
    stock: 100,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '1 kg',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade sealed pack',
  },
  {
    _id: 'p5',
    name: 'Ginger Jaggery (Sonth Gud)',
    description:
      'Cane jaggery infused with dry ginger, a warming traditional favourite. A tasty, natural way to enjoy the goodness of jaggery and ginger together.',
    price: 130,
    category: 'Natural Sweeteners',
    image: jNew2,
    stock: 90,
    ingredients: 'Natural Sugarcane, Dry Ginger',
    shelfLife: '12 months',
    weight: '500 g',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade resealable pouch',
  },
  {
    _id: 'p6',
    name: 'Jaggery Powder Family Pack',
    description:
      'A value-sized pack of pure jaggery powder for households that use it daily. Naturally rich in taste and essential minerals.',
    price: 300,
    category: 'Natural Sweeteners',
    image: jNew3,
    stock: 80,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '2 kg',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade resealable pouch',
  },
  {
    _id: 'p7',
    name: 'Premium Jaggery Cubes Gift Box',
    description:
      'Neatly packed premium jaggery cubes in a gift-ready box. A thoughtful, healthy present for family and friends.',
    price: 160,
    category: 'Natural Sweeteners',
    image: jNew4,
    stock: 60,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '750 g',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Gift box with food-grade inner pack',
  },
  {
    _id: 'p8',
    name: 'Bulk Cane Jaggery Blocks',
    description:
      'Economical bulk pack of premium cane jaggery blocks, ideal for large families, wholesale buyers, and businesses.',
    price: 520,
    category: 'Natural Sweeteners',
    image: jNew5,
    stock: 40,
    ingredients: '100% Natural Sugarcane',
    shelfLife: '12 months',
    weight: '5 kg',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    origin: 'India',
    packaging: 'Food-grade bulk pack',
  },
];

export default dummyProducts;
