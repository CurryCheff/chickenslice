import { useMemo, useState } from "react";
import { Clock, MapPin, Navigation, Phone, Search, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stores } from "@/data/menu";

const cities = ["All", ...Array.from(new Set(stores.map((s) => s.city)))];

export const StoreLocator = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stores.filter((s) => {
      const matchCity = city === "All" || s.city === city;
      const matchQuery =
        !q ||
        s.city.toLowerCase().includes(q) ||
        s.branch.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q);
      return matchCity && matchQuery;
    });
  }, [query, city]);

  return (
    <section className="container py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Store Locator</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide">Find a Slice Near You</h2>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, branch or street…"
            className="pl-9 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((c) => {
          const active = c === city;
          return (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider border transition-smooth ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/80 border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No stores match your search. Try another city.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((s) => (
            <article
              key={s.id}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-card flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-smooth"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-bold">{s.city}</p>
                <h3 className="font-display text-2xl tracking-wide mt-1">{s.branch}</h3>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{s.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {s.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>{s.hours}</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {s.services.map((svc) => (
                  <Badge key={svc} variant="secondary" className="rounded-full">
                    {svc}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-auto pt-2">
                <Button asChild variant="hero" size="sm" className="rounded-full flex-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Navigation className="h-4 w-4" /> Directions
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <a href={`https://wa.me/${s.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};