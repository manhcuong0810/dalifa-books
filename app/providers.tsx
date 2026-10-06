'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

type CartContextType = {
  cart: any[];
  setCart: (cart: any[]) => void;
  count: number;
  total: number;
  refreshCart: () => Promise<void>;
  addToCart: (book: any, qty?: number) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  count: 0,
  total: 0,
  refreshCart: async () => {},
  addToCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const refreshCart = async () => {
    try {
      const data = await api('cart');
      setCart(data);
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (book: any, qty = 1) => {
    const old = cart.find(p => p.id === book.id);
    const newCart = await api('cart/items', 'POST', { 
      productId: book.id, 
      quantity: (old?.quantity || 0) + qty 
    });
    setCart(newCart);
  };

  const count = cart.reduce((n, p) => n + p.quantity, 0);
  const total = cart.reduce((n, p) => n + p.price * p.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, count, total, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
