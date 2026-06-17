import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-grow pl-72">
          <Header />
          <main className="min-h-[calc(100vh-6rem)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Dashboard />} /> {/* Reusing Dashboard for demo */}
              <Route path="/orders" element={<div className="p-10 text-center text-gray-400 font-bold">Orders coming soon...</div>} />
              <Route path="/customers" element={<div className="p-10 text-center text-gray-400 font-bold">Customers coming soon...</div>} />
              <Route path="/settings" element={<div className="p-10 text-center text-gray-400 font-bold">Settings coming soon...</div>} />
            </Routes>
          </main>
          <footer className="p-8 border-t border-gray-100 bg-white text-center text-[11px] font-black text-gray-300 uppercase tracking-widest">
            © 2026 Mahaveer Food Admin Panel. All rights reserved.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
