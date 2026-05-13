import { useEffect, useRef, useState } from "react";
import { Drumstick } from "lucide-react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastTarget = useRef({ x: -100, y: -100 });
  const dragging = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest('a, button, [role="button"], input, textarea, select, label'));
    };
    const onDown = () => {
      setClicking(true);
      dragging.current = true;
    };
    const onUp = () => {
      setClicking(false);
      dragging.current = false;
    };
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf = 0;
    const loop = () => {
      // Track target velocity for inertia while dragging
      const vx = target.current.x - lastTarget.current.x;
      const vy = target.current.y - lastTarget.current.y;
      velocity.current.x = velocity.current.x * 0.8 + vx * 0.2;
      velocity.current.y = velocity.current.y * 0.8 + vy * 0.2;
      lastTarget.current.x = target.current.x;
      lastTarget.current.y = target.current.y;

      // Looser follow + trailing offset opposite to motion when dragging
      const ease = dragging.current ? 0.22 : 0.42;
      const lag = dragging.current ? 6 : 0;
      const tx = target.current.x - velocity.current.x * lag * 0.15;
      const ty = target.current.y - velocity.current.y * lag * 0.15;
      pos.current.x += (tx - pos.current.x) * ease;
      pos.current.y += (ty - pos.current.y) * ease;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ transition: "opacity 200ms ease" }}
    >
      <div
        className="relative flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${clicking ? 0.85 : hovering ? 1.35 : 1}) rotate(${hovering ? -20 : -12}deg)`,
        }}
      >
        <span
          className="absolute inset-0 -m-3 rounded-full bg-primary/25 blur-md transition-opacity duration-200"
          style={{ opacity: hovering ? 1 : 0.5 }}
        />
        <Drumstick
          className="relative text-primary drop-shadow-[0_2px_6px_hsl(var(--primary)/0.5)]"
          size={28}
          strokeWidth={2.25}
          fill="hsl(var(--primary) / 0.15)"
        />
      </div>
    </div>
  );
};

export default CustomCursor;