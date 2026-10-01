'use client';

import { useState } from 'react';
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

  const displayImages = images.length >= 4 
    ? images 
    : [
        ...images,
        ...Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => ({
          id: `placeholder-${i}`,
          productId: 'placeholder',
          url: '',
          alt: `${productName} view ${images.length + i + 1}`,
          isPrimary: false,
          sortOrder: images.length + i
        }))
      ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden bg-brand-gray-50 rounded-2xl">
        {displayImages.map((img, idx) => (
          <div
            key={img.id || idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center p-8 text-center",
              "bg-gradient-to-br",
              GRADIENTS[idx % GRADIENTS.length],
              idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <ImageIcon className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-white tracking-wider mb-4 leading-tight">
              {productName}
            </h3>
            <p className="text-white/60 font-body text-xs tracking-[0.2em] uppercase mt-4">
              View {idx + 1}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar">
        {displayImages.map((img, idx) => (
          <button
            key={img.id || idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative flex-none w-20 md:w-24 aspect-square rounded-xl overflow-hidden transition-all duration-300 snap-center",
              "flex items-center justify-center bg-gradient-to-br",
              GRADIENTS[idx % GRADIENTS.length],
              idx === activeIndex 
                ? "ring-2 ring-brand-gold ring-offset-2 ring-offset-white opacity-100" 
                : "opacity-50 hover:opacity-100"
            )}
          >
            <ImageIcon className="w-6 h-6 text-white/40" />
          </button>
        ))}
      </div>
    </div>
  );
}
