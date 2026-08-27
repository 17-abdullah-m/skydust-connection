"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  slug: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (line: Omit<CartLine, "qty">) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    return {
      lines,
      count,
      total,
      add: (line) => {
        setLines((current) => {
          const existing = current.find((item) => item.slug === line.slug);
          if (existing) {
            return current.map((item) =>
              item.slug === line.slug ? { ...item, qty: item.qty + 1 } : item,
            );
          }
          return [...current, { ...line, qty: 1 }];
        });
      },
      remove: (slug) => setLines((current) => current.filter((item) => item.slug !== slug)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
