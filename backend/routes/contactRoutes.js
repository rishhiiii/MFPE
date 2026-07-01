const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../config/nodemailer');

router.post('/', async (req, res) => {
    const { name, company, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        await sendContactEmail({ name, company, email, phone, message });
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
