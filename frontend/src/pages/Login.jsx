import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import { Mail, Lock, LogIn, ChevronRight } from 'lucide-react';
import jaggeryHero from '../assets/jaggery hero new.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signInWithGoogle, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate(redirectTo, { replace: true });
    }
    setIsLoading(false);
  };

  const handleGoogleCredential = async (credential) => {
    const result = await signInWithGoogle(credential);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="hero-section min-h-screen flex items-center pt-40">
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
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-gray-300 placeholder-white/50 focus:border-brand-cream focus:outline-none transition-all duration-300 font-medium"
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
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-gray-300 placeholder-white/50 focus:border-brand-cream focus:outline-none transition-all duration-300 font-medium"
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
            <GoogleSignInButton onCredential={handleGoogleCredential} text="signin_with" />
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
              <Link to="/signup" state={location.state} className="text-brand-cream font-bold hover:text-white transition-colors underline">
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
