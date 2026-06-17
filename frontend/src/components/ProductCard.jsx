import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
            <img 
                src={product.image || 'https://via.placeholder.com/300'} 
                alt={product.name} 
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex justify-between items-center">
                    <span className="text-lg font-bold text-brand-brown">₹{product.price}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-brand-brown text-white p-2 rounded-full hover:bg-brand-darkBrown transition-colors"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
