const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const { protect, admin } = require('../middleware/authMiddleware');
const { verifyGoogleIdToken } = require('../utils/googleToken');
const { escapeRegex } = require('../utils/regexEscape');
const crypto = require('crypto');

// Throttle credential endpoints to blunt brute-force / credential-stuffing.
// 20 attempts per IP per 15 minutes is plenty for a human, painful for a bot.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts from this IP. Please try again later.' },
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', authLimiter, async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Mongoose validation errors (bad email format, password too short, ...)
    // are the client's fault, not a server failure.
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        authProvider: user.authProvider || 'local',
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Sign in / sign up with Google ("Sign in with Google" button)
// @route   POST /api/auth/google
// @access  Public
// The browser sends the ID token ("credential") from Google's button. We verify
// it with Google's public keys, then find or create the matching account and
// return our own JWT, so Google users work everywhere normal users do
// (orders, profile, checkout).
router.post('/google', authLimiter, async (req, res) => {
  const idToken = req.body?.credential || req.body?.idToken;
  if (!idToken || typeof idToken !== 'string') {
    return res.status(400).json({ message: 'Missing Google sign-in token' });
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('Google sign-in attempted but GOOGLE_CLIENT_ID is not set (restart the backend after editing .env)');
    return res.status(503).json({ message: 'Google sign-in is not set up on the server yet.' });
  }

  let payload;
  try {
    payload = await verifyGoogleIdToken(idToken);
  } catch (error) {
    console.error('Google sign-in token rejected:', error.message);
    return res.status(401).json({ message: 'Google sign-in could not be verified. Please try again.' });
  }

  if (!payload.email || payload.email_verified !== true) {
    return res.status(401).json({ message: 'Your Google account email is not verified.' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    const email = String(payload.email).toLowerCase();
    let user = await User.findOne({ email: new RegExp(`^${escapeRegex(email)}$`, 'i') });

    if (!user) {
      user = await User.create({
        name: payload.name || email.split('@')[0],
        email,
        // Required by the schema but never used: Google accounts sign in via Google.
        password: crypto.randomBytes(32).toString('hex'),
        authProvider: 'google',
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      authProvider: user.authProvider || 'local',
      photo: payload.picture || '',
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all users for admin panel
// @route   GET /api/auth/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json([]);
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Change a user's role (promote/demote)
// @route   PUT /api/auth/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', protect, admin, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    const { role } = req.body;
    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Role must be 'customer' or 'admin'" });
    }

    // Guard: an admin cannot demote themselves (prevents locking out the last admin).
    if (String(req.user._id) === String(req.params.id) && role !== 'admin') {
      return res.status(400).json({ message: 'You cannot change your own admin role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save({ validateModifiedOnly: true });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    // Guard: an admin cannot delete their own account from the panel.
    if (String(req.user._id) === String(req.params.id)) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
router.put('/me', protect, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database is unavailable' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.address) {
        user.address = {
          street: req.body.address.street || user.address?.street,
          city: req.body.address.city || user.address?.city,
          state: req.body.address.state || user.address?.state,
          pincode: req.body.address.pincode || user.address?.pincode,
          country: req.body.address.country || user.address?.country,
        };
      }
      if (req.body.password) {
        if (!req.body.currentPassword) {
          return res.status(400).json({ message: 'Current password is required to set a new password' });
        }
        const isMatch = await user.matchPassword(req.body.currentPassword);
        if (!isMatch) {
          return res.status(401).json({ message: 'Current password is incorrect' });
        }
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        authProvider: updatedUser.authProvider || 'local',
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
