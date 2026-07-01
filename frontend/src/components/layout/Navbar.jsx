import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import mfpeLogo from '../../assets/mfpelogo.jpeg';

const Navbar = () => {
    const { cartItems, wishlistItems } = useCart();
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const wishlistCount = wishlistItems.length;

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

    // Colors use arbitrary hex values (not brand-* utilities) because the JS
    // Tailwind config isn't loaded in this v4 setup, so brand-* classes are
    // no-ops. text-white is also globally overridden in index.css, so it is
    // avoided here. #8B4513 brown, #FFF8DC cream, #5D2E0C dark brown.
    const defaultNavText = isScrolled
        ? 'text-gray-700 hover:text-[#8B4513]'
        : 'text-[#FFF8DC] hover:text-[#8B4513]';
    const activeNavText = isScrolled ? 'text-[#8B4513]' : 'text-[#8B4513]';
    const navUnderline = isScrolled ? 'bg-[#8B4513]' : 'bg-[#8B4513]';
    const defaultActionButton = isScrolled
        ? 'bg-transparent text-gray-800 hover:bg-black/5 hover:text-[#8B4513]'
        : 'bg-black/30 backdrop-blur-md border border-white/25 text-[#FFF8DC] hover:bg-black/50 hover:text-[#8B4513]';
    const loginTextClass = isScrolled
        ? 'text-gray-800 hover:text-[#8B4513]'
        : 'text-[#FFF8DC] hover:text-[#8B4513]';
    const signupClass = isScrolled
        ? 'px-4 py-2 text-sm font-semibold bg-[#8B4513] text-[#FFF8DC] rounded-xl hover:bg-[#5D2E0C] transition-colors'
        : 'px-4 py-2 text-sm font-semibold bg-[#FFF8DC] text-[#8B4513] rounded-xl hover:bg-white transition-colors';
    const dividerClass = isScrolled ? 'bg-gray-300' : 'bg-white/30';
    const brandNameClass = isScrolled ? 'text-gray-900' : 'text-[#FFF8DC]';
    const brandTaglineClass = isScrolled ? 'text-gray-600' : 'text-[#FFF8DC]/80';

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                isScrolled 
                ? 'bg-white/95 backdrop-blur-xl border-b border-brand-brown/10 py-3 shadow-md' 
                : 'bg-transparent py-6'
            }`}
        >
            {/* Dark scrim for guaranteed contrast over the hero while at the top; fades out on scroll */}
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent transition-opacity duration-500 ${
                    isScrolled ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <div className="relative max-w-full mx-auto px-6 sm:px-12 lg:px-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-3">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-0 rounded-full overflow-hidden transition-all duration-300 bg-white shadow-md border border-brand-brown/10`}
                    >
                        <img src={mfpeLogo} alt="Mahaveer Food Products" className="w-12 h-12 object-cover rounded-full" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className={`text-lg sm:text-xl font-black tracking-tight leading-none transition-colors duration-300 ${brandNameClass}`}>
                            MAHAVEER <span className={isScrolled ? 'text-[#8B4513]' : 'text-[#8B4513]'}>FOOD</span>

                        </span>
                        <span className={`text-[9px] sm:text-[10px] font-black tracking-[0.16em] uppercase transition-colors duration-300 ${brandTaglineClass}`}>
                            Products And Exporters
                        </span>
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
                            <span className={`text-sm font-black transition-colors duration-300 ${
                                location.pathname === link.path
                                ? activeNavText
                                : defaultNavText
                            }`}>
                                {link.name}
                            </span>
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navUnderline"
                                    className={`absolute bottom-0 left-5 right-5 h-0.5 rounded-full ${navUnderline}`}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link to="/wishlist" className="relative group">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`hidden sm:flex p-2.5 rounded-full transition-all duration-300 ${defaultActionButton}`}
                        >
                            <Heart size={20} />
                        </motion.button>
                        <AnimatePresence>
                            {wishlistCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-1.5 -right-1.5 text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 shadow-md bg-[#CD5C5C] text-[#FFFFFF] border-white"
                                >
                                    {wishlistCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    
                    <div className={`h-6 w-px hidden sm:block mx-1 ${dividerClass}`}></div>

                    <Link to="/cart" className="relative group">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-2xl transition-all duration-500 ${
                                isScrolled
                                    ? 'bg-[#FFF8DC] text-[#8B4513] hover:bg-[#F5DEB3]'
                                    : 'bg-[#FFF8DC] text-[#8B4513] hover:bg-white'
                            }`}
                        >
                            <ShoppingCart size={20} />
                        </motion.div>
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-1.5 -right-1.5 text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white bg-[#CD5C5C] text-[#FFFFFF]"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Auth Buttons — hidden below lg; available in the mobile menu instead */}
                    {user ? (
                        <div className="hidden lg:flex items-center gap-3">
                            <span className={`text-sm font-semibold ${loginTextClass}`}>Hi, {user.name.split(' ')[0]}</span>
                            <button
                                onClick={logout}
                                className={`p-2.5 rounded-full transition-all duration-300 ${defaultActionButton}`}
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center gap-2">
                            <Link
                                to="/login"
                                className={`px-4 py-2 text-sm font-semibold transition-colors ${loginTextClass}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className={signupClass}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2.5 rounded-2xl bg-gray-100 text-gray-900"
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
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[101]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[280px] bg-white shadow-2xl z-[102] p-8 flex flex-col"
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
                                            className={`text-2xl font-black hover:text-brand-brown transition-colors ${
                                                location.pathname === link.path ? 'text-brand-brown' : 'text-gray-900'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-auto pt-8 border-t border-brand-brown/10">
                                {user ? (
                                    <div className="space-y-4">
                                        <p className="text-center text-lg font-semibold text-gray-700">Hi, {user.name}</p>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={20} /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full bg-white text-gray-900 border border-gray-300 py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                                        >
                                            <User size={20} /> Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full bg-brand-brown text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                                        >
                                            <User size={20} /> Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
