"use client";
import { useState } from "react";
import { Expand, Play } from "lucide-react";
import Img from "./Img";
import LazyVideo from "./LazyVideo";
import Lightbox, { type LightboxItem } from "./Lightbox";
import { clip, photo } from "@/lib/media";
import type { Dict } from "@/lib/i18n";

type Tile = { kind: "photo" | "video"; name: string; altKey: string };

/**
 * Even 3:4 grid, photos and videos strictly alternating:
 * desktop (4 columns) reads as a checkerboard  P V P V / V P V P,
 * phones (2 columns) as  P V / P V / V P / V P.
 */
const TILES: Tile[] = [
  { kind: "photo", name: "terrace-umbrellas", altKey: "terraceUmbrellas" },
  { kind: "video", name: "duck-wok", altKey: "videoDish" },
  { kind: "photo", name: "interior-bar", altKey: "interiorBar" },
  { kind: "video", name: "steak", altKey: "videoDish" },
  { kind: "video", name: "duck-curry", altKey: "videoDish" },
  { kind: "photo", name: "family-table", altKey: "familyTable" },
  { kind: "video", name: "prawns", altKey: "videoDish" },
  { kind: "photo", name: "guests-dining", altKey: "guestsDining" },
  { kind: "photo", name: "terrace-group", altKey: "terraceGroup" },
  { kind: "video", name: "sizzling", altKey: "videoDish" },
  { kind: "photo", name: "guests-table", altKey: "guestsTable" },
  { kind: "video", name: "pho", altKey: "videoDish" },
];

export default function Gallery({ dict }: { dict: Dict }) {
  const g = dict.gallery;
  const [idx, setIdx] = useState<number | null>(null);

  const items: LightboxItem[] = TILES.map((t) =>
    t.kind === "photo"
      ? { type: "image", src: photo(t.name).src, srcSet: photo(t.name).srcSet, alt: dict.alt[t.altKey] }
      : { type: "video", src: clip(t.name).src, poster: clip(t.name).still, alt: dict.alt[t.altKey] },
  );

  return (
    <section id="gallery" className="bg-navy-950 py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow reveal text-gold-300">{g.eyebrow}</p>
            <h2 className="display reveal mt-6 text-[clamp(2.4rem,5vw,4.2rem)] text-paper">{g.title}</h2>
          </div>
          <p className="reveal max-w-sm text-[15px] leading-[1.85] text-paper/65">{g.text}</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIdx(i)}
              aria-label={`${g.open}: ${dict.alt[t.altKey]}`}
              className="reveal-img lift group img-zoom relative block aspect-[3/4] overflow-hidden rounded-md bg-navy-800"
              style={{ ["--d" as string]: `${(i % 4) * 110}ms` }}
            >
              {t.kind === "photo" ? (
                <Img name={t.name} alt={dict.alt[t.altKey]} sizes="(min-width:1024px) 24vw, 50vw" className="h-full w-full object-cover" />
              ) : (
                <>
                  <LazyVideo src={clip(t.name).src} poster={clip(t.name).still} label={dict.alt[t.altKey]} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/75 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-gold-200 uppercase backdrop-blur">
                    <Play className="size-3 fill-current" strokeWidth={0} /> {g.video}
                  </span>
                </>
              )}
              <span className="absolute inset-0 bg-navy-950/0 transition-colors duration-500 group-hover:bg-navy-950/25" />
              <Expand className="absolute top-3 right-3 size-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-90" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={idx} onChange={setIdx} closeLabel={dict.nav.close} />
    </section>
  );
}
