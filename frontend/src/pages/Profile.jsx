import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
    Package, User as UserIcon, MapPin, Lock, LogOut, ChevronDown, Truck,
    CheckCircle2, AlertCircle, ShoppingBag, Loader2,
} from 'lucide-react';
import api, { API_BASE_URL } from '../lib/api';
import { optimizeCloudinaryUrl } from '../lib/image';
import { useAuth } from '../context/AuthContext';
import jaggery1 from '../assets/jaggery1.jpeg';

// Note: index.css globally remaps .text-white, .bg-brand-brown and <h3> sizes,
// so this page uses explicit colours (text-[#fff], bg-[#8B4513]) and <p> labels.

const TABS = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'details', label: 'Profile', icon: UserIcon },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'password', label: 'Password', icon: Lock },
];

const STATUS_STYLES = {
    Pending: 'bg-gray-100 text-gray-700',
    Processing: 'bg-amber-100 text-amber-800',
    Shipped: 'bg-sky-100 text-sky-800',
    Delivered: 'bg-emerald-100 text-emerald-800',
    Cancelled: 'bg-red-100 text-red-700',
};

const money = (n) => `₹${(Number(n) || 0).toFixed(2)}`;
// Same reference format as the confirmation emails.
const orderRef = (id) => `MF-${String(id).slice(-8).toUpperCase()}`;
const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const itemImage = (path) => {
    if (!path) return jaggery1;
    if (path.startsWith('http')) return optimizeCloudinaryUrl(path, 120);
    if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`;
    return path;
};

const inputClass =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] outline-none text-gray-900 transition-all disabled:opacity-60';

const Input = ({ label, ...props }) => (
    <label className="block">
        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</span>
        <input className={inputClass} {...props} />
    </label>
);

const Notice = ({ notice }) =>
    notice ? (
        <div
            className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm ${
                notice.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
        >
            {notice.type === 'error' ? <AlertCircle size={18} className="flex-shrink-0 mt-0.5" /> : <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />}
            {notice.text}
        </div>
    ) : null;

const SaveButton = ({ saving, children }) => (
    <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 bg-[#8B4513] text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#5D2E0C] transition-colors disabled:opacity-60"
    >
        {saving && <Loader2 size={16} className="animate-spin" />} {children}
    </button>
);

// ------------------------------------------------------------------ orders --

const OrderCard = ({ order, defaultOpen }) => {
    const [open, setOpen] = useState(defaultOpen);
    const a = order.shippingAddress || {};
    const itemCount = order.orderItems.reduce((n, it) => n + it.qty, 0);

    return (
        <div className="bg-[#fff] rounded-2xl border border-gray-100 overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full text-left p-5 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
                <div className="min-w-[8rem]">
                    <p className="text-xs text-gray-500">Order</p>
                    <p className="font-semibold text-[#8B4513]">{orderRef(order._id)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Placed on</p>
                    <p className="font-semibold text-gray-900">{formatDate(order.paidAt || order.createdAt)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-semibold text-gray-900">{money(order.totalPrice)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || STATUS_STYLES.Pending}`}>
                    {order.status}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 text-sm text-gray-500">
                    {itemCount} item{itemCount === 1 ? '' : 's'}
                    <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-gray-100 p-5 grid gap-6 md:grid-cols-5">
                            <div className="md:col-span-3 space-y-3">
                                {order.orderItems.map((it) => (
                                    <div key={`${it.product}-${it.name}`} className="flex items-center gap-3">
                                        <img src={itemImage(it.image)} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-50" loading="lazy" />
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${it.product}`} className="font-semibold text-gray-900 hover:text-[#8B4513] line-clamp-1">
                                                {it.name}
                                            </Link>
                                            <p className="text-xs text-gray-500">Qty {it.qty} × {money(it.price)}</p>
                                        </div>
                                        <p className="font-semibold text-gray-900">{money(it.price * it.qty)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <div className="bg-brand-cream/50 rounded-xl p-4 text-sm space-y-1.5">
                                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{money(order.itemsPrice)}</span></div>
                                    {order.taxPrice > 0 && (
                                        <div className="flex justify-between text-gray-600"><span>GST</span><span>{money(order.taxPrice)}</span></div>
                                    )}
                                    <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{money(order.shippingPrice)}</span></div>
                                    <div className="flex justify-between font-semibold text-gray-900 pt-1.5 border-t border-brand-brown/10">
                                        <span>Total paid</span><span>{money(order.totalPrice)}</span>
                                    </div>
                                </div>
                                {order.trackingNumber && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Truck size={18} className="text-[#8B4513] flex-shrink-0" />
                                        <p className="text-gray-700">Tracking number: <span className="font-semibold">{order.trackingNumber}</span></p>
                                    </div>
                                )}
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900 mb-1">Delivery address</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {a.name}<br />{a.address}<br />{a.city}, {a.state} {a.pincode}<br />{a.phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OrdersTab = () => {
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/api/payment/my-orders')
            .then(({ data }) => setOrders(data))
            .catch((err) => setError(err.response?.data?.message || 'Could not load your orders.'));
    }, []);

    if (error) return <Notice notice={{ type: 'error', text: error }} />;
    if (!orders) {
        return (
            <div className="flex justify-center py-16 text-[#8B4513]">
                <Loader2 size={28} className="animate-spin" />
            </div>
        );
    }
    if (orders.length === 0) {
        return (
            <div className="bg-[#fff] rounded-2xl border border-gray-100 p-10 text-center">
                <ShoppingBag size={40} className="mx-auto text-[#8B4513] mb-3" />
                <p className="text-lg font-semibold text-gray-900 mb-1">No orders yet</p>
                <p className="text-sm text-gray-600 mb-6">When you place an order, it will show up here.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-[#8B4513] text-[#fff] px-6 py-3 rounded-xl font-semibold hover:bg-[#5D2E0C] transition-colors">
                    Start shopping
                </Link>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {orders.map((o, i) => <OrderCard key={o._id} order={o} defaultOpen={i === 0} />)}
        </div>
    );
};

// ----------------------------------------------------------------- details --

const DetailsTab = ({ user, updateProfile }) => {
    const [form, setForm] = useState({ name: user.name || '', phone: user.phone || '' });
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return setNotice({ type: 'error', text: 'Name cannot be empty.' });
        if (form.phone && !/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) {
            return setNotice({ type: 'error', text: 'Please enter a valid phone number.' });
        }
        setSaving(true);
        const res = await updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
        setSaving(false);
        setNotice(res.success ? { type: 'success', text: 'Profile updated.' } : { type: 'error', text: res.message });
    };

    return (
        <form onSubmit={submit} className="bg-[#fff] rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
            <div>
                <p className="text-lg font-semibold text-gray-900">Personal details</p>
                <p className="text-sm text-gray-500">Used to pre-fill checkout and for delivery updates.</p>
            </div>
            <Notice notice={notice} />
            <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Phone" type="tel" value={form.phone} placeholder="+91 98765 43210" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input label="Email" type="email" value={user.email || ''} disabled />
            </div>
            <SaveButton saving={saving}>Save changes</SaveButton>
        </form>
    );
};

// ----------------------------------------------------------------- address --

const AddressTab = ({ user, updateProfile }) => {
    const [form, setForm] = useState({
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
    });
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState(null);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
            return setNotice({ type: 'error', text: 'Pincode should be 6 digits.' });
        }
        setSaving(true);
        const res = await updateProfile({ address: { ...form, country: 'India' } });
        setSaving(false);
        setNotice(res.success ? { type: 'success', text: 'Address saved. It will be filled in for you at checkout.' } : { type: 'error', text: res.message });
    };

    return (
        <form onSubmit={submit} className="bg-[#fff] rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
            <div>
                <p className="text-lg font-semibold text-gray-900">Saved address</p>
                <p className="text-sm text-gray-500">We'll fill this in for you at checkout.</p>
            </div>
            <Notice notice={notice} />
            <Input label="House no., street, area" value={form.street} onChange={set('street')} />
            <div className="grid gap-4 sm:grid-cols-3">
                <Input label="City" value={form.city} onChange={set('city')} />
                <Input label="State" value={form.state} onChange={set('state')} />
                <Input label="Pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={set('pincode')} />
            </div>
            <SaveButton saving={saving}>Save address</SaveButton>
        </form>
    );
};

// ---------------------------------------------------------------- password --

const PasswordTab = ({ updateProfile, readOnly }) => {
    const [form, setForm] = useState({ currentPassword: '', password: '', confirm: '' });
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState(null);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    if (readOnly) {
        return (
            <div className="bg-[#fff] rounded-2xl border border-gray-100 p-8 text-sm text-gray-600">
                You signed in with Google, so there's no password to change here.
            </div>
        );
    }

    const submit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) return setNotice({ type: 'error', text: 'New password must be at least 6 characters.' });
        if (form.password !== form.confirm) return setNotice({ type: 'error', text: "New passwords don't match." });
        setSaving(true);
        const res = await updateProfile({ currentPassword: form.currentPassword, password: form.password });
        setSaving(false);
        if (res.success) {
            setForm({ currentPassword: '', password: '', confirm: '' });
            setNotice({ type: 'success', text: 'Password changed.' });
        } else {
            setNotice({ type: 'error', text: res.message });
        }
    };

    return (
        <form onSubmit={submit} className="bg-[#fff] rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5 max-w-xl">
            <p className="text-lg font-semibold text-gray-900">Change password</p>
            <Notice notice={notice} />
            <Input label="Current password" type="password" autoComplete="current-password" value={form.currentPassword} onChange={set('currentPassword')} required />
            <Input label="New password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required />
            <Input label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
            <SaveButton saving={saving}>Update password</SaveButton>
        </form>
    );
};

// -------------------------------------------------------------------- page --

const Profile = () => {
    const { user, loading, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [memberSince, setMemberSince] = useState(null);

    const activeTab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'orders';
    // Accounts created with "Sign in with Google" have no password to change.
    const isGoogleAccount = user?.authProvider === 'google';

    useEffect(() => {
        if (!loading && !user) navigate('/login', { replace: true, state: { from: '/profile' } });
    }, [loading, user, navigate]);

    useEffect(() => {
        if (!user) return;
        api.get('/api/auth/me')
            .then(({ data }) => setMemberSince(data?.createdAt))
            .catch((err) => {
                // Saved login has expired or the account no longer exists.
                if (err.response?.status === 401) {
                    logout();
                }
            });
    }, [user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading || !user) return <div className="min-h-screen bg-brand-cream" />;

    const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    return (
        <div className="pt-40 pb-20 bg-brand-cream min-h-screen">
            <div className="max-w-6xl mx-auto px-6 sm:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#5D2E0C] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 relative overflow-hidden"
                >
                    <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-brand-gold blur-[90px] opacity-25" />
                    <div className="relative w-16 h-16 rounded-2xl bg-[#FFF8DC] text-[#8B4513] text-2xl font-semibold flex items-center justify-center flex-shrink-0">
                        {initials}
                    </div>
                    <div className="relative flex-1 min-w-0">
                        <p className="text-2xl font-semibold text-[#fff] truncate">{user.name}</p>
                        <p className="text-sm text-[#fff]/75 truncate">{user.email}</p>
                        {memberSince && <p className="text-xs text-[#fff]/60 mt-1">Member since {formatDate(memberSince)}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={() => { logout(); navigate('/'); }}
                        className="relative inline-flex items-center gap-2 self-start sm:self-center border border-[#fff]/30 text-[#fff] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#fff]/10 transition-colors"
                    >
                        <LogOut size={16} /> Log out
                    </button>
                </motion.div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
                    {/* Tabs */}
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
                        {TABS.map(({ id, label, icon: Icon }) => {
                            const active = id === activeTab;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setSearchParams(id === 'orders' ? {} : { tab: id }, { replace: true })}
                                    className={`flex items-center gap-2.5 whitespace-nowrap px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                                        active ? 'bg-[#8B4513] text-[#fff]' : 'bg-[#fff] text-gray-700 hover:text-[#8B4513] border border-gray-100'
                                    }`}
                                >
                                    <Icon size={18} /> {label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Content */}
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        {activeTab === 'orders' && <OrdersTab />}
                        {activeTab === 'details' && <DetailsTab user={user} updateProfile={updateProfile} />}
                        {activeTab === 'address' && <AddressTab user={user} updateProfile={updateProfile} />}
                        {activeTab === 'password' && <PasswordTab updateProfile={updateProfile} readOnly={isGoogleAccount} />}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
