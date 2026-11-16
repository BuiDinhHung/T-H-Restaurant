import CountUp from "./CountUp";
import Img from "./Img";
import type { Dict } from "@/lib/i18n";

export default function About({ dict }: { dict: Dict }) {
  const a = dict.about;
  return (
    <section id="restaurant" className="bg-ivory-50 py-24 text-ink sm:py-32">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow reveal text-accent">{a.eyebrow}</p>
          <h2 className="display reveal mt-6 text-[clamp(2.5rem,5vw,4.2rem)] text-navy-900">{a.title}</h2>
          <div className="reveal mt-8 space-y-5 text-[15px] leading-[1.85] text-ink-soft">
            <p>{a.p1}</p>
            <p>{a.p2}</p>
          </div>
          <dl className="reveal mt-10 grid grid-cols-3 border-t border-navy-900/15">
            {a.facts.map(([k, v], i) => (
              <div key={k} className={`pt-6 ${i > 0 ? "border-l border-navy-900/15 pl-4 sm:pl-6" : "pr-4"}`}>
                <dt className="font-display text-[1.35rem] leading-tight font-semibold whitespace-nowrap text-gold-700 sm:text-[1.7rem]">
                  <CountUp value={k} />
                </dt>
                <dd className="mt-1.5 text-[11px] leading-snug tracking-wide text-ink-soft sm:text-xs">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7">
          <figure className="reveal-img img-zoom aspect-[3/4] overflow-hidden rounded-md">
            <Img name="interior-blossom" alt={dict.alt.interior} sizes="(min-width:1024px) 28vw, 50vw" className="h-full w-full object-cover" />
          </figure>
          <figure className="reveal-img img-zoom mt-12 aspect-[3/4] overflow-hidden rounded-md" style={{ ["--d" as string]: "180ms" }}>
            <Img name="interior-window" alt={dict.alt.interiorWindow} sizes="(min-width:1024px) 28vw, 50vw" className="h-full w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}
