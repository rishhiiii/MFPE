const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect: gate a route behind a valid, server-issued JWT.
// The token must be signed with our JWT_SECRET (issued only by /login and
// /register), so it cannot be forged by a client. On success req.user holds the
// authenticated user (without the password hash).
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user no longer exists' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};

// admin: must run AFTER protect. Rejects anyone whose role is not 'admin', so
// a regular customer's valid token still cannot reach admin-only endpoints.
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};

// optionalAuth: like protect, but never rejects. Sets req.user when a valid
// token is present (e.g. to link a checkout to the logged-in account) and
// otherwise just continues as a guest request.
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch {
      // not one of our tokens (or expired): treat as a guest
    }
  }
  return next();
};

module.exports = { protect, admin, optionalAuth };
