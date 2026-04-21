import { MessageCircle } from "lucide-react";

export const WhatsAppFab = () => (
  <a
    href="https://wa.me/263771234567"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[hsl(142_70%_45%)] text-white flex items-center justify-center shadow-warm hover:scale-110 transition-smooth animate-pulse-glow"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);