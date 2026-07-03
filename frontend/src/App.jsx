import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Export from './pages/Export';
import Wholesale from './pages/Wholesale';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/admin/AdminRoute';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen relative">
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/export" element={<Export />} />
                  <Route path="/wholesale" element={<Wholesale />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-8 right-8 z-50 group">
              {/* Tooltip */}
              <div className="absolute -left-48 bottom-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                <span className="text-sm font-bold text-gray-800">Chat with us on WhatsApp!</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45"></div>
              </div>
              
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919669993888?text=Hello%20Mahaveer%20Food%20Products!%20I%20have%20a%20query."
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
                aria-label="Contact us on WhatsApp"
              >
                {/* Animated Double Pulse Rings */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
                <div className="absolute -inset-1 bg-[#25D366] rounded-full animate-ping opacity-10" style={{ animationDelay: '0.75s' }}></div>
                
                {/* Main Button Container */}
                <div className="relative bg-gradient-to-br from-[#25D366] via-[#20BD5A] to-[#1EBE53] text-white p-4 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-115 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] active:scale-95">
                  {/* WhatsApp Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="white"
                    className="drop-shadow-md"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.15 1.57 5.94L0 24l6.26-1.6C8 23.45 9.94 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm6.63 17.43c-.27.77-1.57 1.46-2.2 1.48-.58.02-1.33.04-2.14-.13-.48-.1-1.09-.35-1.87-.73-3.28-1.58-5.42-5.3-5.57-5.56-.15-.25-1.23-1.64-1.23-3.13 0-1.48.78-2.21 1.06-2.52.27-.31.59-.39.79-.39.2 0 .4 0 .58.01.19.01.44-.07.69.52.26.63.88 2.18.96 2.34.08.16.13.35.02.56-.11.21-.17.35-.33.53-.16.19-.34.42-.48.57-.16.17-.33.36-.14.7.19.34.84 1.38 1.8 2.24 1.23 1.12 2.26 1.47 2.58 1.63.32.16.51.13.7-.08.19-.21.81-.94 1.03-1.26.22-.32.44-.27.74-.16.3.11 1.89.89 2.21 1.05.32.16.53.24.61.38.08.14.08.81-.19 1.58z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
