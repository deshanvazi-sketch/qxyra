'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem, CartSummary } from '@/components/cart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-gray-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  const itemCount = getItemCount();

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      <nav className="text-sm mb-8 text-brand-gray-500">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-brand-black font-medium">Cart</span>
      </nav>

      <div className="mb-10 flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-brand-black font-heading">
          Shopping Cart
        </h1>
        {itemCount > 0 && (
          <span className="text-lg text-gray-500 font-medium">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-brand-gray-50 rounded-2xl px-4 border border-gray-100 shadow-sm">
          <div className="text-8xl mb-8 opacity-80">🛒</div>
          <h2 className="text-3xl font-bold text-brand-black mb-4 font-heading">Your cart is currently empty</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">
            Looks like you haven&apos;t added anything to your cart yet. Discover our premium collection and find something you love.
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-brand-black text-white px-10 py-4 rounded-md hover:bg-brand-gold hover:text-brand-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-widest font-bold">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <CartSummary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
