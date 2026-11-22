'use client';

import React from 'react';
import { Truck, ShieldCheck, CheckCircle2, AlertCircle, Banknote } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: () => void;
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-brand-black mb-1">
          Payment Method
        </h2>
        <p className="text-xs text-gray-500">
          Select your preferred payment option for your order.
        </p>
      </div>

      {/* Available Payment Methods */}
      <div className="space-y-4">
        {/* 1. Cash on Delivery (COD) - ACTIVE & DEFAULT */}
        <div className="relative border-2 border-brand-gold bg-amber-50/20 p-5 sm:p-6 rounded-2xl shadow-sm transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-gray-950">
                    Cash on Delivery (COD)
                  </h3>
                  <span className="bg-emerald-500/15 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    100% Active
                  </span>
                </div>
                <p className="text-xs font-medium text-amber-900 mt-0.5">
                  දිවයින පුරා භාණ්ඩය නිවසටම ලැබුණු පසු මුදල් ගෙවන්න
                </p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Pay in cash or transfer via Bank LankaQR directly to the courier when your sealed package arrives at your home or office.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center text-brand-black">
                <CheckCircle2 className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-amber-200/70 text-[11px] text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% TRCSL Approved & Sealed</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No Advance Deposit Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Doorstep Inspection on Delivery</span>
            </div>
          </div>
        </div>

        {/* 2. Online Card Payment - Under Maintenance Notice */}
        <div className="border border-gray-200 bg-gray-50/80 p-4 rounded-xl opacity-75">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl grayscale">💳</span>
              <div>
                <span className="text-xs font-medium text-gray-700 block">
                  Online Debit / Credit Card (Visa &amp; Mastercard)
                </span>
                <span className="text-[11px] text-amber-700 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3 inline shrink-0" />
                  Online Card Gateway under scheduled maintenance. Please use Cash on Delivery.
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase bg-gray-200/80 px-2 py-0.5 rounded">
              Offline
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2.5">
        <span className="text-base">✓</span>
        <span>
          Your order will be verified and dispatched directly from the Methmi Mobile Mutur Flagship Showroom with 1-Year Company Warranty.
        </span>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Order Review →
        </button>
      </div>
    </form>
  );
}
