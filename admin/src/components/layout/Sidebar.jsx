import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    Settings, 
    LogOut, 
    Bell,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import mfpeLogo from '../../assets/mfpelogo.jpeg';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/' },
        { name: 'Products', icon: <Package size={22} />, path: '/products' },
        { name: 'Orders', icon: <ShoppingCart size={22} />, path: '/orders' },
        { name: 'Customers', icon: <Users size={22} />, path: '/customers' },
        { name: 'Store Settings', icon: <Settings size={22} />, path: '/settings' },
    ];

    return (
        <div className="w-72 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
            {/* Logo */}
            <div className="p-8">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="p-0 rounded-full overflow-hidden shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform">
                        <img src={mfpeLogo} alt="Mahaveer Food" className="w-12 h-12 object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tight leading-none">ADMIN<span className="text-brand-red">PRO</span></span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Mahaveer Food</span>
                    </div>
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link 
                        key={item.name} 
                        to={item.path}
                        className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                            location.pathname === item.path 
                            ? 'bg-brand-red text-white shadow-lg shadow-red-900/20' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`${location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-brand-red'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="font-bold text-sm">{item.name}</span>
                        </div>
                        {location.pathname === item.path && (
                            <motion.div layoutId="sidebarDot">
                                <ChevronRight size={16} />
                            </motion.div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* User Info */}
            <div className="p-6 mt-auto border-t border-white/5">
                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-red flex items-center justify-center font-black text-white">
                        AD
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-black truncate">Admin User</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Super Admin</p>
                    </div>
                    <button className="text-gray-500 hover:text-brand-red transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
