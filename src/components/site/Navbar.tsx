import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container flex h-20 md:h-28 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Chicken Slice logo" className="h-20 md:h-28 w-auto group-hover:scale-105 transition-smooth" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "font-semibold text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                  isActive ? "text-primary after:w-full" : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-full"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" onClick={() => openCart(true)} aria-label="Open cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
                {count}
              </span>
            )}
          </Button>
          {loc.pathname !== "/menu" && (
            <Button asChild variant="hero" className="hidden md:inline-flex rounded-full">
              <Link to="/menu">Order Now</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 font-semibold uppercase tracking-wider">
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" className="rounded-full mt-2">
              <Link to="/menu" onClick={() => setOpen(false)}>Order Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};