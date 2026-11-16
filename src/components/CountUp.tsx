"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [n, setN] = useState(target === null ? value : "0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (target === null || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(String(target));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(String(Math.round(target * (1 - Math.pow(1 - p, 3)))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}
