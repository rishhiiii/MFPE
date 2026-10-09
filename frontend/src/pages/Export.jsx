import React from 'react';
import { motion } from 'framer-motion';
import {
    Globe, Ship, Package, FileText, Truck, CheckCircle2, ArrowRight,
    MessageCircle, Store, ShoppingCart, Factory, Award, ShieldCheck,
    Search, ClipboardCheck, PackageCheck, Boxes, Mail, BadgeCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ExportInquiryForm from '../components/export/ExportInquiryForm';
import exportBanner from '../assets/export bg.jpeg';
import categorySuperfoods from '../assets/WhatsApp Image 2026-10-06 at 10.23.41 PM.jpeg';
import categorySweeteners from '../assets/WhatsApp Image 2026-10-06 at 10.33.16 PM.jpeg';
import categoryPulsesGrains from '../assets/WhatsApp Image 2026-10-06 at 10.35.56 PM.jpeg';
import categoryFmcg from '../assets/fmcg new.jpeg';

const FOREST = '#1B4332';
const GOLD = '#B8860B';

const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('export-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const stats = [
    { value: '30+', label: 'Years', sub: 'Industry Experience' },
    { value: '50+', label: 'Products', sub: 'Product Portfolio' },
    { value: 'Bulk', label: 'Supply', sub: 'B2B & Wholesale' },
    { value: 'India', label: 'Based', sub: 'Export & Supply' },
];

const exportCategories = [
    {
        title: 'Natural Sweeteners',
        image: categorySweeteners,
        items: ['Cane Jaggery', 'Jaggery Powder', 'Jaggery Cubes', 'Traditional Jaggery'],
    },
    {
        title: 'Organic Superfoods',
        image: categorySuperfoods,
        items: ['Chia Seeds', 'Flax Seeds', 'Pumpkin Seeds', 'Sunflower Seeds', 'Moringa Powder', 'Quinoa'],
    },
    {
        title: 'Pulses & Grains',
        image: categoryPulsesGrains,
        items: ['Toor Dal', 'Moong Dal', 'Masoor Dal', 'Chana Dal', 'Wheat', 'Rice'],
    },
    {
        title: 'FMCG Products',
        image: categoryFmcg,
        items: ['Packaged Food Products', 'Health Foods', 'Grocery Essentials', 'Daily Consumption Products'],
    },
];

const processSteps = [
    { icon: <Search size={20} />, title: 'Inquiry', desc: 'Share your product requirements, quantity and destination.' },
    { icon: <FileText size={20} />, title: 'Product & Quote', desc: 'We provide product specifications and a competitive quotation.' },
    { icon: <ClipboardCheck size={20} />, title: 'Quality Confirmation', desc: 'Samples and specifications are confirmed before production.' },
    { icon: <PackageCheck size={20} />, title: 'Processing & Packing', desc: 'Products are processed, packed and prepared to your order requirements.' },
    { icon: <FileText size={20} />, title: 'Documentation', desc: 'Required export and shipment documentation is prepared.' },
    { icon: <Ship size={20} />, title: 'Shipment', desc: 'Goods are dispatched to the agreed destination.' },
];

const whyPartner = [
    { icon: <Award size={20} />, title: 'Since 1994', desc: 'Decades of experience in food products.' },
    { icon: <ShieldCheck size={20} />, title: 'Quality-Focused Sourcing', desc: 'Carefully selected raw materials and suppliers.' },
    { icon: <Boxes size={20} />, title: 'Bulk Order Capability', desc: 'Suitable for wholesalers, distributors and importers.' },
    { icon: <Package size={20} />, title: 'Private Label Support', desc: 'Packaging under your own brand, for suitable products.' },
    { icon: <PackageCheck size={20} />, title: 'Custom Packaging', desc: 'Different pack sizes and packaging requirements accommodated.' },
    { icon: <MessageCircle size={20} />, title: 'Reliable Communication', desc: 'Dedicated support for international buyers.' },
    { icon: <BadgeCheck size={20} />, title: 'Competitive Pricing', desc: 'Direct business-to-business pricing.' },
];

const buyerTypes = [
    { icon: <Globe size={22} />, title: 'Importers', desc: 'International food importers looking for reliable Indian suppliers.' },
    { icon: <Truck size={22} />, title: 'Distributors', desc: 'Regional distributors seeking quality food products.' },
    { icon: <Boxes size={22} />, title: 'Wholesalers', desc: 'Bulk procurement at competitive prices.' },
    { icon: <Store size={22} />, title: 'Retail Chains', desc: 'Supermarkets and grocery chains.' },
    { icon: <ShoppingCart size={22} />, title: 'E-Commerce Businesses', desc: 'Online food and grocery sellers.' },
    { icon: <Factory size={22} />, title: 'Food Manufacturers', desc: 'Bulk ingredients for food processing requirements.' },
];

const specRows = [
    { label: 'Bulk Orders', value: 'Available' },
    { label: 'Retail Packaging', value: 'Available' },
    { label: 'Custom Packaging', value: 'Available' },
    { label: 'Private Label', value: 'Available' },
    { label: 'Product Samples', value: 'On Request' },
    { label: 'Container / Bulk Shipment', value: 'Available' },
    { label: 'Product Specifications', value: 'Available' },
    { label: 'Export Documentation', value: 'Available' },
];

const certifications = ['FSSAI', 'GST Registered', 'IEC (Import Export Code)'];

const regions = ['Middle East', 'Europe', 'Asia', 'Africa', 'North America'];

const Export = () => {
    return (
        <div className="bg-brand-cream min-h-screen">
            {/* 1. Hero */}
            <div className="hero-section relative pt-40 pb-20 overflow-hidden">
                {/* Background photo: on desktop it sits below the navbar, covers the right
                    75% and fades into green on the left, which keeps the banner's own
                    lettering clear of the headline. The overlay is kept light. */}
                <div className="absolute inset-0 z-0 bg-[#11231b]" aria-hidden="true">
                    <img
                        src={exportBanner}
                        alt=""
                        className="absolute top-0 lg:top-24 right-0 h-full lg:h-[calc(100%-6rem)] w-full lg:w-[75%] object-cover object-top"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 lg:hidden bg-[#11231b]/70" />
                    <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,#11231b_0%,#11231b_25%,rgba(17,35,27,0.6)_34%,rgba(17,35,27,0.15)_48%,rgba(17,35,27,0)_60%)]" />
                </div>
                <div className="relative z-10 max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                            <Globe size={14} /> Global Export
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
                            Exporting India's Purest Natural Foods to the World
                        </h1>
                        <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-3">
                            Premium Cane Jaggery, Organic Superfoods, Pulses, Grains &amp; FMCG Products
                        </p>
                        <p className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-8">
                            Since 1994 · India
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#export-inquiry" onClick={scrollToForm}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-brand-cream text-brand-brown px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-xl"
                                >
                                    Request Export Quote <ArrowRight size={18} />
                                </motion.button>
                            </a>
                            <a href="#export-inquiry" onClick={scrollToForm}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-transparent border-2 border-white/40 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
                                >
                                    <FileText size={18} /> Request Product Catalogue
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">

                {/* 2. From India to the World */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">From India to the World</h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            We connect global buyers with carefully selected, high-quality food products sourced and processed in India.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                        {stats.map((s, idx) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
                            >
                                <div className="text-3xl font-bold mb-1" style={{ color: FOREST }}>{s.value}</div>
                                <div className="text-sm font-semibold text-gray-900 mb-1">{s.label}</div>
                                <div className="text-xs text-gray-500">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. Export Product Categories */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Our Export Product Range</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Four core categories, sourced and processed to export-ready standards.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {exportCategories.map((cat, idx) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">{cat.title}</h3>
                                    <ul className="space-y-1 mb-4">
                                        {cat.items.slice(0, 4).map((item) => (
                                            <li key={item} className="text-xs text-gray-600 flex items-center gap-1.5">
                                                <CheckCircle2 size={12} className="text-brand-brown shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 bg-brand-brown text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-darkBrown transition-all"
                            >
                                View Export Products <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* 4. Export Process */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Simple &amp; Reliable Export Process</h2>
                    </motion.div>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {processSteps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                className="flex items-start gap-5 bg-white rounded-2xl border border-gray-100 p-5"
                            >
                                <div
                                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[#ffffff]"
                                    style={{ backgroundColor: FOREST }}
                                >
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span style={{ color: FOREST }}>{step.icon}</span>
                                        <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Why Partner With Us */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Why Partner With Mahaveer Food?</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {whyPartner.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                className="bg-white rounded-2xl border border-gray-100 p-6"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${FOREST}1A`, color: FOREST }}
                                >
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 6. Who We Serve */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">We Work With</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {buyerTypes.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5"
                            >
                                <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 9a. Export Inquiry Form — first placement, mid-page */}
                <div className="py-16 max-w-3xl mx-auto">
                    <ExportInquiryForm id="export-inquiry" />
                </div>

                {/* 7. Export Specifications */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Export &amp; Packaging Options</h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 overflow-hidden"
                    >
                        {specRows.map((row, idx) => (
                            <div
                                key={row.label}
                                className={`flex items-center justify-between px-6 py-4 ${idx !== specRows.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                <span className="text-sm font-medium text-gray-700">{row.label}</span>
                                <span
                                    className={`text-xs font-bold px-3 py-1 rounded-full ${row.value === 'Available' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}
                                >
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* 10. Certifications / Compliance */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Quality &amp; Compliance</h2>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                        {certifications.map((cert) => (
                            <div
                                key={cert}
                                className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-5 py-3"
                            >
                                <ShieldCheck size={18} style={{ color: FOREST }} />
                                <span className="text-sm font-semibold text-gray-800">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. Global Reach */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl p-10 md:p-14 text-center"
                        style={{ backgroundColor: FOREST }}
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#ffffff] mb-4">
                            From Bhopal, India to Global Markets
                        </h2>
                        <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Based in Madhya Pradesh, India, we're looking to connect our food products with buyers across global markets.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {regions.map((r) => (
                                <span
                                    key={r}
                                    className="px-4 py-2 rounded-full border text-sm font-semibold text-[#ffffff]"
                                    style={{ borderColor: `${GOLD}99`, backgroundColor: `${GOLD}26` }}
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                        <p className="text-white/60 text-xs uppercase tracking-widest mt-8">
                            Looking for International Partners
                        </p>
                    </motion.div>
                </div>

                {/* 8. Request Catalogue CTA */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#20201D] rounded-3xl p-10 md:p-14 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#ffffff] mb-4">
                            Looking for Our Complete Product Range?
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                            Request our product catalogue — explore our range, packaging options, specifications and bulk-order solutions.
                        </p>
                        <a href="mailto:mahaveermfpe@gmail.com?subject=Export%20Catalogue%20Request">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 bg-white text-[#20201D] px-7 py-3.5 rounded-xl font-semibold"
                            >
                                <Mail size={18} /> Request Export Catalogue
                            </motion.button>
                        </a>
                    </motion.div>
                </div>

                {/* 9b. Export Inquiry Form — second placement, near the end */}
                <div className="py-16 max-w-3xl mx-auto">
                    <ExportInquiryForm />
                </div>

                {/* 12. Final CTA */}
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-brown/10 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                            Let's Build a Global Food Partnership
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            Looking for a reliable Indian food supplier? Let's discuss your product requirements, quantity and destination.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#export-inquiry" onClick={scrollToForm}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-brand-brown text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
                                >
                                    Request Export Quote <ArrowRight size={18} />
                                </motion.button>
                            </a>
                            <a
                                href="https://wa.me/919669993888?text=Hello%20Mahaveer%20Food%20Products!%20I%27m%20interested%20in%20export%2Fbulk%20supply."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:border-brand-brown hover:text-brand-brown transition-all flex items-center gap-2"
                                >
                                    <MessageCircle size={18} /> WhatsApp Us
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Export;
