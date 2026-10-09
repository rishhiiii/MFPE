const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Alerts the store (EMAIL_TO) that a new message arrived through the website's
// Contact / Export / Wholesale forms. The message is also saved to the admin panel.
const sendContactEmail = ({ name, company, email, phone, message }) => {
  const siteUrl = (process.env.SITE_URL || 'https://mahaveerfoodproducts.com').replace(/\/$/, '');
  // Export and Wholesale forms tag the message, e.g. "[Wholesale Inquiry]".
  const kind = /^\[([^\]]+)\]/.exec(String(message || ''))?.[1] || 'Message';
  return transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: process.env.EMAIL_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: `New ${kind} on your website from ${name}`,
    text: [
      `You received a new ${kind.toLowerCase()} on your website. It's also in your admin panel:`,
      `${siteUrl}/admin`,
      '',
      `Name: ${name}`,
      `Company: ${company || '-'}`,
      `Email: ${email}`,
      `Phone: ${phone || '-'}`,
      '',
      'Message:',
      message,
      '',
      'Reply to this email to answer them directly.',
    ].join('\n'),
  });
};

module.exports = { transporter, sendContactEmail };
