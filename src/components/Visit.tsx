"use client";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Img from "./Img";
import { business } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

export default function Visit({ dict }: { dict: Dict }) {
  const v = dict.visit;
  const { address, hours, phones, maps } = business;
  return (
    <section id="visit" className="bg-ivory-50 py-24 text-ink sm:py-32 lg:py-40">
      <div className="container-lux">
        <p className="eyebrow reveal text-accent">{v.eyebrow}</p>
        <h2 className="display reveal mt-6 text-[clamp(2.6rem,6vw,4.8rem)] text-navy-900">{v.title}</h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Location card */}
          <div className="reveal flex flex-col lg:col-span-5">
            <article className="overflow-hidden border border-gold-700/30 bg-white/50">
              <div className="aspect-[16/10] overflow-hidden">
                <Img name="terrace-view" alt={dict.alt.terraceView} sizes="(min-width:1024px) 34vw, 100vw" className="h-full w-full object-cover object-[50%_45%]" />
              </div>
              <div className="p-7 sm:p-10">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-gold-700 uppercase">
                <MapPin className="size-3.5" strokeWidth={1.75} /> {address.city} · {v.country}
              </p>
              <h3 className="mt-5 font-display text-[2rem] leading-tight font-semibold text-navy-900">{business.name}</h3>
              <address className="mt-4 text-[15px] leading-relaxed text-ink-soft not-italic">
                {address.line1}
                <br />
                {address.postalCode} {address.city}
                <br />
                {v.country}
              </address>
              <p className="mt-4 border-l-2 border-gold-500 pl-4 text-[13px] text-ink-soft">{v.border}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={maps.share} target="_blank" rel="noopener" className="btn-ink">
                  {v.openMaps} <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
                <a href={maps.directions} target="_blank" rel="noopener" className="btn-line-ink">
                  <Navigation className="size-4" strokeWidth={1.5} /> {v.directions}
                </a>
              </div>
              </div>
            </article>

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-gold-700 uppercase">
                  <Clock className="size-3.5" strokeWidth={1.75} /> {v.hoursTitle}
                </h3>
                <p className="mt-4 text-sm text-ink-soft">{v.days}</p>
                <p className="font-display text-[2rem] leading-tight font-semibold text-navy-900 tabular-nums">
                  {hours.open} – {hours.close}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {v.kitchen} {hours.kitchenOpen} – {hours.kitchenClose}
                </p>
                <p className="mt-4 inline-block rounded-full bg-navy-900 px-3 py-1 text-[11px] tracking-wide text-gold-200">{v.daily}</p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-gold-700 uppercase">
                  <Phone className="size-3.5" strokeWidth={1.75} /> {v.contactTitle}
                </h3>
                <ul className="mt-4 space-y-3">
                  {phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="link-underline font-display text-[1.45rem] font-semibold text-navy-900 tabular-nums">
                        {p.display}
                      </a>
                      {"messengers" in p && <p className="text-xs text-ink-soft">{p.messengers}</p>}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-soft">Facebook: {business.facebookName}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={phones[0].href} className="btn-ink h-10 px-5">
                    <Phone className="size-3.5" strokeWidth={1.75} /> {v.call}
                  </a>
                  <a href={business.whatsapp} target="_blank" rel="noopener" className="btn-line-ink h-10 px-5">
                    <MessageCircle className="size-3.5" strokeWidth={1.75} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal min-h-[440px] overflow-hidden border border-gold-700/30 lg:col-span-7" style={{ ["--d" as string]: "120ms" }}>
            <iframe
              title={`Google Maps – ${business.name}`}
              src={business.maps.embed}
              className="block h-full min-h-[440px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
