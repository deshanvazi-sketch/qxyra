'use client';

import React, { useState } from 'react';
import { Address } from '@/types';
import { cn } from '@/lib/utils';

export interface ShippingAddressData extends Partial<Address> {
  email?: string;
  notes?: string;
}

interface AddressFormProps {
  onSubmit: (data: ShippingAddressData) => void;
  initialData?: ShippingAddressData | null;
}

const SRI_LANKA_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

export function AddressForm({ onSubmit, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    street: initialData?.street || '',
    city: initialData?.city || '',
    state: initialData?.state || 'Trincomalee',
    country: 'Sri Lanka',
    zipCode: initialData?.zipCode || '',
    notes: initialData?.notes || '',
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required (නම ඇතුළත් කරන්න)';
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = 'Valid Phone / WhatsApp number is required (දුරකථන අංකය ඇතුළත් කරන්න)';
    }
    if (!formData.street.trim()) newErrors.street = 'Delivery address is required (ලිපිනය ඇතුළත් කරන්න)';
    if (!formData.city.trim()) newErrors.city = 'City / Town is required (නගරය ඇතුළත් කරන්න)';
    if (!formData.state.trim()) newErrors.state = 'District is required (දිස්ත්‍රික්කය තෝරන්න)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClasses =
    'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all';
  const labelClasses = 'block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5';
  const errorClasses = 'text-red-500 text-xs mt-1 font-mono';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-brand-black mb-1">
          Delivery Address (Islandwide Cash on Delivery)
        </h2>
        <p className="text-xs text-gray-500">
          Enter your doorstep delivery details for prompt islandwide dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>Full Name (සම්පූර්ණ නම) *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Kasun Perera"
            className={cn(inputClasses, errors.fullName && 'border-red-500 bg-red-50/20')}
          />
          {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
        </div>

        {/* WhatsApp / Phone */}
        <div>
          <label className={labelClasses}>
            WhatsApp / Mobile Phone * (දුරකථන අංකය)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="07X XXX XXXX (or +94)"
            className={cn(inputClasses, errors.phone && 'border-red-500 bg-red-50/20')}
          />
          {errors.phone ? (
            <p className={errorClasses}>{errors.phone}</p>
          ) : (
            <p className="text-[11px] text-gray-500 mt-1">
              Required for delivery courier verification &amp; order updates.
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className={labelClasses}>Email Address (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        {/* Street Address */}
        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>
            House No. &amp; Street Address (නිවසේ හෝ කාර්යාලයේ ලිපිනය) *
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="e.g. No. 45, Main Street"
            className={cn(inputClasses, errors.street && 'border-red-500 bg-red-50/20')}
          />
          {errors.street && <p className={errorClasses}>{errors.street}</p>}
        </div>

        {/* City / Town */}
        <div>
          <label className={labelClasses}>City / Town (නගරය) *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Mutur, Kandy, Colombo, Galle"
            className={cn(inputClasses, errors.city && 'border-red-500 bg-red-50/20')}
          />
          {errors.city && <p className={errorClasses}>{errors.city}</p>}
        </div>

        {/* District */}
        <div>
          <label className={labelClasses}>District (දිස්ත්‍රික්කය) *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={inputClasses}
          >
            {SRI_LANKA_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className={labelClasses}>Country</label>
          <input
            type="text"
            name="country"
            value="Sri Lanka 🇱🇰"
            readOnly
            className={cn(inputClasses, 'bg-gray-100 text-gray-700 cursor-not-allowed')}
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className={labelClasses}>Postal Code (Optional)</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="e.g. 31200"
            className={inputClasses}
          />
        </div>

        {/* Delivery Landmark / Note */}
        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>
            Landmark or Delivery Instructions (සලකුණක් හෝ විශේෂ උපදෙස්)
          </label>
          <textarea
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g. Near clock tower, call before arrival, delivery after 2 PM"
            className={cn(inputClasses, 'resize-none')}
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Payment (Cash on Delivery) →
        </button>
      </div>
    </form>
  );
}
