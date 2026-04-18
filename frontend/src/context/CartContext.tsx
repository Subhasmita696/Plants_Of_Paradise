import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = 'plants-of-paradise-cart';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      return;
    }

    try {
      const parsedItems = JSON.parse(savedCart);
      if (Array.isArray(parsedItems)) {
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Failed to parse cart data:', error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      total,
      addItem: (item: Omit<CartItem, 'quantity'>) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find((currentItem) => currentItem.id === item.id);
          if (existingItem) {
            return currentItems.map((currentItem) =>
              currentItem.id === item.id
                ? { ...currentItem, quantity: currentItem.quantity + 1 }
                : currentItem
            );
          }

          return [...currentItems, { ...item, quantity: 1 }];
        });
      },
      removeItem: (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
