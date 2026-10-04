import React from 'react';
import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_NAME}`,
  description: `Learn how ${BRAND_NAME} collects, protects, and handles your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#0A0A0A] text-gray-300 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#141820] p-8 sm:p-12 rounded-2xl border border-gray-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Legal & Transparency</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-light text-white mt-1">Privacy Policy</h1>
          <p className="text-gray-400 text-xs mt-2">Last updated: October 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. Overview</h2>
            <p>
              Welcome to {BRAND_NAME} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting personal data you share when visiting or making purchases at {BRAND_NAME} (https://qxyra.com).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Information We Collect</h2>
            <p>
              When you purchase products through our online store, we collect necessary personal details including your name, email address, shipping destination, phone number, and payment confirmation details. We do not store raw credit card numbers on our servers; payments are securely processed by verified third-party payment gateways.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>To process, fulfill, and dispatch your product orders.</li>
              <li>To provide order tracking updates, confirmations, and customer support.</li>
              <li>To prevent fraudulent transactions and safeguard store security.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. Order Fulfillment & Third Parties</h2>
            <p>
              To deliver your products, your shipping details are shared securely with verified international logistics and fulfillment partners (e.g. CJ Dropshipping, CJPacket, DHL, USPS). We do not sell or rent your personal information to third-party marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">5. Data Security</h2>
            <p>
              We implement industry-standard 256-bit SSL encryption, cryptographic authentication tokens, and strict access controls to ensure your sensitive data is kept confidential and safe.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">6. Contact Us</h2>
            <p>
              If you have any questions or data inquiries regarding this Privacy Policy, please contact our team at <span className="text-brand-gold">support@qxyra.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
