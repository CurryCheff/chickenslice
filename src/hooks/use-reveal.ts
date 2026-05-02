import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, visible };
}

export function useTypewriter(text: string, speed = 55, startDelay = 350) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setOut("");
    setDone(false);
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => window.clearTimeout(start);
  }, [text, speed, startDelay]);

  return { text: out, done };
}