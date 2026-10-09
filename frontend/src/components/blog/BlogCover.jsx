import React from 'react';
import { Coffee, Cookie, CircleDot, CookingPot, Soup, Factory, Leaf } from 'lucide-react';

const ICONS = { Coffee, Cookie, CircleDot, CookingPot, Soup, Factory, Leaf };

// A post's cover: its photo when it has one, otherwise an illustrated cover
// (warm gradient + large icon) so posts without photography still look finished.
const BlogCover = ({ post, className = '', iconSize = 72, eager = false }) => {
    if (post.image) {
        return (
            <img
                src={post.image}
                alt={post.title}
                className={`w-full h-full object-cover ${className}`}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
            />
        );
    }

    const { icon = 'Leaf', from = '#7c3f12', to = '#c07a3a' } = post.cover || {};
    const Icon = ICONS[icon] || Leaf;

    return (
        <div
            role="img"
            aria-label={post.title}
            className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
            {/* soft dotted texture */}
            <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <Icon size={iconSize} strokeWidth={1.4} color="rgba(255,255,255,0.92)" className="relative drop-shadow-lg" />
        </div>
    );
};

export default BlogCover;
