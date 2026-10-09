import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import jaggery1 from '../../assets/jaggery1.jpeg';
import { API_BASE_URL } from '../../lib/api';
import { optimizeCloudinaryUrl } from '../../lib/image';
import { StarDisplay } from './StarRating';

const getProductImage = (imagePath) => {
    if (!imagePath) return jaggery1;
    if (imagePath.startsWith('http')) return optimizeCloudinaryUrl(imagePath, 500);
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return imagePath;
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();
    
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    const isOutOfStock = !(product.stock > 0);
    const discountPercent = product.mrp > product.price
        ? Math.round((1 - product.price / product.mrp) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ ...product, qty: 1 });
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
        <div 
            className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            {/* Product Image Section */}
            <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                <img
                    src={getProductImage(product.image)}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                />
                
                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm transition-all hover:bg-white hover:shadow-md hover:scale-110"
                >
                    <Heart 
                        size={18} 
                        fill={isInWishlist ? "currentColor" : "none"}
                        className={isInWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"}
                    />
                </button>

                {/* Badges: discount when on offer, and a badge only when out of stock */}
                <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                    {discountPercent > 0 && (
                        <div className="bg-[#8B4513] text-[#FFF8DC] px-2.5 py-1 rounded-full text-xs font-bold shadow-md ring-1 ring-[#FFF8DC]/40">
                            {discountPercent}% OFF
                        </div>
                    )}
                    {isOutOfStock && (
                        <div className="bg-red-600 text-[#fff] px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                            Out of Stock
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info Section */}
            <div className="flex-1 p-4 flex flex-col">
                {/* Category */}
                <div className="mb-2">
                    <span className="text-[10px] font-bold text-brand-brown/60 uppercase tracking-widest">
                        {product.category}
                    </span>
                </div>

                {/* Product Name */}
                <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-brand-brown transition-colors mb-3">
                    {product.name}
                </h3>

                {/* Rating */}
                {product.numReviews > 0 && (
                    <div className="-mt-1 mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                        <StarDisplay value={product.rating} size={13} />
                        <span className="font-semibold text-gray-700">{Number(product.rating).toFixed(1)}</span>
                        <span>({product.numReviews})</span>
                    </div>
                )}

                {/* Feature */}
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex items-center gap-1 bg-brand-cream/60 px-2 py-1 rounded-lg">
                        <CheckCircle2 size={12} className="text-brand-brown" />
                        <span className="text-[10px] font-bold text-gray-700">100% Pure</span>
                    </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-brand-brown">₹{Number(product.price).toFixed(2)}</span>
                        {discountPercent > 0 && (
                            <span className="text-sm text-gray-400 line-through font-bold">₹{Number(product.mrp).toFixed(2)}</span>
                        )}
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        className="bg-brand-brown text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-darkBrown transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart size={16} />
                        {isOutOfStock ? 'Sold' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
