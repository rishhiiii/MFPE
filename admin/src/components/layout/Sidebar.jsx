import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import mfpeLogo from '../../assets/mfpelogo.jpeg';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Products', icon: <Package size={20} />, path: '/products' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
    { name: 'Customers', icon: <Users size={20} />, path: '/customers' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-slate-200 bg-white lg:fixed lg:left-0 lg:top-0 lg:flex">
      <div className="border-b border-slate-100 p-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden rounded-full shadow-lg shadow-brand-red/10 transition-transform group-hover:scale-105">
            <img
              src={mfpeLogo}
              alt="Mahaveer Food"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black leading-none tracking-tight text-slate-900">
              Admin<span className="text-brand-red">Hub</span>
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Mahaveer Food
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition ${
                isActive
                  ? 'border border-brand-red/10 bg-brand-cream text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-2xl p-2 transition ${
                    isActive
                      ? 'bg-white text-brand-red shadow-sm'
                      : 'bg-slate-100 text-slate-500 group-hover:text-brand-red'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-black">{item.name}</span>
              </div>
              {isActive ? (
                <motion.div layoutId="sidebarIndicator" className="text-brand-red">
                  <ChevronRight size={16} />
                </motion.div>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 p-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cream font-black text-brand-red">
              AD
            </div>
            <div className="flex-grow">
              <p className="truncate text-sm font-black text-slate-900">Admin User</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Store operations
              </p>
            </div>
            <button
              type="button"
              className="rounded-2xl p-2 text-slate-500 transition hover:bg-white hover:text-brand-red"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
