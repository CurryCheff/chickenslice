import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppFab } from "./WhatsAppFab";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <CartDrawer />
    <WhatsAppFab />
  </div>
);