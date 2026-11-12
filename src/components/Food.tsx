import { ArrowRight } from "lucide-react";
import Img from "./Img";
import { clip } from "@/lib/media";
import type { Dict } from "@/lib/i18n";

/** Each tile opens the matching menu section (ids s1…s9 in menu-data.json). */
const TILES = [
  { kind: "photo", name: "dish-duck-curry", section: "s5" },
  { kind: "still", name: "sizzling-alt", section: "s7" },
  { kind: "still", name: "pho", section: "s8" },
  { kind: "still", name: "prawns", section: "s2" },
] as const;

export default function Food({ dict }: { dict: Dict }) {
  const f = dict.food;
  return (
    <section className="grain relative bg-navy-900 py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow reveal text-gold-300">{f.eyebrow}</p>
            <h2 className="display reveal mt-6 max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)] text-paper">{f.title}</h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-[15px] leading-[1.85] text-paper/70">{f.text}</p>
            <a href="#menu" className="link-underline mt-4 inline-flex items-center gap-2 pb-1 text-[12px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
              {f.toMenu} <ArrowRight className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Uniform 4-up grid (2-up on phones), identical ratios */}
        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <a key={t.name} href={`#menu-${t.section}`} className="reveal group block" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <div className="img-zoom aspect-[3/4] overflow-hidden rounded-md bg-navy-800">
                {t.kind === "photo" ? (
                  <Img name={t.name} alt={dict.alt.dish} sizes="(min-width:1024px) 24vw, 50vw" className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={clip(t.name).still}
                    alt={dict.alt.still}
                    width={576}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="mt-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="font-display text-lg text-paper transition-colors group-hover:text-gold-200 sm:text-xl">{f.captions[i]}</span>
                <ArrowRight className="size-4 shrink-0 text-gold-400 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
