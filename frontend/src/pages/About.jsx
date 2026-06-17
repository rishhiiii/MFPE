import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Award, Globe, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggery3 from '../assets/jaggery3.jpeg';

const About = () => {
    const coreValues = [
        { icon: <Leaf className="w-8 h-8" />, title: "Integrity", desc: "We operate with honesty and transparency in every business relationship." },
        { icon: <Award className="w-8 h-8" />, title: "Quality", desc: "Uncompromising standards ensure every product meets our premium specifications." },
        { icon: <Heart className="w-8 h-8" />, title: "Sustainability", desc: "Committed to eco-friendly practices and sustainable sourcing." },
        { icon: <Target className="w-8 h-8" />, title: "Innovation", desc: "Continuously improving our products and processes." },
        { icon: <Users className="w-8 h-8" />, title: "Customer Satisfaction", desc: "Dedicated to exceeding customer expectations." },
        { icon: <Globe className="w-8 h-8" />, title: "Continuous Growth", desc: "Expanding our reach and product portfolio consistently." }
    ];

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        About Us
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-xl text-gray-600 leading-relaxed"
                    >
                        Mahaveer Food Products & Exporters was established with a vision to provide authentic, high-quality food products to customers across the globe.
                    </motion.p>
                </div>

                {/* Our Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl"
                    >
                        <img 
                            src={jaggery3} 
                            alt="Our Story" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-heading font-black text-gray-900 tracking-tight">Our Story</h2>
                        <p className="font-body text-lg text-gray-600 leading-relaxed">
                            Mahaveer Food Products & Exporters was established with a vision to provide authentic, high-quality food products to customers across the globe.
                        </p>
                        <p className="font-body text-lg text-gray-600 leading-relaxed">
                            We work closely with farmers, suppliers, and manufacturing partners to ensure that every product meets the highest standards of quality and safety.
                        </p>
                        <p className="font-body text-lg text-gray-600 leading-relaxed">
                            Our commitment to sustainability, ethical sourcing, and customer satisfaction drives everything we do.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-brand-cream border-2 border-brand-brown/20 shadow-xl"
                    >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center mb-8 text-white shadow-lg shadow-brand-brown/30">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-gray-900 mb-4">Our Mission</h3>
                        <p className="font-body text-lg text-gray-600 leading-relaxed">
                            To deliver premium-quality organic and FMCG products while promoting healthy lifestyles, sustainable sourcing, and long-term customer relationships.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-brand-cream border-2 border-brand-brown/20 shadow-xl"
                    >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center mb-8 text-white shadow-lg shadow-brand-brown/30">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-gray-900 mb-4">Our Vision</h3>
                        <p className="font-body text-lg text-gray-600 leading-relaxed">
                            To become a globally recognized brand known for quality, trust, innovation, and excellence in organic and FMCG products.
                        </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-brand-cream border-2 border-brand-brown/20 hover:border-brand-brown hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 group"
                            >
                                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-brand-red to-brand-darkBrown flex items-center justify-center mb-6 text-white shadow-lg shadow-brand-brown/30 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-heading font-black text-gray-900 mb-3">{value.title}</h3>
                                <p className="font-body text-gray-600 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-brown rounded-[2.5rem] p-12 md:p-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">
                            Ready to Explore Our Products?
                        </h2>
                        <p className="font-body text-xl text-brand-light/90 mb-10 max-w-2xl mx-auto">
                            Discover our full range of organic and FMCG products.
                        </p>
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-brand-brown px-10 py-4 rounded-[2rem] font-bold text-lg shadow-2xl transition-all"
                            >
                                Browse Products
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
