import { withBase } from "@/lib/base";
import { business } from "@/lib/site";
import { LOCALES, localeConfig, type Dict, type LocaleKey } from "@/lib/i18n";

export default function Footer({ locale, dict }: { locale: LocaleKey; dict: Dict }) {
  const f = dict.footer;
  const { address, hours, phones, maps } = business;
  const col = "text-[10px] font-semibold tracking-[0.26em] text-gold-400 uppercase";

  return (
    <footer className="relative border-t border-gold-400/15 bg-navy-950 pt-20 pb-28 text-paper/70 lg:pb-12">
      <div className="container-lux">
        <div className="flex flex-col items-start gap-6 border-b border-white/10 pb-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/media/logo-160.webp")} alt={dict.alt.logo} width={72} height={72} loading="lazy" className="size-[72px]" />
            <div>
              <p className="font-brand text-2xl font-semibold tracking-[0.1em] text-gold-300 sm:text-3xl">T&amp;H – RESTAURANT</p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.5em] text-accent-soft">
                NEW ASIAN <span className="tracking-[0.25em] text-gold-400">★★★</span>
              </p>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">{f.about}</p>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label={f.explore}>
            <p className={col}>{f.explore}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li><a className="link-underline hover:text-paper" href="#menu">{dict.nav.menu}</a></li>
              <li><a className="link-underline hover:text-paper" href="#restaurant">{dict.nav.restaurant}</a></li>
              <li><a className="link-underline hover:text-paper" href="#gallery">{dict.nav.gallery}</a></li>
              <li><a className="link-underline hover:text-paper" href="#visit">{dict.nav.contact}</a></li>
            </ul>
          </nav>
          <div>
            <p className={col}>{f.visit}</p>
            <address className="mt-5 text-sm leading-relaxed not-italic">
              {address.line1}
              <br />
              {address.postalCode} {address.city}, {dict.visit.country}
            </address>
            <a href={maps.share} target="_blank" rel="noopener" className="link-underline mt-3 inline-block text-sm text-gold-200">
              Google Maps ↗
            </a>
          </div>
          <div>
            <p className={col}>{dict.visit.hoursTitle}</p>
            <p className="mt-5 text-sm">{dict.visit.days}</p>
            <p className="text-sm text-paper">
              {hours.open} – {hours.close}
            </p>
            <p className="text-sm">
              {dict.visit.kitchen} {hours.kitchenOpen} – {hours.kitchenClose}
            </p>
          </div>
          <div>
            <p className={col}>{dict.visit.contactTitle}</p>
            <ul className="mt-5 space-y-1.5 text-sm">
              {phones.map((p) => (
                <li key={p.href}>
                  <a className="link-underline text-paper hover:text-gold-200" href={p.href}>
                    {p.display}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-xs">WhatsApp · Viber · Zalo</li>
              <li className="text-xs">Facebook: {business.facebookName}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © 2026 Hoangcaster
          </p>
          <nav aria-label={f.language} className="flex flex-wrap gap-x-5 gap-y-2">
            {LOCALES.map((l) => (
              <a
                key={l}
                href={withBase(`/${l}/`)}
                hrefLang={localeConfig[l].hreflang}
                aria-current={l === locale ? "true" : undefined}
                className={l === locale ? "text-gold-300" : "hover:text-paper"}
              >
                {localeConfig[l].label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
