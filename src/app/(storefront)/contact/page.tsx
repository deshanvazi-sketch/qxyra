'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY_NUMBER,
  HOTLINE_PHONE,
  STORE_ADDRESS,
  STORE_HOURS,
  STORE_MAP_EMBED_URL,
  STORE_MAP_DIRECTIONS_URL,
} from '@/lib/constants';

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
      <section className="bg-gradient-to-b from-[#141820] to-[#0A0A0A] border-b border-gray-800 py-16 sm:py-24 px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49B6A]/10 border border-[#D49B6A]/30 text-[#D49B6A] text-xs font-mono">
          <span>Sri Lanka Customer &amp; Enterprise Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light text-white">
          Contact <span className="text-[#D49B6A] font-normal">Methmi Mobile</span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Whether you have an inquiry about genuine TRCSL smartphones, islandwide Cash on Delivery, warranty support, or Methmi Cloud POS deployment, our team is at your service.
        </p>

        {/* Quick WhatsApp Banner */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Methmi%20Mobile!%20I%20have%20an%20inquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-transform"
          >
            <span>💬</span>
            <span>Direct WhatsApp Helpline: {WHATSAPP_DISPLAY_NUMBER}</span>
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#141820] border border-gray-800 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-heading font-medium text-white">Send a Message</h2>
              <p className="text-xs text-gray-400">Directly routed to the appropriate Methmi Mobile desk.</p>
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
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs">
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
                      placeholder={WHATSAPP_DISPLAY_NUMBER} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">Subject / Device Model</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors" 
                    placeholder={division === 'store' ? 'e.g. Vivo Y31D, Tecno Camon 50 Pro or TRCSL Inquiry' : 'e.g. Methmi POS Demo Request'} 
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">Message / Details *</label>
                  <textarea 
                    required 
                    rows={4} 
                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D49B6A] transition-colors resize-none" 
                    placeholder="How can we assist you today?..." 
                  />
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-3.5 sm:py-4 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer ${
                    division === 'labs'
                      ? 'bg-blue-500 hover:bg-blue-400 text-white'
                      : 'bg-gradient-to-r from-[#D49B6A] to-[#e2ac7e] text-black font-bold'
                  }`}
                >
                  Send Message to {division === 'labs' ? 'POS Systems Team' : 'Methmi Store Desk'} →
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141820] border border-gray-800 space-y-6">
              <h3 className="font-heading text-lg font-medium text-white">Showroom &amp; Direct Channels</h3>
              
              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <span className="text-base text-[#D49B6A]">📍</span>
                  <div>
                    <span className="text-gray-500 block uppercase font-mono text-[10px]">Showroom Location</span>
                    <p className="text-white font-medium">{STORE_ADDRESS}</p>
                  </div>
                </div>

                {/* WhatsApp Helpline */}
                <div className="flex items-start gap-3">
                  <span className="text-base text-[#25D366]">💬</span>
                  <div>
                    <span className="text-gray-500 block uppercase font-mono text-[10px]">WhatsApp Hotline (Instant Order)</span>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-mono font-bold text-sm block"
                    >
                      {WHATSAPP_DISPLAY_NUMBER}
                    </a>
                    <span className="text-gray-400 text-[10px]">Available 7 days for orders &amp; support</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="text-base text-[#D49B6A]">📧</span>
                  <div>
                    <span className="text-gray-500 block uppercase font-mono text-[10px]">Customer Care Email</span>
                    <a href="mailto:info@methmimobilepvtltd.lk" className="text-white hover:text-[#D49B6A] font-medium font-mono">
                      info@methmimobilepvtltd.lk
                    </a>
                  </div>
                </div>

                {/* Cloud POS */}
                <div className="flex items-start gap-3">
                  <span className="text-base text-blue-400">⚡</span>
                  <div>
                    <span className="text-gray-500 block uppercase font-mono text-[10px]">Methmi Labs / Cloud POS</span>
                    <Link href="/labs/quote" className="text-white hover:text-blue-400 font-medium">
                      Request POS Demo or Custom Software Quote
                    </Link>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <span className="text-base text-amber-400">⏱️</span>
                  <div>
                    <span className="text-gray-500 block uppercase font-mono text-[10px]">Showroom Hours</span>
                    <p className="text-white font-mono">{STORE_HOURS}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud POS Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1422] border border-blue-500/30 space-y-3">
              <span className="text-xs uppercase font-mono text-blue-400">Methmi Cloud POS Solutions</span>
              <h4 className="font-heading text-base font-medium text-white">
                POS Demo &amp; Hardware Consultation
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                If you need billing software, barcode scanner setup, or cloud inventory for your shop or supermarket, our software engineers are ready.
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

        {/* Feature 8: Interactive Google Map of Mutur Showroom */}
        <div className="rounded-3xl overflow-hidden border border-gray-800 bg-[#141820] shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block mb-1">
                Showroom Location &amp; Directions
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-white">
                Visit Methmi Mobile Flagship Showroom
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                {STORE_ADDRESS}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={STORE_MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-brand-gold text-brand-black text-xs font-semibold hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-md"
              >
                <span>🗺️</span>
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>💬</span>
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Google Maps Embed iframe */}
          <div className="relative w-full h-80 sm:h-96 bg-black/40">
            <iframe
              src={STORE_MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Methmi Mobile Showroom Mutur Map"
              className="w-full h-full filter contrast-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
