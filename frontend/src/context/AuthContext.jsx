import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth, googleProvider, hasFirebaseConfig } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error loading user:', err);
      }
    }
    setLoading(false);
  }, []);

  // Register user
  const register = async (name, email, password, phone) => {
    try {
      setError(null);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password, phone },
        config
      );
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        config
      );
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Google Sign In/Sign Up
  const signInWithGoogle = async () => {
    try {
      setError(null);
      if (!hasFirebaseConfig || !auth || !googleProvider) {
        const errorMessage = 'Google sign-in is not configured. Add the VITE_FIREBASE_* values in frontend/.env.';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get user details from Google
      const userData = {
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || '',
        token: user.accessToken,
        isGoogleUser: true
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      const errorMessage = err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        'http://localhost:5000/api/auth/me',
        userData,
        config
      );
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, signInWithGoogle, updateProfile, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
