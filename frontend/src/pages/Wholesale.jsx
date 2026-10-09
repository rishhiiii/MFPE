import React from 'react';
import { motion } from 'framer-motion';
import {
    Package, Factory, Tag, Sliders, ArrowRight, MessageCircle, CheckCircle2,
    Award, IndianRupee, Boxes, Truck, ShieldCheck, Store, ShoppingCart,
    Building2, Globe, ShoppingBag, UtensilsCrossed, Warehouse,
    ClipboardList, FileText, Handshake, PackageCheck,
} from 'lucide-react';
import ExportInquiryForm from '../components/export/ExportInquiryForm';
import heroImage from '../assets/jaggery hero new.jpeg';
import whyImage from '../assets/jaggery new 6.jpeg';
import categorySuperfoods from '../assets/WhatsApp Image 2026-10-06 at 10.23.41 PM.jpeg';
import categorySweeteners from '../assets/WhatsApp Image 2026-10-06 at 10.33.16 PM.jpeg';
import categoryPulsesGrains from '../assets/WhatsApp Image 2026-10-06 at 10.35.56 PM.jpeg';
import categoryFmcg from '../assets/fmcg new.jpeg';

const FORM_ID = 'wholesale-inquiry';
const WHATSAPP_URL = `https://wa.me/919669993888?text=${encodeURIComponent(
    "Hello Mahaveer Food Products! I'm interested in wholesale/bulk orders."
)}`;

const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const highlights = [
    { value: '30+', label: 'Years of Experience' },
    { value: '50+', label: 'Products' },
    { value: 'Flexible', label: 'Order Quantities' },
    { value: 'Pan-India', label: 'Delivery' },
];

const partners = [
    { icon: Globe, label: 'Importers' },
    { icon: Warehouse, label: 'Wholesalers' },
    { icon: Truck, label: 'Distributors' },
    { icon: Store, label: 'Retail Chains' },
    { icon: ShoppingCart, label: 'Supermarkets' },
    { icon: ShoppingBag, label: 'E-commerce Sellers' },
    { icon: Factory, label: 'Food Manufacturers' },
    { icon: UtensilsCrossed, label: 'HoReCa & Caterers' },
];

const services = [
    { icon: Package, title: 'Bulk Supply', desc: 'Large-quantity orders at competitive wholesale prices, with consistent quality in every batch.' },
    { icon: Factory, title: 'Contract Manufacturing', desc: 'We manufacture to your specifications, so you can scale without investing in your own plant.' },
    { icon: Tag, title: 'Private Labeling', desc: 'Your brand on our products: custom labels, pouches and packaging sizes.' },
    { icon: Sliders, title: 'Custom Solutions', desc: 'Specific grades, blends or pack formats tailored to your market.' },
];

const categories = [
    { title: 'Natural Sweeteners', desc: 'Cane jaggery: blocks, cubes & powder', image: categorySweeteners },
    { title: 'Organic Superfoods', desc: 'Nutrient-rich natural foods', image: categorySuperfoods },
    { title: 'Pulses & Grains', desc: 'Cleaned, sorted & graded', image: categoryPulsesGrains },
    { title: 'FMCG Products', desc: 'Packaged everyday essentials', image: categoryFmcg },
];

const reasons = [
    { icon: Award, title: 'Premium Quality', desc: 'Every batch is checked against the same standards, so what you sample is what you receive.' },
    { icon: IndianRupee, title: 'Competitive Pricing', desc: 'Direct-from-manufacturer rates, with better pricing as your volumes grow.' },
    { icon: Boxes, title: 'Flexible MOQ', desc: 'Minimum order quantities that work for growing businesses as well as large buyers.' },
    { icon: Sliders, title: 'Customized Solutions', desc: 'Packaging, grading and branding tailored to your requirements.' },
    { icon: ShieldCheck, title: 'Reliable Service', desc: 'Consistent quality and on-time dispatch you can plan your business around.' },
];

const steps = [
    { icon: ClipboardList, title: 'Share Your Requirement', desc: 'Tell us the products, quantity and packaging you need.' },
    { icon: FileText, title: 'Get a Quote & Samples', desc: 'We send pricing, MOQ and samples where needed.' },
    { icon: Handshake, title: 'Confirm Your Order', desc: 'Finalise specifications, branding and delivery schedule.' },
    { icon: PackageCheck, title: 'Packed & Dispatched', desc: 'Quality-checked, packed and shipped to your location.' },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const SectionHeading = ({ eyebrow, title, subtitle }) => (
    <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown mb-3">
            {eyebrow}
        </span>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">{title}</h2>
        {subtitle && <p className="text-gray-600 text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
);

const Wholesale = () => {
    return (
        <div className="bg-brand-cream min-h-screen">
            {/* Hero */}
            <div className="hero-section relative pt-40 pb-28 md:pb-36 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} alt="Mahaveer Food Products wholesale supply" className="w-full h-full object-cover" loading="eager" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2a1405]/95 via-[#3d1e08]/80 to-[#3d1e08]/40" />
                </div>
                <div className="relative z-10 max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                            <Building2 size={14} className="text-white" /> <span>Wholesale &amp; Bulk Orders</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                            Bulk Supply of Pure, Natural Foods for Your Business
                        </h1>
                        <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
                            Jaggery, organic superfoods, pulses, grains and FMCG products at wholesale prices,
                            with private labeling and custom packaging for businesses of every size.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href={`#${FORM_ID}`} onClick={scrollToForm}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-brand-cream text-brand-brown px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-xl"
                                >
                                    Get a Wholesale Quote <ArrowRight size={18} />
                                </motion.button>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-transparent border-2 border-white/40 px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
                                >
                                    <MessageCircle size={18} /> Chat on WhatsApp
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Highlights strip, overlapping the hero */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 -mt-12 md:-mt-14 bg-white rounded-2xl shadow-xl border border-brand-brown/10 grid grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto overflow-hidden"
                >
                    {highlights.map((h, idx) => (
                        <div
                            key={h.label}
                            className={`p-5 md:p-7 text-center ${idx % 2 === 1 ? 'border-l' : ''} ${idx > 1 ? 'border-t lg:border-t-0' : ''} ${idx === 2 ? 'lg:border-l' : ''} border-gray-100`}
                        >
                            <div className="text-2xl md:text-3xl font-bold text-brand-brown mb-1">{h.value}</div>
                            <div className="text-xs md:text-sm text-gray-600 font-medium">{h.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Who we supply */}
                <div className="pt-20 md:pt-24">
                    <SectionHeading
                        eyebrow="Who We Work With"
                        title="Partner With Us"
                        subtitle="We welcome inquiries from businesses of all sizes, from neighbourhood stores to national distributors."
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
                        {partners.map(({ icon: Icon, label }, idx) => (
                            <motion.div
                                key={label}
                                {...fadeUp}
                                transition={{ delay: idx * 0.04 }}
                                className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center gap-3 hover:border-brand-brown/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-brown flex items-center justify-center group-hover:bg-[#8B4513] group-hover:text-[#fff] transition-colors duration-300">
                                    <Icon size={22} />
                                </div>
                                <p className="text-sm font-semibold text-gray-900">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="pt-20 md:pt-24">
                    <SectionHeading
                        eyebrow="What We Offer"
                        title="Our Wholesale Services"
                        subtitle="From bulk supply to your own branded range, we take care of production so you can focus on selling."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {services.map(({ icon: Icon, title, desc }, idx) => (
                            <motion.div
                                key={title}
                                {...fadeUp}
                                transition={{ delay: idx * 0.08 }}
                                className="relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-brown to-brand-gold" />
                                <div className="w-14 h-14 rounded-2xl bg-[#8B4513] text-[#fff] flex items-center justify-center mb-5 shadow-md">
                                    <Icon size={26} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Product categories */}
                <div className="pt-20 md:pt-24">
                    <SectionHeading
                        eyebrow="Product Range"
                        title="Available in Bulk"
                        subtitle="Order across categories in the quantities and pack sizes your business needs."
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-6xl mx-auto">
                        {categories.map((c, idx) => (
                            <motion.div
                                key={c.title}
                                {...fadeUp}
                                transition={{ delay: idx * 0.08 }}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="p-4 sm:p-5">
                                    <p className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">{c.title}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{c.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Why choose us */}
                <div className="pt-20 md:pt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
                        <motion.div {...fadeUp} className="relative">
                            <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
                                <img src={whyImage} alt="Quality jaggery from Mahaveer Food Products" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                            </div>
                            <div className="absolute -bottom-6 right-4 sm:-right-6 bg-[#8B4513] text-[#fff] rounded-2xl px-6 py-5 shadow-2xl max-w-[220px]">
                                <div className="text-3xl font-bold">Since 1994</div>
                                <div className="text-sm text-[#fff]/80 mt-1">Trusted by businesses across India</div>
                            </div>
                        </motion.div>

                        <div>
                            <motion.div {...fadeUp}>
                                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown mb-3">
                                    Why Mahaveer
                                </span>
                                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-8">Why Businesses Choose Us</h2>
                            </motion.div>
                            <div className="space-y-5">
                                {reasons.map(({ icon: Icon, title, desc }, idx) => (
                                    <motion.div
                                        key={title}
                                        {...fadeUp}
                                        transition={{ delay: idx * 0.06 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-white border border-brand-brown/15 text-brand-brown flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-0.5">{title}</h3>
                                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* How it works */}
                <div className="pt-24 md:pt-28">
                    <SectionHeading
                        eyebrow="Simple Process"
                        title="How Wholesale Ordering Works"
                    />
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-brand-brown/25" />
                        {steps.map(({ icon: Icon, title, desc }, idx) => (
                            <motion.div
                                key={title}
                                {...fadeUp}
                                transition={{ delay: idx * 0.1 }}
                                className="relative text-center"
                            >
                                <div className="relative mx-auto w-16 h-16 rounded-full bg-[#8B4513] text-[#fff] flex items-center justify-center shadow-lg mb-5 ring-8 ring-brand-cream">
                                    <Icon size={26} />
                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-gold text-[#fff] text-xs font-bold flex items-center justify-center">
                                        {idx + 1}
                                    </span>
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-[240px] mx-auto">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Inquiry */}
                <div className="pt-24 md:pt-28 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">
                        <motion.div
                            {...fadeUp}
                            className="lg:col-span-2 bg-[#5D2E0C] rounded-3xl p-8 md:p-10 text-[#fff] relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold rounded-full blur-[80px] opacity-30" />
                            <h2 className="relative text-2xl md:text-3xl font-semibold text-[#fff] mb-4">
                                Ready to Start Your Wholesale Partnership?
                            </h2>
                            <p className="relative text-[#fff]/80 mb-8 leading-relaxed">
                                Tell us about your business and requirements. Our team will reply with pricing,
                                MOQ and delivery timelines.
                            </p>
                            <ul className="relative space-y-3 mb-10">
                                {['Quick response on business days', 'Samples available on request', 'Private label & custom packaging'].map((t) => (
                                    <li key={t} className="flex items-center gap-3 text-[#fff]/90 text-sm">
                                        <CheckCircle2 size={18} className="text-brand-gold flex-shrink-0" /> {t}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-flex items-center gap-2 bg-[#25D366] text-[#fff] px-6 py-3.5 rounded-xl font-semibold hover:brightness-110 transition-all shadow-lg"
                            >
                                <MessageCircle size={18} /> Chat on WhatsApp
                            </a>
                        </motion.div>

                        <div className="lg:col-span-3">
                            <ExportInquiryForm id={FORM_ID} variant="wholesale" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wholesale;
