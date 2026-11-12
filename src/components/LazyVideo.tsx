"use client";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  label?: string;
  /** Above-the-fold: start loading immediately. */
  eager?: boolean;
  /** Playback speed (1 = normal). */
  rate?: number;
  /** Lighter file used on phones (< 768px wide). */
  srcSmall?: string;
};

/**
 * Muted looping clip that only downloads and plays while on screen,
 * so the page never loads every video at once. Honors reduced-motion.
 */
export default function LazyVideo({ src, poster, className, label, eager, rate = 1, srcSmall }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = srcSmall && window.innerWidth < 768 ? srcSmall : src;
          v.defaultPlaybackRate = rate;
          v.playbackRate = rate;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35, rootMargin: eager ? "0px" : "120px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, srcSmall, eager, rate]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "metadata" : "none"}
      aria-label={label}
      className={className}
    />
  );
}
