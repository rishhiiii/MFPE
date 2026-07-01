import axios from 'axios';

// Base URL for the backend. Comes from VITE_API_URL so the same code works in
// local dev and in production (set VITE_API_URL to your deployed backend URL at
// build time). Falls back to localhost for local development.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Centralized API client used for all backend requests.
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
