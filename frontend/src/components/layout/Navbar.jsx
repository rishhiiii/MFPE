import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import mfpeLogo from '../../assets/mfpelogo.jpeg';

const Navbar = () => {
    const { cartItems } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Export', path: '/export' },
        { name: 'Wholesale', path: '/wholesale' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                isScrolled 
                ? 'bg-white/80 backdrop-blur-xl border-b border-brand-brown/10 py-3 shadow-sm' 
                : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-3">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-0 rounded-full overflow-hidden transition-all duration-300 ${
                            isScrolled 
                            ? 'bg-white shadow-lg shadow-brand-light' 
                            : 'bg-white shadow-lg shadow-brand-light'
                        }`}
                    >
                        <img src={mfpeLogo} alt="Mahaveer Food Products" className="w-12 h-12 object-cover rounded-full" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className={`text-xl font-black tracking-tight leading-none transition-colors duration-300 text-gray-900`}>
                            MAHAVEER<span className="text-brand-brown">FOOD</span>
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 text-gray-600`}>Premium Quality</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            className="relative px-5 py-2 group"
                        >
                            <span className={`text-sm font-bold transition-colors duration-300 ${
                                location.pathname === link.path 
                                ? 'text-brand-brown' 
                                : 'text-gray-700 group-hover:text-gray-900'
                            }`}>
                                {link.name}
                            </span>
                            {location.pathname === link.path && (
                                <motion.div 
                                    layoutId="navUnderline"
                                    className="absolute bottom-0 left-5 right-5 h-0.5 bg-brand-brown rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className={`hidden sm:flex p-2.5 rounded-full transition-all duration-300 text-gray-700 hover:bg-brand-cream hover:text-gray-900`}>
                        <Search size={20} />
                    </button>
                    <button className={`hidden sm:flex p-2.5 rounded-full transition-all duration-300 text-gray-700 hover:bg-brand-cream hover:text-gray-900`}>
                        <Heart size={20} />
                    </button>
                    
                    <div className={`h-6 w-px hidden sm:block mx-1 bg-gray-300`}></div>

                    <Link to="/cart" className="relative group">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-2xl transition-all duration-500 bg-gray-900 text-white shadow-xl shadow-gray-900/30 hover:bg-gray-800`}
                        >
                            <ShoppingCart size={20} />
                        </motion.div>
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className={`absolute -top-1.5 -right-1.5 text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 shadow-md bg-brand-red text-gray-900 border-brand-red`}
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2.5 rounded-2xl transition-all ${
                            isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white backdrop-blur-md'
                        }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[280px] bg-white shadow-2xl z-[101] p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-xl font-black text-gray-900">MENU</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-gray-100">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link 
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-2xl font-bold hover:text-brand-brown transition-colors ${
                                                location.pathname === link.path ? 'text-brand-brown' : 'text-gray-900'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-auto pt-8 border-t border-brand-brown/10">
                                <button className="w-full bg-brand-brown text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-light flex items-center justify-center gap-2">
                                    <User size={20} /> Sign In
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
