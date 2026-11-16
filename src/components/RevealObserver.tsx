"use client";
import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const targets = new Map<Element, HTMLElement[]>();
    const add = (watch: Element, el: HTMLElement) => targets.set(watch, [...(targets.get(watch) ?? []), el]);
    document.querySelectorAll<HTMLElement>(".reveal:not([data-shown])").forEach((el) => add(el, el));
    document.querySelectorAll<HTMLElement>(".reveal-img:not([data-shown])").forEach((el) => add(el.parentElement ?? el, el));

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          targets.get(e.target)?.forEach((el) => el.setAttribute("data-shown", "true"));
          io.unobserve(e.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((_, watch) => io.observe(watch));
    return () => io.disconnect();
  }, []);
  return null;
}
