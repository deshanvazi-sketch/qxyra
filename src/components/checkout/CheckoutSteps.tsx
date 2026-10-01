'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
  currentStep: number;
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' },
  ];

  return (
    <div className="w-full py-6 mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-brand-gold -z-10 -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.num < currentStep;
          const isActive = step.num === currentStep;

          return (
            <div key={step.num} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300",
                  isCompleted ? "bg-brand-gold text-brand-black" : 
                  isActive ? "bg-brand-black text-white ring-4 ring-gray-100" : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <span className="text-xl">✓</span>
                ) : (
                  step.num
                )}
              </div>
              <span 
                className={cn(
                  "mt-3 text-xs font-medium uppercase tracking-wider",
                  isActive ? "text-brand-black" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
