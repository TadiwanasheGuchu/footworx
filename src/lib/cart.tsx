"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Colorway, Product } from "@/data/products";

// What we keep about each line in the cart (enough to show it and re-order it)
export type CartItem = {
  key: string; // product + colour + size
  slug: string;
  kind: Product["kind"];
  category: Product["category"];
  brand: string;
  name: string;
  colorName: string;
  size: string;
  price: number; // N$, sale price if on sale
  qty: number;
  // For the thumbnail (photo, or the placeholder drawing's colours)
  art: Pick<Colorway, "id" | "name" | "upper" | "sole" | "accent" | "lace" | "bg" | "image" | "inStock">;
};

type CartState = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (product: Product, colorway: Colorway, size: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "footworx-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load the saved cart once, in the browser
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from browser storage
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // storage blocked or corrupt: start with an empty cart
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage blocked: the cart still works until the page is closed
    }
  }, [items, ready]);

  const add = useCallback((product: Product, colorway: Colorway, size: string) => {
    const key = `${product.kind}:${product.slug}:${colorway.id}:${size}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + 1, 10) } : i));
      const { id, name, upper, sole, accent, lace, bg, image, inStock } = colorway;
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          kind: product.kind,
          category: product.category,
          brand: product.brand,
          name: product.name,
          colorName: colorway.name,
          size,
          price: product.salePrice ?? product.price,
          qty: 1,
          art: { id, name, upper, sole, accent, lace, bg, image, inStock },
        },
      ];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(qty, 10)) } : i)));
  }, []);
  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartState>(
    () => ({
      items,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, ready, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

// ---------- Orders (demo: kept in this browser only) ----------

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  customer: { name: string; phone: string; email: string };
  fulfilment: "collect" | "delivery";
  address?: string;
  payment: "card" | "eft" | "store";
  status: "awaiting-payment" | "paid" | "payment-failed" | "pay-on-collection" | "awaiting-eft";
};

const ORDER_KEY = "footworx-orders-v1";

export function saveOrder(order: Order) {
  try {
    const all: Order[] = JSON.parse(localStorage.getItem(ORDER_KEY) ?? "[]");
    const rest = all.filter((o) => o.id !== order.id).slice(-9);
    localStorage.setItem(ORDER_KEY, JSON.stringify([...rest, order]));
  } catch {
    // storage blocked: ignore
  }
}

export function loadOrder(id: string): Order | null {
  try {
    const all: Order[] = JSON.parse(localStorage.getItem(ORDER_KEY) ?? "[]");
    return all.find((o) => o.id === id) ?? null;
  } catch {
    return null;
  }
}

/** Short, readable order number, e.g. FWX-4K7Q2M */
export function newOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `FWX-${s}`;
}
