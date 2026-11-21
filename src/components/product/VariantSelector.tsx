'use client';

import { ProductVariant } from '@/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
  onColorChange?: (color: string) => void;
}

// Accurate smartphone color mappings
export const COLOR_MAP: Record<string, string> = {
  // Vivo Y05
  'Summit Platinum': '#D5D8DC',
  'Haze Blue': '#7B9FB8',
  'Voyage Black': '#1F2022',
  // Vivo Y11D
  'Sunrise Gold': '#E3A857',
  // Vivo Y31D
  'Feather Gold': '#E6C280',
  'Starlight Grey': '#3F4349',
  // Tecno Camon 50 Pro
  'Malachite Green': '#1E824C',
  'Nebula Titanium': '#D2D2D0',
  'Moonshadow Black': '#1E1F22',
  'Fir Green': '#2D5A27',
  'Lavender Mist': '#B39EB5',
  'Ethereal Blue': '#6897BB',
  // Infinix Hot 70
  'Silver Dancer': '#D0D3D4',
  'Dive Blue': '#2980B9',
  'Quiet Violet': '#8E44AD',
  'Thermo Orange': '#E67E22',
  'Green Texture': '#27AE60',
  // Infinix Smart 20
  'Polaris Titanium': '#B0B3B2',
  'Shadow Black': '#2C3E50',
  'Cloudline Blue': '#5DADE2',
  'Sunlike Orange': '#F39C12',
  // Infinix Note 60 Pro
  'Solar Orange': '#E67E22',
  'Torino Black': '#17202A',
  'Deep Ocean Blue': '#1B4F72',
  'Mocha Brown': '#6E473B',
  'Mist Titanium': '#A6ACAF',
  'Frost Silver': '#E5E7E9',
  // Fallbacks
  'Black': '#000000',
  'White': '#ffffff',
  'Silver': '#c0c0c0',
  'Blue': '#2980B9',
  'Gold': '#d4af37',
};

export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
  onColorChange,
}: VariantSelectorProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Extract unique colors and sizes
  const colors = useMemo(() => {
    const uniqueColors = new Set<string>();
    variants.forEach((v) => {
      if (v.color) uniqueColors.add(v.color);
    });
    return Array.from(uniqueColors);
  }, [variants]);

  const sizes = useMemo(() => {
    const uniqueSizes = new Set<string>();
    variants.forEach((v) => {
      if (v.size) uniqueSizes.add(v.size);
    });
    return Array.from(uniqueSizes);
  }, [variants]);

  const handleColorSelect = (color: string) => {
    const currentSize = selectedVariant?.size;
    const match =
      variants.find((v) => v.color === color && (currentSize ? v.size === currentSize : true)) ||
      variants.find((v) => v.color === color);

    if (match) {
      onSelectVariant(match);
      onColorChange?.(color);
    }
  };

  const handleSizeSelect = (size: string) => {
    const currentColor = selectedVariant?.color;
    const match =
      variants.find((v) => v.size === size && (currentColor ? v.color === currentColor : true)) ||
      variants.find((v) => v.size === size);

    if (match) {
      onSelectVariant(match);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Color Selection with Real Studio Swatches */}
      {colors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-heading font-medium text-xs sm:text-sm tracking-wider uppercase text-gray-400">
              Color:
            </span>
            <span className={cn(
              "font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border",
              isLight 
                ? "bg-amber-50 text-amber-900 border-amber-200" 
                : "bg-brand-gold/10 text-brand-gold border-brand-gold/30"
            )}>
              {selectedVariant?.color || colors[0]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {colors.map((color) => {
              const isSelected = selectedVariant?.color === color;
              const hasStock = variants.some((v) => v.color === color && v.stock > 0);
              const hex = COLOR_MAP[color] || '#888888';

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  disabled={!hasStock}
                  className={cn(
                    "group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer",
                    isSelected
                      ? isLight
                        ? "border-amber-500 bg-amber-50/80 shadow-md ring-1 ring-amber-400"
                        : "border-brand-gold bg-brand-gold/15 shadow-md shadow-brand-gold/10 ring-1 ring-brand-gold/50"
                      : isLight
                        ? "border-gray-200 bg-white hover:border-gray-400 text-gray-700"
                        : "border-gray-800 bg-[#141820] hover:border-gray-600 text-gray-300",
                    !hasStock && "opacity-40 cursor-not-allowed line-through"
                  )}
                  title={color}
                  aria-label={`Select color ${color}`}
                >
                  {/* Swatch circle */}
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-sm"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-xs font-medium">{color}</span>
                  {isSelected && (
                    <span className="text-brand-gold text-xs leading-none">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / RAM Selection */}
      {sizes.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-heading font-medium text-xs sm:text-sm tracking-wider uppercase text-gray-400">
              Storage &amp; Memory:
            </span>
            <span className={cn(
              "font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border",
              isLight 
                ? "bg-gray-100 text-gray-900 border-gray-300" 
                : "bg-white/10 text-white border-white/20"
            )}>
              {selectedVariant?.size || sizes[0]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {sizes.map((size) => {
              const isSelected = selectedVariant?.size === size;
              const hasStock = variants.some((v) => v.size === size && v.stock > 0);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeSelect(size)}
                  disabled={!hasStock}
                  className={cn(
                    "min-w-[4.5rem] px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? "bg-brand-gold text-brand-black border-brand-gold shadow-md font-bold"
                      : isLight
                        ? "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                        : "bg-[#141820] text-gray-300 border-gray-800 hover:border-gray-600",
                    !hasStock && "opacity-40 cursor-not-allowed line-through"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
