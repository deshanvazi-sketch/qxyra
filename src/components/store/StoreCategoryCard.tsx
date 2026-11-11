'use client';

import Link from 'next/link';
import Image from 'next/image';

interface StoreCategoryCardProps {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  subcategories: { name: string; href: string }[];
  itemCount?: number;
}

export function StoreCategoryCard({
  title,
  subtitle,
  href,
  image,
  subcategories,
  itemCount,
}: StoreCategoryCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-3xl bg-[#141820] border border-gray-800 hover:border-brand-gold/40 shadow-xl transition-all duration-500">
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 group-hover:brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-[#141820]/40 to-transparent" />

        <div className="absolute top-4 right-4 z-10">
          {itemCount != null && (
            <span className="text-[11px] font-mono bg-black/60 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full backdrop-blur-md">
              {itemCount} Curated Pieces
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-brand-gold font-mono font-medium block">
            Department
          </span>
          <Link href={href}>
            <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white hover:text-brand-gold transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 max-w-lg">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="p-6 bg-[#141820] border-t border-gray-800/80 space-y-3">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono block">Subcategories</span>
        <div className="flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/70 border border-gray-800 hover:border-brand-gold text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>{sub.name}</span>
              <span className="text-brand-gold text-[10px]">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
