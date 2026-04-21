import { Plus, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menu";

export const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { add } = useCart();
  return (
    <article className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm hover:-translate-y-1 transition-smooth border border-border/50">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-500" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.bestseller && (
            <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-card">
              <Star className="h-3 w-3 fill-current" /> Bestseller
            </span>
          )}
          {item.deal && (
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-card">
              <Flame className="h-3 w-3" /> Deal
            </span>
          )}
        </div>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-display text-xl tracking-wide mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-primary">${item.price.toFixed(2)}</span>
          <Button variant="hero" size="sm" onClick={() => add(item)} className="rounded-full">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
};