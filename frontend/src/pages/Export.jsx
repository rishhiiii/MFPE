import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, FileText, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery1 from '../assets/jaggery1.jpeg';

const Export = () => {
    const exportCategories = [
        "Organic Foods", "Superfoods", "Spices", 
        "Agricultural Products", "Pulses & Grains", "FMCG Products"
    ];

    const exportServices = [
        { icon: <Package size={24} />, title: "Product Sourcing", desc: "Access to premium Indian products." },
        { icon: <CheckCircle size={24} />, title: "Quality Inspection", desc: "Rigorous quality control." },
        { icon: <FileText size={24} />, title: "Custom Packaging", desc: "Customized packaging solutions." },
        { icon: <Package size={24} />, title: "Private Label", desc: "White-label options available." },
        { icon: <FileText size={24} />, title: "Export Documentation", desc: "Complete documentation support." },
        { icon: <Truck size={24} />, title: "International Logistics", desc: "Seamless shipping and logistics." }
    ];

    const whyChooseUs = [
        { title: "Reliable Quality", desc: "Consistent quality you can trust." },
        { title: "Competitive Pricing", desc: "Best prices for bulk orders." },
        { title: "Flexible Packaging", desc: "Customized packaging options." },
        { title: "Timely Delivery", desc: "On-time delivery guaranteed." },
        { title: "Professional Support", desc: "Dedicated support team." }
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
                        Global Export
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
                        Global Export Solutions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We supply high-quality Indian food products to international markets.
                    </p>
                </div>

                {/* Categories */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center">
                        Export Product Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {exportCategories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:border-brand-brown transition-all"
                            >
                                <h3 className="text-lg font-medium text-gray-900">{cat}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                            Our Export Services
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Comprehensive export solutions to make your international sourcing seamless.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {exportServices.map((service, idx) => (
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
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="rounded-2xl overflow-hidden aspect-square">
                            <img 
                                src={jaggery1} 
                                alt="Export Products" 
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {whyChooseUs.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="p-6 bg-white rounded-2xl border border-gray-100 text-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center mb-4 mx-auto text-brand-brown">
                                    <CheckCircle size={20} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
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
                        Ready to Import Our Products?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Get in touch with our export team to discuss your requirements.
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-brand-brown text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 mx-auto"
                        >
                            Request a Quote <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Export;
