import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
import { DemoProduct } from "@/lib/demo-data";

export interface CartItem {
  product: DemoProduct;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: DemoProduct, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kopa-we:cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((product: DemoProduct, quantity = 1) => {
    setItems((curr) => {
      const existing = curr.find((c) => c.product.id === product.id);
      if (existing) {
        return curr.map((c) =>
          c.product.id === product.id ? { ...c, quantity: c.quantity + quantity } : c,
        );
      }
      return [...curr, { product, quantity }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((curr) => curr.filter((c) => c.product.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, q: number) => {
    if (q <= 0) {
      remove(id);
      return;
    }
    setItems((curr) =>
      curr.map((c) => (c.product.id === id ? { ...c, quantity: q } : c)),
    );
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    return { items, count, subtotal, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
