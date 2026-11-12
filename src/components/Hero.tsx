import { withBase } from "@/lib/base";
import { Clock, MapPin } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { business } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

export default function Hero({ dict }: { dict: Dict }) {
  const { hours, address } = business;
  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-navy-950">
      {/* Background: wok-fire clip (Mixkit, free licence), slowed down, softly blurred under the navy */}
      <div className="hero-bg absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <LazyVideo
          eager
          rate={0.6}
          src={withBase("/video/hero-wok-720.mp4")}
          srcSmall={withBase("/video/hero-wok-360.mp4")}
          poster={withBase("/media/hero-wok-poster.webp")}
          label={dict.alt.heroVideo}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/10 to-navy-950" />
      </div>

      <div className="container-lux flex min-h-[100svh] flex-col items-center justify-center pt-28 pb-16 text-center">
        <p className="eyebrow text-gold-300">{dict.hero.eyebrow}</p>
        <h1 className="mt-8">
          <span className="block font-brand text-[clamp(4.2rem,12vw,9rem)] leading-[0.86] font-semibold text-gold-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            T&amp;H
          </span>
          <span className="mt-3 block font-brand text-[clamp(1.4rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[0.22em] text-paper">RESTAURANT</span>
          <span className="mt-4 flex items-center justify-center gap-4 text-[clamp(0.8rem,1.4vw,1rem)] font-semibold tracking-[0.5em] text-accent-soft">
            NEW ASIAN <span className="text-[0.7em] tracking-[0.3em] text-gold-400">★★★</span>
          </span>
        </h1>
        <p className="mt-8 max-w-[36rem] text-[15px] leading-relaxed text-paper/85 sm:text-base">{dict.hero.lead}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#menu" className="btn-gold">
            {dict.hero.ctaMenu}
          </a>
          <a href="#visit" className="btn-line">
            {dict.hero.ctaFind}
          </a>
        </div>
        <dl className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-paper/75">
          <div className="flex items-center gap-2.5">
            <Clock className="size-4 text-gold-400" strokeWidth={1.5} />
            <dt className="sr-only">{dict.visit.hoursTitle}</dt>
            <dd>
              {dict.hero.openDaily} · {hours.open} – {hours.close}
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="size-4 text-gold-400" strokeWidth={1.5} />
            <dt className="sr-only">{dict.visit.title}</dt>
            <dd>
              {address.street}, {address.city}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
