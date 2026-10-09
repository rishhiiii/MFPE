import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BadgeCheck, Loader2, Pencil, Trash2, MessageSquarePlus } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { StarDisplay, StarInput } from './StarRating';

// Note: index.css globally remaps .text-white / .bg-brand-brown, so explicit
// colours (text-[#fff], bg-[#8B4513]) are used here.

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const Summary = ({ summary }) => (
    <div className="bg-[#fff] rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 sm:items-center">
        <div className="text-center sm:pr-6 sm:border-r border-gray-100">
            <p className="text-5xl font-semibold text-gray-900 leading-none">{summary.average.toFixed(1)}</p>
            <StarDisplay value={summary.average} size={18} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">{summary.count} review{summary.count === 1 ? '' : 's'}</p>
        </div>
        <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
                const n = summary.breakdown[star] || 0;
                const pct = summary.count ? (n / summary.count) * 100 : 0;
                return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-10 text-gray-600">{star} ★</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-[#E0A100]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-gray-500">{n}</span>
                    </div>
                );
            })}
        </div>
    </div>
);

const ReviewForm = ({ productId, existing, onSaved, onCancel }) => {
    const [rating, setRating] = useState(existing?.rating || 0);
    const [comment, setComment] = useState(existing?.comment || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!rating) return setError('Please choose a star rating.');
        if (comment.trim().length < 3) return setError('Please write a few words about the product.');
        setSaving(true);
        try {
            await api.post(`/api/products/${productId}/reviews`, { rating, comment: comment.trim() });
            onSaved();
        } catch (err) {
            setError(err.response?.data?.message || 'Could not save your review. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={submit} className="bg-[#fff] rounded-2xl border border-gray-100 p-6 space-y-4">
            <p className="text-lg font-semibold text-gray-900">{existing ? 'Edit your review' : 'Write a review'}</p>
            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</p>}
            <StarInput value={rating} onChange={setRating} />
            <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    placeholder="What did you like or dislike? How was the taste and quality?"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] outline-none text-gray-900 resize-none"
                />
                <p className="text-right text-xs text-gray-400">{comment.length}/1000</p>
            </div>
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-[#8B4513] text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#5D2E0C] transition-colors disabled:opacity-60"
                >
                    {saving && <Loader2 size={16} className="animate-spin" />} {existing ? 'Update review' : 'Submit review'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl font-semibold text-gray-600 hover:text-gray-900">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

/**
 * Reviews block for a product page.
 * onSummaryChange(summary) lets the page update its rating display after a change.
 */
const ProductReviews = ({ productId, productName, onSummaryChange }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

    const load = useCallback(() => {
        api.get(`/api/products/${productId}/reviews`)
            .then(({ data: d }) => {
                setData(d);
                onSummaryChange?.(d.summary);
            })
            .catch(() => setError('Could not load reviews.'));
    }, [productId, onSummaryChange]);

    useEffect(() => { load(); }, [load]);

    const myReview = user && data?.reviews.find((r) => String(r.user) === String(user._id));
    const isAdmin = user?.role === 'admin';

    const remove = async (review) => {
        const mine = String(review.user) === String(user?._id);
        if (!window.confirm(mine ? 'Delete your review?' : `Delete this review by ${review.name}?`)) return;
        try {
            await api.delete(`/api/products/${productId}/reviews/${review._id}`);
            setEditing(false);
            load();
        } catch (err) {
            alert(err.response?.data?.message || 'Could not delete the review.');
        }
    };

    if (error) return <p className="text-gray-500">{error}</p>;
    if (!data) {
        return (
            <div className="flex justify-center py-12 text-[#8B4513]">
                <Loader2 size={26} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {data.summary.count > 0 && <Summary summary={data.summary} />}

            {/* Write / edit */}
            {!user ? (
                <div className="bg-[#fff] rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <MessageSquarePlus size={22} className="text-[#8B4513] flex-shrink-0" />
                        <p className="text-gray-700">
                            {data.summary.count ? 'Tried it? ' : 'No reviews yet. '}
                            Share your experience with {productName}.
                        </p>
                    </div>
                    <Link
                        to="/login"
                        state={{ from: location.pathname }}
                        className="inline-flex items-center justify-center bg-[#8B4513] text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#5D2E0C] transition-colors whitespace-nowrap"
                    >
                        Log in to review
                    </Link>
                </div>
            ) : !myReview || editing ? (
                <ReviewForm
                    productId={productId}
                    existing={myReview}
                    onSaved={() => { setEditing(false); load(); }}
                    onCancel={myReview ? () => setEditing(false) : null}
                />
            ) : null}

            {data.summary.count === 0 && user && (
                <p className="text-sm text-gray-500">No reviews yet. Be the first to review {productName}.</p>
            )}

            {/* List */}
            <div className="space-y-4">
                {data.reviews.map((r) => {
                    const mine = user && String(r.user) === String(user._id);
                    if (mine && editing) return null;
                    return (
                        <div key={r._id} className={`bg-[#fff] rounded-2xl border p-5 ${mine ? 'border-[#8B4513]/30' : 'border-gray-100'}`}>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="w-9 h-9 rounded-full bg-brand-cream text-[#8B4513] font-semibold flex items-center justify-center">
                                    {r.name.charAt(0).toUpperCase()}
                                </span>
                                <span className="font-semibold text-gray-900">{r.name}{mine && <span className="text-xs text-gray-500 font-normal"> (you)</span>}</span>
                                {r.verifiedPurchase && (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        <BadgeCheck size={13} /> Verified purchase
                                    </span>
                                )}
                                <span className="ml-auto text-xs text-gray-500">{formatDate(r.createdAt)}</span>
                            </div>
                            <StarDisplay value={r.rating} size={15} className="mt-3" />
                            <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">{r.comment}</p>
                            {(mine || isAdmin) && (
                                <div className="mt-3 flex gap-4 text-sm">
                                    {mine && (
                                        <button type="button" onClick={() => setEditing(true)} className="inline-flex items-center gap-1 text-[#8B4513] font-semibold hover:underline">
                                            <Pencil size={14} /> Edit
                                        </button>
                                    )}
                                    <button type="button" onClick={() => remove(r)} className="inline-flex items-center gap-1 text-red-600 font-semibold hover:underline">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductReviews;
