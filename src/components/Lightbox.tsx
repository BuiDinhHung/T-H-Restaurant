"use client";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { type: "image" | "video"; src: string; srcSet?: string; alt: string; poster?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onChange: (i: number | null) => void;
  closeLabel: string;
};

export default function Lightbox({ items, index, onChange, closeLabel }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const n = items.length;

  const go = useCallback((d: number) => index !== null && onChange((index + d + n) % n), [index, n, onChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, go, onChange]);

  if (!open) return null;
  const it = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={it.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/96 p-4 backdrop-blur-sm sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <figure className="flex max-h-full max-w-full flex-col items-center">
        {it.type === "video" ? (
          <video
            key={it.src}
            src={it.src}
            poster={it.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[84svh] max-w-full rounded-sm bg-black"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={it.src}
            src={it.src}
            srcSet={it.srcSet}
            sizes="(min-width: 1024px) 70vw, 100vw"
            alt={it.alt}
            className="max-h-[84svh] max-w-full rounded-sm object-contain"
          />
        )}
        <figcaption className="mt-4 text-center text-sm text-paper/70">
          {it.alt}
          {n > 1 && <span className="ml-3 tabular-nums text-gold-300">{index + 1} / {n}</span>}
        </figcaption>
      </figure>

      <button
        ref={closeRef}
        onClick={() => onChange(null)}
        aria-label={closeLabel}
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-gold-400/40 text-gold-200 transition hover:bg-gold-400/10"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>
      {n > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-gold-400/40 text-gold-200 transition hover:bg-gold-400/10 sm:grid"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-gold-400/40 text-gold-200 transition hover:bg-gold-400/10 sm:grid"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </>
      )}
    </div>
  );
}
