'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sale' | 'new' | 'soldout' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'sm', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-heading font-medium transition-colors';
    
    const variantClasses = {
      default: 'bg-brand-gray-100 text-brand-black',
      sale: 'bg-red-100 text-red-800',
      new: 'bg-brand-gold text-brand-black',
      soldout: 'bg-brand-gray-300 text-brand-gray-600',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
    };

    const sizeClasses = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
