import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { menu, testimonials } from "@/data/menu";
import { ArrowRight, Flame, Star, Truck, Clock } from "lucide-react";
import hero from "@/assets/hero-chicken.jpg";
import sliceArt from "@/assets/slice-group-logo.png";

const Index = () => {
  const featured = menu.filter((m) => m.bestseller).slice(0, 4);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const favRef = useRef<HTMLDivElement>(null);
  const [favVisible, setFavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * -0.25);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!favRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setFavVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(favRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(0 0% 0% / 0.6), transparent 60%)" }} />
        <div className="container relative grid md:grid-cols-2 gap-10 items-center py-14 md:py-24">
          <div className="text-primary-foreground animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <Flame className="h-3.5 w-3.5" /> Fresh, hot & crispy
            </span>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-wide mb-5">
              Zimbabwe's<br />Favourite<br /><span className="text-secondary">Crispy Chicken</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-md mb-7">
              Hand-breaded, perfectly seasoned and served piping hot. Order online and taste the slice that has Zim talking.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="crispy" size="xl" className="rounded-full">
                <Link to="/menu">Order Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/40 rounded-full blur-3xl animate-pulse-glow" />
            <img src={hero} alt="Crispy fried chicken with golden fries" width={1536} height={1280} className="relative rounded-3xl shadow-warm animate-float" />
            <div className="hidden md:flex absolute -bottom-5 -left-5 bg-card rounded-2xl shadow-card px-5 py-3 items-center gap-3 animate-scale-in">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Star className="h-5 w-5 fill-secondary-foreground text-secondary-foreground" />
              </div>
              <div>
                <p className="font-bold text-sm">4.9 / 5</p>
                <p className="text-xs text-muted-foreground">Loved by 50k+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-foreground text-background">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-6 text-center">
          {[
            { Icon: Truck, t: "Fast Delivery" },
            { Icon: Clock, t: "Open 10am–10pm" },
            { Icon: Flame, t: "Always Hot" },
            { Icon: Star, t: "Top Rated" },
          ].map(({ Icon, t }) => (
            <div key={t} className="flex items-center justify-center gap-2 font-semibold text-sm md:text-base">
              <Icon className="h-5 w-5 text-secondary" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section ref={favRef} className="container py-16 md:py-24">
        <div
          className={`flex items-end justify-between mb-10 flex-wrap gap-4 transition-all duration-700 ease-out ${
            favVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Bestsellers</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-wide">Crowd Favourites</h2>
          </div>
          <Button asChild variant="ghost" className="font-bold">
            <Link to="/menu">See full menu <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((m, i) => (
            <div
              key={m.id}
              className={`transition-all duration-700 ease-out ${
                favVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${favVisible ? i * 120 + 150 : 0}ms` }}
            >
              <MenuItemCard item={m} />
            </div>
          ))}
        </div>
      </section>

      {/* PARALLAX BRAND STRIP */}
      <section
        ref={parallaxRef}
        className="relative overflow-hidden bg-foreground py-20 md:py-32"
        aria-label="Slice Group brand"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <img
            src={sliceArt}
            alt="Slice Group"
            className="w-[140%] md:w-[90%] max-w-none opacity-90 select-none"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-transparent to-foreground" />
        <div className="container relative text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-secondary text-xs md:text-sm mb-3">Part of the family</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wide text-background">
            Proudly a <span className="text-primary">Slice Group</span> brand
          </h2>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-fire p-8 md:p-14 text-primary-foreground shadow-warm">
          <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="font-bold uppercase tracking-widest text-sm mb-3 text-secondary">Family Feast Deal</p>
            <h3 className="font-display text-4xl md:text-6xl tracking-wide leading-none mb-4">8 pcs Chicken + Chips + Drink</h3>
            <p className="text-primary-foreground/90 text-lg mb-6">Feed the whole family for just <span className="font-display text-3xl text-secondary">$24.99</span></p>
            <Button asChild variant="crispy" size="xl" className="rounded-full">
              <Link to="/menu">Grab the Deal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-warm py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Reviews</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-wide">Zim is Talking 🔥</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:-translate-y-1 transition-smooth">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-secondary text-secondary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl tracking-wide mb-4">Hungry yet?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Tap below, build your order, and we'll have it ready in minutes.</p>
        <Button asChild variant="hero" size="xl" className="rounded-full">
          <Link to="/menu">Order Now <ArrowRight className="h-5 w-5" /></Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Index;
