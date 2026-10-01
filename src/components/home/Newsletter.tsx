'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="py-24 px-4 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-zinc-900" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-brand-white font-bold mb-4">
          Join the Qxyra Family
        </h2>
        <p className="text-brand-gray-300 font-body mb-8 text-lg">
          Subscribe for exclusive deals, early access to new arrivals, and style inspiration.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 bg-brand-white/10 border border-brand-white/20 text-brand-white rounded focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold placeholder:text-brand-gray-500 transition-colors"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-3 bg-brand-gold text-brand-black font-semibold rounded hover:bg-brand-gold/90 transition-colors disabled:opacity-70 min-w-[140px]"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
