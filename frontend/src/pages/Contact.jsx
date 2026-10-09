import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    api.post('/api/contact', formData)
      .then(() => {
        setIsSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to send message. Please try again.');
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className="pt-40 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-medium text-gray-900 mb-4"
          >
            Contact <span className="text-brand-brown">Us</span>
          </motion.h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Reach out for any queries about our products, bulk orders, or exports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-2xl font-medium text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 bg-brand-cream/50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0 text-brand-brown">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Call Us</h4>
                    <p className="text-xl font-medium text-gray-900">+91 9669993888</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-brand-cream/50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0 text-brand-brown">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-xl font-medium text-gray-900">mahaveermfpe@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-brand-cream/50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0 text-brand-brown">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-lg font-medium text-gray-900">Link Road No. 3, Kolar Road, Bhopal, Madhya Pradesh 462003</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-brand-cream/50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0 text-brand-brown">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Business Hours</h4>
                    <p className="text-lg font-medium text-gray-900">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-brand-cream/30 rounded-2xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-center">
                  For product information, dealership inquiries, wholesale orders, or export opportunities, feel free to contact us.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100"
          >
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Send an Inquiry</h2>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
              >
                <CheckCircle2 size={48} className="mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9669993888"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your requirements..."
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown outline-none text-gray-900 h-32 resize-none transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-brand-brown text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-darkBrown transition-all disabled:opacity-70"
                >
                  {isSending ? 'Sending...' : 'Submit'} <Send className="w-5 h-5" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/export">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border border-gray-200 hover:border-brand-brown hover:text-brand-brown transition-all flex items-center gap-2"
              >
                Export Solutions <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/wholesale">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border border-gray-200 hover:border-brand-brown hover:text-brand-brown transition-all flex items-center gap-2"
              >
                Wholesale & Bulk <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
