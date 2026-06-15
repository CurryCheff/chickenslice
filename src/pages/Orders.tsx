import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";

type Order = {
  id: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  mode: string;
  status: string;
  created_at: string;
  customer_name: string;
  delivery_address: string | null;
};

const Orders = () => {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) nav("/auth", { replace: true });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      setOrders((data ?? []) as unknown as Order[]);
      setBusy(false);
    })();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="font-display text-4xl mb-8">Your Orders</h1>
        {busy ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <div className="space-y-2 items-end flex flex-col">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground mb-6">No orders yet.</p>
            <Button asChild variant="hero" className="rounded-full"><Link to="/menu">Browse menu</Link></Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <article key={o.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                    <p className="font-display text-xl">Order #{o.id.slice(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{o.status}</span>
                    <p className="font-display text-2xl text-primary mt-1">${Number(o.total).toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong className="text-foreground capitalize">{o.mode}</strong> · {o.customer_name}{o.delivery_address ? ` · ${o.delivery_address}` : ""}</p>
                  <ul className="list-disc list-inside">
                    {o.items.map((it, i) => (
                      <li key={i}>{it.qty}× {it.name}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;