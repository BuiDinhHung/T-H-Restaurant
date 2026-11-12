"use client";
import { useEffect, useRef } from "react";

/** Moves its content at a different speed while scrolling and (optionally) fades it out. */
export default function Parallax({ children, speed = 0.3, fade = false, className }: { children: React.ReactNode; speed?: number; fade?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y > h * 1.2) return;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      if (fade) el.style.opacity = String(Math.max(0, 1 - y / (h * 0.75)));
    };
    const on = () => (raf ||= requestAnimationFrame(tick));
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [speed, fade]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
