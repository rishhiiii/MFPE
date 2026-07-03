import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, ShieldAlert, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Small centered card used for the "not allowed" states below.
const Gate = ({ icon: Icon, title, message, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-28 pb-16">
    <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#F5DEB3] text-[#8B4513] flex items-center justify-center mx-auto mb-5">
        <Icon size={30} />
      </div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">{children}</div>
    </div>
  </div>
);

// Route guard for the admin panel. This is a UX gate only — the real security
// is enforced server-side (protect + admin middleware on every admin API).
// Instead of silently redirecting, we show a clear screen with a Login (or
// Logout) button so the admin site always has visible auth controls.
const AdminRoute = ({ children }) => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-[#F5DEB3] border-t-[#8B4513] rounded-full animate-spin" />
      </div>
    );
  }

  // Not signed in -> offer a Login button.
  if (!user) {
    return (
      <Gate icon={LogIn} title="Admin Login" message="Please sign in with an admin account to access the panel.">
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold hover:bg-[#5D2E0C] transition-colors"
        >
          <LogIn size={18} /> Login
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors"
        >
          <Home size={18} /> Back to site
        </Link>
      </Gate>
    );
  }

  // Signed in but not an admin -> offer Logout (to switch accounts) + Home.
  if (user.role !== 'admin') {
    return (
      <Gate
        icon={ShieldAlert}
        title="Access denied"
        message="This account doesn't have admin permissions. Log in with an admin account to continue."
      >
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold hover:bg-[#5D2E0C] transition-colors"
        >
          <LogOut size={18} /> Logout & switch account
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors"
        >
          <Home size={18} /> Back to site
        </Link>
      </Gate>
    );
  }

  return children;
};

export default AdminRoute;
