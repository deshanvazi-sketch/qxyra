import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("py-4 text-sm font-body text-gray-500", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {isLast || !item.href ? (
                <span className={cn(
                  "truncate", 
                  isLast ? "text-brand-black font-semibold" : ""
                )} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-brand-gold transition-colors truncate"
                >
                  {item.label}
                </Link>
              )}
              
              {!isLast && (
                <span className="mx-2 text-gray-300">
                  <ChevronRightIcon />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
