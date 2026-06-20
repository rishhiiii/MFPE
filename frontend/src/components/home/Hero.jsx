import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronRight, Star, Truck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 45]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-brand-cream">
            {/* Background Video with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-brand-cream/80 to-gray-50 z-10" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-spices-in-a-bowl-3960-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-brand-brown/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl z-0"></div>

            <div className="w-full max-w-full mx-auto px-6 sm:px-12 lg:px-20 relative z-20 pt-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                                Delivering <span className="text-gray-900">Quality</span>, Purity, and Trust
                            </h1>
                            
                            <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed">
                                Through a wide range of organic foods, spices, superfoods, and FMCG products for domestic and international markets.
                            </p>
                        </div>

                        {/* Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/shop">
                                <motion.button 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-base shadow-2xl shadow-gray-900/30 flex items-center gap-3 hover:bg-gray-800 transition-all duration-500 group"
                                >
                                    Explore Products
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            
                            <Link to="/contact">
                                <motion.button 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-base text-gray-900 bg-white/80 backdrop-blur-sm border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                >
                                    Request a Quote
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="pt-8 grid grid-cols-3 gap-6 border-t border-gray-200"
                        >
                            <div className="text-center">
                                <h4 className="text-3xl md:text-4xl font-heading font-black text-gray-900">25+</h4>
                                <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mt-1">Years Experience</p>
                            </div>
                            <div className="text-center">
                                <h4 className="text-3xl md:text-4xl font-heading font-black text-gray-900">50+</h4>
                                <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mt-1">Products</p>
                            </div>
                            <div className="text-center">
                                <h4 className="text-3xl md:text-4xl font-heading font-black text-gray-900">100%</h4>
                                <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mt-1">Pure Quality</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Card */}
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
                                    
                                    <div className="space-y-4">
                                        {[
                                            { icon: <Leaf size={24} />, title: '100% Organic', desc: 'All products sourced from certified organic farms' },
                                            { icon: <Truck size={24} />, title: 'Global Export', desc: 'Shipping to 50+ countries worldwide' },
                                            { icon: <Star size={24} />, title: 'Premium Quality', desc: 'Rigorous quality control standards' },
                                        ].map((item, idx) => (
                                            <motion.div 
                                                key={idx}
                                                whileHover={{ x: 5 }}
                                                className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-brand-cream transition-colors"
                                            >
                                                <div className="p-3 bg-gray-100 text-gray-900 rounded-xl">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>


                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-8 h-12 border-2 border-gray-900/30 rounded-full flex justify-center p-2">
                    <motion.div 
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-3 bg-gray-900 rounded-full" 
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
