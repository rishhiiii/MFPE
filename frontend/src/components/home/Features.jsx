import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Clock, Heart, ShieldCheck, Globe, Star, ChevronRight } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Leaf className="w-10 h-10" />,
            title: "100% Organic",
            desc: "Sourced directly from certified organic farms without any chemicals.",
            color: "text-brand-brown"
        },
        {
            icon: <Award className="w-10 h-10" />,
            title: "Traditional Process",
            desc: "We use age-old methods to preserve the natural nutrients and taste.",
            color: "text-brand-brown"
        },
        {
            icon: <ShieldCheck className="w-10 h-10" />,
            title: "Quality Tested",
            desc: "Every batch undergoes rigorous quality checks before leaving our facility.",
            color: "text-brand-brown"
        },
        {
            icon: <Globe className="w-10 h-10" />,
            title: "Heritage Recipes",
            desc: "Authentic flavors passed down through generations of food artisans.",
            color: "text-brand-brown"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-3xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block bg-brand-cream text-brand-brown px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] mb-4"
                        >
                            Our Standard
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter"
                        >
                            Why Choose <br />
                            <span className="text-brand-brown">Mahaveer Food?</span>
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 font-medium max-w-md leading-relaxed"
                    >
                        We are committed to bringing you the highest quality food products that combine health with the rich taste of tradition.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="mb-6 inline-flex p-5 rounded-2xl bg-gray-50 group-hover:bg-brand-cream group-hover:text-brand-brown transition-all duration-500">
                                {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-brand-brown transition-colors duration-300">{feature.title}</h3>
                            <p className="text-base text-gray-600 font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.desc}</p>
                            
                            <div className="mt-6 flex items-center gap-2 text-brand-brown opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                <span className="font-black text-[10px] uppercase tracking-widest">Learn More</span>
                                <ChevronRight size={14} strokeWidth={3} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
