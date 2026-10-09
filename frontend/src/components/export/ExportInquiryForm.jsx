import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import api from '../../lib/api';

const PRODUCT_OPTIONS = [
    'Natural Sweeteners (Jaggery)',
    'Organic Superfoods',
    'Pulses & Grains',
    'FMCG Products',
    'Other / Multiple Categories',
];

const EMPTY_FORM = {
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    packaging: '',
    message: '',
};

// Copy that differs between the export and the domestic wholesale inquiry.
const VARIANTS = {
    export: {
        tag: 'Export Inquiry',
        title: 'Request an Export Quote',
        subtitle: "Tell us what you need — we'll respond with specifications and a quotation.",
        locationLabel: 'Country',
        locationPlaceholder: 'e.g. United Arab Emirates',
        quantityPlaceholder: 'e.g. 5 metric tons / month',
        submitLabel: 'Submit Export Inquiry',
        successText: 'Thank you — our export team will get back to you shortly.',
        whatsappText: "Hello Mahaveer Food Products! I'm interested in export/bulk supply.",
        whatsappLabel: 'Chat with our Export Team',
    },
    wholesale: {
        tag: 'Wholesale Inquiry',
        title: 'Request a Wholesale Quote',
        subtitle: "Share your requirement — we'll get back with pricing, MOQ and delivery timelines.",
        locationLabel: 'City / State',
        locationPlaceholder: 'e.g. Indore, Madhya Pradesh',
        quantityPlaceholder: 'e.g. 500 kg / month',
        submitLabel: 'Submit Wholesale Inquiry',
        successText: 'Thank you — our wholesale team will get back to you shortly.',
        whatsappText: "Hello Mahaveer Food Products! I'm interested in wholesale/bulk orders.",
        whatsappLabel: 'Chat with our Wholesale Team',
    },
};

// Reuses the existing /api/contact pipeline (persistence + email notification +
// admin inbox) instead of a parallel backend — the export-specific fields are
// folded into a clearly tagged message body so admins can tell inquiries apart
// without a schema migration.
const ExportInquiryForm = ({ id, variant = 'export' }) => {
    const copy = VARIANTS[variant] || VARIANTS.export;
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSending(true);

        const { name, company, country, email, phone, product, quantity, packaging, message } = formData;

        const composedMessage = `[${copy.tag}]
${copy.locationLabel}: ${country}
Product Interested In: ${product || 'Not specified'}
Required Quantity: ${quantity || 'Not specified'}
Packaging Requirement: ${packaging || 'Not specified'}

${message || 'No additional message provided.'}`;

        api.post('/api/contact', { name, company, email, phone, message: composedMessage })
            .then(() => {
                setIsSuccess(true);
                setFormData(EMPTY_FORM);
                setTimeout(() => setIsSuccess(false), 6000);
            })
            .catch((err) => {
                console.error(err);
                setError('Could not send your inquiry. Please try again or reach us on WhatsApp below.');
            })
            .finally(() => setIsSending(false));
    };

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 scroll-mt-28"
        >
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{copy.title}</h3>
            <p className="text-gray-600 mb-6 text-sm">{copy.subtitle}</p>

            {isSuccess ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                    <CheckCircle2 size={44} className="mx-auto mb-4 text-green-600" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent!</h4>
                    <p className="text-gray-600">{copy.successText}</p>
                </motion.div>
            ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Full Name *</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                placeholder="Your Name" required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Company Name *</label>
                            <input
                                type="text" name="company" value={formData.company} onChange={handleChange}
                                placeholder="Your Company" required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">{copy.locationLabel} *</label>
                            <input
                                type="text" name="country" value={formData.country} onChange={handleChange}
                                placeholder={copy.locationPlaceholder} required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Email *</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="your@company.com" required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp / Phone *</label>
                            <input
                                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                placeholder="+91 98765 43210" required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Product Interested In *</label>
                            <select
                                name="product" value={formData.product} onChange={handleChange} required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            >
                                <option value="" disabled>Select a category</option>
                                {PRODUCT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Required Quantity *</label>
                            <input
                                type="text" name="quantity" value={formData.quantity} onChange={handleChange}
                                placeholder={copy.quantityPlaceholder} required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wider">Packaging Requirement</label>
                            <input
                                type="text" name="packaging" value={formData.packaging} onChange={handleChange}
                                placeholder="e.g. 25kg bags, private label"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
                        <textarea
                            name="message" value={formData.message} onChange={handleChange}
                            placeholder="Anything else we should know about your requirements..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 h-24 resize-none transition-all"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-brand-brown text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-brand-darkBrown transition-all disabled:opacity-70"
                    >
                        {isSending ? 'Sending...' : copy.submitLabel} <Send className="w-5 h-5" />
                    </motion.button>

                    <div className="pt-2 text-center">
                        <p className="text-sm text-gray-500 mb-2">Prefer WhatsApp?</p>
                        <a
                            href={`https://wa.me/919669993888?text=${encodeURIComponent(copy.whatsappText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#1B4332] font-semibold hover:underline"
                        >
                            <MessageCircle size={18} /> {copy.whatsappLabel}
                        </a>
                    </div>
                </form>
            )}
        </motion.div>
    );
};

export default ExportInquiryForm;
