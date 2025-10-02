import { create } from 'zustand';
import type { SaleItem } from '../types';

interface SalesCartState {
  items: SaleItem[];
  addItem: (newItem: SaleItem) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useSalesCartStore = create<SalesCartState>((set, get) => ({
  items: [],

  addItem: (newItem) => {
    set((state) => {
      const existingItem = state.items.find(item => item.productId === newItem.productId);
      if (existingItem) {
        // If item exists, update its quantity
        return {
          items: state.items.map(item =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      } else {
        // If item does not exist, add it to the cart
        return { items: [...state.items, newItem] };
      }
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.productId !== productId),
    }));
  },

  updateItemQuantity: (productId, quantity) => {
    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      get().removeItem(productId);
    } else {
      set((state) => ({
        items: state.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    }
  },

  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalAmount: () => {
    return get().items.reduce((total, item) => total + item.salePrice * item.quantity, 0);
  },
}));