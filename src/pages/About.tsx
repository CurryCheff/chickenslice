import { Layout } from "@/components/site/Layout";
import { Award, Heart, Zap } from "lucide-react";
import chicken from "@/assets/menu-chicken.jpg";
import promoSliceOfDay from "@/assets/promo-slice-of-day.jpg";

const About = () => (
  <Layout>
    <section className="container py-14 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className="animate-fade-in">
        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Our Story</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide leading-none mb-6">Proudly Zimbabwean. <span className="text-primary">Seriously Crispy.</span></h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          Chicken Slice was born in Zimbabwe with a single mission — serve the crispiest, most flavourful chicken our country has ever tasted, at a price every family can enjoy.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From our first store to branches across Harare, Bulawayo, Mutare, Gweru and beyond, we've stayed true to one promise: real local flavour, fresh every day, served fast with a smile.
        </p>
      </div>
      <div className="relative">
        <img src={chicken} alt="Crispy fried chicken bucket" loading="lazy" className="rounded-3xl shadow-warm w-full" />
        <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground rounded-2xl px-6 py-4 shadow-card hidden md:block">
          <p className="font-display text-3xl">10+</p>
          <p className="text-xs font-semibold uppercase tracking-wider">Years of Crunch</p>
        </div>
      </div>
    </section>

    <section className="bg-gradient-warm py-14 md:py-20">
      <div className="container grid md:grid-cols-3 gap-6">
        {[
          { Icon: Award, title: "Quality First", text: "Fresh chicken, hand-breaded daily with our signature spice blend." },
          { Icon: Heart, title: "Local Love", text: "100% Zimbabwean owned and operated, supporting local communities." },
          { Icon: Zap, title: "Fast & Hot", text: "Order online, get it delivered or grab it on the go — always hot." },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="bg-card rounded-2xl p-7 shadow-card border border-border/50 hover:-translate-y-1 transition-smooth">
            <div className="h-12 w-12 rounded-xl bg-gradient-fire flex items-center justify-center mb-4 shadow-warm">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl tracking-wide mb-2">{title}</h3>
            <p className="text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-14 md:py-20">
      <div className="overflow-hidden rounded-3xl shadow-warm border border-border/50">
        <img
          src={promoSliceOfDay}
          alt="Delicious Slice of the Day - burger, chips and chicken salad"
          loading="lazy"
          className="w-full h-auto block"
        />
      </div>
    </section>
  </Layout>
);

export default About;