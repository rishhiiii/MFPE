const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { connectDB, isDbConnected, pingDb } = require('./config/db');
const { seedAdmin } = require('./scripts/seedAdmin');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

connectDB().then(() => {
  if (isDbConnected()) {
    seedAdmin();
  }
});

const app = express();

// Trust the first proxy (Render/Railway/Nginx/etc.) so express-rate-limit and
// req.ip see the real client IP from X-Forwarded-For instead of the proxy's.
app.set('trust proxy', 1);

// Don't advertise the framework, and set a few safe response headers.
// (Not setting Content-Security-Policy here: this API's responses are JSON,
// not HTML, and a hand-rolled CSP risks breaking the Razorpay checkout script,
// Google Identity Services, Google Fonts, or Cloudinary images on the
// frontend without being tested against all of them.)
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  next();
});

// CORS: restrict to configured origins in production. If ALLOWED_ORIGINS is
// left unset in production, fail closed (reject) rather than silently
// allowing every origin — ALLOWED_ORIGINS must be set for the real frontend
// to work.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // For LOCAL DEVELOPMENT: allow all origins, or check against allowlist
        // For PRODUCTION: keep the strict check
        if (process.env.NODE_ENV === 'production') {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error(`Origin ${origin} not allowed by CORS`));
        } else {
            // LOCAL DEV: allow all origins!
            return callback(null, true);
        }
    },
}));

// Keep the raw body around so the Razorpay webhook can verify its signature.
// No route here expects a large JSON body (images go through multer, capped
// at 5MB), so this just needs to comfortably fit real requests, not leave
// room for a memory-pressure DoS via an oversized payload.
app.use(express.json({
    limit: '2mb',
    verify: (req, res, buf) => {
        req.rawBody = buf;
    },
}));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check for uptime monitors / load balancers. Runs a real query rather
// than trusting readyState, so a connected-but-unauthenticated mongod reports
// unhealthy instead of "ok" while every route returns 500.
app.get('/api/health', async (req, res) => {
    try {
        await pingDb();
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        res.status(503).json({ status: 'degraded', db: 'unavailable', error: error.message });
    }
});

// Dynamic sitemap: the same static pages the old frontend/public/sitemap.xml
// listed, plus every product, generated fresh each request so new products
// are included automatically. The frontend proxies /sitemap.xml here (see
// frontend/vercel.json) instead of serving a static file.
const SITE_URL = (process.env.SITE_URL || 'https://mahaveerfoodproducts.com').replace(/\/$/, '');
const STATIC_SITEMAP_URLS = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/shop', changefreq: 'daily', priority: '0.9' },
    { loc: '/about', changefreq: 'monthly', priority: '0.7' },
    { loc: '/services', changefreq: 'monthly', priority: '0.7' },
    { loc: '/export', changefreq: 'monthly', priority: '0.8' },
    { loc: '/wholesale', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.6' },
    { loc: '/blog/jaggery-vs-refined-sugar', changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-06' },
    { loc: '/blog/gur-wali-chai', changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-02' },
    { loc: '/blog/peanut-jaggery-chikki', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-28' },
    { loc: '/blog/how-to-identify-pure-jaggery', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-24' },
    { loc: '/blog/til-gud-ladoo', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-19' },
    { loc: '/blog/how-to-store-jaggery', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-15' },
    { loc: '/blog/gur-wale-meethe-chawal', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-10' },
    { loc: '/blog/masala-chana-dal', changefreq: 'monthly', priority: '0.5', lastmod: '2026-09-05' },
    { loc: '/blog/from-sugarcane-to-jaggery', changefreq: 'monthly', priority: '0.5', lastmod: '2026-08-30' },
    { loc: '/contact', changefreq: 'yearly', priority: '0.6' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
    { loc: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/shipping-policy', changefreq: 'yearly', priority: '0.3' },
];

const sitemapEntry = ({ loc, changefreq, priority, lastmod }) =>
    `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

app.get('/sitemap.xml', async (req, res) => {
    let productUrls = [];
    try {
        if (isDbConnected()) {
            const products = await Product.find({}).select('_id updatedAt').lean();
            productUrls = products.map((p) => ({
                loc: `/product/${p._id}`,
                changefreq: 'weekly',
                priority: '0.6',
                lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().slice(0, 10) : undefined,
            }));
        }
    } catch (error) {
        console.error('Error building product URLs for sitemap:', error.message);
    }

    const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        [...STATIC_SITEMAP_URLS, ...productUrls].map(sitemapEntry).join('\n') +
        '\n</urlset>\n';

    res.type('application/xml').send(xml);
});

app.use('/api/products/:productId/reviews', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Unknown API route -> clean JSON 404 (never an HTML error page).
app.use('/api', (req, res) => {
    res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler: converts multer/upload and unexpected errors into JSON
// so clients always get a predictable shape. Must be the LAST middleware.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err && err.name === 'MulterError') {
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'Image is too large (max 5MB)'
            : `Upload error: ${err.message}`;
        return res.status(400).json({ message });
    }
    if (err && err.message === 'Only images are allowed!') {
        return res.status(400).json({ message: err.message });
    }
    if (err && /not allowed by CORS/.test(err.message || '')) {
        return res.status(403).json({ message: err.message });
    }
    if (err && err.type === 'entity.too.large') {
        return res.status(413).json({ message: 'Request body is too large' });
    }
    console.error('Unhandled error:', err?.message);
    res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
