import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Search, ImageIcon } from 'lucide-react';
import api, { API_BASE_URL } from '../../lib/api';
import { optimizeCloudinaryUrl } from '../../lib/image';
import jaggery1 from '../../assets/jaggery1.jpeg';

// Categories the storefront (Shop.jsx) filters by — offered as suggestions so
// new products stay visible under the right filter.
const CATEGORY_SUGGESTIONS = [
  'Superfoods', 'Spices', 'Natural Sweeteners', 'Pulses & Grains',
  'Dry Fruits', 'FMCG Products', 'Jaggery', 'Papad', 'Honey', 'Oils', 'Snacks',
];

const EMPTY_FORM = {
  name: '', description: '', category: '', price: '', mrp: '', discount: '', gstRate: '', stock: '',
  ingredients: '', shelfLife: '', weight: '', storage: '', origin: '', packaging: '',
};

// Mirrors derivePricing() on the server so the admin sees the exact selling
// price that will be saved. An MRP, when given, wins over a typed price.
const sellingPrice = ({ mrp, discount, price }) => {
  const m = Number(mrp) || 0;
  if (m <= 0) return Number(price) || 0;
  const d = Math.min(100, Math.max(0, Number(discount) || 0));
  return Math.round(m * (1 - d / 100) * 100) / 100;
};

const productImage = (path) => {
  if (!path) return jaggery1;
  if (path.startsWith('http')) return optimizeCloudinaryUrl(path, 200);
  if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`;
  return path;
};

const Field = ({ label, name, value, onChange, type = 'text', required, textarea, placeholder, list }) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {textarea ? (
      <textarea
        name={name} value={value} onChange={onChange} rows={3} placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 outline-none text-sm"
      />
    ) : (
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} list={list}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 outline-none text-sm"
      />
    )}
  </div>
);

const AdminProducts = ({ products, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || '', description: p.description || '', category: p.category || '',
      price: p.price ?? '', mrp: p.mrp || '', discount: p.discount || '', gstRate: p.gstRate ?? '',
      stock: p.stock ?? '', ingredients: p.ingredients || '',
      shelfLife: p.shelfLife || '', weight: p.weight || '', storage: p.storage || '',
      origin: p.origin || '', packaging: p.packaging || '',
    });
    setImageFile(null);
    setImagePreview(p.image ? productImage(p.image) : '');
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image must be under 5MB.');
      return;
    }
    setFormError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim() || !form.description.trim() || !form.category.trim() || !(sellingPrice(form) > 0)) {
      setFormError('Name, description, category and a price greater than 0 are required.');
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    // Always send the resolved selling price. The Price input is hidden when an
    // MRP is entered, so form.price would otherwise go out empty, and a backend
    // that doesn't derive price from mrp/discount would reject it with a 400.
    fd.set('price', sellingPrice(form).toFixed(2));
    if (imageFile) fd.append('image', imageFile);

    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/api/products/${editingId}`, fd);
      } else {
        await api.post('/api/products', fd);
      }
      await onRefresh();
      closeForm();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save the product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product permanently? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/products/${id}`);
      await onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete the product.');
    } finally {
      setDeletingId(null);
    }
  };

  const visible = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 outline-none text-sm bg-white"
          />
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold text-sm hover:bg-[#5D2E0C] transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-4 py-3 font-bold">Product</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Price</th>
                <th className="px-4 py-3 font-bold">Stock</th>
                <th className="px-4 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                visible.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={productImage(p.image)} alt={p.name} className="w-11 h-11 rounded-lg object-cover border border-gray-200" />
                        <span className="font-semibold text-gray-900 line-clamp-1 max-w-[220px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.category || '—'}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      ₹{Number(p.price).toLocaleString('en-IN')}
                      {p.mrp > p.price && (
                        <span className="ml-1.5 text-xs font-bold text-gray-400 line-through">
                          ₹{Number(p.mrp).toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        (p.stock ?? 0) <= 0 ? 'bg-red-100 text-red-700'
                        : (p.stock ?? 0) <= 5 ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                      }`}>
                        {p.stock ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={deletingId === p._id}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-4 sm:my-8 border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-lg font-black text-gray-900">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                  {formError}
                </div>
              )}

              {/* Image picker */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                <div className="w-24 h-24 rounded-xl border border-gray-300 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={32} />
                      <span className="text-xs mt-1">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white hover:border-[#8B4513] hover:text-[#8B4513] transition-all bg-white shadow-sm">
                    <ImageIcon size={16} />
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500">Max file size: 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" value={form.name} onChange={handleChange} required placeholder="Organic Jaggery" />
                <Field label="Category" name="category" value={form.category} onChange={handleChange} required placeholder="Natural Sweeteners" list="category-list" />
                <datalist id="category-list">
                  {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
                </datalist>
                <Field label="MRP (₹)" name="mrp" value={form.mrp} onChange={handleChange} type="number" placeholder="149" />
                <Field label="Discount (%)" name="discount" value={form.discount} onChange={handleChange} type="number" placeholder="15" />
                {!(Number(form.mrp) > 0) && (
                  <Field label="Price (₹)" name="price" value={form.price} onChange={handleChange} type="number" required placeholder="120" />
                )}
                <Field label="GST (%)" name="gstRate" value={form.gstRate} onChange={handleChange} type="number" placeholder="5" list="gst-rates" />
                <datalist id="gst-rates">
                  {[0, 5, 18, 40].map((r) => <option key={r} value={r} />)}
                </datalist>
                <Field label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="100" />
              </div>

              {Number(form.mrp) > 0 && (
                <p className="text-xs font-bold text-gray-600 bg-brand-cream/60 rounded-xl px-3.5 py-2.5">
                  Selling price: <span className="text-[#8B4513]">₹{sellingPrice(form).toFixed(2)}</span>
                  {' '}— {Number(form.discount) || 0}% off MRP ₹{Number(form.mrp).toFixed(2)}
                </p>
              )}
              {sellingPrice(form) > 0 && (
                <p className="text-xs font-bold text-gray-600 bg-brand-cream/60 rounded-xl px-3.5 py-2.5">
                  Customer pays: <span className="text-[#8B4513]">₹{(sellingPrice(form) * (1 + (Number(form.gstRate) || 0) / 100)).toFixed(2)}</span>
                  {' '}per unit — ₹{sellingPrice(form).toFixed(2)} + {Number(form.gstRate) || 0}% GST (shipping extra)
                </p>
              )}

              <Field label="Description" name="description" value={form.description} onChange={handleChange} required textarea placeholder="Short product description…" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Weight" name="weight" value={form.weight} onChange={handleChange} placeholder="500g" />
                <Field label="Shelf Life" name="shelfLife" value={form.shelfLife} onChange={handleChange} placeholder="12 months" />
                <Field label="Origin" name="origin" value={form.origin} onChange={handleChange} placeholder="Maharashtra, India" />
                <Field label="Packaging" name="packaging" value={form.packaging} onChange={handleChange} placeholder="Vacuum-sealed pouch" />
              </div>

              <Field label="Ingredients" name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="100% Sugarcane" />
              <Field label="Storage" name="storage" value={form.storage} onChange={handleChange} placeholder="Store in a cool, dry place" />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button" onClick={closeForm}
                  className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-[#8B4513] text-[#FFF8DC] font-bold hover:bg-[#5D2E0C] transition-colors disabled:opacity-50 shadow-sm"
                >
                  {submitting ? 'Saving…' : editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
