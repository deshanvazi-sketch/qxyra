'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PaymentFormProps {
  onSubmit: () => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [method, setMethod] = useState<PaymentMethod>('credit_card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const inputClasses = "w-full bg-transparent border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors";
  const labelClasses = "block text-sm font-medium text-brand-black mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="text-xl font-heading font-semibold text-brand-black mb-6">Payment Method</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => setMethod('credit_card')}
          className={cn(
            "flex-1 py-4 border text-center transition-colors",
            method === 'credit_card' ? "border-brand-gold bg-brand-gold/5" : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="block font-medium text-sm">Credit Card</span>
        </button>
        <button
          type="button"
          onClick={() => setMethod('paypal')}
          className={cn(
            "flex-1 py-4 border text-center transition-colors",
            method === 'paypal' ? "border-brand-gold bg-brand-gold/5" : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="block font-medium text-sm">PayPal</span>
        </button>
        <button
          type="button"
          onClick={() => setMethod('bank_transfer')}
          className={cn(
            "flex-1 py-4 border text-center transition-colors",
            method === 'bank_transfer' ? "border-brand-gold bg-brand-gold/5" : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="block font-medium text-sm">Bank Transfer</span>
        </button>
      </div>

      {method === 'credit_card' && (
        <div className="space-y-6 bg-gray-50 p-6 rounded-sm border border-gray-100">
          <div>
            <label className={labelClasses}>Card Number</label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className={inputClasses}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="Name on card"
              className={inputClasses}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                className={inputClasses}
                required
              />
            </div>
          </div>
        </div>
      )}

      {method === 'paypal' && (
        <div className="bg-gray-50 p-6 text-center text-gray-600 border border-gray-100">
          You will be redirected to PayPal to complete your purchase securely.
        </div>
      )}

      {method === 'bank_transfer' && (
        <div className="bg-gray-50 p-6 text-gray-600 text-sm space-y-2 border border-gray-100">
          <p>Please transfer the total amount to the following bank account:</p>
          <p className="font-mono mt-2">Bank: Qxyra Global Bank</p>
          <p className="font-mono">Account No: 1234-5678-9012</p>
          <p className="font-mono">Routing No: 987654321</p>
        </div>
      )}

      <div className="flex items-center text-sm text-green-700 bg-green-50 p-3">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Your payment information is encrypted and secure.
      </div>

      <div className="pt-4 flex gap-4">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-brand-black text-white hover:bg-black/90 transition-colors font-medium text-sm"
        >
          Review Order
        </button>
      </div>
    </form>
  );
}
