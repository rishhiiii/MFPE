import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggeryHero from '../../assets/jaggery hero.jpg';

const Hero = () => {
    return (
        <section className="hero-section relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={jaggeryHero} 
                    alt="Organic Jaggery" 
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 left-10 w-20 h-20 bg-brand-cream/30 rounded-full blur-xl z-0"
            ></motion.div>
            <motion.div 
                animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-32 right-10 w-24 h-24 bg-brand-brown/20 rounded-full blur-xl z-0"
            ></motion.div>

            <div className="w-full max-w-full mx-auto px-6 sm:px-12 lg:px-20 relative z-10 pt-32">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 bg-brand-cream/90 backdrop-blur-sm text-brand-brown px-6 py-2.5 rounded-full font-medium text-sm uppercase tracking-widest mb-8"
                    >
                        <Sparkles size={16} className="text-brand-brown" />
                        PURE. ORGANIC. TRUSTED SINCE 1994.
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto"
                    >
                        Premium Cane Jaggery &amp; <br />
                        <span className="text-brand-cream">Natural Food Products</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto"
                    >
                        Experience the authentic taste of nature with Mahaveer Food Products &amp; Exporters. Since 1994, we have been dedicated to producing premium-quality, chemical-free, and naturally processed food products using traditional Jain methods.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="flex flex-wrap gap-3 justify-center mb-12"
                    >
                        {['100% Natural', 'No Harmful Chemicals', 'No Added Sugar', 'Traditional Methods'].map((tag, idx) => (
                            <div key={idx} className="bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full font-medium text-white border border-white/30">
                                {tag}
                            </div>
                        ))}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                        className="flex flex-wrap gap-4 justify-center mb-16"
                    >
                        <Link to="/shop">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-brand-cream text-brand-brown px-10 py-5 rounded-2xl font-medium text-lg flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg"
                            >
                                Shop Now
                                <ChevronRight size={20} />
                            </motion.button>
                        </Link>
                        
                        <Link to="/contact">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-10 py-5 rounded-2xl font-medium text-lg text-white bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="pt-8 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                    >
                        <div className="text-center">
                            <motion.h4 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream mb-2"
                            >
                                30+
                            </motion.h4>
                            <p className="text-sm font-medium text-white/80 uppercase tracking-widest">Years Experience</p>
                        </div>
                        <div className="text-center">
                            <motion.h4 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream mb-2"
                            >
                                50+
                            </motion.h4>
                            <p className="text-sm font-medium text-white/80 uppercase tracking-widest">Products</p>
                        </div>
                        <div className="text-center">
                            <motion.h4 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.6 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream mb-2"
                            >
                                100%
                            </motion.h4>
                            <p className="text-sm font-medium text-white/80 uppercase tracking-widest">Pure Quality</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
