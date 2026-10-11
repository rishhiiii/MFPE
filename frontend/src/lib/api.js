import axios from 'axios';

// Base URL for the backend. Comes from VITE_API_URL so the same code works in
// local dev and in production (set VITE_API_URL to your deployed backend URL at
// build time). Falls back to localhost for local development.
//
// VITE_API_URL must be set as an environment variable in your hosting
// platform's dashboard (e.g. Vercel Settings > Environment Variables) — a
// local .env file is gitignored and never reaches the production build, so
// leaving it unset there silently falls back to localhost and every API call
// fails on the live site.
if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    '[config] VITE_API_URL is not set in this production build. ' +
    'Set it in your hosting platform\'s environment variables (not just in a local .env file) and redeploy.'
  );
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
