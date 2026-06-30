import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCustomers, fetchOrders, fetchProducts } from '../lib/api';
import {
  formatCompactDate,
  formatCurrency,
  getInitials,
  getOrderStatus,
  getStockStatus,
} from '../lib/formatters';

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const MetricCard = ({ icon: Icon, label, value, meta, accent = 'brand' }) => (
  <motion.div
    {...cardMotion}
    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
  >
    <div className="mb-5 flex items-center justify-between">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          accent === 'danger'
            ? 'bg-rose-50 text-rose-600'
            : accent === 'success'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-brand-cream text-brand-red'
        }`}
      >
        <Icon size={22} />
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Live
      </span>
    </div>
    <p className="text-sm font-semibold text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
    <p className="mt-3 text-sm font-medium text-slate-500">{meta}</p>
  </motion.div>
);

const Panel = ({ title, description, action, children }) => (
  <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-black text-slate-900">{title}</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');
        const [productsData, ordersData, customersData] = await Promise.all([
          fetchProducts(),
          fetchOrders(),
          fetchCustomers(),
        ]);

        setProducts(productsData);
        setOrders(ordersData);
        setCustomers(customersData);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load admin dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const paidOrders = orders.filter((order) => order.isPaid);
    const lowStockProducts = products.filter((product) => Number(product.stock) <= 10);
    const outOfStockProducts = products.filter((product) => Number(product.stock) === 0);
    const totalUnits = products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0);

    const categoryMap = products.reduce((acc, product) => {
      const key = product.category || 'Uncategorized';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      totalRevenue,
      paidOrders,
      lowStockProducts,
      outOfStockProducts,
      totalUnits,
      categoryBreakdown,
    };
  }, [orders, products]);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
  const newestCustomers = useMemo(() => customers.slice(0, 5), [customers]);

  if (loading) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-white"
            />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="h-[420px] animate-pulse rounded-[28px] border border-slate-200 bg-white" />
          <div className="h-[420px] animate-pulse rounded-[28px] border border-slate-200 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 rounded-[32px] border border-brand-red/10 bg-gradient-to-br from-brand-cream via-white to-white p-6 shadow-sm shadow-slate-200/60 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-brand-red/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
            Admin Control Center
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
            Real-time business visibility without dummy data.
          </h1>
          <p className="mt-3 text-base font-medium leading-7 text-slate-600">
            Track orders, monitor inventory, and review customer activity from a single
            clean workspace designed for day-to-day operations.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/products"
            className="rounded-2xl bg-brand-red px-5 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-brand-red/10 transition hover:bg-brand-darkRed hover:text-slate-900"
          >
            Manage products
          </Link>
          <Link
            to="/orders"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 transition hover:border-brand-red/30 hover:bg-brand-cream/50"
          >
            Review orders
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={DollarSign}
          label="Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          meta={`${analytics.paidOrders.length} paid orders processed`}
        />
        <MetricCard
          icon={ShoppingCart}
          label="Orders"
          value={orders.length}
          meta={`${orders.filter((order) => !order.isPaid).length} pending payment records`}
          accent="success"
        />
        <MetricCard
          icon={Package}
          label="Products"
          value={products.length}
          meta={`${analytics.totalUnits} units currently in stock`}
        />
        <MetricCard
          icon={Users}
          label="Customers"
          value={customers.length}
          meta={`${newestCustomers.length} recent signups highlighted`}
          accent="success"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Inventory health"
          description="Focus on the products that need attention first."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 transition hover:border-brand-red/30 hover:bg-brand-cream/40"
            >
              Open products
              <ArrowRight size={16} />
            </Link>
          }
        >
          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500">
              No products found yet. Add your first product from the Products page.
            </div>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 6).map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const stockTone =
                  stockStatus === 'Out of stock'
                    ? 'bg-rose-50 text-rose-700'
                    : stockStatus === 'Low stock'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700';

                return (
                  <div
                    key={product._id}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{product.name}</p>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {product.category} · {formatCurrency(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-500">
                        {product.stock} units
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${stockTone}`}>
                        {stockStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel
            title="Attention needed"
            description="Critical stock and operational alerts."
          >
            <div className="space-y-4">
              <div className="rounded-3xl bg-rose-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white p-2 text-rose-600">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">
                      {analytics.outOfStockProducts.length} products out of stock
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      Review replenishment priorities before customer demand is impacted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white p-2 text-amber-600">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">
                      {analytics.lowStockProducts.length} low stock items
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      These SKUs are below the healthy buffer of 10 units.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            title="Category mix"
            description="Product distribution across categories."
          >
            <div className="space-y-4">
              {analytics.categoryBreakdown.length === 0 ? (
                <p className="text-sm font-medium text-slate-500">
                  Category analytics will appear once products are added.
                </p>
              ) : (
                analytics.categoryBreakdown.map((category) => (
                  <div key={category.name}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                      <span>{category.name}</span>
                      <span>{category.count} items</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-brand-red"
                        style={{
                          width: `${Math.max((category.count / products.length) * 100, 12)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Recent orders"
          description="Latest payments and fulfillment activity."
          action={
            <Link
              to="/orders"
              className="text-sm font-bold text-brand-red transition hover:text-brand-darkRed"
            >
              View all
            </Link>
          }
        >
          {recentOrders.length === 0 ? (
            <p className="text-sm font-medium text-slate-500">
              Orders will appear here once payments are verified in the store.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-400">
                    <th className="pb-4 pr-4 font-bold">Customer</th>
                    <th className="pb-4 pr-4 font-bold">Amount</th>
                    <th className="pb-4 pr-4 font-bold">Status</th>
                    <th className="pb-4 font-bold">Placed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-4 pr-4">
                        <div>
                          <p className="font-bold text-slate-900">
                            {order.shippingAddress?.name || 'Unknown customer'}
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            {order.shippingAddress?.email || 'No email provided'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-black text-slate-900">
                        {formatCurrency(order.totalPrice)}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            order.isPaid
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {getOrderStatus(order)}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-500">
                        {formatCompactDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel
          title="Newest customers"
          description="Recent account activity from the storefront."
          action={
            <Link
              to="/customers"
              className="text-sm font-bold text-brand-red transition hover:text-brand-darkRed"
            >
              Open customers
            </Link>
          }
        >
          {newestCustomers.length === 0 ? (
            <p className="text-sm font-medium text-slate-500">
              Customer signups will appear here after registrations start coming in.
            </p>
          ) : (
            <div className="space-y-4">
              {newestCustomers.map((customer) => (
                <div
                  key={customer._id}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream font-black text-brand-red">
                      {getInitials(customer.name)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{customer.name}</p>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">
                    {formatCompactDate(customer.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
};

export default Dashboard;
