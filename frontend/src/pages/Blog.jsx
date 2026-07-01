import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen flex items-center justify-center">
            <div className="max-w-lg mx-auto px-6 text-center">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <BookOpen size={32} className="text-brand-brown" />
                </motion.div>
                
                <h1 className="text-4xl font-black text-gray-900 mb-4">
                    Our <span className="text-brand-brown">Blog</span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                    Blog posts coming soon! Stay tuned for health tips, recipes, and updates from Mahaveer Food.
                </p>
                
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-brand-brown text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-darkBrown transition-all mx-auto"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default Blog;
