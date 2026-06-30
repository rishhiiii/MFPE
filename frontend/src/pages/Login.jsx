import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { hasFirebaseConfig } from '../lib/firebase';
import { Mail, Lock, LogIn, ChevronRight } from 'lucide-react';
import jaggeryHero from '../assets/jaggery hero new.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, signInWithGoogle, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    if (!hasFirebaseConfig) {
      return;
    }
    setIsGoogleLoading(true);
    const result = await signInWithGoogle();
    if (result.success) {
      navigate('/');
    }
    setIsGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={jaggeryHero}
          alt="Organic Jaggery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20"></div>
      </div>

      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-brand-cream/90 text-brand-brown px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest mb-6"
            >
              Welcome Back
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
              Login to your <span className="text-brand-cream">Account</span>
            </h1>
            <p className="text-white/80 text-lg">Continue your journey with us</p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-400/30 text-red-100 px-5 py-3.5 rounded-2xl backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-brand-cream" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-brand-cream focus:outline-none transition-all duration-300 font-medium"
                placeholder="Email Address"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-brand-cream" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-brand-cream focus:outline-none transition-all duration-300 font-medium"
                placeholder="Password"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-cream text-brand-brown py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-xl disabled:opacity-50"
            >
              <LogIn size={20} />
              {isLoading ? 'Logging in...' : 'Login'}
              <ChevronRight size={18} />
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-4 text-white/60 font-semibold">or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || !hasFirebaseConfig}
              className="w-full bg-white/15 backdrop-blur-md border-2 border-white/25 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/25 transition-all duration-300 disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.405 11.9a5.985 5.985 0 0 1 0-3.8V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              {isGoogleLoading ? 'Signing in...' : hasFirebaseConfig ? 'Google' : 'Google setup required'}
            </motion.button>
            {!hasFirebaseConfig && (
              <p className="text-sm text-white/70 text-center">
                Add the `VITE_FIREBASE_*` values in `frontend/.env` to enable Google sign-in.
              </p>
            )}
          </motion.form>

          {/* Signup Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-white/70 text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-cream font-bold hover:text-white transition-colors underline">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
