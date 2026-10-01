'use client';

import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-gray-200">
          {title && <h2 className="text-lg font-heading font-semibold text-brand-black">{title}</h2>}
          <button
            onClick={onClose}
            className="p-1 ml-auto rounded-md hover:bg-brand-gray-100 transition-colors text-brand-gray-500"
            aria-label="Close modal"
          >
            &#x2715;
          </button>
        </div>
        <div className="p-4 overflow-y-auto font-body">{children}</div>
        {footer && <div className="p-4 border-t border-brand-gray-200">{footer}</div>}
      </div>
    </div>
  );
};
