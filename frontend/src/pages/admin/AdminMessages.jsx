import React, { useState } from 'react';
import { Mail, MailOpen, Trash2, Phone, Building2 } from 'lucide-react';
import api from '../../lib/api';

const formatDate = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

const AdminMessages = ({ messages, onRefresh }) => {
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState('all');

  const toggleRead = async (m) => {
    setBusyId(m._id);
    try {
      await api.patch(`/api/contact/${m._id}`, { isRead: !m.isRead });
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update message.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    setBusyId(id);
    try {
      await api.delete(`/api/contact/${id}`);
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete message.');
    } finally {
      setBusyId(null);
    }
  };

  const visible = filter === 'unread' ? messages.filter((m) => !m.isRead) : messages;

  if (!messages || messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <Mail size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="font-bold text-gray-900 mb-1">No messages yet</h3>
        <p className="text-gray-500 text-sm">Contact-form enquiries will show up here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {[['all', 'All'], ['unread', 'Unread']].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              filter === k ? 'bg-[#8B4513] text-[#FFF8DC] border-[#8B4513]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8B4513]/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((m) => (
          <div
            key={m._id}
            className={`bg-white rounded-2xl border p-5 ${m.isRead ? 'border-gray-200' : 'border-[#8B4513]/40'}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {!m.isRead && <span className="w-2 h-2 rounded-full bg-[#8B4513] shrink-0" />}
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <a href={`mailto:${m.email}`} className="text-sm text-[#8B4513] hover:underline break-all">{m.email}</a>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                  {m.phone && <span className="inline-flex items-center gap-1"><Phone size={12} /> {m.phone}</span>}
                  {m.company && <span className="inline-flex items-center gap-1"><Building2 size={12} /> {m.company}</span>}
                  <span>{formatDate(m.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  disabled={busyId === m._id}
                  onClick={() => toggleRead(m)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {m.isRead ? <><Mail size={14} /> Unread</> : <><MailOpen size={14} /> Read</>}
                </button>
                <button
                  disabled={busyId === m._id}
                  onClick={() => remove(m._id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
