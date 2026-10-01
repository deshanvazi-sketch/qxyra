'use client';

import React, { useState } from 'react';
import { Address } from '@/types';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  onSubmit: (data: Partial<Address>) => void;
}

export function AddressForm({ onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'US',
    zipCode: '',
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClasses = "w-full bg-transparent border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors";
  const labelClasses = "block text-sm font-medium text-brand-black mb-1";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-brand-black mb-6">Shipping Address</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={cn(inputClasses, errors.fullName && "border-red-500")}
          />
          {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
        </div>

        <div>
          <label className={labelClasses}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(inputClasses, errors.email && "border-red-500")}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClasses}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={cn(inputClasses, errors.phone && "border-red-500")}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>Street Address</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={cn(inputClasses, errors.street && "border-red-500")}
          />
          {errors.street && <p className={errorClasses}>{errors.street}</p>}
        </div>

        <div>
          <label className={labelClasses}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={cn(inputClasses, errors.city && "border-red-500")}
          />
          {errors.city && <p className={errorClasses}>{errors.city}</p>}
        </div>

        <div>
          <label className={labelClasses}>State / Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={cn(inputClasses, errors.state && "border-red-500")}
          />
          {errors.state && <p className={errorClasses}>{errors.state}</p>}
        </div>

        <div>
          <label className={labelClasses}>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={cn(inputClasses, errors.zipCode && "border-red-500")}
          />
          {errors.zipCode && <p className={errorClasses}>{errors.zipCode}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold accent-brand-gold"
        />
        <label htmlFor="isDefault" className="text-sm text-gray-600">
          Save as default address
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-brand-black text-white hover:bg-black/90 transition-colors font-medium text-sm"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
