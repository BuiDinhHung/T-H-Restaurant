"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Desktop only (phones have the bottom action bar). */
export default function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.5);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className={`fixed right-6 bottom-6 z-40 hidden size-12 place-items-center rounded-full border border-gold-400/50 bg-navy-950/85 text-gold-200 shadow-xl shadow-black/40 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-gold-400 hover:text-navy-950 lg:grid ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={1.5} />
    </button>
  );
}
