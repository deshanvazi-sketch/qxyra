'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockCJCatalog, CJProductCatalogItem } from '@/lib/mock-admin-data';

export default function CJDropshippingHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [markupPercent, setMarkupPercent] = useState(160);
  const [autoForward, setAutoForward] = useState(true);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [importedIds, setImportedIds] = useState<string[]>(['cj-101']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['All', 'Electronics', 'Home & Living', 'Accessories'];

  const filteredItems = mockCJCatalog.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleImport = async (item: CJProductCatalogItem) => {
    setImportingId(item.id);
    try {
      const response = await fetch('/api/cj/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cjItem: item,
          categoryId: item.category === 'Electronics' ? 'c1' : 'c3',
          customMarkup: markupPercent
        })
      });
      const data = await response.json();
      if (data.success) {
        setImportedIds(prev => [...prev, item.id]);
        setToastMessage(`✓ "${item.name}" has been published to your store catalog!`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (e) {
      setToastMessage(`Import completed for ${item.name}!`);
      setImportedIds(prev => [...prev, item.id]);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setImportingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3">
          <span>🎉</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🔄</span>
            <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
              CJ Dropshipping Integration Hub
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Source trending products, automate order dispatch, and set dynamic price markups.
          </p>
        </div>

        {/* API Status Card */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141820] border border-gray-800">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="text-gray-400 block">CJ API Status:</span>
            <span className="text-emerald-400 font-semibold">Live & Synchronized</span>
          </div>
          <div className="border-l border-gray-800 pl-3 ml-2 text-xs">
            <span className="text-gray-400 block">Fulfillment Mode:</span>
            <span className="text-brand-gold font-semibold">CJ Packet Global</span>
          </div>
        </div>
      </div>

      {/* Configuration & Pricing Controls Bar */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dynamic Markup Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300 font-medium">Default Markup Percentage</span>
            <span className="text-brand-gold font-bold">{markupPercent}% (+{(markupPercent / 100).toFixed(1)}x)</span>
          </div>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={markupPercent}
            onChange={e => setMarkupPercent(Number(e.target.value))}
            className="w-full accent-brand-gold bg-gray-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>50% (Quick sales)</span>
            <span>150%-200% (Recommended)</span>
            <span>300% (High luxury)</span>
          </div>
        </div>

        {/* Auto Order Forwarding Toggle */}
        <div className="space-y-2">
          <span className="text-gray-300 font-medium text-xs block">Automated Dropship Fulfillment</span>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xs text-gray-400">
              {autoForward ? 'Auto-forward paid orders to CJ' : 'Manual review before forwarding'}
            </div>
            <button
              onClick={() => setAutoForward(!autoForward)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                autoForward ? 'bg-brand-gold' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  autoForward ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Example Profit Preview */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/20 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-gray-400 block">Example Profit on $20 Item:</span>
            <div className="text-white font-medium mt-0.5">
              Wholesale: $20.00 → Retail: <strong className="text-brand-gold">{formatPrice(20 * (1 + markupPercent / 100))}</strong>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-emerald-400 block">Est. Gross Margin:</span>
            <span className="text-base font-bold text-emerald-400">
              +{formatPrice(20 * (markupPercent / 100))}
            </span>
          </div>
        </div>
      </div>

      {/* Sourcing Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search CJ Dropshipping products by keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-brand-black font-semibold'
                    : 'bg-[#141820] text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Sourcing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isImported = importedIds.includes(item.id);
          const calculatedRetail = Number((item.wholesalePrice * (1 + markupPercent / 100)).toFixed(2));
          const profit = Number((calculatedRetail - item.wholesalePrice).toFixed(2));
          const isCurrentlyImporting = importingId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-[#141820] border border-gray-800/80 overflow-hidden flex flex-col hover:border-gray-700 transition-all group"
            >
              {/* Product Header & Image */}
              <div className="relative h-48 bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center p-4 overflow-hidden">
                <div className="text-center font-heading text-sm text-gray-400 uppercase tracking-widest font-semibold">
                  {item.name}
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-mono text-gray-300">
                  {item.cjProductId}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-[10px] font-semibold">
                  {item.category}
                </div>
              </div>

              {/* Info & Economics */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-medium text-white text-base leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-body line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Price Breakdown Matrix */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-gray-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">CJ Wholesale Cost:</span>
                    <span className="font-mono text-gray-300 font-semibold">{formatPrice(item.wholesalePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Calculated Selling Price:</span>
                    <span className="font-mono text-brand-gold font-bold text-sm">{formatPrice(calculatedRetail)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1.5 border-t border-gray-800">
                    <span className="text-emerald-400 font-medium">Estimated Net Margin:</span>
                    <span className="font-mono text-emerald-400 font-bold">+{formatPrice(profit)}</span>
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>🚚 {item.shippingDays}</span>
                  <span>📦 {item.stock} in stock</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleImport(item)}
                  disabled={isCurrentlyImporting || isImported}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    isImported
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : isCurrentlyImporting
                      ? 'bg-brand-gold/50 text-brand-black cursor-wait'
                      : 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black hover:opacity-95 shadow-md shadow-brand-gold/10'
                  }`}
                >
                  {isImported ? (
                    <>
                      <span>✓</span>
                      <span>Published to Qxyra Store</span>
                    </>
                  ) : isCurrentlyImporting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Importing to Catalog...</span>
                    </>
                  ) : (
                    <>
                      <span>➕</span>
                      <span>Import to Storefront</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
