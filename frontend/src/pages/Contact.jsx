import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery2 from '../assets/jaggery2.jpeg';

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            value: "India",
            sub: "Global Reach"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            value: "+91 99999 99999",
            sub: "Customer Care"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            value: "info@mahaveerfood.com",
            sub: "We're here to help"
        }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        Get In Touch
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Get in Touch
                    </motion.h1>
                    <p className="font-body text-xl text-gray-600 leading-relaxed">
                        We would love to hear from you. Whether you are looking for wholesale supply, export partnerships, private labeling, or product information, our team is ready to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="rounded-[3rem] overflow-hidden aspect-video mb-12 shadow-2xl">
                            <img 
                                src={jaggery2} 
                                alt="Our Facility" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            {contactInfo.map((info, idx) => (
                                <div key={idx} className="flex gap-6 items-center p-6 bg-brand-cream rounded-[2rem] border border-brand-brown/10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-brand-brown/10 flex items-center justify-center shrink-0 text-brand-brown">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-1">{info.title}</h4>
                                        <p className="text-2xl font-heading font-black text-gray-900">{info.value}</p>
                                        <p className="font-body text-gray-600 mt-1">{info.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-white to-brand-cream rounded-[3rem] p-10 md:p-16 border-2 border-brand-brown/20 shadow-xl"
                    >
                        <h2 className="text-3xl font-heading font-black text-gray-900 mb-8">Send us an Inquiry</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Company Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Company Name"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Country</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Country"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="+91 99999 99999"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Product Requirement</label>
                                    <input 
                                        type="text" 
                                        placeholder="What products do you need?"
                                        className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Quantity Required</label>
                                <input 
                                    type="text" 
                                    placeholder="Approximate quantity needed"
                                    className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">Message</label>
                                <textarea 
                                    placeholder="Tell us more about your requirements..."
                                    className="w-full px-6 py-4 bg-white border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-body text-gray-900 h-40 resize-none transition-all shadow-sm"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-brand-brown text-white px-12 py-5 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-darkBrown transition-all shadow-2xl"
                            >
                                Submit Inquiry <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Quick Links Section */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 mb-8">
                        Explore More Options
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/export">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-br from-white to-brand-cream text-gray-900 px-10 py-5 rounded-[2.5rem] font-heading font-bold hover:bg-brand-brown hover:text-white transition-all border-2 border-brand-brown/20 hover:shadow-xl hover:shadow-brand-brown/10"
                            >
                                Export Solutions
                            </motion.button>
                        </Link>
                        <Link to="/wholesale">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-br from-white to-brand-cream text-gray-900 px-10 py-5 rounded-[2.5rem] font-heading font-bold hover:bg-brand-brown hover:text-white transition-all border-2 border-brand-brown/20 hover:shadow-xl hover:shadow-brand-brown/10"
                            >
                                Wholesale & Bulk
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
