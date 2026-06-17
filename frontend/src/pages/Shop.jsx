import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Grid, List, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Featured');

    const categories = ['All', 'Superfoods', 'Spices', 'Natural Sweeteners', 'Pulses & Grains', 'Dry Fruits', 'FMCG Products'];
    const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = [...products];
        
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        
        if (sortBy === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Newest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, sortBy, products]);

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                {/* Page Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col lg:flex-row lg:items-end justify-between gap-12"
                    >
                        <div className="max-w-3xl">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block bg-brand-cream text-brand-brown px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] mb-6"
                            >
                                Shop All
                            </motion.div>
                            <h1 className="text-6xl md:text-9xl font-black text-gray-900 tracking-tighter leading-[0.8]">
                                Premium <br />
                                <span className="text-brand-brown">Collection</span>
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 font-medium max-w-sm leading-relaxed">
                            Experience the true essence of Indian tradition with our carefully curated selection of organic products.
                        </p>
                    </motion.div>
                </div>

                {/* Toolbar */}
                <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-xl py-6 mb-16 border-y border-brand-brown/10">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        {/* Search Bar */}
                        <div className="flex-grow relative group w-full lg:w-auto">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors" size={24} />
                            <input 
                                type="text" 
                                placeholder="Search our catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-5 bg-brand-cream border-none rounded-3xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-gray-900 transition-all"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative min-w-[240px] w-full lg:w-auto">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none bg-brand-cream pl-8 pr-16 py-5 rounded-3xl font-black text-sm uppercase tracking-widest text-gray-900 focus:ring-2 focus:ring-brand-red outline-none cursor-pointer border-none"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 border-2 ${
                                activeCategory === cat 
                                ? 'bg-brand-red border-brand-red text-white shadow-2xl shadow-brand-light' 
                                : 'bg-white border-brand-brown/10 text-gray-400 hover:border-gray-900 hover:text-gray-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-60">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 border-4 border-brand-light border-t-brand-red rounded-full"
                        />
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-60 bg-brand-cream rounded-[4rem]"
                            >
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-gray-100 text-gray-200">
                                    <X size={60} strokeWidth={3} />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Nothing Found</h3>
                                <p className="text-xl text-gray-600 font-medium">Try different keywords or filters.</p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
                                <AnimatePresence mode='popLayout'>
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
