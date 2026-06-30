import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Clock, Heart, ShieldCheck, Globe, Star, CheckCircle2 } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Leaf size={24} />,
            title: "100% Organic & Natural",
            desc: "Made from carefully selected sugarcane using traditional methods without harmful chemicals.",
        },
        {
            icon: <Award size={24} />,
            title: "Since 1994",
            desc: "Over 30 years of experience in delivering trusted, high-quality food products.",
        },
        {
            icon: <Clock size={24} />,
            title: "Traditional Jain Processing",
            desc: "Prepared following time-honored Jain methods that preserve purity, authenticity, and natural goodness.",
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "No Harmful Chemicals",
            desc: "Free from artificial chemicals, preservatives, and synthetic additives.",
        },
        {
            icon: <Heart size={24} />,
            title: "No Added Sugar",
            desc: "Naturally sweet with no refined sugar added.",
        },
        {
            icon: <Star size={24} />,
            title: "Natural Color & Authentic Taste",
            desc: "Retains the original color, aroma, and rich taste of pure sugarcane jaggery.",
        },
        {
            icon: <Globe size={24} />,
            title: "Rich in Essential Minerals",
            desc: "A natural source of iron and other essential nutrients that support a healthy lifestyle.",
        },
        {
            icon: <Award size={24} />,
            title: "Hygienically Processed & Packed",
            desc: "Manufactured and packed under strict quality and hygiene standards.",
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Premium Quality Assurance",
            desc: "Every batch undergoes careful quality checks to ensure consistency and excellence.",
        },
        {
            icon: <Globe size={24} />,
            title: "Trusted by Customers",
            desc: "Committed to providing pure, wholesome, and natural food products to families across India and beyond.",
        }
    ];

    return (
        <section className="py-10 bg-white">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-8">
                    <div className="max-w-3xl">

                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.1] tracking-tighter"
                        >
                            Why Choose <span className="text-brand-brown">Mahaveer Food?</span>
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed"
                    >
                        We are committed to bringing you the highest quality food products that combine health with the rich taste of tradition.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="mb-3 inline-flex p-3 rounded-xl bg-brand-cream text-brand-brown">
                                {React.cloneElement(feature.icon, { className: "w-5 h-5" })}
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-brand-brown transition-colors">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
