"use client";
import { ArrowUpRight, Cigarette, Clock, Dices, Fuel, MapPin, MessageCircle, Navigation, Phone, ShoppingBag, ShoppingBasket, SquareParking } from "lucide-react";

const nearbyIcons = [SquareParking, ShoppingBasket, Cigarette, Fuel, Dices, ShoppingBag];
import LazyVideo from "./LazyVideo";
import { clip } from "@/lib/media";
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

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="reveal lg:col-span-5">
            <article className="flex h-full flex-col overflow-hidden border border-gold-700/30 bg-white/50">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                <LazyVideo src={clip("exterior").src} poster={clip("exterior").still} label={dict.alt.videoExterior} className="h-full w-full object-cover object-[50%_40%]" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-10">
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
              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                <a href={maps.share} target="_blank" rel="noopener" className="btn-ink">
                  {v.openMaps} <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
                <a href={maps.directions} target="_blank" rel="noopener" className="btn-line-ink">
                  <Navigation className="size-4" strokeWidth={1.5} /> {v.directions}
                </a>
              </div>
              </div>
            </article>
          </div>

          <div className="reveal flex flex-col gap-6 lg:col-span-7 lg:gap-8" style={{ ["--d" as string]: "120ms" }}>
            <div className="h-[280px] overflow-hidden border border-gold-700/30 sm:h-[320px] lg:h-auto lg:min-h-[300px] lg:flex-1">
              <iframe
                title={`Google Maps – ${business.name}`}
                src={business.maps.embed}
                className="block h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
              <div className="grid gap-8 border border-gold-700/30 bg-white/50 p-7 sm:grid-cols-2 sm:p-8">
                <div>
                  <h3 className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-gold-700 uppercase">
                    <Clock className="size-3.5" strokeWidth={1.75} /> {v.hoursTitle}
                  </h3>
                  <p className="mt-4 text-sm text-ink-soft">
                    {v.days} <span className="text-ink-soft/70">({v.daysShort})</span>
                  </p>
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
        </div>

        <div className="reveal mt-6 border border-gold-700/30 bg-white/50 p-7 sm:p-10 lg:mt-8">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-gold-700 uppercase">
              <MapPin className="size-3.5" strokeWidth={1.75} /> {dict.nearby.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-[2rem] leading-tight font-semibold text-navy-900">{dict.nearby.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{dict.nearby.text}</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-gold-700/20 bg-gold-700/20 sm:grid-cols-3 lg:grid-cols-6">
            {dict.nearby.items.map(([title, note], i) => {
              const Icon = nearbyIcons[i];
              const featured = i === 0;
              return (
                <li key={title} className={`flex flex-col gap-3 p-5 sm:p-6 ${featured ? "bg-navy-900 text-gold-200" : "bg-ivory-50"}`}>
                  <Icon className={`size-6 ${featured ? "text-gold-300" : "text-gold-700"}`} strokeWidth={1.5} />
                  <div>
                    <p className={`font-display text-lg leading-snug font-semibold ${featured ? "text-white" : "text-navy-900"}`}>{title}</p>
                    <p className={`mt-1 text-xs ${featured ? "text-gold-200" : "text-ink-soft"}`}>{note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
