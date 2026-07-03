import React, { useState } from 'react';
import { Users as UsersIcon, ShieldCheck, ShieldOff, Trash2, Shield } from 'lucide-react';
import api from '../../lib/api';

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const AdminUsers = ({ users, currentUserId, onRefresh }) => {
  const [busyId, setBusyId] = useState(null);

  const setRole = async (id, role) => {
    setBusyId(id);
    try {
      await api.put(`/api/auth/users/${id}/role`, { role });
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update role.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This permanently removes the account.`)) return;
    setBusyId(id);
    try {
      await api.delete(`/api/auth/users/${id}`);
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete user.');
    } finally {
      setBusyId(null);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <UsersIcon size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="font-bold text-gray-900 mb-1">No customers yet</h3>
        <p className="text-gray-500 text-sm">Registered users will be listed here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wide">
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Email</th>
              <th className="px-4 py-3 font-bold">Phone</th>
              <th className="px-4 py-3 font-bold">Role</th>
              <th className="px-4 py-3 font-bold">Joined</th>
              <th className="px-4 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const isSelf = String(u._id) === String(currentUserId);
              return (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F5DEB3] text-[#8B4513] flex items-center justify-center font-black text-sm shrink-0">
                        {(u.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {u.name}{isSelf && <span className="text-xs text-gray-400 font-normal"> (you)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-gray-600">{u.phone || '—'}</td>
                  <td className="px-4 py-3">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-[#8B4513] text-[#FFF8DC]">
                        <ShieldCheck size={12} /> Admin
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">Customer</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {u.role === 'admin' ? (
                        <button
                          disabled={busyId === u._id || isSelf}
                          onClick={() => setRole(u._id, 'customer')}
                          title={isSelf ? 'You cannot demote yourself' : 'Demote to customer'}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-40"
                        >
                          <ShieldOff size={14} /> Demote
                        </button>
                      ) : (
                        <button
                          disabled={busyId === u._id}
                          onClick={() => setRole(u._id, 'admin')}
                          title="Promote to admin"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F5DEB3] text-[#8B4513] text-xs font-bold hover:bg-[#e9cf9a] transition-colors disabled:opacity-40"
                        >
                          <Shield size={14} /> Make admin
                        </button>
                      )}
                      <button
                        disabled={busyId === u._id || isSelf}
                        onClick={() => remove(u._id, u.name)}
                        title={isSelf ? 'You cannot delete yourself' : 'Delete user'}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
