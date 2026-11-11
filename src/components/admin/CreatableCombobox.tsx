'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  isCustom?: boolean;
}

interface CreatableComboboxProps {
  label?: string;
  sublabel?: string;
  value: string;
  options: (string | { id?: string; value?: string; label: string; isCustom?: boolean })[];
  onChange: (value: string) => void;
  onOptionsChange?: (updatedOptions: ComboboxOption[]) => void;
  placeholder?: string;
  accentColor?: 'gold' | 'blue' | 'purple' | 'emerald';
  required?: boolean;
  className?: string;
  storageKey?: string; // Optional localStorage key to persist custom options across sessions
}

export default function CreatableCombobox({
  label,
  sublabel,
  value,
  options: initialRawOptions,
  onChange,
  onOptionsChange,
  placeholder = 'Select from dropdown or type custom...',
  accentColor = 'gold',
  required = false,
  className = '',
  storageKey,
}: CreatableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [newOptionInput, setNewOptionInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize initial raw options
  const normalize = (
    raw: (string | { id?: string; value?: string; label: string; isCustom?: boolean })[]
  ): ComboboxOption[] => {
    return raw.map((item) => {
      if (typeof item === 'string') {
        return { value: item, label: item, isCustom: false };
      }
      return {
        value: item.value || item.id || item.label,
        label: item.label,
        isCustom: item.isCustom ?? false,
      };
    });
  };

  const [optionsList, setOptionsList] = useState<ComboboxOption[]>(() => {
    const base = normalize(initialRawOptions);
    if (storageKey && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`qxyra_combobox_${storageKey}`);
        if (saved) {
          const parsed = JSON.parse(saved) as ComboboxOption[];
          const existingValues = new Set(base.map((b) => b.value));
          const additions = parsed.filter((p) => !existingValues.has(p.value));
          return [...base, ...additions];
        }
      } catch (err) {
        console.error('Failed reading custom options:', err);
      }
    }
    return base;
  });

  // Keep inputValue in sync with external value prop
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Sync options if base options prop changes
  useEffect(() => {
    setOptionsList((prev) => {
      const base = normalize(initialRawOptions);
      const customOnes = prev.filter((p) => p.isCustom);
      const baseValues = new Set(base.map((b) => b.value));
      const filteredCustom = customOnes.filter((c) => !baseValues.has(c.value));
      return [...base, ...filteredCustom];
    });
  }, [initialRawOptions]);

  // Persist custom options to localStorage
  const persistOptions = (opts: ComboboxOption[]) => {
    setOptionsList(opts);
    if (onOptionsChange) onOptionsChange(opts);
    if (storageKey && typeof window !== 'undefined') {
      try {
        const customOnly = opts.filter((o) => o.isCustom);
        localStorage.setItem(`qxyra_combobox_${storageKey}`, JSON.stringify(customOnly));
      } catch (err) {
        console.error('Failed saving custom options:', err);
      }
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Add new custom option into list and select it
  const handleAddNewOption = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const existing = optionsList.find(
      (o) => o.value.toLowerCase() === trimmed.toLowerCase() || o.label.toLowerCase() === trimmed.toLowerCase()
    );

    if (existing) {
      onChange(existing.value);
      setInputValue(existing.label);
    } else {
      const newOpt: ComboboxOption = {
        value: trimmed,
        label: trimmed,
        isCustom: true,
      };
      const updated = [...optionsList, newOpt];
      persistOptions(updated);
      onChange(trimmed);
      setInputValue(trimmed);
    }

    setNewOptionInput('');
    setIsOpen(false);
  };

  // Handle direct typing in main input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    onChange(newVal);
    if (!isOpen) setIsOpen(true);
  };

  // Delete a custom option
  const handleDeleteOption = (valToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = optionsList.filter((o) => o.value !== valToDelete);
    persistOptions(updated);
    if (value === valToDelete) {
      onChange(updated[0]?.value || '');
      setInputValue(updated[0]?.label || '');
    }
  };

  // Filtered options based on what is typed in input
  const filteredOptions = optionsList.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    opt.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const exactMatchExists = optionsList.some(
    (opt) =>
      opt.label.toLowerCase() === inputValue.trim().toLowerCase() ||
      opt.value.toLowerCase() === inputValue.trim().toLowerCase()
  );

  const isCurrentValueCustom = optionsList.some((o) => o.value === value && o.isCustom) ||
    (value && !optionsList.some((o) => o.value === value));

  // Accent styling
  const accentBorder = {
    gold: 'border-brand-gold focus:border-brand-gold ring-1 ring-brand-gold/30',
    blue: 'border-blue-500 focus:border-blue-400 ring-1 ring-blue-500/30',
    purple: 'border-purple-500 focus:border-purple-400 ring-1 ring-purple-500/30',
    emerald: 'border-emerald-500 focus:border-emerald-400 ring-1 ring-emerald-500/30',
  }[accentColor];

  const accentBadge = {
    gold: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  }[accentColor];

  const accentButton = {
    gold: 'bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold shadow-md shadow-amber-500/10',
    blue: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20',
    purple: 'bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-500/20',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/20',
  }[accentColor];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Label and Sublabel */}
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-gray-300 block text-xs font-medium">
            {label} {required && <span className="text-amber-400">*</span>}
          </label>
          {sublabel && (
            <span className="text-[10px] text-gray-500 font-mono">
              {sublabel}
            </span>
          )}
        </div>
      )}

      {/* Main Combobox Input */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full pl-3.5 pr-16 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs placeholder-gray-500 focus:outline-none transition-all ${
            isOpen ? accentBorder : 'hover:border-gray-700'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (inputValue.trim()) {
                handleAddNewOption(inputValue);
              }
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            } else if (e.key === 'ArrowDown') {
              setIsOpen(true);
            }
          }}
        />

        {/* Right Action Icons (Custom indicator, Clear button, Dropdown toggle chevron) */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {isCurrentValueCustom && Boolean(value) && (
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${accentBadge} hidden sm:inline-block`}>
              Custom
            </span>
          )}

          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue('');
                onChange('');
                inputRef.current?.focus();
              }}
              className="w-4 h-4 rounded-full hover:bg-white/10 flex items-center justify-center text-[10px] text-gray-400 hover:text-white"
              title="Clear input"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              if (!isOpen) {
                inputRef.current?.focus();
              }
            }}
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] transition-transform duration-200 cursor-pointer ${
              isOpen ? 'rotate-180 text-brand-gold bg-white/10' : 'text-gray-400 hover:text-white'
            }`}
            title="Toggle dropdown list"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#121622] border border-gray-700/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Prompt to Add Typed Custom Option (if input text does not match any existing option) */}
          {inputValue.trim().length > 0 && !exactMatchExists && (
            <div className="p-2 bg-amber-500/10 border-b border-amber-500/20">
              <button
                type="button"
                onClick={() => handleAddNewOption(inputValue)}
                className={`w-full py-2 px-3 rounded-xl text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${accentButton}`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-sm">➕</span>
                  <span className="truncate">
                    Add &ldquo;<strong>{inputValue.trim()}</strong>&rdquo; to dropdown list
                  </span>
                </div>
                <span className="text-[10px] opacity-80 shrink-0 font-mono bg-black/20 px-1.5 py-0.5 rounded">
                  Enter ↵
                </span>
              </button>
            </div>
          )}

          {/* Options Header */}
          <div className="px-3 py-1.5 text-[10px] font-mono text-gray-400 border-b border-gray-800 bg-[#161c2c] flex items-center justify-between">
            <span>AVAILABLE PRESETS & SAVED OPTIONS</span>
            <span>{filteredOptions.length} items</span>
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto divide-y divide-gray-800/40 p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value || opt.label === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setInputValue(opt.label);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-colors group ${
                      isSelected
                        ? 'bg-brand-gold/15 text-brand-gold font-medium'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-xs ${isSelected ? 'opacity-100 text-brand-gold' : 'opacity-0 group-hover:opacity-40'}`}>
                        ✓
                      </span>
                      <span className="truncate">{opt.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {opt.isCustom && (
                        <>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-gray-700">
                            Custom
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteOption(opt.value, e)}
                            className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            title="Remove this custom option from dropdown"
                          >
                            🗑
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-gray-400 space-y-1">
                <p>No matching presets found for &ldquo;{inputValue}&rdquo;.</p>
                <p className="text-[10px] text-brand-gold">
                  Press <strong>Enter</strong> or click above to add it as a new option!
                </p>
              </div>
            )}
          </div>

          {/* Footer: Dedicated Direct Add Field */}
          <div className="p-2 border-t border-gray-800 bg-[#141926]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type another new option to add..."
                value={newOptionInput}
                onChange={(e) => setNewOptionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newOptionInput.trim()) {
                      handleAddNewOption(newOptionInput);
                    }
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-black/50 border border-gray-700 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-gold"
              />
              <button
                type="button"
                onClick={() => handleAddNewOption(newOptionInput)}
                disabled={!newOptionInput.trim()}
                className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed ${accentButton}`}
              >
                + Add
              </button>
            </div>
            <span className="block mt-1 text-[9px] text-gray-500 text-center font-mono">
              New options are added to the dropdown list for all items
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
