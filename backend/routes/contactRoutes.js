const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { isDbConnected } = require('../config/db');
const { sendContactEmail } = require('../config/nodemailer');
const { protect, admin } = require('../middleware/authMiddleware');
const { stripHtml } = require('../utils/sanitize');

const contactLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5,                     // 5 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many messages sent. Please try again later.' }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @desc   Submit a contact enquiry (public)
// @route  POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
    let { name, company, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Strip any HTML out of the free-text fields before they're stored/emailed.
    name = stripHtml(name);
    company = stripHtml(company);
    phone = stripHtml(phone);
    message = stripHtml(message);

    const dbUp = isDbConnected();

    // Persist first so the enquiry survives even if email delivery fails.
    let saved = false;
    if (dbUp) {
        try {
            await Contact.create({ name, company, email, phone, message });
            saved = true;
        } catch (err) {
            console.error('Error saving contact message:', err.message);
        }
    }

    if (saved) {
        // Message is safely stored — fire the notification email in the
        // background so a slow/unreachable SMTP server never delays the
        // customer's response.
        sendContactEmail({ name, company, email, phone, message }).catch((error) =>
            console.error('Error sending contact email:', error.message)
        );
        return res.json({ success: true, message: 'Message sent successfully' });
    }

    // No DB (or save failed): fall back to email being the only delivery path,
    // so we must await it and report accurately.
    try {
        await sendContactEmail({ name, company, email, phone, message });
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error.message);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// @desc   List all contact messages (admin)
// @route  GET /api/contact
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        if (!isDbConnected()) return res.json([]);
        const messages = await Contact.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Unable to fetch messages' });
    }
});

// @desc   Mark a message read/unread (admin)
// @route  PATCH /api/contact/:id
// @access Private/Admin
router.patch('/:id', protect, admin, async (req, res) => {
    try {
        if (!isDbConnected()) return res.status(503).json({ message: 'Database is unavailable' });
        const updated = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: req.body.isRead !== undefined ? !!req.body.isRead : true },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Message not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Unable to update message' });
    }
});

// @desc   Delete a message (admin)
// @route  DELETE /api/contact/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        if (!isDbConnected()) return res.status(503).json({ message: 'Database is unavailable' });
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Unable to delete message' });
    }
});

module.exports = router;
