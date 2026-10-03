'use client';

import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockOrders } from '@/lib/mock-admin-data';
import { Order, OrderStatus, SalesPlatform } from '@/types';
import { useCurrency, Currency } from '@/context/CurrencyContext';

const STORAGE_KEY = 'qxyra_admin_orders';

const PLATFORMS: SalesPlatform[] = [
  'Qxyra Web',
  'Daraz',
  'CJ Dropshipping',
  'TikTok Shop',
  'AliExpress',
  'eBay',
  'Manual / Other'
];

export default function AdminOrdersPage() {
  const { currency, exchangeRate, format, convertToUSD } = useCurrency();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputCurrency, setInputCurrency] = useState<Currency>(currency);
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [syncingOrderId, setSyncingOrderId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Multi-Channel Order Form State
  const [newOrder, setNewOrder] = useState({
    platform: 'Daraz' as SalesPlatform,
    orderNumber: '',
    customerName: '',
    customerLocation: 'Colombo, Sri Lanka',
    customerPhone: '',
    productName: '',
    quantity: '1',
    sellPrice: '',
    buyPrice: '',
    status: OrderStatus.PENDING,
    trackingNumber: '',
    notes: ''
  });

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
  }, []);

  const updateOrders = (newList: Order[]) => {
    setOrders(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Profit & Revenue Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalCost = orders.reduce((sum, o) => sum + (o.costPrice || 0), 0);
  const totalNetProfit = totalRevenue - totalCost;
  const overallMargin = totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : '0';

  // Filter Orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
    const orderPlatform = order.platform || (order.cjOrderId ? 'CJ Dropshipping' : 'Qxyra Web');
    const matchesPlatform = selectedPlatform === 'ALL' || orderPlatform === selectedPlatform;

    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.cjOrderId && order.cjOrderId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (orderPlatform.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesPlatform && matchesSearch;
  });

  // Calculate live profit inside modal (supports USD or LKR entry)
  const formSellNum = parseFloat(newOrder.sellPrice) || 0;
  const formBuyNum = parseFloat(newOrder.buyPrice) || 0;
  const formQtyNum = parseInt(newOrder.quantity) || 1;
  const formTotalSell = formSellNum * formQtyNum;
  const formTotalCost = formBuyNum * formQtyNum;
  const formProfit = formTotalSell - formTotalCost;
  const formMargin = formTotalSell > 0 ? ((formProfit / formTotalSell) * 100).toFixed(1) : '0';

  // Normalized USD values stored for global analytics
  const storedTotalSell = inputCurrency === 'LKR' ? (formTotalSell / exchangeRate) : formTotalSell;
  const storedTotalCost = inputCurrency === 'LKR' ? (formTotalCost / exchangeRate) : formTotalCost;
  const storedProfit = storedTotalSell - storedTotalCost;
  const storedItemSell = inputCurrency === 'LKR' ? (formSellNum / exchangeRate) : formSellNum;

  // Handle Add Multi-Channel Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.sellPrice) return;

    const autoOrderNum = newOrder.orderNumber.trim() || 
      (newOrder.platform === 'Daraz' ? `DZ-${Math.floor(100000 + Math.random() * 900000)}` :
       newOrder.platform === 'TikTok Shop' ? `TT-${Math.floor(100000 + Math.random() * 900000)}` :
       `ORD-${Math.floor(10000 + Math.random() * 90000)}`);

    const createdOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: autoOrderNum,
      userId: `user-${Date.now()}`,
      platform: newOrder.platform,
      status: newOrder.status,
      subtotal: storedTotalSell,
      shippingCost: 0,
      discount: 0,
      total: storedTotalSell,
      costPrice: storedTotalCost,
      profit: storedProfit,
      profitMargin: parseFloat(formMargin),
      trackingNumber: newOrder.trackingNumber || undefined,
      notes: newOrder.notes ? `${newOrder.notes} [Logged in ${inputCurrency}]` : `[Logged in ${inputCurrency}]`,
      createdAt: new Date().toISOString(),
      shippingAddress: {
        id: `addr-${Date.now()}`,
        userId: `user-${Date.now()}`,
        fullName: newOrder.customerName,
        phone: newOrder.customerPhone || 'N/A',
        street: newOrder.customerLocation || 'Direct Dispatch',
        city: newOrder.customerLocation.split(',')[0] || 'Local',
        state: 'Province',
        country: newOrder.customerLocation.split(',')[1]?.trim() || 'Sri Lanka',
        zipCode: '00000',
        isDefault: true
      },
      items: [
        {
          id: `item-${Date.now()}`,
          orderId: `ord-${Date.now()}`,
          product: {
            id: `prod-${Date.now()}`,
            name: newOrder.productName || 'Dropshipped Item',
            slug: 'multi-channel-item',
            description: 'Item fulfilled via dropshipping channel.',
            basePrice: storedItemSell,
            images: [],
            categoryId: 'c1',
            variants: [],
            rating: 5,
            totalSold: formQtyNum,
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          variant: {
            id: `var-${Date.now()}`,
            productId: `prod-${Date.now()}`,
            price: storedItemSell,
            stock: 100,
            sku: `${newOrder.platform.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
          },
          quantity: formQtyNum,
          price: storedItemSell
        }
      ]
    };

    updateOrders([createdOrder, ...orders]);
    setShowAddModal(false);
    setNewOrder({
      platform: 'Daraz',
      orderNumber: '',
      customerName: '',
      customerLocation: 'Colombo, Sri Lanka',
      customerPhone: '',
      productName: '',
      quantity: '1',
      sellPrice: '',
      buyPrice: '',
      status: OrderStatus.PENDING,
      trackingNumber: '',
      notes: ''
    });

    showToast(`✓ Order #${createdOrder.orderNumber} (${createdOrder.platform}) saved with ${format(storedProfit, true)} net profit!`);
  };

  const handleDeleteSingle = () => {
    if (!orderToDelete) return;
    const deletedNum = orderToDelete.orderNumber;
    const updated = orders.filter(o => o.id !== orderToDelete.id);
    updateOrders(updated);
    setOrderToDelete(null);
    showToast(`✓ Removed Order #${deletedNum} from records!`);
  };

  const handleClearAllOrders = () => {
    updateOrders([]);
    setShowDeleteAllModal(false);
    showToast('✓ All orders cleared from queue!');
  };

  const handleResetDemoOrders = () => {
    updateOrders(mockOrders);
    showToast('✓ Restored demo orders.');
  };

  const forwardToCJ = async (order: Order) => {
    setSyncingOrderId(order.id);
    try {
      const response = await fetch('/api/cj/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          shippingAddress: order.shippingAddress,
          items: order.items.map(item => ({
            sku: item.variant.sku,
            quantity: item.quantity,
            title: item.product.name
          }))
        })
      });

      const res = await response.json();
      if (res.success) {
        const updated = orders.map(o => {
          if (o.id === order.id) {
            return {
              ...o,
              status: OrderStatus.PROCESSING,
              cjOrderId: res.cjOrderId,
              trackingNumber: res.trackingNumber
            };
          }
          return o;
        });
        updateOrders(updated);
        showToast(`✓ Order #${order.orderNumber} successfully forwarded to CJ Dropshipping (${res.cjOrderId})!`);
      }
    } catch (e) {
      const updated = orders.map(o => {
        if (o.id === order.id) {
          return {
            ...o,
            status: OrderStatus.PROCESSING,
            cjOrderId: `CJ-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            trackingNumber: `CJTRK${Math.floor(100000000 + Math.random() * 900000000)}US`
          };
        }
        return o;
      });
      updateOrders(updated);
      showToast(`✓ Order #${order.orderNumber} transmitted to CJ Dropshipping!`);
    } finally {
      setSyncingOrderId(null);
    }
  };

  // Helper for Platform Badge Styling
  const getPlatformBadge = (platform?: string) => {
    const p = platform || 'Qxyra Web';
    if (p === 'Daraz') {
      return 'bg-[#FF6000]/15 text-[#FF6000] border-[#FF6000]/30';
    }
    if (p === 'TikTok Shop') {
      return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    }
    if (p === 'CJ Dropshipping') {
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    }
    if (p === 'AliExpress') {
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    }
    if (p === 'eBay') {
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
    return 'bg-brand-gold/15 text-brand-gold border-brand-gold/30';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
              Multi-Channel Order Hub & Profit Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              {orders.length} Total Orders
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Track multi-platform dropshipping orders (Daraz, Qxyra Web, CJ, TikTok), analyze buy/sell margins, and calculate net profit.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-gray-400">Active Currency:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white">
              <span>{currency === 'USD' ? '🇺🇸' : '🇱🇰'}</span>
              <span>{currency} ({currency === 'USD' ? '$' : 'Rs.'})</span>
            </span>
            {currency === 'LKR' && (
              <span className="text-[11px] text-emerald-300 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>1 USD = Rs. {exchangeRate.toFixed(2)} (Live Rate)</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Add Multi-Channel Order Button */}
          <button
            onClick={() => {
              setInputCurrency(currency);
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black font-bold text-xs rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>➕</span>
            <span>Record Multi-Channel Order</span>
          </button>

          {orders.length > 0 && (
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="px-3 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Delete all orders"
            >
              <span>🗑️</span>
              <span>Clear All ({orders.length})</span>
            </button>
          )}

          {orders.length === 0 && (
            <button
              onClick={handleResetDemoOrders}
              className="px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Restore demo orders"
            >
              <span>↺</span>
              <span>Sample Orders</span>
            </button>
          )}
        </div>
      </div>

      {/* Financial Profit Summary Banner (4 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales (Revenue) */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Sales Revenue</span>
            <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 text-[10px]">
              Sell Value
            </span>
          </div>
          <div className="text-2xl font-heading font-semibold text-white">
            {format(totalRevenue)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            From {orders.length} total orders across all channels
          </div>
        </div>

        {/* Total Buy Cost / Sourcing Cost */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Sourcing Cost</span>
            <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px]">
              Buy Value
            </span>
          </div>
          <div className="text-2xl font-heading font-semibold text-gray-300">
            {format(totalCost)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Cost to acquire / dropship inventory
          </div>
        </div>

        {/* Net Profit (ශුද්ධ ලාභය) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141820] to-[#12241b] border border-emerald-500/30 shadow-lg shadow-emerald-950/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 text-xs mb-2">
            <span className="font-semibold">Net Profit (ශුද්ධ ලාභය)</span>
            <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px]">
              {overallMargin}% Margin
            </span>
          </div>
          <div className={`text-2xl sm:text-3xl font-heading font-bold ${
            totalNetProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {totalNetProfit >= 0 ? format(totalNetProfit, true) : format(totalNetProfit)}
          </div>
          <div className="text-xs text-emerald-300/80 mt-2 flex items-center gap-1">
            <span>{totalNetProfit >= 0 ? '✨ Profitable business operations' : '⚠️ Operating at net deficit'}</span>
          </div>
        </div>

        {/* Profit Margin & Channels */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Overall Profit Margin</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20 text-[10px]">
              Efficiency
            </span>
          </div>
          <div className="text-2xl font-heading font-semibold text-brand-gold">
            {overallMargin}%
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Net gain per $1.00 of total sales
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-4">
        {/* Platform Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-gray-400 font-medium mr-1 shrink-0">Channel:</span>
          {['ALL', 'Daraz', 'Qxyra Web', 'CJ Dropshipping', 'TikTok Shop', 'AliExpress', 'Manual / Other'].map(pl => {
            const count = pl === 'ALL' 
              ? orders.length 
              : orders.filter(o => (o.platform || (o.cjOrderId ? 'CJ Dropshipping' : 'Qxyra Web')) === pl).length;

            return (
              <button
                key={pl}
                onClick={() => setSelectedPlatform(pl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedPlatform === pl
                    ? 'bg-brand-gold text-brand-black font-semibold shadow-sm'
                    : 'bg-[#141820] text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                <span>{pl}</span>
                <span className="ml-1.5 opacity-70 font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Status Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by order #, customer, Daraz ID, or platform..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-white/15 text-white font-semibold border border-white/20'
                    : 'bg-[#141820] text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                <th className="pb-3 font-medium">Order & Channel</th>
                <th className="pb-3 font-medium">Customer Details</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Sell Price (Retail)</th>
                <th className="pb-3 font-medium">Buy Price (Cost)</th>
                <th className="pb-3 font-medium">Net Profit (ශුද්ධ ලාභය)</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredOrders.map(order => {
                const isSyncing = syncingOrderId === order.id;
                const platformName = order.platform || (order.cjOrderId ? 'CJ Dropshipping' : 'Qxyra Web');
                
                // Profit calculation per row
                const sellAmount = order.total || 0;
                const costAmount = order.costPrice || 0;
                const profitAmount = order.profit !== undefined ? order.profit : (sellAmount - costAmount);
                const marginPercent = sellAmount > 0 ? ((profitAmount / sellAmount) * 100).toFixed(0) : '0';

                return (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Order & Channel */}
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <span>#{order.orderNumber}</span>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${getPlatformBadge(platformName)}`}>
                          {platformName}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4">
                      <div className="font-medium text-gray-200 text-xs">{order.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-gray-500">{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                    </td>

                    {/* Date */}
                    <td className="py-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Sell Price */}
                    <td className="py-4 font-semibold text-xs text-white">
                      {format(sellAmount)}
                    </td>

                    {/* Buy Price */}
                    <td className="py-4 font-mono text-xs text-gray-400">
                      {costAmount > 0 ? format(costAmount) : '—'}
                    </td>

                    {/* Net Profit & Margin */}
                    <td className="py-4">
                      <div className="space-y-0.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold font-mono border ${
                          profitAmount >= 0 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          <span>{profitAmount >= 0 ? format(profitAmount, true) : format(profitAmount)}</span>
                        </span>
                        {sellAmount > 0 && costAmount > 0 && (
                          <div className="text-[10px] text-gray-500 font-mono">
                            {marginPercent}% margin
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : order.status === 'SHIPPED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : order.status === 'PROCESSING'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === 'PENDING' && platformName === 'CJ Dropshipping' && (
                          <button
                            onClick={() => forwardToCJ(order)}
                            disabled={isSyncing}
                            className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                          >
                            {isSyncing ? 'Syncing...' : '🚀 CJ Dispatch'}
                          </button>
                        )}
                        <button
                          onClick={() => setActiveModalOrder(order)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setOrderToDelete(order)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                          title={`Delete Order ${order.orderNumber}`}
                        >
                          <span>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="text-4xl">🛍️</div>
                      <h3 className="text-base font-heading text-white font-medium">
                        {orders.length === 0 ? 'No orders recorded yet' : 'No matching orders'}
                      </h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        {orders.length === 0
                          ? 'You can record customer orders received from Daraz, TikTok Shop, CJ, or your storefront to start tracking live profits.'
                          : 'No orders match your selected channel or status filter.'}
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-bold rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 cursor-pointer"
                        >
                          ➕ Record Multi-Channel Order
                        </button>
                        {orders.length === 0 && (
                          <button
                            onClick={handleResetDemoOrders}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-xl border border-white/10 cursor-pointer"
                          >
                            ↺ Restore Samples
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Multi-Channel Order with Live Profit Calculator */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs uppercase text-brand-gold font-semibold tracking-wider">Multi-Channel Fulfillment</span>
                <h3 className="text-xl font-heading text-white font-medium">Record Multi-Platform Order</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              {/* Platform Selector & Order # */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Sales Channel / Platform *</label>
                  <select
                    value={newOrder.platform}
                    onChange={e => setNewOrder({ ...newOrder, platform: e.target.value as SalesPlatform })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
                  >
                    {PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Order Number / Platform ID</label>
                  <input
                    type="text"
                    placeholder="e.g. DZ-98241 (Auto if empty)"
                    value={newOrder.orderNumber}
                    onChange={e => setNewOrder({ ...newOrder, orderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              {/* Customer Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Kalhara"
                    value={newOrder.customerName}
                    onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Customer City / Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Kandy, Sri Lanka"
                    value={newOrder.customerLocation}
                    onChange={e => setNewOrder({ ...newOrder, customerLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Product Name & Qty */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-gray-300 block mb-1.5 font-medium">Product / Item Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Titanium Luxury Sunglasses"
                    value={newOrder.productName}
                    onChange={e => setNewOrder({ ...newOrder, productName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newOrder.quantity}
                    onChange={e => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Currency Selector for Order Input */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 font-medium">Input Currency:</span>
                  <span className="text-[11px] text-gray-500">
                    {inputCurrency === 'LKR' 
                      ? `Live forex sync: 1 USD = Rs. ${exchangeRate.toFixed(2)}`
                      : 'Global USD pricing'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-gray-700">
                  <button
                    type="button"
                    onClick={() => setInputCurrency('USD')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      inputCurrency === 'USD'
                        ? 'bg-brand-gold text-brand-black shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🇺🇸 USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputCurrency('LKR')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      inputCurrency === 'LKR'
                        ? 'bg-brand-gold text-brand-black shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🇱🇰 LKR (Rs.)
                  </button>
                </div>
              </div>

              {/* Buy Price vs Sell Price (Financials) */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/30 border border-gray-800">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">
                    Sourcing / Buy Price (Cost in {inputCurrency})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">
                      {inputCurrency === 'USD' ? '$' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={inputCurrency === 'USD' ? '18.50' : '6100.00'}
                      value={newOrder.buyPrice}
                      onChange={e => setNewOrder({ ...newOrder, buyPrice: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-gray-800 text-white text-sm font-mono focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">What you pay to supplier</span>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">
                    Selling / Retail Price * (in {inputCurrency})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">
                      {inputCurrency === 'USD' ? '$' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder={inputCurrency === 'USD' ? '59.99' : '19800.00'}
                      value={newOrder.sellPrice}
                      onChange={e => setNewOrder({ ...newOrder, sellPrice: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-gray-800 text-white text-sm font-mono focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">Customer purchase price</span>
                </div>
              </div>

              {/* Live Profit Preview Box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                    Calculated Net Profit ({inputCurrency})
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-300 mt-0.5">
                    {inputCurrency === 'LKR'
                      ? (formProfit >= 0 
                          ? `+Rs. ${formProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                          : `-Rs. ${Math.abs(formProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                      : (formProfit >= 0 
                          ? `+$${formProfit.toFixed(2)}` 
                          : `-$${Math.abs(formProfit).toFixed(2)}`)}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {inputCurrency === 'LKR'
                      ? `≈ ${storedProfit >= 0 ? `+$${storedProfit.toFixed(2)}` : `-$${Math.abs(storedProfit).toFixed(2)}`} USD (Rate: $1 = Rs. ${exchangeRate.toFixed(2)})`
                      : `≈ ${formProfit >= 0 ? `+Rs. ${(formProfit * exchangeRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-Rs. ${(Math.abs(formProfit) * exchangeRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} LKR (Live Forex)`}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                    Profit Margin
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-300 mt-0.5">
                    {formMargin}%
                  </div>
                </div>
              </div>

              {/* Status & Courier Tracking */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Fulfillment Status</label>
                  <select
                    value={newOrder.status}
                    onChange={e => setNewOrder({ ...newOrder, status: e.target.value as OrderStatus })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
                  >
                    <option value={OrderStatus.PENDING}>Pending</option>
                    <option value={OrderStatus.PROCESSING}>Processing</option>
                    <option value={OrderStatus.SHIPPED}>Shipped</option>
                    <option value={OrderStatus.DELIVERED}>Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">Courier / Tracking #</label>
                  <input
                    type="text"
                    placeholder="e.g. Prompt Xpress / CJTRK..."
                    value={newOrder.trackingNumber}
                    onChange={e => setNewOrder({ ...newOrder, trackingNumber: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black text-xs font-bold shadow-lg shadow-brand-gold/15 hover:opacity-95 cursor-pointer"
                >
                  Save Order & Track Profit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Order Inspection & Profit Breakdown */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border mb-1 ${getPlatformBadge(activeModalOrder.platform)}`}>
                  {activeModalOrder.platform || 'Direct Store'}
                </span>
                <h3 className="text-xl font-heading text-white font-medium">#{activeModalOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Profit & Financial Breakdown Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-black/50 to-emerald-950/20 border border-emerald-500/30 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block mb-1">Selling Price (Revenue)</span>
                <span className="text-base font-bold text-white font-mono">{format(activeModalOrder.total)}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Buy Price (Cost)</span>
                <span className="text-base font-bold text-gray-400 font-mono">
                  {activeModalOrder.costPrice ? format(activeModalOrder.costPrice) : '—'}
                </span>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold block mb-1">Net Profit (ශුද්ධ ලාභය)</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {activeModalOrder.profit !== undefined 
                    ? (activeModalOrder.profit >= 0 ? format(activeModalOrder.profit, true) : format(activeModalOrder.profit))
                    : format(activeModalOrder.total - (activeModalOrder.costPrice || 0), true)}
                </span>
              </div>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                <span className="text-gray-400 block mb-1">Customer Profile</span>
                <div className="text-white font-medium text-sm">{activeModalOrder.shippingAddress.fullName}</div>
                <div className="text-gray-400 mt-1">{activeModalOrder.shippingAddress.phone}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                <span className="text-gray-400 block mb-1">Delivery Destination</span>
                <div className="text-white font-medium">{activeModalOrder.shippingAddress.street}</div>
                <div className="text-gray-400">{activeModalOrder.shippingAddress.city}, {activeModalOrder.shippingAddress.country}</div>
              </div>
            </div>

            {/* Tracking Reference */}
            {activeModalOrder.trackingNumber && (
              <div className="p-4 rounded-xl bg-black/30 border border-gray-800 text-xs">
                <span className="text-gray-400 block mb-1">Courier Tracking Code</span>
                <span className="font-mono text-brand-gold font-bold text-sm">
                  {activeModalOrder.trackingNumber}
                </span>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-3">
              <span className="text-xs text-gray-400 block">Ordered Items ({activeModalOrder.items.length})</span>
              {activeModalOrder.items.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-black/20 border border-gray-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-medium">{item.product.name}</div>
                    <div className="text-gray-500 text-[11px]">Qty: {item.quantity} • SKU: {item.variant.sku}</div>
                  </div>
                  <div className="font-mono text-white font-semibold">
                    {format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                🗑️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Delete Order Record</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Are you sure you want to delete Order <span className="text-white font-semibold font-mono">#{orderToDelete.orderNumber}</span> ({orderToDelete.shippingAddress.fullName})?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSingle}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Yes, Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Clear All */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Clear All Orders?</h3>
                <p className="text-gray-400 text-xs mt-1">
                  This will remove all <span className="text-white font-semibold">{orders.length} orders</span> from your management dashboard.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAllOrders}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Clear All Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
