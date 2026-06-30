import { useEffect, useMemo, useState } from 'react';
import { BellRing, Globe, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { fetchCustomers, fetchOrders, fetchProducts, getApiBaseUrl } from '../lib/api';

const storageKey = 'mfpe-admin-settings';

const defaultSettings = {
  businessName: 'Mahaveer Food Products',
  supportEmail: 'support@mfpe.local',
  supportPhone: '+91 00000 00000',
  lowStockThreshold: '10',
  orderAlertEmail: true,
  customerSignupAlert: false,
};

const Settings = () => {
  const [formData, setFormData] = useState(() => {
    const storedSettings = localStorage.getItem(storageKey);

    if (!storedSettings) {
      return defaultSettings;
    }

    try {
      return JSON.parse(storedSettings);
    } catch {
      localStorage.removeItem(storageKey);
      return defaultSettings;
    }
  });
  const [status, setStatus] = useState({ loading: true, error: '', products: 0, orders: 0, customers: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const [products, orders, customers] = await Promise.all([
          fetchProducts(),
          fetchOrders(),
          fetchCustomers(),
        ]);

        setStatus({
          loading: false,
          error: '',
          products: products.length,
          orders: orders.length,
          customers: customers.length,
        });
      } catch (error) {
        setStatus({
          loading: false,
          error: error.response?.data?.message || 'Unable to connect to the backend.',
          products: 0,
          orders: 0,
          customers: 0,
        });
      }
    };

    loadStatus();
  }, []);

  const completion = useMemo(() => {
    const requiredFields = [
      formData.businessName,
      formData.supportEmail,
      formData.supportPhone,
      formData.lowStockThreshold,
    ];

    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(formData));
    setMessage('Admin preferences saved locally in this browser.');
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[32px] border border-brand-red/10 bg-gradient-to-br from-white via-brand-cream/70 to-white p-6 shadow-sm shadow-slate-200/60">
          <span className="inline-flex rounded-full bg-brand-red/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-brand-red">
            Admin settings
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Configure operations and keep the control panel production ready.
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            Update business-facing preferences, review backend connectivity, and keep your
            admin workspace aligned with daily operations.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Setup completion</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{completion}%</p>
          <div className="mt-4 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-brand-red"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Save preferences below to keep the admin panel personalized.
          </p>
        </section>
      </div>

      {message ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
        >
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900">Business preferences</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              These settings are stored locally for the admin interface.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Business name</span>
              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Support email</span>
              <input
                name="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Support phone</span>
              <input
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Low stock threshold</span>
              <input
                name="lowStockThreshold"
                type="number"
                min="0"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="flex items-start justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-black text-slate-900">Order alert emails</p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Keep a local preference for order alert notifications.
                </p>
              </div>
              <input
                type="checkbox"
                name="orderAlertEmail"
                checked={formData.orderAlertEmail}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-red focus:ring-brand-red"
              />
            </label>

            <label className="flex items-start justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-black text-slate-900">New customer alerts</p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Track whether signup activity should trigger notifications.
                </p>
              </div>
              <input
                type="checkbox"
                name="customerSignupAlert"
                checked={formData.customerSignupAlert}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-red focus:ring-brand-red"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl border border-brand-red/20 bg-brand-cream px-5 py-3 text-sm font-black text-slate-900 transition hover:border-brand-red/40 hover:bg-brand-cream/80"
            >
              <Save size={16} />
              Save settings
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900">API health</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Live connectivity status for the admin backend.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-2 text-brand-red">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">API endpoint</p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-500">
                      {getApiBaseUrl()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-2 text-brand-red">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Connection status</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {status.loading
                        ? 'Checking connection...'
                        : status.error
                          ? status.error
                          : 'Connected and responding'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="mb-5">
              <h2 className="text-xl font-black text-slate-900">Live totals</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Snapshot from the connected backend
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: SlidersHorizontal, label: 'Products', value: status.products },
                { icon: BellRing, label: 'Orders', value: status.orders },
                { icon: ShieldCheck, label: 'Customers', value: status.customers },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-2 text-brand-red">
                      <item.icon size={18} />
                    </div>
                    <p className="font-black text-slate-900">{item.label}</p>
                  </div>
                  <p className="text-lg font-black text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
