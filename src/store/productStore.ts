import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { products as initialProducts } from '@/lib/mock-data';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  importProducts: (products: Product[]) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  clearAllProducts: () => void;
  resetToDefault: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (newProduct) => {
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },
      importProducts: (newProducts) => {
        set((state) => {
          const existingIds = new Set(state.products.map(p => p.id));
          const toAdd = newProducts.filter(p => !existingIds.has(p.id));
          return {
            products: [...toAdd, ...state.products],
          };
        });
      },
      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },
      toggleProductStatus: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },
      clearAllProducts: () => {
        set({ products: [] });
      },
      resetToDefault: () => {
        set({ products: initialProducts });
      },
      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },
    }),
    {
      name: 'methmi_products_list_v3',
      merge: (persistedState: any, currentState) => {
        const persistedProducts: Product[] = persistedState?.products || [];
        const persistedIds = new Set(persistedProducts.map((p) => p.id));
        const missingInitial = initialProducts.filter((p) => !persistedIds.has(p.id));
        return {
          ...currentState,
          ...persistedState,
          products: [...persistedProducts, ...missingInitial],
        };
      },
    }
  )
);
