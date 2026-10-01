'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  inputVariant?: 'default' | 'search';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      iconPrefix,
      iconSuffix,
      inputVariant = 'default',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    const baseClasses =
      'flex h-10 w-full rounded-md border border-brand-gray-300 bg-white px-3 py-2 text-sm text-brand-black font-body placeholder:text-brand-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors';
    
    const errorClasses = error ? 'border-red-500 focus-visible:ring-red-500' : '';
    const prefixClasses = iconPrefix ? 'pl-10' : '';
    const suffixClasses = iconSuffix ? 'pr-10' : '';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium font-heading text-brand-black">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {iconPrefix && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500">
              {iconPrefix}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`${baseClasses} ${errorClasses} ${prefixClasses} ${suffixClasses} ${className}`}
            {...props}
          />
          {iconSuffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-500">
              {iconSuffix}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 font-body">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-brand-gray-500 font-body">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
