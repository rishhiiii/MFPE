import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';
import jaggeryNew1 from '../assets/jaggery new 1.jpeg';
import jaggeryNew2 from '../assets/jaggery new 2.jpeg';
import jaggeryNew3 from '../assets/jaggery new 3.jpeg';
import jaggeryNew4 from '../assets/jaggery new 4.jpeg';
import jaggeryNew5 from '../assets/jaggery new 5.jpeg';
import jaggeryNew6 from '../assets/jaggery new 6.jpeg';

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
            image: jaggeryNew1,
            excerpt: "Discover why jaggery is considered a superfood in Ayurveda and how it can improve your daily health."
        },
        {
            id: 2,
            title: "The Art of Making the Perfect Crispy Papad",
            category: "Recipes",
            author: "Chef Rahul",
            date: "May 10, 2026",
            image: jaggeryNew2,
            excerpt: "Learn the secrets behind our hand-rolled papads and how to roast them perfectly every single time."
        },
        {
            id: 3,
            title: "Why Traditional Food is Making a Comeback",
            category: "Tradition",
            author: "Suresh Mehra",
            date: "May 05, 2026",
            image: jaggeryNew3,
            excerpt: "In the world of processed snacks, people are returning to their roots for authentic taste and nutrition."
        },
        {
            id: 4,
            title: "Sustainable Farming: Our Commitment to the Planet",
            category: "Updates",
            author: "Green Team",
            date: "April 28, 2026",
            image: jaggeryNew4,
            excerpt: "How we work with 500+ local farmers to ensure zero-chemical farming for our sugarcane crops."
        },
        {
            id: 5,
            title: "Delicious Jaggery Desserts You Can Make in 10 Mins",
            category: "Recipes",
            author: "Priya Shah",
            date: "April 20, 2026",
            image: jaggeryNew5,
            excerpt: "Quick and healthy dessert recipes that use liquid jaggery as a natural and tasty sweetener."
        },
        {
            id: 6,
            title: "Understanding Different Varieties of Papad in India",
            category: "Tradition",
            author: "Heritage Club",
            date: "April 15, 2026",
            image: jaggeryNew6,
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
                    <h1 className="text-5xl font-black text-gray-900 mb-4">
                        Our <span className="text-brand-brown">Blog</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest health tips, traditional recipes, and news from Mahaveer Food.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full font-medium text-sm transition-all border-2 ${
                                activeCategory === cat 
                                ? 'bg-brand-cream border-brand-cream text-brand-brown' 
                                : 'bg-white border-gray-200 text-gray-600 hover:border-brand-brown hover:text-brand-brown'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <article key={post.id} className="flex flex-col cursor-pointer">
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-brand-brown" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-brand-brown" />
                                    {post.author}
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                            <div className="mt-auto">
                                <button className="flex items-center gap-2 text-brand-brown font-medium text-sm">
                                    Read Article <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
