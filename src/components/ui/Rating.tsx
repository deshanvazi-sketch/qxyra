'use client';

import React from 'react';

export interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  className?: string;
}

const StarSVG = ({ type, className = '' }: { type: 'full' | 'half' | 'empty', className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={type === 'empty' ? 'none' : 'currentColor'} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {type === 'half' && (
        <defs>
          <linearGradient id="halfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      )}
      <polygon 
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" 
        fill={type === 'half' ? 'url(#halfGrad)' : (type === 'empty' ? 'none' : 'currentColor')}
      />
    </svg>
  );
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, size = 'md', showCount = false, count = 0, className = '' }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const stars = Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      if (value >= starValue) return 'full';
      if (value >= starValue - 0.5) return 'half';
      return 'empty';
    });

    return (
      <div ref={ref} className={`flex items-center gap-1 ${className}`}>
        <div className="flex">
          {stars.map((type, i) => (
            <StarSVG 
              key={i} 
              type={type} 
              className={`${sizeClasses[size]} ${type !== 'empty' ? 'text-brand-gold' : 'text-brand-gray-300'}`} 
            />
          ))}
        </div>
        {showCount && (
          <span className="ml-2 text-sm text-brand-gray-500 font-body">({count})</span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
