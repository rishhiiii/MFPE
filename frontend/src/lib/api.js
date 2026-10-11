import axios from 'axios';

// Base URL for the backend. Hardcoded directly rather than read from
// VITE_API_URL: on the VPS deploy (git pull + npm run build directly on the
// server), the .env file wasn't reliably present at build time, which made
// Vite bake in the localhost fallback and broke every API call in production.
// Baking the real URL directly into the source means a build always has the
// right value, regardless of whether any .env file exists on the server.
// Vite's own import.meta.env.DEV (not read from any .env file) still lets
// local development hit a local backend instead.
export const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.mahaveerfood.com';

// Centralized API client used for all backend requests.
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the logged-in user's JWT to every request automatically, so protected
// (and admin-only) endpoints work without each call wiring up the header.
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore malformed localStorage; request just goes out unauthenticated
  }
  return config;
});

export default api;
