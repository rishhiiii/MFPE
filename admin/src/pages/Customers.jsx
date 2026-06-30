import { useEffect, useMemo, useState } from 'react';
import { MapPin, Search, UserRound, WalletCards } from 'lucide-react';
import { fetchCustomers, fetchOrders } from '../lib/api';
import {
  formatCompactDate,
  formatCurrency,
  getInitials,
} from '../lib/formatters';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        const [customersData, ordersData] = await Promise.all([
          fetchCustomers(),
          fetchOrders(),
        ]);
        setCustomers(customersData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load customer data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const customerRows = useMemo(() => {
    return customers.map((customer) => {
      const customerOrders = orders.filter(
        (order) =>
          order.shippingAddress?.email?.toLowerCase() === customer.email?.toLowerCase()
      );

      const totalSpend = customerOrders.reduce(
        (sum, order) => sum + Number(order.totalPrice || 0),
        0
      );

      return {
        ...customer,
        orderCount: customerOrders.length,
        totalSpend,
        lastOrderAt: customerOrders[0]?.createdAt || null,
      };
    });
  }, [customers, orders]);

  const filteredCustomers = useMemo(() => {
    return customerRows.filter((customer) => {
      const term = searchTerm.toLowerCase();
      return (
        customer.name?.toLowerCase().includes(term) ||
        customer.email?.toLowerCase().includes(term) ||
        customer.phone?.toLowerCase().includes(term) ||
        customer.address?.city?.toLowerCase().includes(term)
      );
    });
  }, [customerRows, searchTerm]);

  const metrics = useMemo(() => {
    const activeBuyers = customerRows.filter((customer) => customer.orderCount > 0).length;
    const totalRevenue = customerRows.reduce(
      (sum, customer) => sum + customer.totalSpend,
      0
    );

    return {
      activeBuyers,
      totalRevenue,
      averageSpend: customerRows.length ? totalRevenue / customerRows.length : 0,
    };
  }, [customerRows]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="grid gap-5 lg:grid-cols-4">
        <section className="rounded-[32px] border border-brand-red/10 bg-gradient-to-br from-white via-brand-cream/70 to-white p-6 shadow-sm shadow-slate-200/60 lg:col-span-2">
          <span className="inline-flex rounded-full bg-brand-red/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-brand-red">
            Customer relationships
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Understand buyer activity with real registrations and order history.
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            This view combines account registrations with order data so you can spot repeat
            buyers, recent signups, and high-value customers quickly.
          </p>
        </section>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Customers</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{customers.length}</p>
          <p className="mt-2 text-sm font-medium text-slate-500">Registered store accounts</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Active buyers</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{metrics.activeBuyers}</p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Customers with at least one order
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">Customer directory</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {filteredCustomers.length} of {customers.length} customers visible
            </p>
          </div>

          <div className="relative min-w-[280px]">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, phone, or city"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm font-medium text-slate-500">
            No customers match the current search.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <article
                key={customer._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream font-black text-brand-red">
                      {getInitials(customer.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{customer.name}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-500">{customer.email}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {customer.orderCount} orders
                  </span>
                </div>

                <div className="mt-5 space-y-4 rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <UserRound size={18} className="mt-0.5 text-slate-400" />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {customer.phone || 'Phone not added'}
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Joined {formatCompactDate(customer.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 text-slate-400" />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {customer.address?.city || 'City not available'}
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {customer.address?.state || 'State not available'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <WalletCards size={18} className="mt-0.5 text-slate-400" />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {formatCurrency(customer.totalSpend)}
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Last order {customer.lastOrderAt ? formatCompactDate(customer.lastOrderAt) : 'not placed yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Customer revenue</p>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {formatCurrency(metrics.totalRevenue)}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Combined spend across matched customer orders
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Average spend</p>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {formatCurrency(metrics.averageSpend)}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Revenue averaged over registered customers
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">No-order users</p>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {customers.length - metrics.activeBuyers}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Opportunity for onboarding and campaigns
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customers;
