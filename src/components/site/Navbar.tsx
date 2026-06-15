import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X, User, LogOut, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const { user, signOut, loading } = useAuth();
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/orders"><ClipboardList className="h-4 w-4 mr-2" /> My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
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
            {user ? (
              <>
                <NavLink to="/orders" onClick={() => setOpen(false)} className="py-2 font-semibold uppercase tracking-wider">
                  My Orders
                </NavLink>
                <button onClick={() => { signOut(); setOpen(false); }} className="text-left py-2 font-semibold uppercase tracking-wider text-muted-foreground">
                  Sign out
                </button>
              </>
            ) : (
              <NavLink to="/auth" onClick={() => setOpen(false)} className="py-2 font-semibold uppercase tracking-wider">
                Sign in
              </NavLink>
            )}
            <Button asChild variant="hero" className="rounded-full mt-2">
              <Link to="/menu" onClick={() => setOpen(false)}>Order Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};