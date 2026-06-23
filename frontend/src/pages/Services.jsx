import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCcw, Package, CreditCard, Headphones, Globe, Zap } from 'lucide-react';

const Services = () => {
    const services = [
        { icon: <Truck size={24} />, title: "Pan-India Delivery", desc: "We deliver our products to every corner of India within 3-5 business days." },
        { icon: <ShieldCheck size={24} />, title: "Quality Assurance", desc: "Every batch undergoes rigorous quality checks to ensure 100% purity and hygiene." },
        { icon: <RefreshCcw size={24} />, title: "Easy Returns", desc: "Not satisfied? We offer a hassle-free 7-day return policy for all our products." },
        { icon: <Package size={24} />, title: "Bulk Ordering", desc: "Special rates for bulk orders, events, and corporate gifting solutions." },
        { icon: <CreditCard size={24} />, title: "Secure Payments", desc: "Multiple secure payment options including UPI, Cards, and Net Banking." },
        { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Our dedicated support team is always here to help you with your queries." },
        { icon: <Globe size={24} />, title: "Global Export", desc: "Spreading the taste of tradition to international markets with proper certification." },
        { icon: <Zap size={24} />, title: "Fresh Subscription", desc: "Subscribe to your favorite products and never run out of your daily needs." }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-cream text-brand-brown px-6 py-2 rounded-full font-medium text-xs uppercase tracking-wider mb-4"
                    >
                        How We Help
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
                        Our <span className="text-brand-brown">Premium</span> Services
                    </h1>
                    <p className="text-lg text-gray-600">
                        We go beyond just selling products. We ensure a seamless and delightful experience for every customer who joins our family.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="p-6 bg-white rounded-2xl border border-gray-100"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center mb-4 text-brand-brown">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
