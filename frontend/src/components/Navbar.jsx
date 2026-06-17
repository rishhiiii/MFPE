import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-md p-4 sticky top-0 z-50 flex justify-between items-center"
        >
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-brown">
                <Store size={32} />
                <span>Mahaveer Food Products</span>
            </Link>
            
            <div className="flex gap-6 items-center">
                <Link to="/" className="hover:text-brand-brown transition-colors">Products</Link>
                <Link to="/cart" className="relative hover:text-brand-brown transition-colors">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-brand-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        >
                            {cartCount}
                        </motion.span>
                    )}
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
