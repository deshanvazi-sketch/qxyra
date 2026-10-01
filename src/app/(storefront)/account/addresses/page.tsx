'use client';

import React, { useState } from 'react';

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);

  const mockAddresses = [
    {
      id: '1',
      fullName: 'John Doe',
      phone: '+1 (555) 123-4567',
      street: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      fullName: 'John Doe',
      phone: '+1 (555) 987-6543',
      street: '456 Business Rd, Suite 100',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      zipCode: '94107',
      isDefault: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h1 className="font-heading text-2xl md:text-3xl">My Addresses</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-black text-brand-gold px-4 py-2 rounded text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Address'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h2 className="font-heading text-xl mb-4">Add New Address</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="123 Main St, Apt 4B" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">City</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="New York" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">State / Province</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="NY" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="10001" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" required>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="isDefault" className="w-4 h-4 text-brand-gold rounded border-gray-300 focus:ring-brand-gold" />
              <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-brand-black text-brand-gold px-6 py-2 rounded hover:bg-gray-900 transition-colors font-medium">
                Save Address
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAddresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-6 relative bg-white flex flex-col h-full">
            {address.isDefault && (
              <span className="absolute top-4 right-4 bg-brand-black text-brand-gold text-xs px-2 py-1 rounded font-medium">
                Default
              </span>
            )}
            
            <h3 className="font-heading text-lg mb-2">{address.fullName}</h3>
            
            <div className="text-gray-600 space-y-1 text-sm flex-1">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p className="pt-2">{address.phone}</p>
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
              <button className="text-sm font-medium text-brand-black hover:text-brand-gold transition-colors">Edit</button>
              <button className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
