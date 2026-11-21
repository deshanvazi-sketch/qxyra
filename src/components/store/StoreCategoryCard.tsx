'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={cn(
      "relative group overflow-hidden rounded-3xl border shadow-xl transition-all duration-500",
      isLight ? "bg-white border-gray-200 shadow-gray-200/50" : "bg-[#141820] border-gray-800 hover:border-brand-gold/40"
    )}>
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 group-hover:brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-4 right-4 z-10">
          {itemCount != null && (
            <span className="text-[11px] font-mono bg-black/70 text-brand-gold border border-brand-gold/40 px-3 py-1 rounded-full backdrop-blur-md font-semibold">
              {itemCount} Models In-Stock
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-brand-gold font-mono font-medium block">
            Brand Department
          </span>
          <Link href={href}>
            <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white hover:text-brand-gold transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 max-w-lg">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className={cn(
        "p-6 border-t space-y-3 transition-colors",
        isLight ? "bg-white border-gray-100" : "bg-[#141820] border-gray-800/80"
      )}>
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-mono font-semibold block",
          isLight ? "text-gray-500" : "text-gray-400"
        )}>
          Available Models
        </span>
        <div className="flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs transition-all flex items-center gap-1.5 font-medium",
                isLight 
                  ? "bg-gray-50 hover:bg-amber-50 border-gray-200 hover:border-amber-400 text-gray-800" 
                  : "bg-black/40 hover:bg-black/70 border-gray-800 hover:border-brand-gold text-gray-300 hover:text-white"
              )}
            >
              <span>{sub.name}</span>
              <span className={isLight ? "text-amber-700 text-[10px]" : "text-brand-gold text-[10px]"}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
