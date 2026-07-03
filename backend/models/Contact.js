const mongoose = require('mongoose');

// Persisted contact-form submissions. Stored in addition to the notification
// email so enquiries are never lost if SMTP is down or misconfigured.
const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, default: '' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
