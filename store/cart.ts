import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

/**
 * Zustand стор для управления корзиной покупок.
 * Использует middleware persist для сохранения состояния в localStorage.
 */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.product_id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.product_id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: Date.now(), // Временный ID для элемента корзины
                product_id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                quantity,
                image: product.images[0]?.src || '',
                slug: product.slug,
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product_id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'zolotov-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
