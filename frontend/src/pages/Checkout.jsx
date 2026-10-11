import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api, { API_BASE_URL } from '../lib/api';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';
import { optimizeCloudinaryUrl } from '../lib/image';

const getProductImage = (imagePath) => {
    if (!imagePath) return jaggery1;
    if (imagePath.startsWith('http')) return optimizeCloudinaryUrl(imagePath, 150);
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return imagePath;
};

const Checkout = () => {
  const { cartItems, totalPrice, gstTotal, shippingCharge, grandTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true, state: { from: '/checkout' } });
    }
  }, [authLoading, user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
        country: user.address?.country || 'India'
      });
    }
  }, [user]);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    const FIELD_LABELS = {
        name: 'Full Name', email: 'Email Address', phone: 'Phone Number',
        address: 'Address', city: 'City', state: 'State', pincode: 'Pincode',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setFormError('');

        // Validate cart total
        if (totalPrice < 1) {
            setFormError('Minimum order amount is ₹1');
            return;
        }

        // Validate form
        const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setFormError(`Please fill in ${FIELD_LABELS[field]}`);
                return;
            }
        }

        setIsProcessing(true);

        const res = await loadRazorpay();
        if (!res) {
            setFormError('Razorpay SDK failed to load. Are you online?');
            setIsProcessing(false);
            return;
        }

        try {
            // Only send product ids + quantities; the backend computes the real
            // price from the database so the amount can't be tampered with.
            const items = cartItems.map(item => ({ product: item._id, qty: item.qty }));

            const { data: order } = await api.post('/api/payment/order', {
                items,
                shippingAddress: formData
            });

            const options = {
                // order.keyId normally comes from the backend's own RAZORPAY_KEY_ID;
                // this is just a fallback, hardcoded (Razorpay's key_id is a public
                // publishable key, not a secret — it's sent to the browser on every
                // checkout regardless) so it never depends on a .env file at build time.
                key: order.keyId || 'rzp_live_T8erhLyUftewxb',
                amount: order.amount,
                currency: order.currency || "INR",
                name: "Mahaveer Food Products",
                description: "Purchase of food products",
                order_id: order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: formData.address
                },
                theme: {
                    color: "#8B4513"
                },
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post('/api/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            setPaymentSuccess(true);
                            clearCart();
                        } else {
                            setFormError('Payment verification failed. If money was debited, please contact us.');
                            setIsProcessing(false);
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        setFormError('Payment verification failed. If money was debited, please contact us.');
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                console.error('Payment failed:', response);
                // Let the server email the customer about the failure.
                // It double-checks with Razorpay, and only notifies once per order.
                api.post('/api/payment/failed', {
                    razorpay_order_id: response.error?.metadata?.order_id || order.id,
                }).catch(() => {});
                setFormError('Payment failed. Please try again.');
                setIsProcessing(false);
            });

            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed", error);
            const message = error.response?.data?.error || error.message || 'Please try again.';
            setFormError(`Payment failed to start: ${message}`);
            setIsProcessing(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="pt-40 pb-20 bg-brand-cream min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-light border-t-brand-brown rounded-full animate-spin" />
            </div>
        );
    }

    if (paymentSuccess) {
        return (
            <div className="pt-40 pb-20 bg-brand-cream min-h-screen flex items-center justify-center">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 size={48} className="text-green-600" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 mb-6">Thank you for your order. We'll process it shortly.</p>
                    <div className="space-y-4">
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 bg-brand-brown text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-darkBrown transition-all shadow-lg shadow-brand-light"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 bg-brand-cream min-h-screen flex items-center justify-center">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <ShoppingBag size={48} className="text-gray-300 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 bg-brand-brown text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-darkBrown transition-all shadow-lg shadow-brand-light"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-20 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <Link to="/cart" className="inline-flex items-center gap-2 text-brand-brown font-semibold mb-6 hover:underline">
                    <ArrowLeft size={18} /> Back to Cart
                </Link>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Details Form */}
                    <div className="lg:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl border border-brand-brown/10"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Details</h2>

                            <form onSubmit={handlePayment} className="space-y-5">
                                {formError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                        {formError}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                        placeholder="123 Main Street, Apartment 4B"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                            placeholder="Mumbai"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                            placeholder="Maharashtra"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 outline-none"
                                            placeholder="400001"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                    <input 
                                        type="text"
                                        name="country"
                                        value="India"
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-brand-brown text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-darkBrown transition-all shadow-lg shadow-brand-light disabled:opacity-50"
                                >
                                    <CreditCard size={20} />
                                    {isProcessing ? 'Processing...' : `Pay ₹${Number(grandTotal).toFixed(2)}`}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-brand-darkBrown rounded-2xl p-6 h-fit text-white relative overflow-hidden sticky top-28"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red rounded-full blur-[60px] opacity-20" />
                            <h2 className="text-xl font-bold mb-6 relative z-10">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6 relative z-10">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex items-center gap-3">
                                        <img
                                            src={getProductImage(item.image)}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-xl object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-bold text-sm text-white">{item.name}</p>
                                            <p className="text-brand-cream text-xs opacity-80">Qty: {item.qty}</p>
                                        </div>
                                        <p className="font-bold text-brand-cream">₹{Number(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t border-white/20 pt-5 mb-6 relative z-10">
                                <div className="flex justify-between text-brand-cream font-semibold text-sm mb-2">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{Number(totalPrice).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-brand-cream font-semibold text-sm mb-2">
                                    <span>GST</span>
                                    <span className="text-white">₹{Number(gstTotal).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-brand-cream font-semibold text-sm mb-2">
                                    <span>Shipping</span>
                                    <span className="text-white">₹{Number(shippingCharge).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-white/20 pt-5 relative z-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-brand-cream font-semibold text-sm">Grand Total</span>
                                    <span className="text-3xl font-black text-brand-cream">₹{Number(grandTotal).toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
