import React from 'react';
import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Refund & Return Policy | ${BRAND_NAME}`,
  description: `30-Day satisfaction guarantee, returns, exchanges, and refund procedures at ${BRAND_NAME}.`,
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#0A0A0A] text-gray-300 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#141820] p-8 sm:p-12 rounded-2xl border border-gray-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Buyer Protection Guarantee</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-light text-white mt-1">Refund & Return Policy</h1>
          <p className="text-gray-400 text-xs mt-2">30-Day Money-Back Guarantee</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. 30-Day Return Window</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you receive an item that is defective, damaged in transit, or significantly different from description, you may request a return or full refund within 30 days of receiving your item.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Eligibility for Refunds & Replacements</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Item arrived damaged, malfunctioning, or broken.</li>
              <li>Incorrect variant or wrong item received.</li>
              <li>Package failed to arrive within the guaranteed delivery timeframe (lost in transit).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. How to Request a Refund</h2>
            <p>
              Simply email our support desk at <span className="text-brand-gold">support@qxyra.com</span> with:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-400">
              <li>Your Qxyra Order Number (e.g. QX-...).</li>
              <li>A clear photo or video showing the defect or issue.</li>
            </ol>
            <p className="mt-2">
              Our team reviews requests within 24–48 hours. Once approved, refunds are credited back to your original payment method (Credit card, PayPal, or Bank) within 3–7 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. Customer Support</h2>
            <p>
              We are dedicated to your peace of mind. For any help regarding returns, please contact us at <span className="text-brand-gold">support@qxyra.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
