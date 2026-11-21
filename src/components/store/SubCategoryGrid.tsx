'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SubCategoryItem {
  id: string;
  name: string;
  slug: string;
  href: string;
  description?: string;
  count?: number;
  isActive?: boolean;
}

interface SubCategoryGridProps {
  items: SubCategoryItem[];
  parentName: string;
  parentHref: string;
}

export function SubCategoryGrid({ items, parentName, parentHref }: SubCategoryGridProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={cn(
      "flex items-center gap-2 sm:gap-2.5 p-2 sm:p-3 rounded-2xl border overflow-x-auto no-scrollbar max-w-full flex-nowrap sm:flex-wrap transition-colors shadow-sm",
      isLight ? "bg-white border-gray-200" : "bg-[#141820] border-gray-800"
    )}>
      <Link
        href={parentHref}
        className={cn(
          "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold shadow-md hover:opacity-90 transition-opacity whitespace-nowrap shrink-0",
          isLight ? "bg-amber-500 text-white" : "bg-brand-gold text-brand-black"
        )}
      >
        All {parentName}
      </Link>
      {items.map((sub) => (
        <Link
          key={sub.id}
          href={sub.href}
          className={cn(
            "px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 border",
            sub.isActive
              ? isLight
                ? "bg-gray-900 text-white border-gray-900 shadow-md font-semibold"
                : "bg-white text-black shadow-md border-white font-semibold"
              : isLight
                ? "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-950"
                : "bg-black/40 hover:bg-black/70 border-gray-800 text-gray-300 hover:text-white hover:border-gray-700"
          )}
        >
          <span>{sub.name}</span>
          {sub.count != null && (
            <span className="ml-1.5 text-[10px] opacity-70 font-mono">({sub.count})</span>
          )}
        </Link>
      ))}
    </div>
  );
}
