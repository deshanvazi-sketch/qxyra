'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h1 className="font-heading text-2xl md:text-3xl">My Wishlist</h1>
        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-300 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <h2 className="text-xl font-medium mb-2 text-gray-700">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love here to easily find them later.</p>
          <Link href="/products" className="bg-brand-black text-white px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-black transition-colors font-medium">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product: Product) => (
            <div key={product.id} className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image 
                    src={product.images[0].url} 
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
                <button 
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.44.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/products/${product.slug}`} className="hover:text-brand-gold transition-colors">
                  <h3 className="font-medium text-brand-black line-clamp-1">{product.name}</h3>
                </Link>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold text-lg">{formatPrice(product.salePrice || product.basePrice)}</span>
                  {product.salePrice && product.salePrice < product.basePrice && (
                    <span className="text-gray-400 line-through text-sm">{formatPrice(product.basePrice)}</span>
                  )}
                </div>
                <button className="mt-4 w-full bg-brand-black text-white py-2 rounded hover:bg-brand-gold hover:text-brand-black transition-colors font-medium text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
