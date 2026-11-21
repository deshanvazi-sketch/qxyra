'use client';

import Link from 'next/link';

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
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-3 rounded-2xl bg-[#141820] border border-gray-800 overflow-x-auto no-scrollbar max-w-full flex-nowrap sm:flex-wrap">
      <Link
        href={parentHref}
        className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-brand-gold text-brand-black shadow-md hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
      >
        All {parentName}
      </Link>
      {items.map((sub) => (
        <Link
          key={sub.id}
          href={sub.href}
          className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
            sub.isActive
              ? 'bg-white text-black shadow-md'
              : 'bg-black/40 hover:bg-black/70 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700'
          }`}
        >
          <span>{sub.name}</span>
          {sub.count != null && (
            <span className="ml-1.5 text-[10px] opacity-60 font-mono">({sub.count})</span>
          )}
        </Link>
      ))}
    </div>
  );
}
