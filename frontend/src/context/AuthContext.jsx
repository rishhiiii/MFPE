import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';

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
        const parsed = JSON.parse(storedUser);
        // Sessions from the old Firebase Google login carry a token our backend
        // can't verify; drop them so the person simply signs in again.
        if (parsed?.isGoogleUser) {
          localStorage.removeItem('user');
        } else {
          setUser(parsed);
        }
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
      const { data } = await api.post(
        '/api/auth/register',
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
      const { data } = await api.post(
        '/api/auth/login',
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

  // Google Sign In/Sign Up: `credential` is the ID token from Google's
  // "Sign in with Google" button. The backend verifies it and returns a normal
  // account + token (creating the account on first sign-in).
  const signInWithGoogle = async (credential) => {
    try {
      setError(null);
      const { data } = await api.post('/api/auth/google', { credential });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Google sign-in failed. Please try again.';
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
      const { data } = await api.put(
        '/api/auth/me',
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
