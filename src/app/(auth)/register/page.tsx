'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  
  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };

  const strength = getPasswordStrength();

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-heading mb-2">Create Account</h1>
        <p className="text-gray-500 text-sm">Join Qxyra for a premium shopping experience</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            required 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" 
            placeholder="John Doe" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" 
            placeholder="you@example.com" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" 
            placeholder="Create a password" 
          />
          {password.length > 0 && (
            <div className="mt-2 flex gap-1 h-1.5">
              <div className={`flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 rounded-full ${strength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            required 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" 
            placeholder="Confirm your password" 
          />
        </div>

        <div className="flex items-start pt-2">
          <label className="flex items-start mt-1">
            <input type="checkbox" required className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold mt-0.5" />
            <span className="ml-2 text-sm text-gray-600 leading-tight">
              I agree to the <Link href="/terms" className="text-brand-black font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-black font-semibold hover:underline">Privacy Policy</Link>
            </span>
          </label>
        </div>

        <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-2">
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/login" className="font-bold text-brand-black hover:text-brand-gold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
