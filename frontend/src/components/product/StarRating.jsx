import React from 'react';
import { Star } from 'lucide-react';

const FILLED = '#E0A100';
const EMPTY = '#D9D2C3';

// Read-only star display; supports fractions (e.g. 4.3 fills 30% of the 5th star).
export const StarDisplay = ({ value = 0, size = 16, className = '' }) => (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => {
            const fill = Math.max(0, Math.min(1, value - (i - 1)));
            return (
                <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
                    <Star size={size} color={EMPTY} fill={EMPTY} strokeWidth={1.5} className="absolute inset-0" />
                    {fill > 0 && (
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                            <Star size={size} color={FILLED} fill={FILLED} strokeWidth={1.5} />
                        </span>
                    )}
                </span>
            );
        })}
    </span>
);

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

// Clickable 1–5 star picker for the review form.
export const StarInput = ({ value, onChange, size = 30 }) => {
    const [hover, setHover] = React.useState(0);
    const shown = hover || value;
    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-1" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Your rating">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={value === i}
                        aria-label={`${i} star${i > 1 ? 's' : ''}`}
                        onMouseEnter={() => setHover(i)}
                        onClick={() => onChange(i)}
                        className="transition-transform hover:scale-110"
                    >
                        <Star size={size} color={i <= shown ? FILLED : EMPTY} fill={i <= shown ? FILLED : 'none'} strokeWidth={1.5} />
                    </button>
                ))}
            </div>
            <span className="text-sm font-semibold text-gray-600 min-w-[5rem]">{LABELS[shown]}</span>
        </div>
    );
};
