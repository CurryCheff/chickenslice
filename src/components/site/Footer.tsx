import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-foreground text-background mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <img src={logo} alt="Chicken Slice" className="h-10 w-10" />
          <span className="font-display text-2xl text-primary-foreground">Chicken Slice</span>
        </div>
        <p className="text-sm text-background/70">Zimbabwe's favourite crispy chicken — bold flavour, served hot & fast.</p>
      </div>
      <div>
        <h4 className="font-display text-xl mb-3 tracking-wide">Explore</h4>
        <ul className="space-y-2 text-sm text-background/70">
          <li><Link to="/menu" className="hover:text-primary transition-smooth">Menu</Link></li>
          <li><Link to="/about" className="hover:text-primary transition-smooth">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-smooth">Locations</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-xl mb-3 tracking-wide">Contact</h4>
        <ul className="space-y-2 text-sm text-background/70">
          <li className="flex gap-2 items-center"><Phone className="h-4 w-4" /> +263 77 123 4567</li>
          <li className="flex gap-2 items-center"><MapPin className="h-4 w-4" /> Branches across Zimbabwe</li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-xl mb-3 tracking-wide">Follow</h4>
        <div className="flex gap-3">
          {[Facebook, Instagram, Twitter].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-full bg-background/10 hover:bg-primary transition-smooth flex items-center justify-center">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-5 text-center text-xs text-background/60">
      © {new Date().getFullYear()} Chicken Slice Zimbabwe. All rights reserved.
    </div>
  </footer>
);