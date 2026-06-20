import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, Package, FileText, Truck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';

const Export = () => {
    const exportCategories = [
        { name: "Organic Foods" },
        { name: "Superfoods" },
        { name: "Spices" },
        { name: "Agricultural Products" },
        { name: "Pulses & Grains" },
        { name: "FMCG Products" }
    ];

    const exportServices = [
        { icon: <Package className="w-8 h-8" />, title: "Product Sourcing", desc: "Access to a wide range of premium Indian products." },
        { icon: <CheckCircle className="w-8 h-8" />, title: "Quality Inspection", desc: "Rigorous quality control and inspection processes." },
        { icon: <FileText className="w-8 h-8" />, title: "Custom Packaging", desc: "Customized packaging solutions for your brand." },
        { icon: <Award className="w-8 h-8" />, title: "Private Label Solutions", desc: "White-label and private labeling options available." },
        { icon: <FileText className="w-8 h-8" />, title: "Export Documentation", desc: "Complete export documentation and compliance support." },
        { icon: <Truck className="w-8 h-8" />, title: "International Logistics Support", desc: "Seamless international shipping and logistics." }
    ];

    const whyChooseUs = [
        { title: "Reliable Product Quality", desc: "Consistent quality you can trust." },
        { title: "Competitive Pricing", desc: "Best prices for wholesale and bulk orders." },
        { title: "Flexible Packaging Options", desc: "Customized packaging to meet your needs." },
        { title: "Timely Delivery", desc: "On-time delivery guaranteed." },
        { title: "Professional Communication", desc: "Dedicated support team for all queries." }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        Global Export
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Global Export Solutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        We proudly supply high-quality Indian food products and FMCG goods to international markets.
                    </motion.p>
                </div>

                {/* Export Product Categories */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-4">
                            Export Product Categories
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {exportCategories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="bg-gradient-to-br from-white to-brand-cream p-10 rounded-[2.5rem] border-2 border-brand-brown/20 text-center hover:border-brand-brown hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-500"
                            >
                                <h3 className="text-xl font-heading font-black text-gray-900">{cat.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Export Services */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div>
                            <h2 className="text-4xl font-heading font-black text-gray-900 mb-4">
                                Our Export Services
                            </h2>
                            <p className="font-body text-lg text-gray-600">
                                Comprehensive export solutions to make your international sourcing experience seamless.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {exportServices.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-gradient-to-br from-white to-brand-cream rounded-[2.5rem] border-2 border-brand-brown/20 hover:border-brand-brown hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-500 group"
                                >
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center mb-6 text-white shadow-lg shadow-brand-brown/30 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-heading font-black text-gray-900 mb-2">{service.title}</h3>
                                    <p className="font-body text-gray-600">{service.desc}</p>
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
                                src={jaggery1} 
                                alt="Export Ready Products" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-4">
                            Why International Buyers Choose Us
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {whyChooseUs.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="p-10 bg-gradient-to-br from-white to-brand-cream rounded-[2.5rem] border-2 border-brand-brown/20 text-center hover:border-brand-brown hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-500 group"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center mb-6 mx-auto text-white shadow-lg shadow-brand-brown/30 group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-heading font-black text-gray-900 mb-2">{item.title}</h3>
                                <p className="font-body text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
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
                            Ready to Import Our Products?
                        </h2>
                        <p className="font-body text-xl text-brand-light/90 mb-10">
                            Get in touch with our export team to discuss your requirements.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-brand-brown px-12 py-5 rounded-[2rem] font-heading font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3"
                            >
                                Request a Quote <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Export;
