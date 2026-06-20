import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingCart, 
    Star, 
    ShieldCheck, 
    Truck, 
    RefreshCcw, 
    ArrowLeft, 
    Minus, 
    Plus, 
    Heart, 
    Share2, 
    CheckCircle2,
    Info,
    ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
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

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                className="w-16 h-16 border-4 border-brand-light border-t-brand-red rounded-full" 
            />
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/shop')} className="text-brand-brown font-bold flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Shop
            </button>
        </div>
    );

    return (
        <div className="pt-32 pb-24 bg-brand-cream">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400 mb-12 uppercase tracking-widest">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Left: Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-brand-cream shadow-2xl shadow-gray-100 group">
                            <img 
                                src={getProductImage(product.image)} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            />


                            {/* Wishlist Button */}
                            <button className="absolute top-8 right-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-brand-brown shadow-xl transition-all hover:scale-110 active:scale-95">
                                <Heart size={24} />
                            </button>
                        </div>

                        {/* Thumbnail Row (Placeholder) */}
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${i === 1 ? 'border-brand-brown' : 'border-transparent hover:border-gray-200'}`}>
                                    <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Product Info */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 bg-brand-cream px-3 py-1.5 rounded-xl">
                                    <Star size={18} className="text-brand-brown" fill="currentColor" />
                                    <span className="text-lg font-black text-brand-darkBrown">4.9</span>
                                </div>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest underline underline-offset-4 cursor-pointer">120 Genuine Reviews</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-6 mb-10">
                                <span className="text-6xl font-black text-gray-900">₹{product.price}</span>
                                <span className="text-3xl text-gray-300 line-through font-bold">₹{product.price + 50}</span>
                                <span className="bg-brand-brown text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-light">Save 30%</span>
                            </div>

                            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "No Added Preservatives",
                                "100% Organic Certified",
                                "Traditional Handmade",
                                "Sourced from Local Farmers"
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <CheckCircle2 size={20} className="text-brand-brown" />
                                    <span className="font-bold text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <div className="flex items-center bg-brand-cream rounded-[2rem] p-2 h-20 w-full sm:w-48 shadow-inner border border-brand-brown/10">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-16 h-16 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-sm transition-all text-gray-900 disabled:opacity-30"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={24} strokeWidth={2.5} />
                                </button>
                                <span className="flex-grow text-center font-black text-2xl text-gray-900">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-16 h-16 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-sm transition-all text-gray-900"
                                >
                                    <Plus size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart({...product, qty: quantity})}
                                className="flex-grow bg-brand-red text-white h-20 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-brand-darkRed transition-all duration-500 shadow-2xl shadow-brand-light"
                            >
                                <ShoppingCart size={28} /> Add to Bag
                            </motion.button>
                        </div>

                        {/* Delivery Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-brand-brown/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-brown flex items-center justify-center">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900">Free Delivery</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">On all orders</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-brown flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900">Certified Pure</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Quality Checked</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-brown flex items-center justify-center">
                                    <RefreshCcw size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900">Easy Return</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">7 Days Window</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-32">
                    <div className="flex gap-12 border-b border-brand-brown/10 mb-12">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-6 text-sm font-black uppercase tracking-widest relative transition-colors ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-brown rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div
                                    key="desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-black text-gray-900">Authentic Taste, Zero Compromise</h3>
                                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                        Experience the true essence of Indian tradition with our premium {product.name}. Handcrafted using age-old techniques passed down through generations, this product represents the pinnacle of quality and authenticity.
                                    </p>
                                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                        We source only the finest raw materials directly from local farmers who share our commitment to organic, chemical-free agriculture. Each batch is carefully processed in small quantities to ensure that the natural nutrients, minerals, and rich flavors are perfectly preserved.
                                    </p>
                                </motion.div>
                            )}
                            {activeTab === 'specifications' && (
                                <motion.div
                                    key="spec"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    {[
                                        { label: "Ingredients", value: "100% Organic Sugarcane / Lentils" },
                                        { label: "Shelf Life", value: "6 Months from Packing" },
                                        { label: "Weight", value: "500g / 1kg Variants" },
                                        { label: "Storage", value: "Store in a cool, dry place" },
                                        { label: "Origin", value: "Gujarat, India" },
                                        { label: "Packaging", value: "Eco-friendly Recyclable Bag" }
                                    ].map((spec) => (
                                        <div key={spec.label} className="flex justify-between p-6 bg-brand-cream rounded-2xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">{spec.label}</span>
                                            <span className="font-black text-gray-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
