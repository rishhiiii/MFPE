import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Plus, 
    Trash2, 
    Package, 
    TrendingUp, 
    DollarSign, 
    ShoppingCart, 
    Users,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jaggery1 from '../assets/jaggery1.jpeg';
import jaggery2 from '../assets/jaggery2.jpeg';
import jaggery3 from '../assets/jaggery3.jpeg';

const getProductImage = (imagePath) => {
    const imageMap = {
        '/src/assets/jaggery1.jpeg': jaggery1,
        '/src/assets/jaggery2.jpeg': jaggery2,
        '/src/assets/jaggery3.jpeg': jaggery3
    };
    return imageMap[imagePath] || imagePath || 'https://via.placeholder.com/400';
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: 'Jaggery', image: '', stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', formData);
            setFormData({ name: '', description: '', price: '', category: 'Jaggery', image: '', stock: '' });
            fetchProducts();
            setIsAddAddModalOpen(false);
            alert("Product added successfully!");
        } catch (error) {
            alert("Error adding product");
        }
    };

    const stats = [
        { label: 'Total Revenue', value: '₹1,24,500', icon: <DollarSign />, trend: '+12.5%', isUp: true, color: 'red' },
        { label: 'Active Orders', value: '48', icon: <ShoppingCart />, trend: '+5.2%', isUp: true, color: 'red' },
        { label: 'Total Products', value: products.length.toString(), icon: <Package />, trend: '0%', isUp: true, color: 'red' },
        { label: 'New Customers', value: '1,204', icon: <Users />, trend: '-2.4%', isUp: false, color: 'red' },
    ];

    return (
        <div className="p-10 space-y-10">
            {/* Page Title */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAddAddModalOpen(true)}
                    className="bg-brand-red text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-red-900/20 hover:bg-brand-darkRed transition-all"
                >
                    <Plus size={22} /> Add New Product
                </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.trend} {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-bold text-sm uppercase tracking-widest">{stat.label}</h3>
                        <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Product Management Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h2 className="text-xl font-black text-gray-900">Inventory Status</h2>
                            <p className="text-sm text-gray-500 font-medium">Manage your products and stock levels</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm transition-all">
                                <Search size={18} />
                            </button>
                            <button className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm transition-all">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100">
                                    <th className="px-8 py-5">Product</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5">Stock</th>
                                    <th className="px-8 py-5">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                                    <img src={getProductImage(product.image)} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <span className="font-bold text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-black uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 font-black text-gray-900">₹{product.price}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                <span className="font-bold text-gray-600">{product.stock} units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <button className="p-2.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-black text-gray-900 mb-8">Recent Orders</h2>
                    <div className="space-y-8">
                        {[
                            { user: 'Suresh Kumar', amount: '₹1,240', time: '2 mins ago', status: 'Processing' },
                            { user: 'Meena Devi', amount: '₹840', time: '15 mins ago', status: 'Completed' },
                            { user: 'Rahul Jain', amount: '₹3,400', time: '1 hour ago', status: 'Completed' },
                            { user: 'Anjali Shah', amount: '₹560', time: '3 hours ago', status: 'Cancelled' },
                        ].map((order, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-red-50 group-hover:text-brand-red transition-colors">
                                    {order.user[0]}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold text-gray-900">{order.user}</h4>
                                        <span className="font-black text-gray-900">{order.amount}</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <span className="text-xs font-medium text-gray-400">{order.time}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                                            order.status === 'Completed' ? 'text-brand-red' : 
                                            order.status === 'Cancelled' ? 'text-rose-500' : 'text-brand-red'
                                        }`}>{order.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-12 py-4 rounded-2xl border-2 border-gray-50 text-gray-400 font-bold hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center justify-center gap-2">
                        View All Orders <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddAddModalOpen(false)}
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden"
                        >
                            <div className="p-10">
                                <h2 className="text-3xl font-black text-gray-900 mb-2">New Product</h2>
                                <p className="text-gray-500 font-medium mb-10">Add a professional listing to your store.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                                            <input 
                                                type="text" placeholder="e.g. Premium Jaggery" 
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold"
                                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                            <select 
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold appearance-none"
                                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                                            >
                                                <option value="Jaggery">Jaggery</option>
                                                <option value="Papad">Papad</option>
                                                <option value="Spices">Spices</option>
                                                <option value="Sweets">Sweets</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea 
                                            placeholder="Write a compelling description..." 
                                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold h-32 resize-none"
                                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                            <input 
                                                type="number" placeholder="0.00" 
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold"
                                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Units</label>
                                            <input 
                                                type="number" placeholder="0" 
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold"
                                                value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                                        <input 
                                            type="text" placeholder="https://unsplash.com/..." 
                                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold"
                                            value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button"
                                            onClick={() => setIsAddAddModalOpen(false)}
                                            className="flex-grow py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            className="flex-[2] bg-brand-red text-white py-5 rounded-2xl font-black shadow-xl shadow-red-900/20 hover:bg-brand-darkRed transition-all"
                                        >
                                            Publish Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
