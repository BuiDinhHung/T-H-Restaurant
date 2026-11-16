import { ChevronDown, Clock, MapPin } from "lucide-react";
import LazyVideo from "./LazyVideo";
import Parallax from "./Parallax";
import { withBase } from "@/lib/base";
import { business } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="letters" aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden style={{ ["--l" as string]: i + offset }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

const d = (i: number) => ({ ["--i" as string]: i });

export default function Hero({ dict }: { dict: Dict }) {
  const { hours, address } = business;
  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-navy-950">
      <div className="hero-bg absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Parallax speed={0.35} className="absolute inset-0">
          <LazyVideo
            eager
            rate={0.6}
            src={withBase("/video/hero-wok-720.mp4")}
            srcSmall={withBase("/video/hero-wok-360.mp4")}
            poster={withBase("/media/hero-wok-poster.webp")}
            label={dict.alt.heroVideo}
            className="h-full w-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-navy-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/10 to-navy-950" />
      </div>

      <Parallax speed={-0.15} fade>
        <div className="container-lux flex min-h-[100svh] flex-col items-center justify-center pt-28 pb-16 text-center">
          <p className="intro eyebrow text-gold-300" style={d(0)}>
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-8">
            <span className="block font-brand text-[clamp(4.2rem,12vw,9rem)] leading-[0.86] font-semibold text-gold-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <Letters text="T&H" />
            </span>
            <span className="mt-3 block font-brand text-[clamp(1.4rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[0.22em] text-paper">
              <Letters text="RESTAURANT" offset={3} />
            </span>
            <span className="intro mt-4 flex items-center justify-center gap-4 text-[clamp(0.8rem,1.4vw,1rem)] font-semibold tracking-[0.5em] text-accent-soft" style={d(7)}>
              NEW ASIAN <span className="text-[0.7em] tracking-[0.3em] text-gold-400">★★★</span>
            </span>
          </h1>
          <p className="intro mt-8 max-w-[36rem] text-[15px] leading-relaxed text-paper/85 sm:text-base" style={d(8)}>
            {dict.hero.lead}
          </p>
          <div className="intro mt-10 flex flex-wrap justify-center gap-3" style={d(9)}>
            <a href="#menu" className="btn-gold">
              {dict.hero.ctaMenu}
            </a>
            <a href="#visit" className="btn-line">
              {dict.hero.ctaFind}
            </a>
          </div>
          <dl className="intro mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-paper/75" style={d(10)}>
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 text-gold-400" strokeWidth={1.5} />
              <dt className="sr-only">{dict.visit.hoursTitle}</dt>
              <dd>
                {dict.visit.daysShort}: {hours.open} – {hours.close}{" "}
                <span className="text-paper/55">
                  ({dict.visit.kitchen} {hours.kitchenOpen} – {hours.kitchenClose})
                </span>
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
      </Parallax>

      <a href="#restaurant" aria-label={dict.nav.restaurant} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <span style={d(12)} className="intro block">
        <span className="scroll-cue flex flex-col items-center gap-1 text-gold-300">
          <span className="h-10 w-px bg-gradient-to-b from-transparent to-gold-400" />
          <ChevronDown className="size-4" strokeWidth={1.5} />
        </span>
        </span>
      </a>
    </section>
  );
}
