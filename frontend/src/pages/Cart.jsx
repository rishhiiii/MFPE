import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowRightCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';

const getProductImage = (imagePath) => {
    const imageMap = {
        '/src/assets/jaggery1.jpeg': jaggery1,
        '/src/assets/jaggery2.jpeg': jaggery2,
        '/src/assets/jaggery3.jpeg': jaggery3
    };
    return imageMap[imagePath] || imagePath || 'https://via.placeholder.com/400';
};

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, totalPrice } = useCart();

    return (
        <div className="pt-28 pb-20 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-brand-light p-2.5 rounded-xl text-brand-brown">
                        <ShoppingBag size={24} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your <span className="text-brand-brown">Cart</span></h1>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 bg-brand-cream rounded-2xl border-2 border-dashed border-brand-brown/10"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gray-100">
                            <ShoppingBag size={32} className="text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is feeling a bit light!</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm md:text-base">Explore our collection of traditional jaggery and handmade papads to fill it up.</p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-brand-brown text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-darkBrown transition-all shadow-lg shadow-brand-light">
                            Start Shopping <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div 
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-xl border border-brand-brown/10 hover:shadow-lg hover:shadow-gray-50 transition-all"
                                    >
                                        <div className="w-28 h-28 rounded-xl overflow-hidden bg-brand-cream shrink-0">
                                            <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex-grow text-center sm:text-left">
                                            <p className="text-brand-brown text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{item.name}</h3>
                                            <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-5">
                                            <div className="flex items-center bg-brand-cream rounded-lg p-1">
                                                <button 
                                                    onClick={() => {
                                                        if (item.qty > 1) {
                                                            addToCart({ ...item, qty: -1 });
                                                        }
                                                    }} 
                                                    className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-white transition-all text-gray-600"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-9 text-center font-semibold text-base">{item.qty}</span>
                                                <button 
                                                    onClick={() => addToCart(item)} 
                                                    className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-white transition-all text-gray-600"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            
                                            <div className="text-right min-w-[80px]">
                                                <p className="text-gray-400 text-xs mb-0.5">Total</p>
                                                <p className="text-lg font-bold text-brand-brown">₹{item.price * item.qty}</p>
                                            </div>

                                            <button 
                                                onClick={() => removeFromCart(item._id)} 
                                                className="p-2.5 text-gray-400 hover:text-brand-brown hover:bg-brand-cream rounded-lg transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-brand-darkBrown rounded-2xl p-6 h-fit text-white relative overflow-hidden sticky top-28"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red rounded-full blur-[60px] opacity-20" />
                            <h2 className="text-xl font-bold mb-6 relative z-10">Order Summary</h2>
                            
                            <div className="space-y-3 mb-6 relative z-10">
                                <div className="flex justify-between text-gray-400 font-semibold text-sm">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-semibold text-sm">
                                    <span>Shipping</span>
                                    <span className="text-brand-red font-bold uppercase tracking-widest text-[10px]">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-semibold text-sm">
                                    <span>Tax (GST)</span>
                                    <span className="text-white">Included</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-5 mb-8 relative z-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 font-semibold text-sm">Grand Total</span>
                                    <span className="text-3xl font-bold text-brand-red">₹{totalPrice}</span>
                                </div>
                            </div>

                            <Link to="/checkout">
                                <button 
                                    className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-darkRed transition-all shadow-lg shadow-red-900/20 relative z-10"
                                >
                                    <ArrowRightCircle size={20} /> Proceed to Checkout
                                </button>
                            </Link>

                            <p className="text-center text-gray-600 text-xs mt-5 relative z-10">
                                Secure payments powered by Razorpay.
                            </p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
