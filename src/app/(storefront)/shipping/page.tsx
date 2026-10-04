import React from 'react';
import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Shipping Policy | ${BRAND_NAME}`,
  description: `Shipping details, worldwide delivery timeframes, tracking, and fulfillment policies for ${BRAND_NAME}.`,
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#0A0A0A] text-gray-300 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#141820] p-8 sm:p-12 rounded-2xl border border-gray-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Delivery & Fulfillment</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-light text-white mt-1">Shipping Policy</h1>
          <p className="text-gray-400 text-xs mt-2">Transparent Worldwide Delivery</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. Order Processing Time</h2>
            <p>
              All orders are processed and inspected within 1 to 3 business days after payment confirmation. Once your order has been dispatched, you will automatically receive an email confirmation with your tracking number.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Estimated Delivery Timeframes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-800 text-xs">
                <thead>
                  <tr className="bg-black/50 text-brand-gold">
                    <th className="p-3 border border-gray-800">Destination Region</th>
                    <th className="p-3 border border-gray-800">Estimated Delivery Time</th>
                    <th className="p-3 border border-gray-800">Shipping Partners</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">United States & Canada</td>
                    <td className="p-3">7 – 12 Business Days</td>
                    <td className="p-3">USPS / CJPacket / DHL</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">United Kingdom & Europe</td>
                    <td className="p-3">7 – 14 Business Days</td>
                    <td className="p-3">Royal Mail / Hermes / DHL</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Australia & New Zealand</td>
                    <td className="p-3">8 – 15 Business Days</td>
                    <td className="p-3">Australia Post / CJ Express</td>
                  </tr>
                  <tr>
                    <td className="p-3">Rest of the World</td>
                    <td className="p-3">10 – 20 Business Days</td>
                    <td className="p-3">International Postal Carriers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. Tracking Your Order</h2>
            <p>
              Every order includes an active international tracking code. You can monitor your package from dispatch to doorstep delivery directly through our tracking portal or major courier services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. Shipping Inquiries</h2>
            <p>
              For questions regarding package tracking or delivery assistance, please reach out to us at <span className="text-brand-gold">support@qxyra.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
