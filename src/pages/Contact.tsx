import { Layout } from "@/components/site/Layout";
import { Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreLocator } from "@/components/site/StoreLocator";

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

    <StoreLocator />

    <section className="container pb-16">
      <div className="text-center">
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