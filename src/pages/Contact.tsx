import { Layout } from "@/components/site/Layout";
import { locations } from "@/data/menu";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <Layout>
    <section className="bg-gradient-warm py-14 md:py-20 border-b border-border">
      <div className="container text-center">
        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</p>
        <h1 className="font-display text-5xl md:text-7xl tracking-wide">Find Your Nearest Slice</h1>
      </div>
    </section>

    <section className="container py-12 grid md:grid-cols-3 gap-5">
      {[
        { Icon: Phone, title: "Call Us", value: "+263 77 123 4567" },
        { Icon: MessageCircle, title: "WhatsApp", value: "+263 77 123 4567" },
        { Icon: Clock, title: "Open Daily", value: "10am – 10pm" },
      ].map(({ Icon, title, value }) => (
        <div key={title} className="bg-card border border-border/50 rounded-2xl p-6 shadow-card flex items-center gap-4 hover:-translate-y-1 transition-smooth">
          <div className="h-12 w-12 rounded-xl bg-gradient-fire flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</p>
            <p className="font-display text-xl tracking-wide">{value}</p>
          </div>
        </div>
      ))}
    </section>

    <section className="container pb-16">
      <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-8">Our Branches</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations.map((loc) => (
          <div key={loc.city} className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-display text-2xl tracking-wide">{loc.city}</h3>
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              {loc.branches.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="hero" size="xl" className="rounded-full">
          <a href="https://wa.me/263771234567" target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Contact;