'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { cn } from '@/lib/utils';
import { ImageIcon, ZoomIn, Maximize2, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

export function ProductGallery({
  images,
  productName,
  activeIndex: controlledIndex,
  onActiveIndexChange,
}: ProductGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleIndexChange = (index: number) => {
    setInternalIndex(index);
    onActiveIndexChange?.(index);
  };

  const displayImages = images.length > 0
    ? images
    : [
        {
          id: 'placeholder-0',
          productId: 'placeholder',
          url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
          alt: productName,
          isPrimary: true,
          sortOrder: 0,
        },
      ];

  const currentImage = displayImages[activeIndex] || displayImages[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full select-none">
      {/* Main Image Canvas with High-Resolution Lens Zoom */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl border transition-all flex items-center justify-center p-4 sm:p-6 cursor-crosshair group",
          isLight 
            ? "bg-white border-gray-200 shadow-md hover:border-amber-400" 
            : "bg-[#0c1017] border-gray-800 shadow-2xl hover:border-brand-gold/40"
        )}
      >
        {/* Zoom Hint Badge */}
        <div
          className={cn(
            "absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium backdrop-blur-md transition-all duration-300 pointer-events-none",
            isZooming 
              ? "opacity-100 bg-brand-gold text-brand-black shadow-lg scale-105" 
              : "opacity-80 bg-black/60 text-white/80 border border-white/10"
          )}
        >
          <ZoomIn className="w-3 h-3" />
          <span>{isZooming ? "2.2x Studio Lens Active" : "Hover to Zoom Lens"}</span>
        </div>

        {/* Fullscreen Expand Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className={cn(
            "absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer shadow-md hover:scale-110",
            isLight
              ? "bg-white/90 border-gray-200 text-gray-700 hover:text-black"
              : "bg-black/60 border-white/10 text-white/80 hover:text-white"
          )}
          title="Inspect High-Res Studio Photo"
          aria-label="Inspect High-Res Studio Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Images with Mouse-Tracking Magnification */}
        {displayImages.map((img, idx) => (
          <div
            key={img.id || idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-8",
              idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {img.url ? (
              <div 
                className="relative w-full h-full overflow-hidden flex items-center justify-center"
              >
                <div
                  className="relative w-full h-full transition-transform will-change-transform"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZooming && idx === activeIndex ? 'scale(2.2)' : 'scale(1)',
                    transition: isZooming ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out',
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || productName}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center drop-shadow-md"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gray-900">
                <ImageIcon className="w-8 h-8 text-white/50 mb-2" />
                <h3 className="font-heading text-lg font-light text-white">{productName}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Thumbnails list with Color/Variant indicators */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {displayImages.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id || idx}
                onClick={() => handleIndexChange(idx)}
                className={cn(
                  "relative flex-none w-16 sm:w-20 aspect-square rounded-xl overflow-hidden transition-all duration-200 border cursor-pointer p-1.5",
                  isLight ? "bg-white" : "bg-[#141820]",
                  isSelected 
                    ? isLight
                      ? "border-amber-500 ring-2 ring-amber-400/40 shadow-md scale-105"
                      : "border-brand-gold ring-2 ring-brand-gold/40 shadow-lg scale-105"
                    : isLight 
                      ? "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400"
                      : "border-gray-800 opacity-60 hover:opacity-100 hover:border-gray-700"
                )}
                title={img.alt || `Variant photo ${idx + 1}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img.url}
                    alt={img.alt || `${productName} view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain object-center"
                  />
                </div>
                {isSelected && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-brand-gold shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">Press ESC or click anywhere to close</span>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close high-res inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="relative w-full max-w-4xl h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt || productName}
              fill
              sizes="100vw"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-white font-medium text-sm sm:text-base font-heading">
              {productName}
            </h4>
            <p className="text-gray-400 text-xs font-mono mt-1">
              {currentImage.alt || `Photo ${activeIndex + 1} of ${displayImages.length}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
