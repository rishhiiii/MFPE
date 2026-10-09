import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart();

  return (
    <div className="pt-40 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4">
            Your <span className="text-brand-brown">Wishlist</span>
          </h1>
          <p className="font-body text-xl text-gray-600">
            {wishlistItems.length} items in your wishlist
          </p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart size={80} className="mx-auto text-brand-brown/30 mb-8" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-xl text-gray-600 mb-10">
              Explore our products and add your favorites!
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-brown text-white px-12 py-5 rounded-[2rem] font-bold text-lg shadow-xl hover:bg-brand-darkBrown transition-all duration-500 flex items-center gap-3 mx-auto"
              >
                Shop Now <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <div key={product._id} className="relative group">
                <ProductCard product={product} />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-brand-brown text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-darkBrown transition-all"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromWishlist(product._id)}
                    className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-red-100 transition-all"
                  >
                    <Heart size={18} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
