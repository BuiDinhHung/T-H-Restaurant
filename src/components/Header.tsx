"use client";
import { withBase } from "@/lib/base";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import LangToggle from "./LangToggle";
import { business } from "@/lib/site";
import type { Dict, LocaleKey } from "@/lib/i18n";

export default function Header({ locale, dict }: { locale: LocaleKey; dict: Dict }) {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      setSolid(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "#top", label: dict.nav.home },
    { href: "#menu", label: dict.nav.menu },
    { href: "#restaurant", label: dict.nav.restaurant },
    { href: "#gallery", label: dict.nav.gallery },
    { href: "#visit", label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
          solid ? "border-b border-gold-400/15 bg-navy-950/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <span aria-hidden className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-accent-soft" style={{ transform: `scaleX(${progress})` }} />
        <div className="container-lux flex h-[72px] items-center gap-3 sm:gap-6 lg:h-20">
          <a href="#top" className="flex items-center gap-3" aria-label={business.name}>
            <img src={withBase("/media/logo-160.webp")} alt="" width={44} height={44} className="size-11" />
            <span className="hidden leading-none min-[400px]:block">
              <span className="block font-brand text-[15px] font-semibold tracking-[0.12em] text-gold-300">T&amp;H RESTAURANT</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.42em] text-accent-soft">NEW ASIAN</span>
            </span>
          </a>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-8 lg:flex">
            {links.slice(1).map((l) => (
              <a key={l.href} href={l.href} className="link-underline pb-1 text-[13px] tracking-wide text-paper/85 transition hover:text-gold-200">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:ml-0 lg:flex">
            <LangToggle locale={locale} label={dict.nav.switchTo} />
            <a href="#menu" className="btn-gold h-10 px-5">
              {dict.nav.menu}
            </a>
          </div>

          <div className="ml-auto lg:hidden">
            <LangToggle locale={locale} label={dict.nav.switchTo} />
          </div>
          <button
            onClick={() => setOpen(true)}
            aria-label={dict.nav.openMenu}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-paper lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-navy-950 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-lux flex h-[72px] items-center justify-between">
          <span className="font-brand text-[15px] tracking-[0.12em] text-gold-300">T&amp;H RESTAURANT</span>
          <button
            onClick={() => setOpen(false)}
            aria-label={dict.nav.close}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-paper"
            tabIndex={open ? 0 : -1}
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-lux mt-6 flex-1 overflow-y-auto">
          <ol className="space-y-1">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-4 border-b border-white/8 py-4"
                >
                  <span className="w-6 text-[11px] tabular-nums text-gold-400">0{i + 1}</span>
                  <span className="font-display text-[2.1rem] leading-none text-paper">{l.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="container-lux pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a href={business.phones[0].href} className="btn-gold w-full" tabIndex={open ? 0 : -1}>
            <Phone className="size-4" strokeWidth={1.75} />
            {business.phones[0].display}
          </a>
        </div>
      </div>
    </>
  );
}
