import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/seo/Seo';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white pt-40 pb-20 px-6 text-center">
      <Seo title="Page Not Found" path={location.pathname} noindex />
      <h1 className="text-3xl font-black text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="text-brand-brown font-bold flex items-center gap-2">
        <ArrowLeft size={20} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
