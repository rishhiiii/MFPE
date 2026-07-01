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

const sendContactEmail = ({ name, company, email, phone, message }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: process.env.EMAIL_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: `New Contact Inquiry from ${name}`,
    text: `Name: ${name}\nCompany: ${company || '-'}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`,
  });
};

module.exports = { transporter, sendContactEmail };
