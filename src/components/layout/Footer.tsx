'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_NAME, BRAND_TAGLINE, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800 font-body">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Newsletter Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-[#0E131E] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Join the Qxyra Circle
            </span>
            <h3 className="font-heading text-2xl font-light text-white">
              Curated drops & engineering updates in your inbox.
            </h3>
            <p className="text-gray-400 text-xs max-w-md">
              Receive limited garment drop access, tech firmware alerts, and commercial software discounts. Zero spam.
            </p>
          </div>

          <form className="flex w-full md:w-auto max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="bg-black/60 border border-gray-800 text-white px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-brand-gold flex-grow"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold px-5 py-3 text-xs rounded-xl hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-16 border-b border-gray-800/80">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              {BRAND_TAGLINE} We operate across two dedicated divisions: Qxyra Store (curated heavyweight apparel & tech peripherals) and Qxyra Labs (Point of Sale software & custom web engineering).
            </p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-xs font-mono font-semibold">{social.label.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Groups from constants */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="font-heading font-medium text-xs text-white uppercase tracking-wider font-mono">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
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
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME} Worldwide. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px]">
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
