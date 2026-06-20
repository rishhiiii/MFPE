import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Heart, Star, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import jaggery1 from '../../assets/jaggery1.jpeg';
import jaggery2 from '../../assets/jaggery2.jpeg';
import jaggery3 from '../../assets/jaggery3.jpeg';

const getProductImage = (imagePath) => {
    const imageMap = {
        '/src/assets/jaggery1.jpeg': jaggery1,
        '/src/assets/jaggery2.jpeg': jaggery2,
        '/src/assets/jaggery3.jpeg': jaggery3
    };
    return imageMap[imagePath] || imagePath || 'https://via.placeholder.com/400';
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-cream">
                <img 
                    src={getProductImage(product.image)} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                
                {/* Floating Action Buttons */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="bg-brand-red text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-brand-darkRed transition-all active:scale-95"
                        >
                            <Plus size={16} strokeWidth={3} />
                            Add to Bag
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-white text-brand-brown p-3 rounded-full shadow-xl hover:bg-brand-red hover:text-white transition-all active:scale-95"
                        >
                            <Heart size={18} />
                        </button>
                </div>


            </div>

            <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand-brown transition-colors duration-300 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1">
                        <Star size={12} className="text-gray-900" fill="currentColor" />
                        <span className="text-xs font-bold text-gray-900">4.8</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                    <span className="text-sm font-medium text-gray-400 line-through">₹{product.price + 50}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
