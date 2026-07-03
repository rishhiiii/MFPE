import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, Users as UsersIcon, LayoutDashboard,
  LogOut, IndianRupee, TrendingUp, Boxes, Mail, Settings as SettingsIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminMessages from './AdminMessages';
import AdminSettings from './AdminSettings';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">{label}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    const { data } = await api.get('/api/products');
    setProducts(Array.isArray(data) ? data : []);
  }, []);
  const fetchOrders = useCallback(async () => {
    const { data } = await api.get('/api/payment/orders');
    setOrders(Array.isArray(data) ? data : []);
  }, []);
  const fetchUsers = useCallback(async () => {
    const { data } = await api.get('/api/auth/users');
    setUsers(Array.isArray(data) ? data : []);
  }, []);
  const fetchMessages = useCallback(async () => {
    const { data } = await api.get('/api/contact');
    setMessages(Array.isArray(data) ? data : []);
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([fetchProducts(), fetchOrders(), fetchUsers(), fetchMessages()]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [fetchProducts, fetchOrders, fetchUsers, fetchMessages]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleLogout = () => { logout(); navigate('/'); };

  const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const lowStock = products.filter((p) => (p.stock ?? 0) <= 5).length;
  const unreadMsgs = messages.filter((m) => !m.isRead).length;
  const pendingOrders = orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;

  const TABS = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'products', label: 'Products', icon: Package, badge: products.length },
    { key: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrders || null },
    { key: 'users', label: 'Customers', icon: UsersIcon },
    { key: 'messages', label: 'Messages', icon: Mail, badge: unreadMsgs || null },
    { key: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 font-medium mt-1">
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'} — manage your store here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-colors w-fit"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-gray-200">
          {TABS.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                activeTab === key ? 'bg-[#8B4513] text-[#FFF8DC]' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} /> {label}
              {badge ? (
                <span className={`ml-0.5 min-w-5 h-5 px-1.5 rounded-full text-[11px] font-black flex items-center justify-center ${
                  activeTab === key ? 'bg-[#FFF8DC] text-[#8B4513]' : 'bg-[#8B4513] text-[#FFF8DC]'
                }`}>{badge}</span>
              ) : null}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-3.5 rounded-2xl font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-[#F5DEB3] border-t-[#8B4513] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Package} label="Products" value={products.length} accent="bg-amber-100 text-amber-700" />
                  <StatCard icon={ShoppingBag} label="Paid Orders" value={orders.length} accent="bg-green-100 text-green-700" />
                  <StatCard icon={IndianRupee} label="Revenue" value={`₹${revenue.toLocaleString('en-IN')}`} accent="bg-blue-100 text-blue-700" />
                  <StatCard icon={UsersIcon} label="Customers" value={users.length} accent="bg-purple-100 text-purple-700" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <button onClick={() => setActiveTab('products')} className="text-left bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#8B4513]/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Boxes size={20} className="text-[#8B4513]" />
                      <h3 className="font-bold text-gray-900">Inventory</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-bold text-gray-900">{lowStock}</span> product(s) low on stock (≤ 5).
                    </p>
                  </button>

                  <button onClick={() => setActiveTab('orders')} className="text-left bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#8B4513]/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={20} className="text-[#8B4513]" />
                      <h3 className="font-bold text-gray-900">Orders to fulfil</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-bold text-gray-900">{pendingOrders}</span> order(s) awaiting shipment.
                    </p>
                  </button>

                  <button onClick={() => setActiveTab('messages')} className="text-left bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#8B4513]/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail size={20} className="text-[#8B4513]" />
                      <h3 className="font-bold text-gray-900">Messages</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-bold text-gray-900">{unreadMsgs}</span> unread enquiry(ies).
                    </p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'products' && <AdminProducts products={products} onRefresh={fetchProducts} />}
            {activeTab === 'orders' && <AdminOrders orders={orders} onRefresh={fetchOrders} />}
            {activeTab === 'users' && <AdminUsers users={users} currentUserId={user?._id} onRefresh={fetchUsers} />}
            {activeTab === 'messages' && <AdminMessages messages={messages} onRefresh={fetchMessages} />}
            {activeTab === 'settings' && <AdminSettings />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
