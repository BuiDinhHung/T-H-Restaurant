"use client";
import { useEffect, useState } from "react";
import { BookOpen, Navigation, Phone } from "lucide-react";
import { business } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

export default function MobileBar({ dict }: { dict: Dict }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase";
  return (
    <nav
      aria-label="Quick actions"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold-400/20 bg-navy-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-500 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex divide-x divide-white/10">
        <a href={business.phones[0].href} className={`${item} text-gold-200`}>
          <Phone className="size-[18px]" strokeWidth={1.5} /> {dict.mobile.call}
        </a>
        <a href="#menu" className={`${item} text-paper/85`}>
          <BookOpen className="size-[18px]" strokeWidth={1.5} /> {dict.mobile.menu}
        </a>
        <a href={business.maps.directions} target="_blank" rel="noopener" className={`${item} text-paper/85`}>
          <Navigation className="size-[18px]" strokeWidth={1.5} /> {dict.mobile.route}
        </a>
      </div>
    </nav>
  );
}
