import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  PencilLine,
  Plus,
  Search,
  Shapes,
  Trash2,
  TriangleAlert,
  Upload,
} from 'lucide-react';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  getApiBaseUrl,
} from '../lib/api';
import { formatCurrency, getStockStatus } from '../lib/formatters';

const initialFormState = {
  name: '',
  description: '',
  category: 'Jaggery',
  price: '',
  stock: '',
  image: '',
};

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = getApiBaseUrl().replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

const toneByStock = {
  'In stock': 'bg-emerald-50 text-emerald-700',
  'Low stock': 'bg-amber-50 text-amber-700',
  'Out of stock': 'bg-rose-50 text-rose-700',
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      await loadProducts();
    };

    void run();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category).filter(Boolean));
    return ['All', 'Jaggery', 'Papad', 'Spices', 'Sweets', ...unique].filter(
      (value, index, array) => array.indexOf(value) === index
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const inventoryStats = useMemo(() => {
    const totalInventoryValue = products.reduce(
      (sum, product) => sum + Number(product.price || 0) * Number(product.stock || 0),
      0
    );

    return {
      total: products.length,
      lowStock: products.filter((product) => Number(product.stock) <= 10).length,
      outOfStock: products.filter((product) => Number(product.stock) === 0).length,
      inventoryValue: totalInventoryValue,
    };
  }, [products]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setSelectedFile(null);
    setImagePreview(null);
    setFeedback('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Jaggery',
      price: product.price ?? '',
      stock: product.stock ?? '',
      image: product.image || '',
    });
    setSelectedFile(null);
    setImagePreview(product.image ? getFullImageUrl(product.image) : null);
    setFeedback('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(initialFormState);
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      setFeedback('');

      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('category', formData.category);
      form.append('price', String(formData.price));
      form.append('stock', String(formData.stock));
      
      if (selectedFile) {
        form.append('image', selectedFile);
      } else if (formData.image) {
        form.append('image', formData.image);
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
        setFeedback('Product updated successfully.');
      } else {
        await createProduct(form);
        setFeedback('Product created successfully.');
      }

      await loadProducts();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.name}" from your catalog?`);
    if (!confirmed) {
      return;
    }

    try {
      setError('');
      await deleteProduct(product._id);
      setFeedback('Product deleted successfully.');
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete product.');
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-[32px] border border-brand-red/10 bg-gradient-to-br from-white via-brand-cream/80 to-white p-6 shadow-sm shadow-slate-200/60">
          <span className="inline-flex rounded-full bg-brand-red/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-brand-red">
            Product operations
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Manage inventory with real API-backed product data.
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            Add new products, update pricing, track stock health, and keep your storefront
            catalog accurate from one place.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
            <p className="text-sm font-semibold text-slate-500">Inventory value</p>
            <p className="mt-2 text-3xl font-black text-slate-900">
              {formatCurrency(inventoryStats.inventoryValue)}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Based on live stock and current price.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
            <p className="text-sm font-semibold text-slate-500">Low stock attention</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{inventoryStats.lowStock}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {inventoryStats.outOfStock} items are already out of stock.
            </p>
          </div>
        </section>
      </div>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      {feedback ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {feedback}
        </div>
      ) : null}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">Inventory directory</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {filteredProducts.length} of {products.length} products visible
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-[260px]">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products or descriptions"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              />
            </div>

            <div className="relative min-w-[180px]">
              <Shapes
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-red/20 bg-brand-cream px-5 py-3 text-sm font-black text-slate-900 transition hover:border-brand-red/40 hover:bg-brand-cream/80"
            >
              <Plus size={18} />
              Add product
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <TriangleAlert className="mx-auto text-slate-400" size={28} />
            <h3 className="mt-4 text-lg font-black text-slate-900">No products found</h3>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Adjust the search or category filter, or create a new product.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);

              return (
                <motion.article
                  key={product._id}
                  layout
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    {product.image ? (
                      <img
                        src={getFullImageUrl(product.image)}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <Plus size={24} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-900">{product.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {product.category}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${toneByStock[stockStatus]}`}
                      >
                        {stockStatus}
                      </span>
                    </div>

                    <p className="line-clamp-3 min-h-[60px] text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-50 p-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          Price
                        </p>
                        <p className="mt-2 text-lg font-black text-slate-900">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          Stock
                        </p>
                        <p className="mt-2 text-lg font-black text-slate-900">
                          {product.stock} units
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:border-brand-red/30 hover:bg-brand-cream/40"
                      >
                        <PencilLine size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      <AnimatePresence>
        {isModalOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/60">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
                      {editingProduct ? 'Update listing' : 'Create listing'}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-slate-900">
                      {editingProduct ? 'Edit product details' : 'Add a new product'}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Keep the catalog polished with complete pricing, stock, and imagery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">Product name</span>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
                        placeholder="Premium organic jaggery"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">Category</span>
                      <input
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
                        placeholder="Jaggery"
                      />
                    </label>
                  </div>

                  <label className="space-y-2">
                    <span className="text-sm font-bold text-slate-700">Description</span>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
                      placeholder="Describe product quality, source, and key highlights."
                    />
                  </label>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">Price</span>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
                        placeholder="149"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">Stock units</span>
                      <input
                        name="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white"
                        placeholder="80"
                      />
                    </label>
                  </div>

                  <label className="space-y-2">
                    <span className="text-sm font-bold text-slate-700">Product Image</span>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                          <button 
                            type="button"
                            onClick={() => { setSelectedFile(null); setImagePreview(null); }}
                            className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload size={40} className="text-slate-400" />
                          <span className="text-sm font-semibold text-slate-600">Click to upload or drag and drop</span>
                          <span className="text-xs text-slate-400">PNG, JPG up to 5MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div className="text-center text-sm text-slate-500">or</div>
                    <input
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      disabled={selectedFile !== null}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-red/40 focus:bg-white disabled:opacity-50"
                      placeholder="https://example.com/product-image.jpg"
                    />
                  </label>

                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-2xl border border-brand-red/20 bg-brand-cream px-5 py-3 text-sm font-black text-slate-900 transition hover:border-brand-red/40 hover:bg-brand-cream/80 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting
                        ? 'Saving product...'
                        : editingProduct
                          ? 'Save changes'
                          : 'Create product'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Products;
