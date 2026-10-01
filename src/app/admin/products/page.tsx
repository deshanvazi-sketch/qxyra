'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { products as initialProducts } from '@/lib/mock-data';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'ACTIVE' | 'FEATURED' | 'CJ'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'c1',
    basePrice: '',
    salePrice: '',
    stock: '50',
    description: ''
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'ACTIVE') return p.isActive;
    if (filterType === 'FEATURED') return p.isFeatured;
    if (filterType === 'CJ') return Boolean(p.cjProductId);
    return true;
  });

  const toggleProductStatus = (id: string) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.basePrice) return;

    const basePriceNum = parseFloat(newProduct.basePrice);
    const salePriceNum = newProduct.salePrice ? parseFloat(newProduct.salePrice) : undefined;
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      slug: slug,
      description: newProduct.description || 'Exclusive premium edition product.',
      basePrice: basePriceNum,
      salePrice: salePriceNum,
      categoryId: newProduct.category,
      images: [
        {
          id: `img-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          url: 'https://picsum.photos/seed/newprod/800/800',
          alt: newProduct.name,
          isPrimary: true,
          sortOrder: 0
        }
      ],
      variants: [
        {
          id: `var-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          price: salePriceNum || basePriceNum,
          stock: parseInt(newProduct.stock) || 50,
          sku: `QX-${Math.floor(1000 + Math.random() * 9000)}`
        }
      ],
      rating: 5.0,
      totalSold: 0,
      isActive: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProductsList([created, ...productsList]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: 'c1', basePrice: '', salePrice: '', stock: '50', description: '' });
    setToastMessage(`✓ Added "${created.name}" to inventory!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Product Catalog & Inventory
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your store offerings, active dropship listings, and pricing rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/cj-sync"
            className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Import from CJ Dropshipping</span>
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>➕</span>
            <span>Create New Product</span>
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
            placeholder="Search products by title or slug..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: 'All Products' },
            { id: 'ACTIVE', label: 'Active' },
            { id: 'FEATURED', label: 'Featured' },
            { id: 'CJ', label: 'CJ Dropshipped' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
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
                <th className="pb-3 font-medium">Base Price</th>
                <th className="pb-3 font-medium">Store Sale Price</th>
                <th className="pb-3 font-medium">Inventory</th>
                <th className="pb-3 font-medium">Sourcing Channel</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredProducts.map(product => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                return (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-800/80 border border-gray-700/50 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white text-xs leading-snug line-clamp-1">{product.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-xs font-mono text-gray-400">
                      {formatPrice(product.basePrice)}
                    </td>
                    <td className="py-4 text-xs font-mono font-semibold text-brand-gold">
                      {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.basePrice)}
                    </td>
                    <td className="py-4 text-xs text-gray-300">
                      <span className={totalStock < 20 ? 'text-amber-400 font-medium' : ''}>
                        {totalStock} units
                      </span>
                    </td>
                    <td className="py-4 text-xs">
                      {product.cjProductId ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand-gold font-medium bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                          <span>🔄</span>
                          <span>CJ Synced</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[11px]">Direct Catalog</span>
                      )}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all ${
                          product.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/shop/${product.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <span>↗</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs uppercase text-brand-gold font-semibold">Catalog Management</span>
                <h3 className="text-xl font-heading text-white font-medium">Add New Product</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Titanium Sunglasses"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Base Retail Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="120.00"
                    value={newProduct.basePrice}
                    onChange={e => setNewProduct({ ...newProduct, basePrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Sale Price ($ Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="99.00"
                    value={newProduct.salePrice}
                    onChange={e => setNewProduct({ ...newProduct, salePrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
                  >
                    <option value="c1">Electronics</option>
                    <option value="c2">Fashion</option>
                    <option value="c3">Home & Living</option>
                    <option value="c4">Sports</option>
                    <option value="c5">Beauty</option>
                    <option value="c6">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Initial Stock Units</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe craftsmanship, features, and brand aesthetics..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-bold shadow-lg shadow-brand-gold/10 hover:opacity-95"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
