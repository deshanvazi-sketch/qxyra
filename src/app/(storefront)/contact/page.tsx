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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49B6A]/10 border border-[#D49B6A]/30 text-[#D49B6A] text-xs font-mono">
          <span>Sri Lanka Customer &amp; Enterprise Support</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-light text-white">
          Contact <span className="text-[#D49B6A] font-normal">Methmi Mobile</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light">
          Whether you have an inquiry about genuine smartphones, TRCSL warranty verification, or Methmi Cloud POS deployment, our team is at your service.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#141820] border border-gray-800 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-medium text-white">Send a Message</h2>
            <p className="text-xs text-gray-400">Directly routed to the appropriate Methmi Mobile team.</p>
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
                    ? 'bg-[#D49B6A] text-black font-semibold shadow-md'
                    : 'bg-black/40 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                📱 Methmi Store
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
                ⚡ Cloud POS
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
                🤝 Corporate
              </button>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/60 text-emerald-200 p-8 rounded-2xl border border-emerald-500/40 text-center space-y-4">
              <span className="text-3xl block">✓</span>
              <h3 className="font-heading font-medium text-xl text-white">Message Dispatched!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Thank you for reaching out. A representative from the {division === 'labs' ? 'POS systems' : 'Methmi customer care'} desk will contact you shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-[#D49B6A] hover:underline"
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
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors" 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">Phone / WhatsApp *</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors" 
                    placeholder="+94 77 000 0000" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Subject / Device Model</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors" 
                  placeholder={division === 'store' ? 'e.g. iPhone 17 Pro Max Stock or TRCSL Inquiry' : 'e.g. Methmi POS Demo Request'} 
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Message / Details *</label>
                <textarea 
                  required 
                  rows={5} 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors resize-none" 
                  placeholder="How can we assist you today?..." 
                />
              </div>

              <button 
                type="submit" 
                className={`w-full py-4 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer ${
                  division === 'labs'
                    ? 'bg-blue-500 hover:bg-blue-400 text-white'
                    : 'bg-gradient-to-r from-[#D49B6A] to-[#e2ac7e] text-black'
                }`}
              >
                Send Message to {division === 'labs' ? 'POS Systems Team' : 'Methmi Store Desk'} →
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
                <span className="text-base text-[#D49B6A]">📍</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Showroom Address</span>
                  <p className="text-white font-medium">Main Street, Mutur / Batticaloa Road, Periya Palam, Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-[#D49B6A]">📧</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Customer Care Email</span>
                  <a href="mailto:info@methmimobilepvtltd.lk" className="text-white hover:text-[#D49B6A] font-medium">
                    info@methmimobilepvtltd.lk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-blue-400">⚡</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Methmi Labs / POS Solutions</span>
                  <Link href="/labs/quote" className="text-white hover:text-blue-400 font-medium">
                    pos@methmimobilepvtltd.lk (or Submit Quote)
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-emerald-400">⏱️</span>
                <div>
                  <span className="text-gray-500 block uppercase font-mono text-[10px]">Showroom Hours</span>
                  <p className="text-white">Monday – Saturday: 8:30 AM – 8:00 PM</p>
                  <p className="text-gray-400 text-[11px]">Sunday: 9:00 AM – 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0E1422] border border-blue-500/30 space-y-3">
            <span className="text-xs uppercase font-mono text-blue-400">Methmi Cloud POS Solutions</span>
            <h4 className="font-heading text-base font-medium text-white">
              Instant POS Demo &amp; Hardware Consultation
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              If you need software quotation, barcode scanner integration, or POS setup for your supermarket or shop, our technical team is ready.
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
