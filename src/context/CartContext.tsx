import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { MenuItem } from "@/data/menu";
import { toast } from "@/hooks/use-toast";

export type CartLine = MenuItem & { qty: number };

type CartCtx = {
  items: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "delivery" | "pickup";
  setMode: (m: "delivery" | "pickup") => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");

  const add = (item: MenuItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    toast({ title: "Added to cart", description: item.name });
  };
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { count, total };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total, open, setOpen, mode, setMode }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};