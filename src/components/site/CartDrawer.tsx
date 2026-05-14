import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, LogIn, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const checkoutSchema = z.object({
  customer_name: z.string().trim().min(2, "Name is required").max(100),
  customer_phone: z.string().trim().min(7, "Valid phone required").max(20),
  delivery_address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(500).optional(),
});

export const CartDrawer = () => {
  const { items, open, setOpen, setQty, remove, total, mode, setMode, clear } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const checkout = async () => {
    if (!user) {
      setOpen(false);
      nav("/auth");
      return;
    }
    const parsed = checkoutSchema.safeParse({
      customer_name: name,
      customer_phone: phone,
      delivery_address: mode === "delivery" ? address : undefined,
      notes,
    });
    if (!parsed.success) {
      toast({ title: "Check details", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    if (mode === "delivery" && !parsed.data.delivery_address) {
      toast({ title: "Address required", description: "Please add a delivery address.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const deliveryFee = mode === "delivery" ? 2 : 0;
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      subtotal: total,
      delivery_fee: deliveryFee,
      total: total + deliveryFee,
      mode,
      customer_name: parsed.data.customer_name,
      customer_phone: parsed.data.customer_phone,
      delivery_address: parsed.data.delivery_address ?? null,
      notes: parsed.data.notes || null,
    });
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't place order", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Order placed! 🎉", description: `Your ${mode} order of $${(total + deliveryFee).toFixed(2)} is confirmed.` });
    clear();
    setName(""); setPhone(""); setAddress(""); setNotes("");
    setOpen(false);
    nav("/orders");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-5 border-b">
          <SheetTitle className="font-display text-2xl tracking-wide flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Order
          </SheetTitle>
        </SheetHeader>

        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-full">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "py-2 rounded-full text-sm font-semibold capitalize transition-smooth",
                  mode === m ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>Your cart is empty.</p>
              <p className="text-xs mt-1">Add something crispy 🍗</p>
            </div>
          ) : (
            items.map((i) => (
              <div key={i.id} className="flex gap-3 bg-card rounded-xl p-3 border border-border">
                <img src={i.image} alt={i.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{i.name}</p>
                  <p className="text-primary font-display text-lg">${(i.price * i.qty).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setQty(i.id, i.qty - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center font-bold">{i.qty}</span>
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setQty(i.id, i.qty + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(i.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-5 space-y-3 bg-muted/30">
            {user && (
              <div className="space-y-3 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="cname" className="text-xs">Name</Label>
                    <Input id="cname" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="cphone" className="text-xs">Phone</Label>
                    <Input id="cphone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} />
                  </div>
                </div>
                {mode === "delivery" && (
                  <div>
                    <Label htmlFor="caddr" className="text-xs">Delivery address</Label>
                    <Input id="caddr" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={300} />
                  </div>
                )}
                <div>
                  <Label htmlFor="cnotes" className="text-xs">Notes (optional)</Label>
                  <Textarea id="cnotes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={2} />
                </div>
              </div>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{mode === "delivery" ? "Delivery" : "Pickup"}</span>
              <span>{mode === "delivery" ? "$2.00" : "Free"}</span>
            </div>
            <div className="flex justify-between font-display text-2xl">
              <span>Total</span>
              <span className="text-primary">${(total + (mode === "delivery" ? 2 : 0)).toFixed(2)}</span>
            </div>
            {user ? (
              <Button variant="hero" size="lg" className="w-full rounded-full" onClick={checkout} disabled={busy}>
                {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Placing…</> : "Place Order"}
              </Button>
            ) : (
              <Button asChild variant="hero" size="lg" className="w-full rounded-full" onClick={() => setOpen(false)}>
                <Link to="/auth"><LogIn className="h-4 w-4 mr-2" /> Sign in to checkout</Link>
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};