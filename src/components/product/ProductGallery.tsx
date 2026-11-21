'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

const GRADIENTS = [
  'from-neutral-800 to-neutral-900',
  'from-stone-800 to-stone-900',
  'from-zinc-800 to-zinc-900',
  'from-slate-800 to-slate-900',
  'from-gray-800 to-gray-900',
];

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0
    ? images
    : [
        {
          id: 'placeholder-0',
          productId: 'placeholder',
          url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
          alt: productName,
          isPrimary: true,
          sortOrder: 0,
        },
      ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      {/* Main Active Image Canvas */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/50 rounded-2xl border border-gray-800/80 shadow-xl">
        {displayImages.map((img, idx) => (
          <div
            key={img.id || idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {img.url ? (
              <Image
                src={img.url}
                alt={img.alt || productName}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            ) : (
              <div className={cn(
                "w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br",
                GRADIENTS[idx % GRADIENTS.length]
              )}>
                <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <ImageIcon className="w-8 h-8 text-white/50" />
                </div>
                <h3 className="font-heading text-2xl font-light text-white tracking-wider mb-2">
                  {productName}
                </h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Thumbnails list */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative flex-none w-16 sm:w-20 aspect-square rounded-xl overflow-hidden transition-all duration-300 border cursor-pointer",
                idx === activeIndex 
                  ? "border-brand-gold ring-2 ring-brand-gold/40 opacity-100" 
                  : "border-gray-800 opacity-60 hover:opacity-100"
              )}
            >
              {img.url ? (
                <Image
                  src={img.url}
                  alt={img.alt || productName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <ImageIcon className="w-5 h-5 text-white/40" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
