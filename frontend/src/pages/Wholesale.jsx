import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Package, Truck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';

const Wholesale = () => {
    const partners = [
        "Importers",
        "Wholesalers",
        "Distributors",
        "Retail Chains",
        "Supermarkets",
        "E-commerce Sellers",
        "Food Manufacturers"
    ];

    const services = [
        { icon: <Package className="w-8 h-8" />, title: "Bulk Supply", desc: "Large quantity orders with competitive pricing." },
        { icon: <Building2 className="w-8 h-8" />, title: "Contract Manufacturing", desc: "Custom manufacturing for your specific requirements." },
        { icon: <Package className="w-8 h-8" />, title: "Private Labeling", desc: "Customized branding and packaging solutions." },
        { icon: <Package className="w-8 h-8" />, title: "OEM Packaging", desc: "Original equipment manufacturer packaging options." },
        { icon: <CheckCircle className="w-8 h-8" />, title: "Customized Product Solutions", desc: "Tailored products to meet your unique needs." }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        Wholesale & Bulk
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Wholesale & Bulk Orders
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Partner with us for premium quality food products at wholesale prices.
                    </motion.p>
                </div>

                {/* Partner With Us */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl font-heading font-black text-gray-900 mb-4">
                                Partner With Us
                            </h2>
                            <p className="font-body text-lg text-gray-600">
                                We welcome inquiries from businesses of all sizes looking to partner with us.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {partners.map((partner, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-brand-cream p-6 rounded-[2rem] border border-brand-brown/10 text-center"
                                >
                                    <h3 className="font-heading font-bold text-gray-900">{partner}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
                            <img 
                                src={jaggery2} 
                                alt="Wholesale Products" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Our Services */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <p className="font-body text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive wholesale and bulk order solutions to meet your business needs.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="p-12 bg-gradient-to-br from-white to-brand-cream rounded-[3rem] border-2 border-brand-brown/20 hover:border-brand-brown hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-500 group"
                            >
                                <div className="w-16 h-16 rounded-[2rem] bg-brand-brown/10 flex items-center justify-center mb-8 text-brand-brown">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-heading font-black text-gray-900 mb-4">{service.title}</h3>
                                <p className="font-body text-lg text-gray-600">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-[3rem] overflow-hidden aspect-square shadow-2xl">
                                <img 
                                    src={jaggery3} 
                                    alt="Bulk Supply" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        <div className="space-y-10">
                            <div>
                                <h2 className="text-4xl font-heading font-black text-gray-900 mb-4">
                                    Why Choose Mahaveer Food?
                                </h2>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { title: "Premium Quality", desc: "We maintain the highest standards for all our products." },
                                    { title: "Competitive Pricing", desc: "Best wholesale prices for bulk orders." },
                                    { title: "Flexible MOQ", desc: "Minimum order quantities to suit businesses of all sizes." },
                                    { title: "Customized Solutions", desc: "Tailored to meet your specific requirements." },
                                    { title: "Reliable Service", desc: "Consistent quality and on-time delivery." }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-6 items-start"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center shrink-0 text-white mt-1 shadow-lg shadow-brand-brown/30">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-black text-gray-900 mb-2">{item.title}</h3>
                                            <p className="font-body text-gray-600">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-brand-brown rounded-[2.5rem] p-12 md:p-20 text-center"
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">
                            Request a Business Quote Today
                        </h2>
                        <p className="font-body text-xl text-brand-light/90 mb-10">
                            Get in touch with our wholesale team to discuss your requirements.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-brand-brown px-12 py-5 rounded-[2rem] font-heading font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3"
                            >
                                Get a Quote <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Wholesale;
