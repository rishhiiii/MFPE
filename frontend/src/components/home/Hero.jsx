import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggeryHero from '../../assets/jaggery hero new.jpeg';

const Hero = () => {
    return (
        <section className="hero-section relative h-screen min-h-[750px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={jaggeryHero} 
                    alt="Organic Jaggery" 
                    className="w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10"></div>
            </div>

            <div className="max-w-full  px-6 sm:px-12 lg:px-20 relative z-10 pt-32">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 bg-brand-cream text-brand-brown px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} className="text-brand-brown" />
                        Pure · Organic · Trusted Since 1994
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5"
                    >
                        Premium Cane Jaggery &amp; <br />
                        <span className="text-brand-cream">Natural Food Products</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="text-base sm:text-lg text-white/85 leading-relaxed mb-8"
                    >
                        Experience the authentic taste of nature with Mahaveer Food Products &amp; Exporters. Since 1994, we have been dedicated to producing premium-quality, chemical-free, and naturally processed food products using traditional Jain methods.
                    </motion.p>
                    
                    {/* Feature Tags */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="flex flex-wrap gap-2 sm:gap-3 mb-10"
                    >
                        {['100% Natural', 'No Harmful Chemicals', 'No Added Sugar', 'Traditional Methods'].map((tag, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 sm:px-5 py-2.5 rounded-full border border-white/25 hover:bg-white/25 transition-all">
                                <div className="w-2 h-2 bg-brand-cream rounded-full"></div>
                                <span className="text-xs sm:text-sm font-semibold text-white">{tag}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                        className="flex flex-wrap gap-3 sm:gap-4 mb-12"
                    >
                        <Link to="/shop">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-brand-cream text-brand-brown px-8 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg hover:shadow-xl"
                            >
                                Shop Now
                                <ChevronRight size={18} />
                            </motion.button>
                        </Link>
                        
                        <Link to="/contact">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base sm:text-lg text-white bg-transparent border-2 border-white/40 hover:bg-white/10 transition-all"
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
                        className="pt-6 grid grid-cols-3 gap-6 max-w-md"
                    >
                        <div className="text-left">
                            <motion.h4 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                className="text-3xl sm:text-4xl font-bold text-brand-cream mb-1"
                            >
                                30+
                            </motion.h4>
                            <p className="text-xs sm:text-sm font-semibold text-white/75 uppercase tracking-wider">Years Experience</p>
                        </div>
                        <div className="text-left">
                            <motion.h4 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                                className="text-3xl sm:text-4xl font-bold text-brand-cream mb-1"
                            >
                                50+
                            </motion.h4>
                            <p className="text-xs sm:text-sm font-semibold text-white/75 uppercase tracking-wider">Products</p>
                        </div>
                        <div className="text-left">
                            <motion.h4 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.6 }}
                                className="text-3xl sm:text-4xl font-bold text-brand-cream mb-1"
                            >
                                100%
                            </motion.h4>
                            <p className="text-xs sm:text-sm font-semibold text-white/75 uppercase tracking-wider">Pure Quality</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
