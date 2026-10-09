import React, { useState, useEffect, useRef } from 'react';
import api, { API_BASE_URL } from '../lib/api';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, ChevronLeft, ChevronRight, CheckCircle2, Leaf, Building2, Globe } from 'lucide-react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';
import jaggeryNew1 from '../assets/jaggery new 1.jpeg';
import featuredJaggery from '../assets/WhatsApp Image 2026-10-09 at 11.10.59 PM.jpeg';
import jaggeryAbout from '../assets/jaggery new image.jpeg';
import categorySuperfoods from '../assets/WhatsApp Image 2026-10-06 at 10.23.41 PM.jpeg';
import categorySpices from '../assets/WhatsApp Image 2026-10-06 at 10.58.52 PM.jpeg';
import categorySweeteners from '../assets/WhatsApp Image 2026-10-06 at 10.58.14 PM.jpeg';
import categoryPulsesGrains from '../assets/WhatsApp Image 2026-10-06 at 10.54.16 PM.jpeg';
import categoryDryFruits from '../assets/WhatsApp Image 2026-10-06 at 10.48.39 PM.jpeg';
import categoryFmcg from '../assets/fmcg new.jpeg';

const getProductImage = (imagePath) => {
    if (!imagePath) return jaggery1;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    const imageMap = {
        '/src/assets/jaggery1.jpeg': jaggery1,
        '/src/assets/jaggery2.jpeg': jaggery2,
        '/src/assets/jaggery3.jpeg': jaggery3
    };
    return imageMap[imagePath] || imagePath;
};

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products');
                setBestSellers(data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const productCategories = [
        { title: "Organic Superfoods", items: ["Chia Seeds", "Flax Seeds", "Pumpkin Seeds", "Sunflower Seeds", "Moringa Powder", "Quinoa"] },
        { title: "Spices & Seasonings", items: ["Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Cumin Seeds", "Black Pepper", "Garam Masala"] },
        { title: "Natural Sweeteners", items: ["Jaggery Powder", "Organic Jaggery", "Cane Jaggery", "Palm Jaggery"] },
        { title: "Pulses & Grains", items: ["Toor Dal", "Moong Dal", "Masoor Dal", "Chana Dal", "Wheat", "Rice"] },
        { title: "Dry Fruits & Nuts", items: ["Almonds", "Cashews", "Raisins", "Pistachios"] },
        { title: "FMCG Products", items: ["Packaged Food Products", "Health Foods", "Grocery Essentials", "Daily Consumption Products", "Organic Lifestyle Products"] }
    ];

    return (
        <div className="bg-brand-cream">
            <Hero />
            <Features />

            {/* Featured Product Section */}
            <section className="py-12 bg-gradient-to-br from-brand-cream to-white">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[1312/1199] rounded-2xl overflow-hidden border-4 border-white">
                                <img
                                    src={featuredJaggery}
                                    alt="Mahaveer Food 100% pure sugarcane cane jaggery (gud) pack"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-5"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block bg-brand-cream text-brand-brown px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider"
                            >
                                Our Featured Product
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.1]">
                                Premium Cane Jaggery
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Our Cane Jaggery is made from fresh sugarcane juice and processed using traditional Jain methods.
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                {['100% Organic & Natural', 'No Harmful Chemicals', 'No Added Sugar', 'Natural Color & Authentic Taste', 'Rich in Essential Minerals', 'Hygienically Processed & Packed'].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-brown flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-brand-brown text-white px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-darkBrown transition-all"
                                >
                                    Explore Products
                                    <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 bg-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden">
                                <img
                                    src={jaggeryAbout}
                                    alt="Mahaveer Food Products — Premium Cane Jaggery packaging"
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block bg-brand-cream text-brand-brown px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider mb-5"
                            >
                                About Us
                            </motion.div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                                Welcome to <span className="text-brand-brown">Mahaveer Food Products & Exporters</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                                Since 1994, Mahaveer Food Products & Exporters has been committed to delivering pure, natural, and authentic food products prepared using traditional Jain methods. Our Premium Cane Jaggery is crafted from carefully selected sugarcane and processed with time-honored techniques that preserve its natural taste, color, and nutritional value.
                            </p>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                                At Mahaveer Food Products & Exporters, purity is not just a promise—it's our tradition.
                            </p>

                            <div className="text-center pt-5 border-t border-gray-200">
                                <p className="text-lg font-semibold text-brand-brown italic">
                                    "From Nature to Your Home, Pure Goodness Since 1994."
                                </p>
                            </div>

                            <Link to="/about" className="inline-block mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-brand-brown text-white px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-darkBrown transition-all"
                                >
                                    Learn More
                                    <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Categories Slider Section */}
            <section className="py-6 bg-gradient-to-br from-white to-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            Explore Our <span className="text-brand-brown">Premium Range</span>
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
                            Discover our diverse collection of organic products, spices, and FMCG goods
                        </p>
                    </motion.div>
                    
                    {/* Slider Controls */}
                    <div className="flex justify-center items-center gap-3 mb-5">
                        <button 
                            onClick={() => setCurrentCategoryIndex(prev => prev === 0 ? productCategories.length - 1 : prev - 1)}
                            className="w-10 h-10 bg-brand-brown text-white rounded-xl flex items-center justify-center hover:bg-brand-darkBrown transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                            {productCategories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentCategoryIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentCategoryIndex ? 'bg-brand-red w-6' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={() => setCurrentCategoryIndex(prev => prev === productCategories.length - 1 ? 0 : prev + 1)}
                            className="w-10 h-10 bg-brand-brown text-white rounded-xl flex items-center justify-center hover:bg-brand-darkBrown transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    
                    {/* Slider Content */}
                    <div className="relative overflow-hidden" ref={sliderRef}>
                        <motion.div
                            key={currentCategoryIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-gradient-to-br from-white to-brand-cream p-4 md:p-6 rounded-2xl border-2 border-brand-brown/20"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                                        {productCategories[currentCategoryIndex].title}
                                    </h3>
                                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                                        Premium quality products sourced directly from trusted producers. Experience the authentic taste of India with every purchase.
                                    </p>

                                    <ul className="grid grid-cols-2 gap-2 mb-3">
                                        {productCategories[currentCategoryIndex].items.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-brand-brown flex-shrink-0" />
                                                <span className="text-gray-700 text-xs">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/shop" className="inline-block">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-brand-brown text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-darkBrown transition-all text-sm"
                                        >
                                            Explore Products
                                            <ArrowRight size={14} />
                                        </motion.button>
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white">
                                    <img
                                        src={[categorySuperfoods, categorySpices, categorySweeteners, categoryPulsesGrains, categoryDryFruits, categoryFmcg][currentCategoryIndex]}
                                        alt={productCategories[currentCategoryIndex].title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Commitment Section */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block bg-brand-cream text-brand-brown px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider mb-5"
                        >
                            Our Promise
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            Our <span className="text-brand-brown">Commitment</span>
                        </h2>
                        <div className="relative bg-gradient-to-br from-brand-cream/50 to-white rounded-2xl p-6 md:p-10 border border-brand-brown/10">
                            <Quote className="w-8 h-8 text-brand-brown mx-auto mb-5" />
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed italic font-semibold">
                                "Our mission is to provide healthy, natural, and trustworthy food products while preserving traditional values and sustainable practices."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-12 bg-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-3">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tighter leading-[1.1]">
                                Our <span className="text-brand-brown">Best Sellers</span>
                            </h2>
                        </div>
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-brown text-white font-semibold hover:bg-brand-darkBrown transition-all"
                            >
                                View All Products
                                <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-brand-brown"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {bestSellers.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-cream rounded-2xl p-8 md:p-12 text-center border border-brand-brown/10"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-[1.1]">
                            Ready to Partner with Us?
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            We welcome inquiries from importers, wholesalers, distributors, retail chains, supermarkets, e-commerce sellers, and food manufacturers.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/export">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white text-brand-brown px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 border-2 border-brand-brown hover:bg-brand-cream transition-all"
                                >
                                    <Globe size={20} />
                                    Export Solutions
                                    <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                            <Link to="/wholesale">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-brand-brown text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-brand-darkBrown transition-all"
                                >
                                    <Building2 size={20} />
                                    Wholesale & Bulk Orders
                                    <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
