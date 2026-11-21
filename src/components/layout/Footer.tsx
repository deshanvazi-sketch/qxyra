'use client';

import React from 'react';
import Link from 'next/link';
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY_NUMBER,
  STORE_ADDRESS,
} from '@/lib/constants';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-12 sm:pt-20 pb-8 sm:pb-10 border-t border-gray-800 font-body">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Newsletter Banner */}
        <div className="mb-10 sm:mb-16 p-5 sm:p-12 rounded-3xl bg-[#0E131E] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#D49B6A] font-mono font-medium">
              Join the Methmi Mobile VIP Club
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-light text-white">
              Latest smartphone drops & tech innovations in your inbox.
            </h3>
            <p className="text-gray-400 text-xs max-w-md">
              Receive early access to Apple & Samsung flagship stock, flash discounts, and commercial POS software updates. Zero spam.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row w-full md:w-auto max-w-md gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-black/60 border border-gray-800 text-white px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-[#D49B6A] flex-grow"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-[#D49B6A] to-[#e2ac7e] text-black font-semibold px-5 py-3 text-xs rounded-xl hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer shadow-md text-center justify-center"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-gray-800/80">
          {/* Brand Info (2 cols on lg) */}
          <div className="col-span-2 space-y-4 sm:space-y-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              {BRAND_TAGLINE}. 100% genuine TRCSL-approved smartphones with official company warranty, premium mobile accessories, and bespoke Cloud POS solutions.
            </p>

            {/* Quick Contact & Hotline */}
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-gray-300">
                <span className="text-[#D49B6A]">📍</span> {STORE_ADDRESS}
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-[#25D366]">💬</span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  WhatsApp: {WHATSAPP_DISPLAY_NUMBER}
                </a>
              </p>
            </div>

            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    social.label === 'WhatsApp'
                      ? 'bg-[#25D366]/20 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-brand-gold hover:text-brand-black'
                  }`}
                  aria-label={social.label}
                >
                  <span className="text-xs font-mono font-semibold">{social.label.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Groups from constants */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-3 sm:space-y-4">
              <h4 className="font-heading font-medium text-xs text-white uppercase tracking-wider font-mono">
                {group.title}
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-brand-gold transition-colors text-xs block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME} Worldwide. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Returns & Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
