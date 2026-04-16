import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // generate unique ID based on name for simplistic purposes
  name: string;
  price: string; // "₹120"
  numericPrice: number; // 120
  category: string;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity' | 'numericPrice' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, diff: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (product) => {
        set((state) => {
          const id = product.name.toLowerCase().replace(/\s+/g, '-');
          const existingItem = state.items.find(i => i.id === id);
          const numericPrice = parseInt(product.price.replace(/[^\d]/g, ''), 10) || 0;
          
          if (existingItem) {
            return {
              items: state.items.map(i => 
                i.id === id 
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true
            };
          }
          return { 
            items: [...state.items, { ...product, id, quantity: 1, numericPrice }],
            isOpen: true
          };
        });
      },
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter(i => i.id !== id) 
      })),
      updateQuantity: (id, diff) => set((state) => ({
        items: state.items.map(i => {
          if (i.id === id) {
            const newQ = Math.max(0, i.quantity + diff);
            return { ...i, quantity: newQ };
          }
          return i;
        }).filter(i => i.quantity > 0)
      })),
      clearCart: () => set({ items: [] }),
      cartTotal: () => {
        return get().items.reduce((total, item) => total + (item.numericPrice * item.quantity), 0);
      }
    }),
    {
      name: 'mehfil-cart', // local storage key
    }
  )
);
