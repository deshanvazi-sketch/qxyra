'use client';

import React, { useState, useEffect } from 'react';

interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'United States',
    zipCode: '',
    isDefault: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('qxyra_user_addresses');
      if (saved) {
        setAddresses(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveAddresses = (list: Address[]) => {
    setAddresses(list);
    try {
      localStorage.setItem('qxyra_user_addresses', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.street) return;

    const created: Address = {
      id: `addr-${Date.now()}`,
      ...newAddr,
      isDefault: addresses.length === 0 ? true : newAddr.isDefault,
    };

    let updated = [...addresses];
    if (created.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    updated.push(created);
    saveAddresses(updated);
    setShowForm(false);
    setNewAddr({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: 'United States',
      zipCode: '',
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    saveAddresses(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl">My Addresses</h1>
          <p className="text-gray-500 text-xs mt-1">Manage delivery locations for quick checkout.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-black text-brand-gold px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-900 transition-colors cursor-pointer"
        >
          {showForm ? 'Cancel' : '➕ Add New Address'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
          <h2 className="font-heading text-lg font-medium mb-4">Add Delivery Address</h2>
          <form className="space-y-4 text-xs" onSubmit={handleAddAddress}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  value={newAddr.fullName}
                  onChange={e => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  placeholder="e.g. Deshan Rathnadiwakara" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-gray-700">Phone Number *</label>
                <input 
                  type="tel" 
                  value={newAddr.phone}
                  onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  placeholder="+94 77 000 0000" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="font-medium text-gray-700">Street Address *</label>
              <input 
                type="text" 
                value={newAddr.street}
                onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                placeholder="Apartment, suite, unit, building, floor, street" 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-gray-700">City *</label>
                <input 
                  type="text" 
                  value={newAddr.city}
                  onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  placeholder="City" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-gray-700">State / Province</label>
                <input 
                  type="text" 
                  value={newAddr.state}
                  onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  placeholder="Province / State" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-gray-700">ZIP / Postal Code *</label>
                <input 
                  type="text" 
                  value={newAddr.zipCode}
                  onChange={e => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  placeholder="Postal Code" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-gray-700">Country *</label>
                <input 
                  type="text"
                  value={newAddr.country}
                  onChange={e => setNewAddr({ ...newAddr, country: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="isDefault" 
                checked={newAddr.isDefault}
                onChange={e => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                className="w-4 h-4 text-brand-gold rounded border-gray-300" 
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer">Set as default shipping address</label>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-brand-black text-brand-gold px-6 py-2.5 rounded-xl hover:bg-gray-900 transition-colors font-semibold cursor-pointer">
                Save Address
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium cursor-pointer">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
          <span className="text-4xl block mb-3">📍</span>
          <h3 className="font-heading text-lg font-medium text-brand-black mb-1">No addresses saved</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            You don&apos;t have any saved shipping addresses yet. Add your address for faster checkout.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-block px-5 py-2.5 bg-brand-gold text-brand-black font-semibold text-xs rounded-xl hover:opacity-90 transition-all cursor-pointer"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-2xl p-6 relative bg-white flex flex-col h-full shadow-sm">
              {address.isDefault && (
                <span className="absolute top-4 right-4 bg-brand-gold/15 text-brand-gold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold border border-brand-gold/20">
                  Default
                </span>
              )}
              
              <h3 className="font-heading text-base font-semibold mb-2">{address.fullName}</h3>
              
              <div className="text-gray-600 space-y-1 text-xs flex-1">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p className="pt-2 text-gray-400 font-mono">{address.phone}</p>
              </div>

              <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
