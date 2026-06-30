import { Bell, CalendarDays, Search, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const pageCopy = {
    '/': {
      title: 'Dashboard',
      subtitle: 'Overview of sales, stock, and customer activity',
    },
    '/products': {
      title: 'Products',
      subtitle: 'Catalog management, pricing, and stock control',
    },
    '/orders': {
      title: 'Orders',
      subtitle: 'Payment visibility and operational follow-up',
    },
    '/customers': {
      title: 'Customers',
      subtitle: 'Registration insights and purchase activity',
    },
    '/settings': {
      title: 'Settings',
      subtitle: 'Admin preferences and backend connectivity',
    },
  };

  const currentPage = pageCopy[location.pathname] || pageCopy['/'];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-6 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
            {currentPage.title}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {currentPage.subtitle}
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative min-w-[260px]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search the admin workspace"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex md:items-center md:gap-2">
              <CalendarDays size={17} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700">
                {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date())}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-500 transition hover:border-brand-red/20 hover:text-brand-red"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-red" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-500 transition hover:border-brand-red/20 hover:text-brand-red"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
