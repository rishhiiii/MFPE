import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Health', 'Recipes', 'Tradition', 'Updates'];

    const posts = [
        {
            id: 1,
            title: "5 Amazing Health Benefits of Organic Jaggery",
            category: "Health",
            author: "Dr. Anjali",
            date: "May 15, 2026",
            image: "https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&q=80&w=600",
            excerpt: "Discover why jaggery is considered a superfood in Ayurveda and how it can improve your daily health."
        },
        {
            id: 2,
            title: "The Art of Making the Perfect Crispy Papad",
            category: "Recipes",
            author: "Chef Rahul",
            date: "May 10, 2026",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
            excerpt: "Learn the secrets behind our hand-rolled papads and how to roast them perfectly every single time."
        },
        {
            id: 3,
            title: "Why Traditional Food is Making a Comeback",
            category: "Tradition",
            author: "Suresh Mehra",
            date: "May 05, 2026",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
            excerpt: "In the world of processed snacks, people are returning to their roots for authentic taste and nutrition."
        },
        {
            id: 4,
            title: "Sustainable Farming: Our Commitment to the Planet",
            category: "Updates",
            author: "Green Team",
            date: "April 28, 2026",
            image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=600",
            excerpt: "How we work with 500+ local farmers to ensure zero-chemical farming for our sugarcane crops."
        },
        {
            id: 5,
            title: "Delicious Jaggery Desserts You Can Make in 10 Mins",
            category: "Recipes",
            author: "Priya Shah",
            date: "April 20, 2026",
            image: "https://images.unsplash.com/photo-1584144356518-910979339655?auto=format&fit=crop&q=80&w=600",
            excerpt: "Quick and healthy dessert recipes that use liquid jaggery as a natural and tasty sweetener."
        },
        {
            id: 6,
            title: "Understanding Different Varieties of Papad in India",
            category: "Tradition",
            author: "Heritage Club",
            date: "April 15, 2026",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
            excerpt: "From North to South, explore the diverse textures and flavors of Indian papads and their history."
        }
    ];

    const filteredPosts = activeCategory === 'All' 
        ? posts 
        : posts.filter(post => post.category === activeCategory);

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-brand-brown text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest mb-6 shadow-lg shadow-brand-brown/30"
                    >
                        Insights & Recipes
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8"
                    >
                        Our <span className="text-brand-brown">Blog</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Stay updated with the latest health tips, traditional recipes, and news from the Mahaveer Food community.
                    </p>
                </div>

                {/* Search & Categories */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 border-2 ${
                                    activeCategory === cat 
                                    ? 'bg-brand-brown border-brand-brown text-white shadow-xl shadow-brand-light' 
                                    : 'bg-white border-brand-brown/10 text-gray-600 hover:border-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            className="w-full pl-14 pr-6 py-4 bg-brand-cream border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-gray-900"
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode='popLayout'>
                        {filteredPosts.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl shadow-gray-100">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                </div>
                                
                                <div className="flex items-center gap-6 mb-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-brown" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-brand-brown" />
                                        {post.author}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-brown transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 font-medium mb-8 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-50">
                                    <button className="flex items-center gap-2 text-brand-brown font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                                        Read Article <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-24 flex justify-center gap-4">
                    {[1, 2, 3].map(num => (
                        <button 
                            key={num}
                            className={`w-14 h-14 rounded-2xl font-black flex items-center justify-center transition-all ${
                                num === 1 ? 'bg-brand-red text-white shadow-xl shadow-brand-light' : 'bg-brand-cream text-gray-400 hover:bg-brand-red hover:text-white'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
