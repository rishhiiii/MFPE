import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, Clock, ChefHat, Timer, Flame, Users, Lightbulb,
    Check, ShoppingBag, Share2,
} from 'lucide-react';
import Seo from '../components/seo/Seo';
import BlogCover from '../components/blog/BlogCover';
import { SITE, absoluteUrl } from '../lib/seoConfig';
import { blogPosts, getPostBySlug, formatPostDate, BLOG_AUTHOR } from '../data/blogPosts';

// See the note in Blog.jsx: explicit colours instead of text-white / bg-brand-brown.

const isoMinutes = (m) => `PT${m}M`;

const Block = ({ block }) => {
    switch (block.type) {
        case 'h2':
            return <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-10 mb-3">{block.text}</h2>;
        case 'list':
            return (
                <ul className="my-4 space-y-2.5">
                    {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#8B4513] flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'tip':
            return (
                <div className="my-6 flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <Lightbulb size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 leading-relaxed">{block.text}</p>
                </div>
            );
        case 'image':
            return (
                <figure className="my-8 rounded-2xl overflow-hidden bg-[#fff] border border-gray-100">
                    <img src={block.src} alt={block.alt} className="w-full h-auto" loading="lazy" decoding="async" />
                </figure>
            );
        default:
            return <p className="text-gray-700 text-base md:text-lg leading-relaxed my-4">{block.text}</p>;
    }
};

const RecipeCard = ({ recipe }) => {
    const [checked, setChecked] = useState({});
    const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

    const stats = [
        { icon: Timer, label: 'Prep', value: `${recipe.prepTime} min` },
        { icon: Flame, label: 'Cook', value: `${recipe.cookTime} min` },
        { icon: Users, label: 'Makes', value: recipe.yield },
    ];

    return (
        <div id="recipe" className="mt-10 bg-[#fff] rounded-3xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-28">
            <div className="bg-[#5D2E0C] px-6 md:px-8 py-5 flex items-center gap-3">
                <ChefHat size={22} color="#F5DEB3" />
                <p className="text-lg md:text-xl font-semibold text-[#fff]">Recipe</p>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-100">
                {stats.map(({ icon: Icon, label, value }, i) => (
                    <div key={label} className={`p-4 md:p-5 text-center ${i ? 'border-l border-gray-100' : ''}`}>
                        <Icon size={18} className="mx-auto text-[#8B4513] mb-1.5" />
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
                        <p className="text-sm md:text-base font-semibold text-gray-900">{value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 p-6 md:p-8 bg-brand-cream/40 md:border-r border-gray-100">
                    <p className="text-lg font-semibold text-gray-900 mb-1">Ingredients</p>
                    <p className="text-xs text-gray-500 mb-4">Tap to tick off as you go</p>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((ing, i) => (
                            <li key={ing}>
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-start gap-3 text-left group"
                                >
                                    <span
                                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                            checked[i] ? 'bg-[#8B4513] border-[#8B4513]' : 'border-gray-300 group-hover:border-[#8B4513]'
                                        }`}
                                    >
                                        {checked[i] && <Check size={13} color="#fff" strokeWidth={3} />}
                                    </span>
                                    <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                        {ing}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-3 p-6 md:p-8">
                    <p className="text-lg font-semibold text-gray-900 mb-4">Method</p>
                    <ol className="space-y-5">
                        {recipe.steps.map((step, i) => (
                            <li key={step} className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#8B4513] text-[#fff] text-sm font-semibold flex items-center justify-center flex-shrink-0">
                                    {i + 1}
                                </span>
                                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                            </li>
                        ))}
                    </ol>

                    {recipe.tips?.length > 0 && (
                        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                            <p className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
                                <Lightbulb size={18} className="text-amber-600" /> Tips
                            </p>
                            <ul className="space-y-2">
                                {recipe.tips.map((t) => (
                                    <li key={t} className="text-sm text-gray-700 leading-relaxed">• {t}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const post = getPostBySlug(slug);
    const [copied, setCopied] = useState(false);

    const related = useMemo(() => {
        if (!post) return [];
        const same = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
        const others = blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category);
        return [...same, ...others].slice(0, 3);
    }, [post]);

    const jsonLd = useMemo(() => {
        if (!post) return null;
        const url = absoluteUrl(`/blog/${post.slug}`);
        const image = post.image ? absoluteUrl(post.image) : absoluteUrl(SITE.ogImage);
        const author = { '@type': 'Organization', name: SITE.name };
        const base = post.recipe
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'Recipe',
                  name: post.title,
                  description: post.excerpt,
                  image: [image],
                  author,
                  datePublished: post.date,
                  prepTime: isoMinutes(post.recipe.prepTime),
                  cookTime: isoMinutes(post.recipe.cookTime),
                  totalTime: isoMinutes(post.recipe.prepTime + post.recipe.cookTime),
                  recipeYield: post.recipe.yield,
                  recipeCuisine: 'Indian',
                  recipeIngredient: post.recipe.ingredients,
                  recipeInstructions: post.recipe.steps.map((text) => ({ '@type': 'HowToStep', text })),
              }
            : {
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: post.title,
                  description: post.excerpt,
                  image: [image],
                  author,
                  publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo) } },
                  datePublished: post.date,
                  mainEntityOfPage: url,
              };
        return [
            base,
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
                    { '@type': 'ListItem', position: 3, name: post.title, item: url },
                ],
            },
        ];
    }, [post]);

    if (!post) {
        return (
            <div className="pt-40 pb-20 bg-brand-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
                <Seo title="Post not found" path={`/blog/${slug}`} noindex />
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">Post not found</h1>
                <p className="text-gray-600 mb-6">This article may have moved or no longer exists.</p>
                <Link to="/blog" className="inline-flex items-center gap-2 text-[#8B4513] font-semibold">
                    <ArrowLeft size={18} /> Back to the blog
                </Link>
            </div>
        );
    }

    const handleShare = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url });
            } else {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            // user cancelled the share sheet
        }
    };

    return (
        <div className="pt-40 pb-20 bg-brand-cream min-h-screen">
            <Seo
                title={post.title}
                description={post.excerpt}
                path={`/blog/${post.slug}`}
                image={post.image || SITE.ogImage}
                type="article"
                jsonLd={jsonLd}
            />

            <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
                <article className="max-w-3xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                        <Link to="/" className="hover:text-[#8B4513]">Home</Link>
                        <span>/</span>
                        <Link to="/blog" className="hover:text-[#8B4513]">Blog</Link>
                        <span>/</span>
                        <span className="text-[#8B4513] truncate">{post.category}</span>
                    </nav>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">{post.title}</h1>
                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-brand-brown/10 py-4">
                            <div className="flex items-center gap-3">
                                <img src="/mfpelogo.jpeg" alt="" className="w-10 h-10 rounded-full border border-gray-200" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{BLOG_AUTHOR}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        {formatPostDate(post.date)} · <Clock size={12} /> {post.readTime} min read
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {post.recipe && (
                                    <a
                                        href="#recipe"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('recipe')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="inline-flex items-center gap-1.5 bg-[#8B4513] text-[#fff] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#5D2E0C] transition-colors"
                                    >
                                        <ChefHat size={16} /> Jump to recipe
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="inline-flex items-center gap-1.5 bg-[#fff] border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:border-[#8B4513]/40 hover:text-[#8B4513] transition-colors"
                                >
                                    <Share2 size={16} /> {copied ? 'Link copied' : 'Share'}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 aspect-[16/9] rounded-3xl overflow-hidden shadow-lg"
                    >
                        <BlogCover post={post} iconSize={110} eager />
                    </motion.div>

                    {/* Body */}
                    <div className="mt-8">
                        {post.body.map((block, i) => <Block key={i} block={block} />)}
                    </div>

                    {post.recipe && <RecipeCard recipe={post.recipe} />}

                    {/* Shop link */}
                    {post.shopCategory && (
                        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fff] border border-gray-100 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-cream text-[#8B4513] flex items-center justify-center flex-shrink-0">
                                    <ShoppingBag size={22} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Get the ingredients</p>
                                    <p className="text-sm text-gray-600">Shop our {post.shopCategory.toLowerCase()}.</p>
                                </div>
                            </div>
                            <Link
                                to={`/shop?category=${encodeURIComponent(post.shopCategory)}`}
                                className="inline-flex items-center justify-center gap-2 bg-[#8B4513] text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#5D2E0C] transition-colors"
                            >
                                Shop now <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}
                </article>

                {/* Related */}
                {related.length > 0 && (
                    <div className="max-w-6xl mx-auto mt-20">
                        <div className="flex items-end justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Keep reading</h2>
                            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B4513]">
                                All posts <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/blog/${p.slug}`}
                                    className="group bg-[#fff] rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                                            <BlogCover post={p} iconSize={56} />
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B4513] mb-1.5">{p.category}</p>
                                        <p className="font-semibold text-gray-900 leading-snug group-hover:text-[#8B4513] transition-colors">{p.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
