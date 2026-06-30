import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import jaggery1 from '../../assets/jaggery1.jpeg';

const getProductImage = (imagePath) => {
    if (!imagePath) return jaggery1;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();
    
    const isInWishlist = wishlistItems.some(item => item._id === product._id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        if (isInWishlist) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="group cursor-pointer">
            <div 
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-gray-100"
                onClick={() => navigate(`/product/${product._id}`)}
            >
                <img 
                    src={getProductImage(product.image)} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full transition-all hover:bg-gray-50"
                >
                    <Heart 
                        size={20} 
                        fill={isInWishlist ? "currentColor" : "none"}
                        className={isInWishlist ? "text-brand-red" : "text-gray-400 hover:text-brand-red"}
                    />
                </button>

                {/* Add to Cart Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-brand-cream text-brand-brown py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-light transition-all"
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-xl font-black text-brand-brown">₹{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
