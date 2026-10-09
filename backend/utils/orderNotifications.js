const Order = require('../models/Order');
const { transporter } = require('../config/nodemailer');

// Order emails, sent with the SMTP settings in .env:
//  - customer: "order confirmed" after a successful payment
//  - customer: "payment unsuccessful" after a failed payment
//  - store (EMAIL_TO): "new order received" after a successful payment
// If SMTP isn't configured the emails are skipped with a log line; a sending
// error never affects the payment flow itself.
//
// Every notification is "claimed" with an atomic update on the order before it
// is sent, so the browser (/verify) and the Razorpay webhook can both report the
// same payment without anyone getting two emails.

const BRAND = 'Mahaveer Food Products';
const SITE_URL = (process.env.SITE_URL || 'https://mahaveerfoodproducts.com').replace(/\/$/, '');

const money = (n) => `₹${(Number(n) || 0).toFixed(2)}`;

// Short, human-friendly order reference shown to customers, e.g. "MF-3FA9C21B".
const orderRef = (order) => `MF-${String(order._id).slice(-8).toUpperCase()}`;

const escapeHtml = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const firstName = (order) => String(order.shippingAddress?.name || '').trim().split(/\s+/)[0] || 'there';

// ---------------------------------------------------------------- email ----

const emailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const emailShell = (title, inner) => `<!doctype html>
<html><body style="margin:0;background:#FFF8DC;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8DC;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#5D2E0C;padding:20px 28px;color:#FFF8DC;font-size:18px;font-weight:bold;">${BRAND}</td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 16px;font-size:22px;color:#111827;">${escapeHtml(title)}</h1>
          ${inner}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#faf7ef;font-size:12px;color:#6b7280;">
          Questions? Reply to this email or WhatsApp us at +91 96699 93888.<br>
          <a href="${SITE_URL}" style="color:#8B4513;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const itemsTable = (order) => {
    const rows = order.orderItems.map((it) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f1f1f1;">${escapeHtml(it.name)} × ${it.qty}</td>
          <td style="padding:8px 0;border-bottom:1px solid #f1f1f1;text-align:right;">${money(it.price * it.qty)}</td>
        </tr>`).join('');
    const line = (label, value, bold) => `
        <tr>
          <td style="padding:6px 0;${bold ? 'font-weight:bold;font-size:16px;' : 'color:#6b7280;'}">${label}</td>
          <td style="padding:6px 0;text-align:right;${bold ? 'font-weight:bold;font-size:16px;color:#8B4513;' : ''}">${value}</td>
        </tr>`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin:8px 0 20px;">
        ${rows}
        ${line('Subtotal', money(order.itemsPrice))}
        ${order.taxPrice ? line('GST', money(order.taxPrice)) : ''}
        ${line('Shipping', money(order.shippingPrice))}
        ${line('Total paid', money(order.totalPrice), true)}
      </table>`;
};

const addressBlock = (order) => {
    const a = order.shippingAddress || {};
    return `<p style="margin:0 0 4px;font-weight:bold;">Delivering to</p>
      <p style="margin:0 0 20px;color:#4b5563;font-size:14px;line-height:1.5;">
        ${escapeHtml(a.name)}<br>${escapeHtml(a.address)}<br>
        ${escapeHtml(a.city)}, ${escapeHtml(a.state)} ${escapeHtml(a.pincode)}<br>${escapeHtml(a.phone)}
      </p>`;
};

const sendConfirmationEmail = (order) => transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: order.shippingAddress.email,
    subject: `Order confirmed: ${orderRef(order)} | ${BRAND}`,
    text: [
        `Hi ${firstName(order)},`,
        '',
        `Thank you for your order! We've received your payment of ${money(order.totalPrice)}.`,
        `Order: ${orderRef(order)}`,
        '',
        ...order.orderItems.map((it) => `- ${it.name} x ${it.qty}: ${money(it.price * it.qty)}`),
        '',
        `Subtotal: ${money(order.itemsPrice)}`,
        order.taxPrice ? `GST: ${money(order.taxPrice)}` : null,
        `Shipping: ${money(order.shippingPrice)}`,
        `Total paid: ${money(order.totalPrice)}`,
        '',
        "We'll let you know when your order ships.",
        `- ${BRAND}`,
    ].filter((l) => l !== null).join('\n'),
    html: emailShell('Thank you, your order is confirmed!', `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(firstName(order))},<br>
        We've received your payment and your order is being prepared.</p>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Order number</p>
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;color:#8B4513;">${orderRef(order)}</p>
        ${itemsTable(order)}
        ${addressBlock(order)}
        <p style="margin:0;font-size:14px;color:#4b5563;">We'll let you know when your order ships.</p>`),
});

const sendFailureEmail = (order, reason) => transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: order.shippingAddress.email,
    subject: `Payment unsuccessful for order ${orderRef(order)} | ${BRAND}`,
    text: [
        `Hi ${firstName(order)},`,
        '',
        `Your payment of ${money(order.totalPrice)} for order ${orderRef(order)} did not go through${reason ? ` (${reason})` : ''}.`,
        'No order has been placed. If any money was debited, it is usually refunded automatically by your bank within 5-7 working days.',
        '',
        `You can try again here: ${SITE_URL}/cart`,
        "If you've already completed the payment on a second attempt, you can ignore this message.",
        '',
        `- ${BRAND}`,
    ].join('\n'),
    html: emailShell('Your payment was not successful', `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(firstName(order))},<br>
        Your payment of <strong>${money(order.totalPrice)}</strong> for order <strong>${orderRef(order)}</strong> did not go through${reason ? ` <span style="color:#6b7280;">(${escapeHtml(reason)})</span>` : ''}.</p>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">No order has been placed. If any money was debited,
        it is usually refunded automatically by your bank within 5–7 working days.</p>
        <p style="margin:0 0 20px;"><a href="${SITE_URL}/cart" style="display:inline-block;background:#8B4513;color:#FFF8DC;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px;">Try again</a></p>
        <p style="margin:0;font-size:13px;color:#6b7280;">If you've already completed the payment on a second attempt, you can ignore this message.</p>`),
});

const sendNewOrderEmail = (order) => {
    const a = order.shippingAddress || {};
    return transporter.sendMail({
        from: process.env.EMAIL_FROM_ADDRESS,
        to: process.env.EMAIL_TO || process.env.SMTP_USER,
        replyTo: a.email,
        subject: `New order ${orderRef(order)}: ${money(order.totalPrice)} from ${a.name}`,
        text: [
            `New paid order ${orderRef(order)}`,
            `Paid: ${money(order.totalPrice)} (Razorpay payment ${order.razorpayPaymentId || '-'})`,
            '',
            ...order.orderItems.map((it) => `- ${it.name} x ${it.qty}: ${money(it.price * it.qty)}`),
            '',
            `Subtotal: ${money(order.itemsPrice)}`,
            `GST: ${money(order.taxPrice)}`,
            `Shipping: ${money(order.shippingPrice)}`,
            `Total: ${money(order.totalPrice)}`,
            '',
            'Customer:',
            `${a.name}, ${a.phone}, ${a.email}`,
            `${a.address}, ${a.city}, ${a.state} ${a.pincode}`,
        ].join('\n'),
        html: emailShell(`New order received: ${money(order.totalPrice)}`, `
            <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Order number</p>
            <p style="margin:0 0 4px;font-size:18px;font-weight:bold;color:#8B4513;">${orderRef(order)}</p>
            <p style="margin:0 0 16px;font-size:12px;color:#6b7280;">Razorpay payment: ${escapeHtml(order.razorpayPaymentId || '-')}</p>
            ${itemsTable(order)}
            <p style="margin:0 0 4px;font-weight:bold;">Customer</p>
            <p style="margin:0 0 20px;color:#4b5563;font-size:14px;line-height:1.5;">
              ${escapeHtml(a.name)}<br>
              <a href="tel:${escapeHtml(a.phone)}" style="color:#8B4513;">${escapeHtml(a.phone)}</a> ·
              <a href="mailto:${escapeHtml(a.email)}" style="color:#8B4513;">${escapeHtml(a.email)}</a><br>
              ${escapeHtml(a.address)}, ${escapeHtml(a.city)}, ${escapeHtml(a.state)} ${escapeHtml(a.pincode)}
            </p>
            <p style="margin:0;"><a href="${SITE_URL}/admin" style="display:inline-block;background:#8B4513;color:#FFF8DC;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px;">Open admin panel</a></p>`),
    });
};

// ------------------------------------------------------------ dispatch -----

// Send each email independently so one failing doesn't stop the others.
const sendAll = async (order, emails) => {
    if (!emailConfigured()) {
        console.log(`[notify] emails skipped for ${orderRef(order)}: SMTP not configured`);
        return;
    }
    const results = await Promise.allSettled(emails.map(([, send]) => send()));
    results.forEach((r, i) => {
        const label = emails[i][0];
        if (r.status === 'rejected') {
            console.error(`[notify] ${label} email failed for ${orderRef(order)}: ${r.reason?.message || r.reason}`);
        } else {
            console.log(`[notify] ${label} email sent for ${orderRef(order)}`);
        }
    });
};

// Email the customer their confirmation and the store a new-order alert,
// at most once per order.
const notifyOrderConfirmed = async (orderId) => {
    const order = await Order.findOneAndUpdate(
        { _id: orderId, isPaid: true, confirmationNotifiedAt: null },
        { $set: { confirmationNotifiedAt: new Date() } },
        { returnDocument: 'after' }
    );
    if (!order) return; // already notified (or not paid)
    await sendAll(order, [
        ['customer confirmation', () => sendConfirmationEmail(order)],
        ['store new-order', () => sendNewOrderEmail(order)],
    ]);
};

// Email the customer that their payment failed, at most once per order, and
// never for an order that has since been paid.
const notifyPaymentFailed = async (razorpayOrderId, reason) => {
    const order = await Order.findOneAndUpdate(
        { razorpayOrderId, isPaid: false, failureNotifiedAt: null },
        { $set: { failureNotifiedAt: new Date() } },
        { returnDocument: 'after' }
    );
    if (!order) return;
    await sendAll(order, [
        ['customer payment-failed', () => sendFailureEmail(order, reason)],
    ]);
};

// ------------------------------------------------------ status updates -----

// Customer-facing copy for each fulfilment status the admin can set.
const STATUS_COPY = {
    Processing: {
        subject: 'is being prepared',
        title: 'Your order is being prepared',
        body: "We're packing your order and will let you know as soon as it ships.",
    },
    Shipped: {
        subject: 'has shipped',
        title: 'Your order is on its way!',
        body: 'Good news: your order has been shipped and is on its way to you.',
    },
    Delivered: {
        subject: 'has been delivered',
        title: 'Your order has been delivered',
        body: 'Your order has been delivered. We hope you enjoy it! If anything is not right, just reply to this email.',
    },
    Cancelled: {
        subject: 'has been cancelled',
        title: 'Your order has been cancelled',
        body: 'Your order has been cancelled. If you were charged, the refund will be processed to your original payment method, usually within 5–7 working days. Reply to this email if you have any questions.',
    },
};

const trackingBlock = (order) => (order.trackingNumber ? `
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Tracking number</p>
        <p style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#111827;">${escapeHtml(order.trackingNumber)}</p>` : '');

const sendStatusEmail = (order, copy) => transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: order.shippingAddress.email,
    subject: `Order ${orderRef(order)} ${copy.subject} | ${BRAND}`,
    text: [
        `Hi ${firstName(order)},`,
        '',
        copy.body,
        '',
        `Order: ${orderRef(order)}`,
        order.trackingNumber ? `Tracking number: ${order.trackingNumber}` : null,
        ...order.orderItems.map((it) => `- ${it.name} x ${it.qty}`),
        `Total: ${money(order.totalPrice)}`,
        '',
        `View your orders: ${SITE_URL}/profile`,
        `- ${BRAND}`,
    ].filter((l) => l !== null).join('\n'),
    html: emailShell(copy.title, `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(firstName(order))},<br>${escapeHtml(copy.body)}</p>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Order number</p>
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;color:#8B4513;">${orderRef(order)}</p>
        ${trackingBlock(order)}
        ${itemsTable(order)}
        <p style="margin:0;"><a href="${SITE_URL}/profile" style="display:inline-block;background:#8B4513;color:#FFF8DC;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px;">View my orders</a></p>`),
});

// Email the customer after an admin changes their order's status, or adds a
// tracking number to an order that's already marked Shipped.
//   change: { statusChanged: bool, trackingAdded: bool }
const notifyOrderStatus = async (order, { statusChanged, trackingAdded }) => {
    if (!order.isPaid) return;
    let copy = null;
    let label = '';
    if (statusChanged && STATUS_COPY[order.status]) {
        copy = STATUS_COPY[order.status];
        label = `customer status (${order.status})`;
    } else if (trackingAdded && order.status === 'Shipped') {
        copy = {
            subject: 'tracking details',
            title: 'Tracking details for your order',
            body: 'Your order is on its way. You can use the tracking number below to follow your delivery.',
        };
        label = 'customer tracking';
    }
    if (!copy) return;
    await sendAll(order, [[label, () => sendStatusEmail(order, copy)]]);
};

module.exports = { notifyOrderConfirmed, notifyPaymentFailed, notifyOrderStatus, orderRef };
