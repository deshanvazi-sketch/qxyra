import React from 'react';
import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND_NAME}`,
  description: `Terms and conditions governing the use of ${BRAND_NAME} online store.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#0A0A0A] text-gray-300 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#141820] p-8 sm:p-12 rounded-2xl border border-gray-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Terms & Agreements</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-light text-white mt-1">Terms of Service</h1>
          <p className="text-gray-400 text-xs mt-2">Effective Date: October 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using {BRAND_NAME} (https://qxyra.com), you agree to be bound by these Terms of Service and all applicable international trade regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Purchases & Pricing</h2>
            <p>
              All prices are listed in USD (or other selected display currencies). We reserve the right to correct pricing errors and adjust rates due to market changes. Upon placing an order, you agree that your payment details are valid and authorized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. Shipping & Delivery</h2>
            <p>
              We provide international worldwide shipping through certified logistics carriers. Delivery times typically range between 7 to 15 business days depending on destination countries and customs processing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. User Conduct</h2>
            <p>
              You agree not to engage in unauthorized attempts to access our systems, interfere with payment gateways, or use our website for fraudulent activities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">5. Governing Law & Support</h2>
            <p>
              For customer inquiries or legal questions, reach our customer service desk at <span className="text-brand-gold">support@qxyra.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
