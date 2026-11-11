'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [division, setDivision] = useState<'store' | 'labs' | 'general'>('store');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#141820] to-[#0A0A0A] border-b border-gray-800 py-24 px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono">
          <span>Global Customer & Engineering Support</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-light text-white">
          Contact <span className="text-brand-gold font-normal">Desk</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light">
          Whether you have an order question for Qxyra Store or an engineering consultation for Qxyra Labs, our team is at your disposal.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#141820] border border-gray-800 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-medium text-white">Send a Message</h2>
            <p className="text-xs text-gray-400">Directly routed to the appropriate department desk.</p>
          </div>

          {/* Division Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 block font-mono">Select Inquiry Department:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDivision('store')}
                className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                  division === 'store'
                    ? 'bg-brand-gold text-brand-black font-semibold shadow-md'
                    : 'bg-black/40 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                🛍️ Qxyra Store
              </button>
              <button
                type="button"
                onClick={() => setDivision('labs')}
                className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                  division === 'labs'
                    ? 'bg-blue-500 text-white font-semibold shadow-md'
                    : 'bg-black/40 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                ⚡ Qxyra Labs
              </button>
              <button
                type="button"
                onClick={() => setDivision('general')}
                className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                  division === 'general'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-black/40 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                🤝 Partnership
              </button>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/60 text-emerald-200 p-8 rounded-2xl border border-emerald-500/40 text-center space-y-4">
              <span className="text-3xl block">✓</span>
              <h3 className="font-heading font-medium text-xl text-white">Message Dispatched!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Thank you for reaching out. A representative from the {division === 'labs' ? 'Labs engineering' : 'Store support'} team will contact you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-brand-gold hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                    placeholder="Deshan Rathnadiwakara" 
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                    placeholder="deshan@example.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Subject / Order Number</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                  placeholder={division === 'store' ? 'e.g. Order #QX-260901 or Sizing Inquiry' : 'e.g. POS System Hardware Inquiry'} 
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Message / Details *</label>
                <textarea 
                  required 
                  rows={5} 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" 
                  placeholder="How can we assist you today?..." 
                />
              </div>

              <button 
                type="submit" 
                className={`w-full py-4 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer ${
                  division === 'labs'
                    ? 'bg-blue-500 hover:bg-blue-400 text-white'
                    : 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black'
                }`}
              >
                Send Message to {division === 'labs' ? 'Labs Team' : 'Store Desk'} →
              </button>
            </form>
          )}
        </div>

        {/* Right: Contact Information & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#141820] border border-gray-800 space-y-6">
            <h3 className="font-heading text-lg font-medium text-white">Direct Communication</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="text-base text-brand-gold">📧</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Customer & Store Care</span>
                  <a href="mailto:support@qxyra.com" className="text-white hover:text-brand-gold font-medium">
                    support@qxyra.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-blue-400">⚡</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Labs Engineering Desk</span>
                  <Link href="/labs/quote" className="text-white hover:text-blue-400 font-medium">
                    labs@qxyra.com (or Submit Quote)
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-emerald-400">⏱️</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Operating Hours</span>
                  <p className="text-white">Monday – Saturday: 9:00 AM – 7:00 PM (IST)</p>
                  <p className="text-gray-400 text-[11px]">Online ticketing monitored 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0E1422] border border-blue-500/30 space-y-3">
            <span className="text-xs uppercase font-mono text-blue-400">Are you looking for Qxyra Labs?</span>
            <h4 className="font-heading text-base font-medium text-white">
              Instant POS & Web Development Briefs
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              If you need software quotation, barcode scanner integration, or POS setup, use our dedicated engineering form for faster response.
            </p>
            <Link
              href="/labs/quote"
              className="inline-block text-xs font-semibold text-blue-400 hover:text-white underline pt-1"
            >
              Open Dedicated Quote Form →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
