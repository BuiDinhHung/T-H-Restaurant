"use client";
import { withBase } from "@/lib/base";
import { LOCALES, localeConfig, type LocaleKey } from "@/lib/i18n";

export const rememberLocale = (l: LocaleKey) => {
  try {
    localStorage.setItem("th-locale", l);
  } catch {}
};

/** DE | CZ segmented switch. Keeps the current section (#hash) when switching. */
export default function LangToggle({ locale, label, tone = "dark" }: { locale: LocaleKey; label: string; tone?: "dark" | "light" }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`relative flex h-10 items-center rounded-full border p-1 text-[12px] font-semibold tracking-[0.14em] ${
        tone === "dark" ? "border-white/15 bg-navy-950/40" : "border-navy-900/20 bg-white/60"
      }`}
    >
      {LOCALES.map((l) => {
        const on = l === locale;
        return (
          <a
            key={l}
            href={withBase(`/${l}/`)}
            hrefLang={localeConfig[l].hreflang}
            lang={localeConfig[l].lang}
            aria-current={on ? "true" : undefined}
            title={localeConfig[l].label}
            onClick={(e) => {
              rememberLocale(l);
              if (on) return e.preventDefault();
              e.preventDefault();
              window.location.href = withBase(`/${l}/${window.location.hash}`);
            }}
            className={`grid h-8 min-w-11 place-items-center rounded-full px-3 transition-colors duration-300 ${
              on ? "bg-gold-400 text-navy-950" : tone === "dark" ? "text-paper/70 hover:text-gold-200" : "text-ink-soft hover:text-navy-900"
            }`}
          >
            {localeConfig[l].short}
          </a>
        );
      })}
    </div>
  );
}
