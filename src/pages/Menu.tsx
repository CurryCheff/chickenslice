import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { categories, menu } from "@/data/menu";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { cn } from "@/lib/utils";

const Menu = () => {
  const [active, setActive] = useState<(typeof categories)[number] | "All">("All");
  const items = useMemo(() => (active === "All" ? menu : menu.filter((i) => i.category === active)), [active]);

  return (
    <Layout>
      <section className="bg-gradient-warm py-14 md:py-20 border-b border-border">
        <div className="container text-center">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Our Menu</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide">Crispy. Bold. Irresistible.</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">From signature chicken buckets to family combos — pick your favourite, add to cart and we'll do the rest.</p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 sticky top-16 md:top-20 bg-background/85 backdrop-blur-md z-30 -mx-4 px-4 md:mx-0 md:px-0">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-smooth border-2",
                active === c
                  ? "bg-primary text-primary-foreground border-primary shadow-card"
                  : "bg-background border-border hover:border-primary hover:text-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {items.map((it) => (
            <MenuItemCard key={it.id} item={it} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;