import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
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
    const { cartItems, removeFromCart, addToCart, clearCart, totalPrice } = useCart();

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const { data: order } = await axios.post('http://localhost:5000/api/payment/order', {
                amount: totalPrice
            });

            const options = {
                key: "your_razorpay_key_id",
                amount: order.amount,
                currency: order.currency,
                name: "Mahaveer Food Products",
                description: "Purchase of food products",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', response);
                        if (verifyRes.data.success) {
                            alert("Payment Successful!");
                            clearCart();
                        }
                    } catch (err) {
                        alert("Verification failed!");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#8B0000"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Payment failed to start. Is backend running?");
        }
    };

    return (
        <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20">
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-brand-light p-3 rounded-2xl text-brand-brown">
                        <ShoppingBag size={30} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900">Your <span className="text-brand-brown">Cart</span></h1>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32 bg-brand-cream rounded-[3rem] border-2 border-dashed border-brand-brown/10"
                    >
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-100">
                            <ShoppingBag size={40} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is feeling a bit light!</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Explore our collection of traditional jaggery and handmade papads to fill it up.</p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-brand-brown text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-darkBrown transition-all shadow-xl shadow-brand-light">
                            Start Shopping <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div 
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border border-brand-brown/10 hover:shadow-xl hover:shadow-gray-50 transition-all"
                                    >
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-brand-cream shrink-0">
                                            <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex-grow text-center sm:text-left">
                                            <p className="text-brand-brown text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                            <p className="text-2xl font-black text-gray-900">₹{item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center bg-brand-cream rounded-xl p-1">
                                                <button 
                                                    onClick={() => removeFromCart(item._id)} 
                                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-gray-600"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-lg">{item.qty}</span>
                                                <button 
                                                    onClick={() => addToCart(item)} 
                                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-gray-600"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                            
                                            <div className="text-right min-w-[100px]">
                                                <p className="text-gray-400 text-xs mb-1">Total</p>
                                                <p className="text-xl font-black text-brand-brown">₹{item.price * item.qty}</p>
                                            </div>

                                            <button 
                                                onClick={() => removeFromCart(item._id)} 
                                                className="p-3 text-gray-400 hover:text-brand-brown hover:bg-brand-cream rounded-xl transition-all"
                                            >
                                                <Trash2 size={22} />
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
                            className="bg-brand-darkBrown rounded-[3rem] p-8 h-fit text-white relative overflow-hidden sticky top-32"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red rounded-full blur-[80px] opacity-20" />
                            <h2 className="text-2xl font-bold mb-8 relative z-10">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-brand-red font-bold uppercase tracking-widest text-xs">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Tax (GST)</span>
                                    <span className="text-white">Included</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6 mb-10 relative z-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 font-medium">Grand Total</span>
                                    <span className="text-4xl font-black text-brand-red">₹{totalPrice}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handlePayment}
                                className="w-full bg-brand-red text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-brand-darkRed transition-all shadow-2xl shadow-red-900/20 relative z-10"
                            >
                                <CreditCard size={24} /> Checkout Now
                            </button>

                            <p className="text-center text-gray-600 text-xs mt-6 relative z-10">
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
