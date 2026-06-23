import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery2 from '../assets/jaggery2.jpeg';

const Wholesale = () => {
    const partners = [
        "Importers", "Wholesalers", "Distributors", 
        "Retail Chains", "Supermarkets", "E-commerce Sellers", "Food Manufacturers"
    ];

    const services = [
        { icon: <Package size={24} />, title: "Bulk Supply", desc: "Large quantity orders with competitive pricing." },
        { icon: <Building2 size={24} />, title: "Contract Manufacturing", desc: "Custom manufacturing for your requirements." },
        { icon: <Package size={24} />, title: "Private Labeling", desc: "Customized branding and packaging." },
        { icon: <CheckCircle size={24} />, title: "Custom Solutions", desc: "Tailored products to meet your needs." }
    ];

    const whyChooseUs = [
        { title: "Premium Quality", desc: "We maintain the highest standards for all our products." },
        { title: "Competitive Pricing", desc: "Best wholesale prices for bulk orders." },
        { title: "Flexible MOQ", desc: "Minimum order quantities to suit businesses of all sizes." },
        { title: "Customized Solutions", desc: "Tailored to meet your specific requirements." },
        { title: "Reliable Service", desc: "Consistent quality and on-time delivery." }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Hero */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-cream text-brand-brown px-6 py-2 rounded-full font-medium text-xs uppercase tracking-wider mb-4"
                    >
                        Wholesale & Bulk
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
                        Wholesale & Bulk Orders
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Partner with us for premium quality food products at wholesale prices.
                    </p>
                </div>

                {/* Partner With Us */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                            Partner With Us
                        </h2>
                        <p className="text-gray-600 mb-8">
                            We welcome inquiries from businesses of all sizes looking to partner with us.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {partners.map((partner, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white p-4 rounded-xl border border-gray-100 text-center"
                                >
                                    <h3 className="text-sm font-medium text-gray-900">{partner}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="rounded-2xl overflow-hidden aspect-square">
                            <img 
                                src={jaggery2} 
                                alt="Wholesale Products" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center">
                        Why Choose Us
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {whyChooseUs.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100"
                            >
                                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-brown flex-shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center">
                        Our Wholesale Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
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

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-brand-brown/10 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                        Ready to Start Your Wholesale Partnership?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Get in touch with our team to discuss your requirements and pricing.
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-brand-brown text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 mx-auto"
                        >
                            Contact Us Today <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Wholesale;
