import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const CartDrawer = () => {
  const { items, open, setOpen, setQty, remove, total, mode, setMode, clear } = useCart();

  const checkout = () => {
    toast({ title: "Order placed! 🎉", description: `Your ${mode} order of $${total.toFixed(2)} is on its way.` });
    clear();
    setOpen(false);
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
            <Button variant="hero" size="lg" className="w-full rounded-full" onClick={checkout}>
              Place Order
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};