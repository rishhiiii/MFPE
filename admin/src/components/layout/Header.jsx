import React from 'react';
import { Search, Bell, Moon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
            <div className="flex-grow max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Quick search anything..."
                        className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm text-gray-900 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:text-brand-red transition-colors relative"
                >
                    <Bell size={22} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-red border-2 border-white rounded-full" />
                </motion.button>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <Moon size={22} />
                </motion.button>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <Settings size={22} />
                </motion.button>
            </div>
        </header>
    );
};

export default Header;
