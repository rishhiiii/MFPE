import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Truck } from 'lucide-react';
import api from '../../lib/api';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_STYLE = {
  Pending: 'bg-gray-100 text-gray-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const AdminOrders = ({ orders, onRefresh }) => {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');
  const [savingId, setSavingId] = useState(null);
  const [trackingDraft, setTrackingDraft] = useState({});

  const updateOrder = async (id, patch) => {
    setSavingId(id);
    try {
      await api.patch(`/api/payment/orders/${id}`, patch);
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update the order.');
    } finally {
      setSavingId(null);
    }
  };

  const visible = filter === 'All' ? orders : orders.filter((o) => (o.status || 'Processing') === filter);

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <Package size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="font-bold text-gray-900 mb-1">No paid orders yet</h3>
        <p className="text-gray-500 text-sm">Orders appear here once a customer completes payment.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              filter === s ? 'bg-[#8B4513] text-[#FFF8DC] border-[#8B4513]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8B4513]/40'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-4 py-3 font-bold">Customer</th>
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Total</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">No orders with status “{filter}”.</td></tr>
              ) : visible.map((o) => {
                const status = o.status || 'Processing';
                return (
                  <React.Fragment key={o._id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{o.shippingAddress?.name || 'Customer'}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{o.shippingAddress?.phone} · {o.shippingAddress?.city}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDate(o.paidAt || o.createdAt)}</td>
                      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">₹{Number(o.totalPrice).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[status]}`}>{status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setExpanded(expanded === o._id ? null : o._id)}
                          className="inline-flex items-center gap-1 text-[#8B4513] font-bold text-xs hover:underline"
                        >
                          Manage {expanded === o._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                    </tr>
                    {expanded === o._id && (
                      <tr className="bg-gray-50/60">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Items + address */}
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Items</p>
                              <div className="space-y-1.5">
                                {(o.orderItems || []).map((it, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-700">{it.name} × {it.qty}</span>
                                    <span className="font-semibold text-gray-900">₹{Number(it.price * it.qty).toLocaleString('en-IN')}</span>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs font-bold text-gray-500 uppercase mt-4 mb-1">Ship to</p>
                              <p className="text-sm text-gray-700">
                                {o.shippingAddress?.address}, {o.shippingAddress?.city}, {o.shippingAddress?.state} — {o.shippingAddress?.pincode}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{o.shippingAddress?.email}</p>
                            </div>

                            {/* Fulfilment controls */}
                            <div className="lg:border-l lg:border-gray-200 lg:pl-5">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Update status</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {STATUSES.map((s) => (
                                  <button
                                    key={s}
                                    disabled={savingId === o._id || s === status}
                                    onClick={() => updateOrder(o._id, { status: s })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors disabled:opacity-60 ${
                                      s === status ? `${STATUS_STYLE[s]} border-transparent` : 'bg-white text-gray-600 border-gray-200 hover:border-[#8B4513]/40'
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>

                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Tracking number</p>
                              <div className="flex gap-2">
                                <input
                                  defaultValue={o.trackingNumber || ''}
                                  onChange={(e) => setTrackingDraft((d) => ({ ...d, [o._id]: e.target.value }))}
                                  placeholder="e.g. AWB123456789"
                                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-[#8B4513] outline-none text-sm"
                                />
                                <button
                                  disabled={savingId === o._id}
                                  onClick={() => updateOrder(o._id, { trackingNumber: trackingDraft[o._id] ?? o.trackingNumber ?? '' })}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B4513] text-[#FFF8DC] text-sm font-bold hover:bg-[#5D2E0C] disabled:opacity-60"
                                >
                                  <Truck size={15} /> Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
