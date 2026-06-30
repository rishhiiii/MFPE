import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-100 text-slate-900">
        <Sidebar />
        <div className="flex-grow lg:pl-72">
          <Header />
          <main className="min-h-[calc(100vh-6rem)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <footer className="border-t border-slate-200 bg-white px-8 py-6 text-center text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
            © 2026 Mahaveer Food Admin Panel. Built for live store operations.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
