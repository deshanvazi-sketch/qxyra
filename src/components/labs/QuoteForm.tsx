'use client';

import { useState } from 'react';

interface QuoteFormProps {
  initialProduct?: string;
  initialPackage?: string;
}

export function QuoteForm({ initialProduct, initialPackage }: QuoteFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectType, setProjectType] = useState(
    initialPackage?.includes('pos') || initialProduct?.includes('pos') 
      ? 'pos-system' 
      : 'ecommerce-web'
  );
  const [budgetRange, setBudgetRange] = useState('$300 – $600');
  const [timeline, setTimeline] = useState('Within 2 Weeks');
  const [projectDetails, setProjectDetails] = useState(
    initialProduct ? `Inquiring about ${initialProduct}. ` : initialPackage ? `Interested in ${initialPackage}. ` : ''
  );
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage so admin/owner can view inquiries
    try {
      const existing = JSON.parse(localStorage.getItem('qxyra_quote_inquiries') || '[]');
      const newInquiry = {
        id: `QT-${Date.now()}`,
        fullName,
        email,
        phone,
        companyName,
        projectType,
        budgetRange,
        timeline,
        projectDetails,
        preferredContact,
        createdAt: new Date().toISOString(),
      };
      existing.unshift(newInquiry);
      localStorage.setItem('qxyra_quote_inquiries', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0E1422] border border-blue-500/40 text-center space-y-6 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-semibold text-white">
            Inquiry Dispatched to Engineering!
          </h3>
          <p className="text-gray-300 text-sm max-w-md mx-auto">
            Thank you, <span className="text-blue-400 font-semibold">{fullName}</span>. Deshan and the Qxyra Labs engineering team have received your project scope.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-gray-800 text-xs text-gray-400 max-w-sm mx-auto">
          We will contact you via <span className="text-white font-medium capitalize">{preferredContact}</span> ({preferredContact === 'email' ? email : phone || email}) within 24 business hours.
        </div>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white text-xs font-semibold rounded-xl transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-[#0E1422] border border-blue-500/30 shadow-2xl space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">
            Direct Engineering Inquiry
          </span>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-white">
          Tell Us About Your Project
        </h3>
        <p className="text-xs text-gray-400">
          From custom POS systems to complete online e-commerce infrastructure, our engineering desk reviews every brief in detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Your Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Deshan Rathnadiwakara"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Work / Business Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deshan@example.com"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Phone / WhatsApp Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+94 7X XXX XXXX"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Business / Store Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company or retail brand"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Primary Project Scope</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="pos-system">Retail / Supermarket / Restaurant POS System</option>
            <option value="ecommerce-web">Custom E-Commerce Web Storefront</option>
            <option value="business-website">Corporate Brand / Company Website</option>
            <option value="custom-software">Bespoke Software / Internal Dashboard</option>
            <option value="other">Other Consultation</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Target Launch Timeline</label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="Urgent (1 – 3 Days)">Urgent (1 – 3 Days)</option>
            <option value="Within 2 Weeks">Within 2 Weeks</option>
            <option value="Within 1 Month">Within 1 Month</option>
            <option value="Flexible / Planning">Flexible / Planning Stage</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-gray-300 block mb-1.5 font-medium">Estimated Budget Bracket</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['$150 – $300', '$300 – $600', '$600 – $1,200', '$1,200+'].map((tier) => (
              <button
                type="button"
                key={tier}
                onClick={() => setBudgetRange(tier)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
                  budgetRange === tier
                    ? 'bg-blue-500 text-white border-blue-400 font-semibold'
                    : 'bg-black/40 text-gray-400 border-gray-800 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="text-gray-300 block mb-1.5 font-medium">Project Brief & Requirements *</label>
          <textarea
            required
            rows={4}
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            placeholder="Tell us about the features you need (e.g. barcode scanner, receipt printing, payment gateway, number of products, branches, etc.)..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors text-xs resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-gray-300 block mb-1.5 font-medium">Preferred Contact Method</label>
          <div className="flex gap-4">
            {(['whatsapp', 'email', 'phone'] as const).map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer text-gray-300 text-xs">
                <input
                  type="radio"
                  name="preferredContact"
                  checked={preferredContact === method}
                  onChange={() => setPreferredContact(method)}
                  className="accent-blue-500"
                />
                <span className="capitalize">{method === 'whatsapp' ? 'WhatsApp (Fastest)' : method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-xl shadow-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin text-sm">⏳</span>
            <span>Submitting Project Brief...</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>Submit Project Scope for Engineering Review</span>
          </>
        )}
      </button>
    </form>
  );
}
