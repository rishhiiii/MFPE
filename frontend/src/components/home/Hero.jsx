import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggeryImage from '../../assets/jaggery3.jpeg';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 45]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-cream">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-brand-cream/85 z-10" />
                <img 
                    src={jaggeryImage}
                    alt="Jaggery Background"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20 relative z-20 text-center pt-20">
                <div className="max-w-5xl mx-auto space-y-8">
                    
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 bg-brand-brown/20 border border-brand-brown/30 text-brand-brown px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-[0.25em] mx-auto backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-brown"></span>
                            </span>
                            Premium Organic & FMCG Products from India
                        </div>
                        
                        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                            Delivering Quality, Purity, and Trust
                        </h1>
                        
                        <p className="font-body text-base md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed backdrop-blur-[1px]">
                            Through a wide range of organic foods, spices, superfoods, and FMCG products for domestic and international markets.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-brand-brown text-sm md:text-base font-bold uppercase tracking-wider">
                            <span>Natural</span>
                            <span>•</span>
                            <span>Healthy</span>
                            <span>•</span>
                            <span>Sustainable</span>
                            <span>•</span>
                            <span>Export Ready</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Link to="/shop">
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-brand-brown text-white px-10 py-4.5 rounded-[2rem] font-bold text-base shadow-2xl shadow-brand-brown/30 flex items-center gap-3 hover:bg-brand-darkBrown transition-all duration-500 group"
                            >
                                Explore Products
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        
                        <Link to="/contact">
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-10 py-4.5 rounded-[2rem] font-bold text-base text-gray-900 hover:bg-brand-brown/20 transition-all duration-300 backdrop-blur-md border border-brand-brown/30"
                            >
                                Request a Quote
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-12 grid grid-cols-3 gap-6 border-t border-brand-brown/10 max-w-2xl mx-auto"
                    >
                        <div className="text-center">
                            <h4 className="text-2xl md:text-3xl font-heading font-black text-gray-900">25+</h4>
                            <p className="text-[9px] md:text-xs font-bold text-brand-brown uppercase tracking-widest mt-1">Years Experience</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-2xl md:text-3xl font-heading font-black text-gray-900">50+</h4>
                            <p className="text-[9px] md:text-xs font-bold text-brand-brown uppercase tracking-widest mt-1">Products</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-2xl md:text-3xl font-heading font-black text-gray-900">100%</h4>
                            <p className="text-[9px] md:text-xs font-bold text-brand-brown uppercase tracking-widest mt-1">Pure Quality</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-brand-brown/40 rounded-full flex justify-center p-1.5">
                    <div className="w-1.5 h-3 bg-brand-brown rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
