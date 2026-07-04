const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { connectDB, isDbConnected } = require('./config/db');
const { seedAdmin } = require('./scripts/seedAdmin');
const productRoutes = require('./routes/productRoutes');
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

// CORS: restrict to configured origins in production; allow all if unset.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // For LOCAL DEVELOPMENT: allow all origins, or check against allowlist
        // For PRODUCTION: keep the strict check
        if (process.env.NODE_ENV === 'production') {
            if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
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
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    },
}));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check for uptime monitors / load balancers
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', db: isDbConnected() ? 'connected' : 'disconnected' });
});

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
    console.error('Unhandled error:', err?.message);
    res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
