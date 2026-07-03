import React, { useState } from 'react';
import { KeyRound, User, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Notice = ({ ok, children }) =>
  children ? (
    <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${
      ok ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
    }`}>
      {children}
    </div>
  ) : null;

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 outline-none text-sm';

const AdminSettings = () => {
  const { user, updateProfile } = useAuth();

  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [profileMsg, setProfileMsg] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [pwd, setPwd] = useState({ currentPassword: '', password: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState(null);
  const [savingPwd, setSavingPwd] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setSavingProfile(true);
    const res = await updateProfile({ name: profile.name, phone: profile.phone });
    setProfileMsg({ ok: res.success, text: res.success ? 'Profile updated.' : (res.message || 'Update failed.') });
    setSavingProfile(false);
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwdMsg(null);
    if (pwd.password.length < 6) {
      setPwdMsg({ ok: false, text: 'New password must be at least 6 characters.' });
      return;
    }
    if (pwd.password !== pwd.confirm) {
      setPwdMsg({ ok: false, text: 'New passwords do not match.' });
      return;
    }
    setSavingPwd(true);
    const res = await updateProfile({ currentPassword: pwd.currentPassword, password: pwd.password });
    if (res.success) {
      setPwdMsg({ ok: true, text: 'Password changed successfully.' });
      setPwd({ currentPassword: '', password: '', confirm: '' });
    } else {
      setPwdMsg({ ok: false, text: res.message || 'Could not change password.' });
    }
    setSavingPwd(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <User size={20} className="text-[#8B4513]" />
          <h3 className="font-bold text-gray-900">Your profile</h3>
        </div>
        <form onSubmit={saveProfile} className="space-y-4">
          <Notice ok={profileMsg?.ok}>{profileMsg?.text}</Notice>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Name</label>
            <input className={inputCls} value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email</label>
            <input className={`${inputCls} bg-gray-50 text-gray-500`} value={user?.email || ''} disabled />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
            <input className={inputCls} value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <button
            type="submit" disabled={savingProfile}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold text-sm hover:bg-[#5D2E0C] transition-colors disabled:opacity-50"
          >
            <Save size={16} /> {savingProfile ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <KeyRound size={20} className="text-[#8B4513]" />
          <h3 className="font-bold text-gray-900">Change password</h3>
        </div>
        <form onSubmit={savePassword} className="space-y-4">
          <Notice ok={pwdMsg?.ok}>{pwdMsg?.text}</Notice>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Current password</label>
            <input type="password" className={inputCls} value={pwd.currentPassword} onChange={(e) => setPwd((p) => ({ ...p, currentPassword: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">New password</label>
            <input type="password" className={inputCls} value={pwd.password} onChange={(e) => setPwd((p) => ({ ...p, password: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Confirm new password</label>
            <input type="password" className={inputCls} value={pwd.confirm} onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} required />
          </div>
          <button
            type="submit" disabled={savingPwd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold text-sm hover:bg-[#5D2E0C] transition-colors disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> {savingPwd ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
