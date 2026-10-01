import React from 'react';
import Link from 'next/link';
import { BRAND_NAME, BRAND_TAGLINE, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 font-body">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading font-bold text-3xl tracking-tighter text-white uppercase">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {BRAND_TAGLINE} We curate the finest products for those who appreciate quality and design.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-colors"
                  aria-label={social.label}
                >
                  {/* Simplified icon rendering based on label */}
                  {social.label.toLowerCase() === 'instagram' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  )}
                  {social.label.toLowerCase() === 'twitter' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  )}
                  {social.label.toLowerCase() === 'facebook' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  )}
                  {social.label.toLowerCase() !== 'instagram' && social.label.toLowerCase() !== 'twitter' && social.label.toLowerCase() !== 'facebook' && (
                    <span className="text-xs">{social.label.charAt(0)}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Customer Service */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading font-semibold text-lg mb-6 text-white">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-brand-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors rounded-none"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-gold text-brand-black font-semibold px-4 py-3 text-sm hover:bg-white transition-colors uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
