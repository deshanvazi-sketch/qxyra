'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVariant } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useProductStore } from '@/store/productStore';

const CATEGORY_OPTIONS = [
  {
    group: '👕 Fashion Collection',
    items: [
      { id: 'regular-fit-tee', label: 'Regular Fit Tee (240GSM)' },
      { id: 'oversized-tee', label: 'Oversized Tee (280GSM Heavy)' },
      { id: 'hoodie', label: 'French Terry Hoodie (460GSM)' },
    ],
  },
  {
    group: '📱 Tech Accessories',
    items: [
      { id: 'mobile', label: 'Mobile Accessories (MagSafe & Cables)' },
      { id: 'computer', label: 'Computer Accessories (Stands & Docks)' },
    ],
  },
];

const PRESET_IMAGES = [
  { label: '👕 Regular Fit Tee', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', category: 'regular-fit-tee' },
  { label: '🥋 Oversized Tee', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800', category: 'oversized-tee' },
  { label: '🧥 French Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800', category: 'hoodie' },
  { label: '⚡ MagSafe Stand', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800', category: 'mobile' },
  { label: '💻 CNC PC Riser', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800', category: 'computer' },
];

export default function AdminProductsPage() {
  const { format } = useCurrency();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStatus, 
    clearAllProducts, 
    resetToDefault 
  } = useProductStore();

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'FASHION' | 'ACCESSORIES' | 'ACTIVE' | 'DRAFT' | 'CJ'>('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'regular-fit-tee',
    basePrice: '',
    salePrice: '',
    stock: '50',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    sizes: 'S, M, L, XL',
    colors: 'Onyx Black, Pure Chalk',
    isFeatured: true,
    isActive: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      category: 'regular-fit-tee',
      basePrice: '',
      salePrice: '',
      stock: '50',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      sizes: 'S, M, L, XL',
      colors: 'Onyx Black, Pure Chalk',
      isFeatured: true,
      isActive: true,
    });
    setEditingProductId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    const primaryImg = p.images?.[0]?.url || '';
    const sizes = Array.from(new Set(p.variants.map(v => v.size).filter(Boolean))).join(', ') || 'S, M, L, XL';
    const colors = Array.from(new Set(p.variants.map(v => v.color).filter(Boolean))).join(', ') || 'Standard';

    setFormData({
      name: p.name,
      slug: p.slug,
      category: p.categoryId,
      basePrice: p.basePrice.toString(),
      salePrice: p.salePrice ? p.salePrice.toString() : '',
      stock: p.variants.reduce((acc, v) => acc + v.stock, 0).toString(),
      description: p.description || '',
      imageUrl: primaryImg,
      sizes,
      colors,
      isFeatured: p.isFeatured ?? true,
      isActive: p.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleNameChange = (name: string) => {
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingProductId ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.basePrice) return;

    const basePriceNum = parseFloat(formData.basePrice);
    const salePriceNum = formData.salePrice ? parseFloat(formData.salePrice) : undefined;
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stockTotal = parseInt(formData.stock) || 50;

    // Build variants
    const sizeList = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorList = formData.colors.split(',').map(c => c.trim()).filter(Boolean);
    const effectiveSizes = sizeList.length > 0 ? sizeList : ['Standard'];
    const effectiveColors = colorList.length > 0 ? colorList : ['Standard'];

    const variants: ProductVariant[] = [];
    const stockPerVar = Math.max(1, Math.floor(stockTotal / (effectiveSizes.length * effectiveColors.length)));

    effectiveSizes.forEach(sz => {
      effectiveColors.forEach(col => {
        variants.push({
          id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          productId: editingProductId || `prod-${Date.now()}`,
          size: sz,
          color: col,
          price: salePriceNum || basePriceNum,
          stock: stockPerVar,
          sku: `QXY-${formData.category.toUpperCase().slice(0, 3)}-${sz.toUpperCase().slice(0, 2)}-${Math.floor(100 + Math.random() * 900)}`,
        });
      });
    });

    if (editingProductId) {
      // Update existing product
      updateProduct(editingProductId, {
        name: formData.name,
        slug,
        description: formData.description,
        basePrice: basePriceNum,
        salePrice: salePriceNum,
        categoryId: formData.category,
        images: [
          {
            id: `img-${Date.now()}`,
            productId: editingProductId,
            url: formData.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
            alt: formData.name,
            isPrimary: true,
            sortOrder: 0,
          },
        ],
        variants,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      });
      showToast(`✓ Updated "${formData.name}" successfully!`);
    } else {
      // Create new product
      const newProdId = `prod-${Date.now()}`;
      const newProductItem: Product = {
        id: newProdId,
        name: formData.name,
        slug,
        description: formData.description || 'Exclusive luxury precision garment/peripheral crafted for Qxyra.',
        basePrice: basePriceNum,
        salePrice: salePriceNum,
        categoryId: formData.category,
        images: [
          {
            id: `img-${Date.now()}`,
            productId: newProdId,
            url: formData.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
            alt: formData.name,
            isPrimary: true,
            sortOrder: 0,
          },
        ],
        variants,
        rating: 5.0,
        totalSold: 0,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addProduct(newProductItem);
      showToast(`✓ Added "${newProductItem.name}" to inventory!`);
    }

    setShowModal(false);
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const name = productToDelete.name;
    deleteProduct(productToDelete.id);
    setProductToDelete(null);
    showToast(`✓ Removed "${name}" from catalog.`);
  };

  const handleConfirmClearAll = () => {
    clearAllProducts();
    setShowDeleteAllModal(false);
    showToast('✓ Cleared all demo items. Inventory is ready for real products!');
  };

  const handleResetCatalog = () => {
    resetToDefault();
    showToast('✓ Restored full curated catalog (17 items across Fashion & Accessories).');
  };

  // Filter products
  const filteredProducts = (products || []).filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === 'FASHION') return ['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(p.categoryId);
    if (filterType === 'ACCESSORIES') return ['mobile', 'computer'].includes(p.categoryId);
    if (filterType === 'ACTIVE') return p.isActive;
    if (filterType === 'DRAFT') return !p.isActive;
    if (filterType === 'CJ') return Boolean(p.cjProductId);

    return true;
  });

  const getCategoryBadge = (catId: string) => {
    switch (catId) {
      case 'regular-fit-tee':
        return <span className="bg-amber-500/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded text-[10px] font-mono">👕 Regular Tee</span>;
      case 'oversized-tee':
        return <span className="bg-amber-500/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded text-[10px] font-mono">🥋 Oversized Tee</span>;
      case 'hoodie':
        return <span className="bg-amber-500/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded text-[10px] font-mono">🧥 Hoodie</span>;
      case 'mobile':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-mono">📱 Mobile Gear</span>;
      case 'computer':
        return <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px] font-mono">💻 PC Gear</span>;
      default:
        return <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-[10px] font-mono">{catId}</span>;
    }
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-gray-500 font-mono text-xs">
        Loading inventory matrix...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
              Product Catalog & Inventory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              {products.length} Products
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Manage your Store offerings across Fashion (Regular, Oversized, Hoodies) and Tech Accessories.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {products.length > 0 && (
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="px-3.5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              title="Delete all products"
            >
              <span>🗑️</span>
              <span>Clear All ({products.length})</span>
            </button>
          )}

          {products.length === 0 && (
            <button
              onClick={handleResetCatalog}
              className="px-3.5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>↺</span>
              <span>Restore Default Catalog</span>
            </button>
          )}

          <Link
            href="/admin/cj-sync"
            className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Import CJ</span>
          </Link>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>➕</span>
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search products by title, slug, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: `All (${products.length})` },
            { id: 'FASHION', label: '👕 Fashion' },
            { id: 'ACCESSORIES', label: '📱 Accessories' },
            { id: 'ACTIVE', label: 'Active' },
            { id: 'DRAFT', label: 'Drafts' },
            { id: 'CJ', label: 'CJ Synced' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                filterType === f.id
                  ? 'bg-brand-gold text-brand-black font-semibold'
                  : 'bg-[#141820] text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                <th className="pb-3 font-medium">Product Item</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Base Price</th>
                <th className="pb-3 font-medium">Store Sale Price</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredProducts.map(product => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                const primaryImg = product.images?.[0]?.url;

                return (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Item with Thumbnail */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-800/80 border border-gray-700/50 overflow-hidden shrink-0">
                          {primaryImg ? (
                            <Image
                              src={primaryImg}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                              {product.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white text-xs leading-snug line-clamp-1">{product.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">/store/{product.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4">
                      {getCategoryBadge(product.categoryId)}
                    </td>

                    {/* Base Price */}
                    <td className="py-4 text-xs font-mono text-gray-400">
                      {format(product.basePrice)}
                    </td>

                    {/* Sale Price */}
                    <td className="py-4 text-xs font-mono font-semibold text-brand-gold">
                      {product.salePrice ? format(product.salePrice) : format(product.basePrice)}
                    </td>

                    {/* Stock */}
                    <td className="py-4 text-xs">
                      <span className={`font-mono ${totalStock < 15 ? 'text-amber-400 font-bold' : 'text-gray-300'}`}>
                        {totalStock} pcs
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                          product.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/store/${product.slug}`}
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium inline-flex items-center gap-1"
                          title="View live on Storefront"
                        >
                          <span>↗</span>
                          <span className="hidden sm:inline">View</span>
                        </Link>

                        <button
                          onClick={() => openEditModal(product)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all text-xs font-medium cursor-pointer"
                          title="Edit Product"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => setProductToDelete(product)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer"
                          title="Delete Product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-xs font-mono">
                    No products found matching your search. Click &quot;Add New Product&quot; to publish one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Single Product Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-heading text-white font-medium">Delete Product</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Are you sure you want to remove &quot;{productToDelete.name}&quot; from the store catalog?
            </p>
            <div className="pt-3 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-heading text-white font-medium">Clear All Demo Products?</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              This will remove all {products.length} products currently in your catalog. You can restore default demo items at any time.
            </p>
            <div className="pt-3 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Clear All Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT PRODUCT MODAL (COMPLETE SUITE)
          ===================================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141820] border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs uppercase text-brand-gold font-mono font-semibold">Qxyra Inventory Engine</span>
                <h3 className="text-xl font-heading text-white font-medium">
                  {editingProductId ? 'Edit Product Details' : 'Add New Product to Store'}
                </h3>
              </div>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Product Name */}
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Qxyra Acid Wash Heavyweight Regular Fit Tee"
                  value={formData.name}
                  onChange={e => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* URL Slug & Category Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">URL Slug (Identifier)</label>
                  <input
                    type="text"
                    required
                    placeholder="qxyra-acid-wash-regular-tee"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white font-mono text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Store Category / Department *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                  >
                    {CATEGORY_OPTIONS.map(grp => (
                      <optgroup key={grp.group} label={grp.group} className="bg-[#141820] text-gray-300 font-semibold">
                        {grp.items.map(item => (
                          <option key={item.id} value={item.id} className="text-white">
                            {item.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Base Retail Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="38.00"
                    value={formData.basePrice}
                    onChange={e => setFormData({ ...formData, basePrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white font-mono text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Store Sale Price ($ Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="28.00"
                    value={formData.salePrice}
                    onChange={e => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-brand-gold font-mono text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Total Inventory Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white font-mono text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Product Image URL (High-Res Unsplash or Cloudinary)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                  />
                  {formData.imageUrl && (
                    <div className="relative w-11 h-11 rounded-xl bg-gray-900 border border-brand-gold/40 overflow-hidden shrink-0 shadow-md">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={() => {}}
                      />
                    </div>
                  )}
                </div>

                {/* Quick Preset Photo Buttons */}
                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-gray-500 font-mono">1-Click Presets:</span>
                  {PRESET_IMAGES.map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url, category: preset.category })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-gray-800 text-[10px] font-mono transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variants: Sizes & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Available Sizes (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="S, M, L, XL, XXL (or One Size)"
                    value={formData.sizes}
                    onChange={e => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Colors (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Onyx Black, Pure Chalk, Vintage Olive"
                    value={formData.colors}
                    onChange={e => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Craftsmanship & Specifications</label>
                <textarea
                  rows={3}
                  placeholder="240GSM combed organic cotton, ribbed collar, double-needle stitched seams, pre-shrunk luxury drape..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold leading-relaxed"
                />
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700"
                  />
                  <span>Active & Live on Storefront</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-bold shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-opacity cursor-pointer"
                >
                  {editingProductId ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}