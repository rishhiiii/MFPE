import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { TEST_MODE } from '../lib/testMode';
import dummyProducts from '../data/dummyProducts';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams] = useSearchParams();

    const categories = ['All', 'Superfoods', 'Spices', 'Natural Sweeteners', 'Pulses & Grains', 'Dry Fruits', 'FMCG Products'];

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl && categories.includes(categoryFromUrl)) {
            setActiveCategory(categoryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (TEST_MODE) {
                setProducts(dummyProducts);
                setFilteredProducts(dummyProducts);
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.get('/api/products');
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
        
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    return (
        <div className="pt-28 pb-20 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Page Header */}
                <div className="text-center mb-10 pt-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Our <span className="text-brand-brown">Collection</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our premium selection of organic products
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red outline-none font-medium"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all border-2 ${
                                activeCategory === cat 
                                ? 'bg-brand-cream border-brand-cream text-brand-brown' 
                                : 'bg-white border-gray-200 text-gray-600 hover:border-brand-brown hover:text-brand-brown'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="w-10 h-10 border-4 border-brand-light border-t-brand-red rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">No products found</h3>
                                <p className="text-gray-600 text-sm">Try different keywords or categories</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
