'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse rounded-md bg-brand-gray-200 ${className}`}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
