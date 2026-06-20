import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Quote, ChevronRight, ShieldCheck, Truck, RefreshCcw, Globe, CheckCircle2, Leaf, ChevronLeft, ChevronRight as ChevronRightIcon, Building2 } from 'lucide-react';
import Hero from '../components/home/Hero';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';

const getProductImage = (imagePath) => {
    const imageMap = {
        '/src/assets/jaggery1.jpeg': jaggery1,
        '/src/assets/jaggery2.jpeg': jaggery2,
        '/src/assets/jaggery3.jpeg': jaggery3
    };
    return imageMap[imagePath] || imagePath || 'https://via.placeholder.com/400';
};

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setBestSellers(data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const whyChooseUs = [
        { title: "Quality Assurance", desc: "Every product undergoes careful quality checks to ensure purity and consistency.", icon: <ShieldCheck size={24} /> },
        { title: "Natural & Organic", desc: "We focus on sourcing natural, organic, and responsibly produced products.", icon: <Leaf size={24} /> },
        { title: "Global Supply Network", desc: "Serving domestic markets and international clients with reliable supply solutions.", icon: <Globe size={24} /> },
        { title: "Competitive Pricing", desc: "Offering value-driven pricing for retailers, distributors, and bulk buyers.", icon: <CheckCircle2 size={24} /> },
        { title: "Export Expertise", desc: "Supporting international shipments with proper documentation and packaging.", icon: <Truck size={24} /> },
        { title: "Customer-Centric Approach", desc: "Building long-term relationships through trust, transparency, and service excellence.", icon: <RefreshCcw size={24} /> }
    ];

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
            


            {/* About Us Section */}
            <section className="py-20 bg-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-[2rem] overflow-hidden aspect-square shadow-2xl">
                                <img 
                                    src={jaggery1} 
                                    alt="Mahaveer Food Products" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >

                            <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight mb-6">
                                Welcome to <span className="text-brand-brown">Mahaveer Food Products & Exporters</span>
                            </h2>
                            <p className="font-body text-lg text-gray-700 leading-relaxed mb-6">
                                Mahaveer Food Products & Exporters is committed to providing high-quality organic food products, agricultural commodities, spices, superfoods, and FMCG products to customers worldwide.
                            </p>
                            <p className="font-body text-lg text-gray-700 leading-relaxed mb-8">
                                Our goal is to connect consumers, retailers, wholesalers, and international buyers with premium products sourced from trusted producers and processed under strict quality standards.
                            </p>
                            <p className="font-body text-lg text-gray-700 leading-relaxed mb-8">
                                As we continue to grow, we are expanding our product portfolio to include a diverse range of FMCG and health-focused products that meet the needs of modern consumers.
                            </p>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gray-900 text-white px-8 py-4 rounded-[2rem] font-bold text-base shadow-xl hover:bg-gray-800 transition-all duration-500 flex items-center gap-3"
                                >
                                    Learn More <ChevronRight size={18} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-b from-brand-cream to-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >

                        <h2 className="text-4xl md:text-6xl font-heading font-black text-gray-900 mb-4">
                            The <span className="text-brand-brown">Mahaveer Advantage</span>
                        </h2>
                        <p className="text-gray-700 text-lg font-body max-w-2xl mx-auto">
                            Uncompromising quality, ethical sourcing, and customer satisfaction are the pillars of our success
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyChooseUs.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="bg-gradient-to-br from-white to-brand-cream p-10 rounded-[2.5rem] shadow-xl border-2 border-brand-brown/20 hover:border-brand-brown hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-brand-red text-gray-900 flex items-center justify-center mb-6 shadow-lg shadow-brand-red/30 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3 font-heading">{item.title}</h3>
                                <p className="font-body text-gray-700 leading-relaxed text-lg">{item.desc}</p>
                                <div className="mt-6 w-full h-1 bg-gradient-to-r from-brand-red to-brand-light rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Categories Slider Section */}
            <section className="py-20 bg-gradient-to-b from-brand-cream to-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >

                        <h2 className="text-4xl md:text-6xl font-heading font-black text-gray-900 mb-4">
                            Explore Our <span className="text-brand-brown">Premium Range</span>
                        </h2>
                        <p className="text-gray-700 text-lg font-body max-w-2xl mx-auto">
                            Discover our diverse collection of organic products, spices, and FMCG goods
                        </p>
                    </motion.div>
                    
                    {/* Slider Controls */}
                    <div className="flex justify-center items-center gap-4 mb-12">
                        <button 
                            onClick={() => setCurrentCategoryIndex(prev => prev === 0 ? productCategories.length - 1 : prev - 1)}
                            className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <div className="flex gap-2">
                            {productCategories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentCategoryIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentCategoryIndex ? 'bg-brand-red w-8' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={() => setCurrentCategoryIndex(prev => prev === productCategories.length - 1 ? 0 : prev + 1)}
                            className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            <ChevronRightIcon size={28} />
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
                            className="bg-gradient-to-br from-white to-brand-cream p-10 md:p-16 rounded-[3rem] border-2 border-brand-brown/20 shadow-2xl shadow-brand-brown/5"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-heading font-black text-gray-900 mb-6">
                                        {productCategories[currentCategoryIndex].title}
                                    </h3>
                                    <p className="text-gray-700 text-lg font-body mb-8 leading-relaxed">
                                        Premium quality products sourced directly from trusted producers. Experience the authentic taste of India with every purchase.
                                    </p>

                                    <Link to="/shop" className="inline-block mt-10">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gray-900 text-white px-8 py-4 rounded-[2rem] font-bold text-base shadow-xl hover:bg-gray-800 transition-all duration-500 flex items-center gap-2"
                                        >
                                            Explore Products <ArrowRight size={20} />
                                        </motion.button>
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                        <img 
                                            src={[jaggery1, jaggery2, jaggery3, jaggery1, jaggery2, jaggery3][currentCategoryIndex]} 
                                            alt={productCategories[currentCategoryIndex].title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 bg-brand-cream">
                <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>

                            <h2 className="text-3xl md:text-5xl font-heading font-black text-gray-900 tracking-tighter leading-tight">
                                Our <span className="text-brand-brown">Best Sellers</span>
                            </h2>
                        </div>
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all duration-500 shadow-xl"
                            >
                                View All Products <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-brand-red"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {bestSellers.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-full mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-light rounded-[3rem] p-12 md:p-20 text-center shadow-2xl border border-brand-brown/10"
                    >
                        <div className="relative z-10">

                            <h2 className="text-4xl md:text-6xl font-heading font-black text-gray-900 mb-6 leading-tight">
                                Ready to Partner with Us?
                            </h2>
                            <p className="font-body text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                                We welcome inquiries from importers, wholesalers, distributors, retail chains, supermarkets, e-commerce sellers, and food manufacturers.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link to="/export">
                                    <motion.button 
                                        whileHover={{ scale: 1.08, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-gray-900 px-12 py-5 rounded-[2.5rem] font-bold text-xl shadow-2xl transition-all flex items-center gap-3 border-2 border-gray-900"
                                    >
                                        <Globe size={24} />
                                        Export Solutions
                                        <ChevronRight size={22} />
                                    </motion.button>
                                </Link>
                                <Link to="/wholesale">
                                    <motion.button 
                                        whileHover={{ scale: 1.08, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-brand-red text-gray-900 px-12 py-5 rounded-[2.5rem] font-bold text-xl border-3 border-white transition-all flex items-center gap-3"
                                    >
                                        <Building2 size={24} />
                                        Wholesale & Bulk Orders
                                        <ChevronRight size={22} />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
