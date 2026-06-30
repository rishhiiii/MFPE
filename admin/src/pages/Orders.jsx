import { useEffect, useMemo, useState } from 'react';
import { PackageCheck, ReceiptText, Search, ShoppingBag, Wallet } from 'lucide-react';
import { fetchOrders } from '../lib/api';
import { formatCompactDate, formatCurrency, getOrderStatus } from '../lib/formatters';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load orders.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = order.shippingAddress?.name || '';
      const customerEmail = order.shippingAddress?.email || '';
      const matchesSearch =
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.razorpayPaymentId || '').toLowerCase().includes(searchTerm.toLowerCase());
      const orderStatus = getOrderStatus(order);
      const matchesStatus = statusFilter === 'All' || orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    const paidCount = orders.filter((order) => order.isPaid).length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      paidCount,
      pendingCount: orders.length - paidCount,
    };
  }, [orders]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="grid gap-5 lg:grid-cols-4">
        <section className="rounded-[32px] border border-brand-red/10 bg-gradient-to-br from-white via-brand-cream/70 to-white p-6 shadow-sm shadow-slate-200/60 lg:col-span-2">
          <span className="inline-flex rounded-full bg-brand-red/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-brand-red">
            Order visibility
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Monitor payments and fulfillment activity in one view.
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            This order desk reflects verified storefront transactions from your backend,
            with payment references, customer details, and line items.
          </p>
        </section>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Revenue</p>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {formatCurrency(metrics.totalRevenue)}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500">Total captured order value</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold text-slate-500">Paid orders</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{metrics.paidCount}</p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {metrics.pendingCount} still pending confirmation
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
            <h2 className="text-xl font-black text-slate-900">Order register</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {filteredOrders.length} of {orders.length} orders visible
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative min-w-[260px]">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by customer, order ID, or payment ID"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
            >
              <option value="All">All statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm font-medium text-slate-500">
            No matching orders found yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <th className="px-6 py-4 font-bold">Order</th>
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Items</th>
                    <th className="px-6 py-4 font-bold">Amount</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Placed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredOrders.map((order) => {
                    const status = getOrderStatus(order);
                    const statusTone =
                      status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700';

                    return (
                      <tr key={order._id} className="align-top">
                        <td className="px-6 py-5">
                          <p className="font-black text-slate-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-500">
                            Payment: {order.razorpayPaymentId || 'Not captured yet'}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-black text-slate-900">
                            {order.shippingAddress?.name || 'Unknown customer'}
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-500">
                            {order.shippingAddress?.email || 'No email'}
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            {order.shippingAddress?.city || 'Unknown city'}
                            {order.shippingAddress?.state
                              ? `, ${order.shippingAddress.state}`
                              : ''}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            {order.orderItems?.slice(0, 2).map((item) => (
                              <div key={`${order._id}-${item.name}`} className="text-sm">
                                <p className="font-bold text-slate-900">{item.name}</p>
                                <p className="text-slate-500">
                                  Qty {item.qty} · {formatCurrency(item.price)}
                                </p>
                              </div>
                            ))}
                            {order.orderItems?.length > 2 ? (
                              <p className="text-sm font-semibold text-slate-500">
                                +{order.orderItems.length - 2} more items
                              </p>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-6 py-5 font-black text-slate-900">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="px-6 py-5">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-500">
                          {formatCompactDate(order.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <div className="grid gap-5 xl:grid-cols-4">
        {[
          {
            icon: ReceiptText,
            label: 'Total orders',
            value: metrics.totalOrders,
            note: 'Every backend order record',
          },
          {
            icon: Wallet,
            label: 'Paid orders',
            value: metrics.paidCount,
            note: 'Verified payments',
          },
          {
            icon: ShoppingBag,
            label: 'Pending orders',
            value: metrics.pendingCount,
            note: 'Need payment confirmation',
          },
          {
            icon: PackageCheck,
            label: 'Avg. order value',
            value: formatCurrency(
              metrics.totalOrders ? metrics.totalRevenue / metrics.totalOrders : 0
            ),
            note: 'Revenue per order',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cream text-brand-red">
              <item.icon size={20} />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
