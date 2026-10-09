import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api, { API_BASE_URL } from '../lib/api';
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
import Seo from '../components/seo/Seo';
import ProductReviews from '../components/product/ProductReviews';
import { StarDisplay } from '../components/product/StarRating';
import { SITE, absoluteUrl } from '../lib/seoConfig';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';
import { optimizeCloudinaryUrl } from '../lib/image';

const getProductImage = (imagePath) => {
    if (!imagePath) return jaggery1;
    if (imagePath.startsWith('http')) return optimizeCloudinaryUrl(imagePath, 900);
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return imagePath;
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Reviews tab reports the latest average/count so the header stays in sync.
    const handleReviewSummary = useCallback((summary) => {
        setProduct((p) => (p && (p.rating !== summary.average || p.numReviews !== summary.count)
            ? { ...p, rating: summary.average, numReviews: summary.count }
            : p));
    }, []);

    const openReviews = () => {
        setActiveTab('reviews');
        document.getElementById('product-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/api/products/${id}`);
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

    const productUrl = absoluteUrl(`/product/${product._id || id}`);
    const productImage = absoluteUrl(getProductImage(product.image));
    const productDescription = product.description
        ? String(product.description).slice(0, 300)
        : `Buy ${product.name} — premium organic quality from ${SITE.shortName}.`;

    const productJsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: productDescription,
            image: [productImage],
            sku: product._id || id,
            brand: { '@type': 'Brand', name: SITE.shortName },
            offers: {
                '@type': 'Offer',
                url: productUrl,
                priceCurrency: 'INR',
                price: Number(product.price).toFixed(2),
                availability: 'https://schema.org/InStock',
                seller: { '@type': 'Organization', name: SITE.name },
            },
            ...(product.numReviews > 0 && {
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: Number(product.rating).toFixed(1),
                    reviewCount: product.numReviews,
                    bestRating: 5,
                    worstRating: 1,
                },
            }),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
                { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE.url}/shop` },
                { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
            ],
        },
    ];

    return (
        <div className="pt-40 pb-16 bg-brand-cream">
            <Seo
                title={product.name}
                description={productDescription}
                path={`/product/${product._id || id}`}
                image={productImage}
                type="product"
                jsonLd={productJsonLd}
            />
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-brand-cream shadow-2xl shadow-gray-100 group">
                            <img
                                src={getProductImage(product.image)}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                decoding="async"
                            />


                            {/* Wishlist Button */}
                            {product && (
                                <button
                                    onClick={() => {
                                        const isInWishlist = wishlistItems.some(item => item._id === product._id);
                                        if (isInWishlist) {
                                            removeFromWishlist(product._id);
                                        } else {
                                            addToWishlist(product);
                                        }
                                    }}
                                    className={`absolute top-4 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 ${wishlistItems.some(item => item._id === product._id) ? 'text-brand-brown' : 'text-gray-400 hover:text-brand-brown'}`}
                                >
                                    <Heart size={20} fill={wishlistItems.some(item => item._id === product._id) ? 'currentColor' : 'none'} />
                                </button>
                            )}
                        </div>
                        <p className="mt-3 text-center text-xs text-gray-500 italic">
                            * Product images are for representation only. The actual product may vary in appearance, colour, and packaging.
                        </p>
                    </motion.div>

                    {/* Right: Product Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-3 leading-tight">
                                {product.name}
                            </h1>
                            <button type="button" onClick={openReviews} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B4513]">
                                {product.numReviews > 0 ? (
                                    <>
                                        <StarDisplay value={product.rating} size={18} />
                                        <span className="font-semibold text-gray-900">{Number(product.rating).toFixed(1)}</span>
                                        <span className="underline underline-offset-2">({product.numReviews} review{product.numReviews === 1 ? '' : 's'})</span>
                                    </>
                                ) : (
                                    <>
                                        <StarDisplay value={0} size={18} />
                                        <span className="underline underline-offset-2">Be the first to review</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-4xl font-black text-gray-900">₹{Number(product.price).toFixed(2)}</span>
                                {product.mrp > product.price && (
                                    <>
                                        <span className="text-2xl text-gray-300 line-through font-bold">₹{Number(product.mrp).toFixed(2)}</span>
                                        <span className="self-center bg-[#8B4513] text-[#FFF8DC] px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-md">
                                            {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                            {product.gstRate > 0 && (
                                <p className="-mt-4 mb-6 text-sm text-gray-500">+ {product.gstRate}% GST, added at checkout</p>
                            )}

                            <p className="text-base text-gray-600 font-medium leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "No Added Preservatives",
                                "100% Organic Certified",
                                "Traditional Handmade",
                                "Sourced from Local Farmers"
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-brand-brown" />
                                    <span className="font-bold text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <div className="flex items-center bg-brand-cream rounded-[1.5rem] p-2 h-14 w-full sm:w-40 shadow-inner border border-brand-brown/10">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-900 disabled:opacity-30"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={20} strokeWidth={2.5} />
                                </button>
                                <span className="flex-grow text-center font-black text-xl text-gray-900">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-900"
                                >
                                    <Plus size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart({...product, qty: quantity})}
                                className="flex-grow bg-brand-red text-white h-14 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-3 hover:bg-brand-darkRed transition-all duration-500 shadow-2xl shadow-brand-light"
                            >
                                <ShoppingCart size={22} /> Add to Bag
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div id="product-tabs" className="mt-20 scroll-mt-32">
                    <div className="flex gap-5 sm:gap-8 overflow-x-auto border-b border-brand-brown/10 mb-8">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest relative transition-colors ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}{tab === 'reviews' && product.numReviews > 0 ? ` (${product.numReviews})` : ''}
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
                                    className="space-y-4"
                                >
                                    <h3 className="text-xl font-black text-gray-900">About {product.name}</h3>
                                    <p className="text-base text-gray-600 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </motion.div>
                            )}
                            {activeTab === 'specifications' && (
                                <motion.div
                                    key="spec"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    {/* Dynamic specifications from product */}
                                    {product.ingredients && (
                                        <div key="ingredients" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Ingredients</span>
                                            <span className="font-black text-gray-900 text-right">{product.ingredients}</span>
                                        </div>
                                    )}
                                    {product.shelfLife && (
                                        <div key="shelfLife" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Shelf Life</span>
                                            <span className="font-black text-gray-900 text-right">{product.shelfLife}</span>
                                        </div>
                                    )}
                                    {product.weight && (
                                        <div key="weight" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Weight</span>
                                            <span className="font-black text-gray-900 text-right">{product.weight}</span>
                                        </div>
                                    )}
                                    {product.storage && (
                                        <div key="storage" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Storage</span>
                                            <span className="font-black text-gray-900 text-right">{product.storage}</span>
                                        </div>
                                    )}
                                    {product.origin && (
                                        <div key="origin" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Origin</span>
                                            <span className="font-black text-gray-900 text-right">{product.origin}</span>
                                        </div>
                                    )}
                                    {product.packaging && (
                                        <div key="packaging" className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">Packaging</span>
                                            <span className="font-black text-gray-900 text-right">{product.packaging}</span>
                                        </div>
                                    )}
                                    {/* Fallback to default specs if no product specs */}
                                    {!product.ingredients && !product.shelfLife && !product.weight && !product.storage && !product.origin && !product.packaging && [
                                        { label: "Ingredients", value: "100% Organic Sugarcane / Lentils" },
                                        { label: "Shelf Life", value: "6 Months from Packing" },
                                        { label: "Weight", value: "500g / 1kg Variants" },
                                        { label: "Storage", value: "Store in a cool, dry place" },
                                        { label: "Origin", value: "Gujarat, India" },
                                        { label: "Packaging", value: "Eco-friendly Recyclable Bag" }
                                    ].map((spec) => (
                                        <div key={spec.label} className="flex justify-between items-start gap-6 p-4 bg-brand-cream rounded-xl">
                                            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest flex-shrink-0">{spec.label}</span>
                                            <span className="font-black text-gray-900 text-right">{spec.value}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                            {activeTab === 'reviews' && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <ProductReviews
                                        productId={product._id}
                                        productName={product.name}
                                        onSummaryChange={handleReviewSummary}
                                    />
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
