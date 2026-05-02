import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { menu, testimonials } from "@/data/menu";
import { ArrowRight, Flame, Star, Truck, Clock, Briefcase, Users, Heart, TrendingUp } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useReveal, useTypewriter } from "@/hooks/use-reveal";
import hero from "@/assets/hero-chicken.jpg";
import sliceArt from "@/assets/slice-group-logo.png";

const Index = () => {
  const featured = menu.filter((m) => m.bestseller).slice(0, 4);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const favRef = useRef<HTMLDivElement>(null);
  const [favVisible, setFavVisible] = useState(false);

  // Typewriter hero headline
  const { text: typed, done: typedDone } = useTypewriter(
    "Zimbabwe's Favourite Crispy Chicken",
    60,
    400
  );

  // Scroll reveal sections
  const promo = useReveal<HTMLDivElement>();
  const reviews = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();
  const faq = useReveal<HTMLDivElement>();
  const careers = useReveal<HTMLDivElement>();

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
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-wide mb-5 min-h-[3.5em] md:min-h-[3em]"
              aria-label="Zimbabwe's Favourite Crispy Chicken"
            >
              <span aria-hidden="true">
                {typed.split(" ").map((word, i, arr) => {
                  const isLast = i >= arr.length - 2; // highlight last two words
                  return (
                    <span key={i} className={isLast ? "text-secondary" : ""}>
                      {word}
                      {i < arr.length - 1 ? " " : ""}
                    </span>
                  );
                })}
                <span
                  className={`inline-block w-[0.08em] h-[0.9em] align-[-0.08em] ml-1 bg-secondary ${
                    typedDone ? "animate-pulse" : ""
                  }`}
                  style={{ animation: typedDone ? "blink 1s steps(1) infinite" : undefined }}
                />
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl text-primary-foreground/90 max-w-md mb-7 transition-all duration-700 ${
                typedDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Hand-breaded, perfectly seasoned and served piping hot. Order online and taste the slice that has Zim talking.
            </p>
            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-200 ${
                typedDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
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
      <section ref={favRef} className="container py-16 md:py-24 overflow-hidden">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              className={`text-primary font-bold uppercase tracking-[0.3em] text-sm mb-3 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                favVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Bestsellers
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wide overflow-hidden">
              <span
                className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  favVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Crowd
              </span>{" "}
              <span
                className={`inline-block text-primary transition-all duration-1000 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  favVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Favourites
              </span>
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className={`font-bold transition-all duration-1000 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              favVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <Link to="/menu">See full menu <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((m, i) => (
            <div
              key={m.id}
              className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                favVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-[0.98]"
              }`}
              style={{ transitionDelay: `${favVisible ? i * 90 + 250 : 0}ms` }}
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
      <section className="container pb-16" ref={promo.ref}>
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-fire p-8 md:p-14 text-primary-foreground shadow-warm transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            promo.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
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
      <section className="bg-gradient-warm py-16 md:py-24" ref={reviews.ref}>
        <div className="container">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              reviews.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Reviews</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-wide">Zim is Talking 🔥</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`bg-card rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  reviews.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: reviews.visible ? `${i * 120 + 150}ms` : "0ms" }}
              >
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
      <section className="container py-16 md:py-24 text-center" ref={cta.ref}>
        <div
          className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            cta.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="font-display text-4xl md:text-6xl tracking-wide mb-4">Hungry yet?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Tap below, build your order, and we'll have it ready in minutes.</p>
          <Button asChild variant="hero" size="xl" className="rounded-full animate-pulse-glow">
            <Link to="/menu">Order Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-warm py-16 md:py-24 border-y border-border" ref={faq.ref}>
        <div className="container max-w-3xl">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">FAQ</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-wide">Got questions?</h2>
            <p className="text-muted-foreground mt-3">Everything you need to know before you order.</p>
          </div>
          <Accordion
            type="single"
            collapsible
            className={`bg-card rounded-2xl border border-border/60 shadow-card px-5 md:px-8 transition-all duration-700 delay-150 ${
              faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                q: "What are your opening hours?",
                a: "We're open every day from 10am to 10pm, including weekends and public holidays.",
              },
              {
                q: "Do you offer delivery?",
                a: "Yes! We deliver across Harare, Bulawayo and Mutare. Just place your order online and we'll bring it piping hot to your door.",
              },
              {
                q: "How long does delivery take?",
                a: "Most orders arrive within 30–45 minutes, depending on your location and traffic.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept EcoCash, cash on delivery, and major debit/credit cards in-store and online.",
              },
              {
                q: "Can I order for a large group or event?",
                a: "Absolutely. Reach out via our contact page and we'll put together a custom family or event package.",
              },
              {
                q: "Are there vegetarian options?",
                a: "We currently focus on chicken, but we offer sides like chips, coleslaw and rolls that are vegetarian-friendly.",
              },
            ].map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-border/60 last:border-0">
                <AccordionTrigger className="text-left font-bold text-base md:text-lg hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CAREERS */}
      <section className="bg-foreground text-background py-16 md:py-24" ref={careers.ref}>
        <div className="container">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              careers.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-3">Join the flock</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-wide mb-4">
              Build your <span className="text-primary">career</span> with us
            </h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              We're hiring passionate people across Zimbabwe. Crispy chicken, great team, real growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {([
              { Icon: Heart, t: "Great culture", d: "A team that feels like family." },
              { Icon: TrendingUp, t: "Real growth", d: "Clear paths to leadership roles." },
              { Icon: Users, t: "Training", d: "Learn from the best in the biz." },
              { Icon: Briefcase, t: "Staff perks", d: "Free meals, bonuses & more." },
            ]).map(({ Icon, t, d }, i) => (
              <div
                key={t}
                className={`bg-background/5 border border-background/10 rounded-2xl p-6 hover:bg-background/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  careers.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: careers.visible ? `${i * 120 + 150}ms` : "0ms" }}
              >
                <div className="h-11 w-11 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg mb-1">{t}</h3>
                <p className="text-sm text-background/70">{d}</p>
              </div>
            ))}
          </div>

          <div className="bg-background/5 border border-background/10 rounded-3xl p-6 md:p-10">
            <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-6">Open positions</h3>
            <div className="space-y-3">
              {[
                { role: "Cook / Fryer", loc: "Harare", type: "Full-time" },
                { role: "Cashier", loc: "Bulawayo", type: "Full-time" },
                { role: "Delivery Rider", loc: "Harare", type: "Part-time" },
                { role: "Store Manager", loc: "Mutare", type: "Full-time" },
              ].map((j) => (
                <div
                  key={j.role + j.loc}
                  className="flex flex-wrap items-center justify-between gap-3 bg-background/5 hover:bg-background/10 border border-background/10 rounded-xl px-5 py-4 transition-smooth"
                >
                  <div>
                    <p className="font-bold">{j.role}</p>
                    <p className="text-sm text-background/60">{j.loc} · {j.type}</p>
                  </div>
                  <Button asChild variant="crispy" size="sm" className="rounded-full">
                    <Link to="/contact">Apply <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-background/70 mb-4">Don't see your role? We'd still love to hear from you.</p>
              <Button asChild variant="hero" size="lg" className="rounded-full">
                <Link to="/contact">Send your CV</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
