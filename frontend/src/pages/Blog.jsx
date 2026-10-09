import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChefHat, BookOpen } from 'lucide-react';
import BlogCover from '../components/blog/BlogCover';
import { blogPosts, BLOG_CATEGORIES, formatPostDate } from '../data/blogPosts';

// Note: index.css globally remaps .text-white, .bg-brand-brown, <section>
// padding and a few spacing utilities, so this page uses explicit colours
// (e.g. text-[#fff], bg-[#8B4513]) and plain divs.

const PostMeta = ({ post, light = false }) => (
    <div className={`flex items-center gap-3 text-xs ${light ? 'text-[#fff]/80' : 'text-gray-500'}`}>
        <span>{formatPostDate(post.date)}</span>
        <span className={`w-1 h-1 rounded-full ${light ? 'bg-[#fff]/60' : 'bg-gray-300'}`} />
        <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
    </div>
);

const CategoryBadge = ({ post }) => (
    <span className="inline-flex items-center gap-1 bg-[#fff]/95 text-[#8B4513] text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
        {post.recipe && <ChefHat size={12} />} {post.category}
    </span>
);

const PostCard = ({ post, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: (idx % 3) * 0.06 }}
    >
        <Link
            to={`/blog/${post.slug}`}
            className="group flex flex-col h-full bg-[#fff] rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <BlogCover post={post} iconSize={64} />
                </div>
                <div className="absolute top-3 left-3"><CategoryBadge post={post} /></div>
            </div>
            <div className="flex flex-col flex-1 p-5">
                <PostMeta post={post} />
                <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#8B4513] transition-colors">
                    {post.title}
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B4513]">
                    {post.recipe ? 'View recipe' : 'Read article'}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    </motion.div>
);

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
    const filtered = useMemo(() => {
        const rest = blogPosts.filter((p) => p !== featured);
        return activeCategory === 'All' ? rest : blogPosts.filter((p) => p.category === activeCategory);
    }, [activeCategory, featured]);

    const counts = useMemo(
        () => Object.fromEntries(BLOG_CATEGORIES.map((c) => [c, blogPosts.filter((p) => p.category === c).length])),
        []
    );

    return (
        <div className="pt-40 pb-20 bg-brand-cream min-h-screen">
            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B4513] mb-3">
                        <BookOpen size={14} /> The Mahaveer Kitchen
                    </span>
                    <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
                        Recipes, Tips &amp; Stories
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Traditional recipes made with jaggery and wholesome ingredients, practical kitchen guides,
                        and a look at how our products are made.
                    </p>
                </motion.div>

                {/* Featured */}
                {activeCategory === 'All' && featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-6xl mx-auto mt-12"
                    >
                        <Link
                            to={`/blog/${featured.slug}`}
                            className="group grid grid-cols-1 lg:grid-cols-2 bg-[#fff] rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden">
                                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                    <BlogCover post={featured} eager />
                                </div>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-[#8B4513] text-[#fff] text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                                        Featured
                                    </span>
                                    <CategoryBadge post={featured} />
                                </div>
                            </div>
                            <div className="p-7 md:p-10 flex flex-col justify-center">
                                <PostMeta post={featured} />
                                <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-gray-900 leading-tight group-hover:text-[#8B4513] transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="mt-4 text-gray-600 leading-relaxed">{featured.excerpt}</p>
                                <span className="mt-6 inline-flex items-center gap-2 text-[#8B4513] font-semibold">
                                    {featured.recipe ? 'View recipe' : 'Read article'}
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Category filter */}
                <div className="max-w-6xl mx-auto mt-14 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
                    {['All', ...BLOG_CATEGORIES].map((cat) => {
                        const active = cat === activeCategory;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                                    active
                                        ? 'bg-[#8B4513] border-[#8B4513] text-[#fff] shadow-md'
                                        : 'bg-[#fff] border-gray-200 text-gray-700 hover:border-[#8B4513]/40 hover:text-[#8B4513]'
                                }`}
                            >
                                {cat}
                                <span className={`ml-1.5 text-xs ${active ? 'text-[#fff]/80' : 'text-gray-400'}`}>
                                    {cat === 'All' ? blogPosts.length : counts[cat]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((post, idx) => (
                        <PostCard key={post.slug} post={post} idx={idx} />
                    ))}
                </div>

                {/* Shop CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mt-16 rounded-3xl overflow-hidden relative bg-[#5D2E0C] px-7 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                    <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-brand-gold blur-[90px] opacity-30" />
                    <div className="relative">
                        <p className="text-2xl md:text-3xl font-semibold text-[#fff]">Cook with the real thing</p>
                        <p className="mt-2 text-[#fff]/80 max-w-xl">
                            Every recipe here tastes best with pure, traditionally made jaggery and quality staples.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="relative inline-flex items-center justify-center gap-2 bg-brand-cream text-[#8B4513] px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-[#fff] transition-colors flex-shrink-0"
                    >
                        Shop Now <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
