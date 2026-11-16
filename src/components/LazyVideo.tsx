"use client";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  label?: string;
  eager?: boolean;
  rate?: number;
  srcSmall?: string;
};

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
