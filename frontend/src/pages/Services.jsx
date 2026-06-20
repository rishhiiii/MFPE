import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCcw, Package, CreditCard, Headphones, Globe, Zap } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Truck size={32} />,
            title: "Pan-India Delivery",
            desc: "We deliver our fresh products to every corner of India within 3-5 business days.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Quality Assurance",
            desc: "Every batch undergoes rigorous quality checks to ensure 100% purity and hygiene.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <RefreshCcw size={32} />,
            title: "Easy Returns",
            desc: "Not satisfied? We offer a hassle-free 7-day return policy for all our products.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <Package size={32} />,
            title: "Bulk Ordering",
            desc: "Special rates for bulk orders, events, and corporate gifting solutions.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <CreditCard size={32} />,
            title: "Secure Payments",
            desc: "Multiple secure payment options including UPI, Cards, and Net Banking.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <Headphones size={32} />,
            title: "24/7 Support",
            desc: "Our dedicated support team is always here to help you with your queries.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <Globe size={32} />,
            title: "Global Export",
            desc: "Spreading the taste of tradition to international markets with proper certification.",
            color: "bg-brand-cream text-brand-brown"
        },
        {
            icon: <Zap size={32} />,
            title: "Fresh Subscription",
            desc: "Subscribe to your favorite products and never run out of your daily needs.",
            color: "bg-brand-cream text-brand-brown"
        }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        How We Help
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Our <span className="text-brand-brown">Premium</span> Services
                    </motion.h1>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        We go beyond just selling products. We ensure a seamless and delightful experience for every customer who joins our family.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[3rem] border border-brand-brown/10 bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 group"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 bg-brand-darkBrown rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red rounded-full blur-[120px] opacity-20" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">Have a Special Requirement?</h2>
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">We cater to bulk orders, corporate gifting, and custom requirements for special occasions.</p>
                    <button className="bg-brand-red text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-brand-darkRed transition-all shadow-2xl shadow-red-900/20 relative z-10">
                        Get in Touch
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
