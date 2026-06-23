import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe, MessageCircle } from 'lucide-react';
import mfpeLogo from '../../assets/mfpelogo.jpeg';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-brand-light to-brand-cream text-gray-900 pt-24 pb-12 rounded-t-[4rem] mx-4 mt-20 border-t border-brand-brown/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
                            <div className="p-0 rounded-full overflow-hidden bg-white shadow-lg border border-brand-brown/20">
                                <img src={mfpeLogo} alt="Mahaveer Food Products" className="w-12 h-12 object-cover rounded-full" />
                            </div>
                            <span>MAHAVEER<span className="text-brand-brown">FOOD</span></span>
                        </Link>
                        <p className="text-gray-700 leading-relaxed font-body">
                            "Bringing Nature's Best to the World."
                        </p>
                        <p className="text-gray-600 text-sm font-body">
                            Premium Organic Products | FMCG Solutions | Wholesale Supply | Global Export
                        </p>
                        <div className="flex gap-4">
                            {[Share2, Globe, MessageCircle].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 bg-brand-brown/10 rounded-xl flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                                    <Icon size={20} className="text-brand-brown" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl  font-bold mb-8 text-gray-900">Quick Links</h3>
                        <ul className="space-y-4 text-gray-700 font-body font-medium">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Shop', path: '/shop' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Services', path: '/services' },
                                { name: 'Blog', path: '/blog' },
                                { name: 'Export', path: '/export' },
                                { name: 'Wholesale', path: '/wholesale' },
                                { name: 'Contact Us', path: '/contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path} 
                                        className="hover:text-brand-brown transition-colors flex items-center gap-2"
                                    >
                                        <div className="w-1.5 h-1.5 bg-brand-brown rounded-full" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-xl  font-bold mb-8 text-gray-900">Categories</h3>
                        <ul className="space-y-4 text-gray-700 font-body font-medium">
                            {['Organic Superfoods', 'Spices & Seasonings', 'Natural Sweeteners', 'Pulses & Grains', 'Dry Fruits & Nuts', 'FMCG Products'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-brand-brown transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-brand-brown rounded-full" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl  font-bold mb-8 text-gray-900">Get In Touch</h3>
                        <ul className="space-y-6 text-gray-700 font-body font-medium">
                            <li className="flex items-start gap-4">
                                <div className="bg-brand-brown/10 p-2.5 rounded-xl text-brand-brown">
                                    <MapPin size={20} />
                                </div>
                                <span>India</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-brand-brown/10 p-2.5 rounded-xl text-brand-brown">
                                    <Phone size={20} />
                                </div>
                                <span>+91 9669993888</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-brand-brown/10 p-2.5 rounded-xl text-brand-brown">
                                    <Mail size={20} />
                                </div>
                                <span>mahaveermfpe@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-brand-brown/20 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 font-body font-medium">
                    <p>© 2026 Mahaveer Food Products & Exporters. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-brand-brown transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-brown transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-brand-brown transition-colors">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
