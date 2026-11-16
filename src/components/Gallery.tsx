"use client";
import { useState } from "react";
import { ChevronDown, Expand, Play } from "lucide-react";
import Img from "./Img";
import LazyVideo from "./LazyVideo";
import Lightbox, { type LightboxItem } from "./Lightbox";
import { clip, photo } from "@/lib/media";
import type { Dict } from "@/lib/i18n";

type Group = "kitchen" | "inside" | "terrace";
type Tile = { kind: "photo" | "video"; name: string; altKey: string; group: Group };

/**
 * Even 3:4 grid mixing photos and clips. The order below is the "All" view
 * (food, dining room and terrace interleaved); the filter chips show one group.
 * Every shot appears once on the page: anything used in Food (duck curry, steak, prawns,
 * the vegetable hot pan — also in the "sizzling" clip) is deliberately left out here.
 */
const TILES: Tile[] = [
  { kind: "photo", name: "terrace-umbrellas", altKey: "terraceUmbrellas", group: "terrace" },
  { kind: "video", name: "dining-full", altKey: "videoInside", group: "inside" },
  { kind: "video", name: "bun-closeup", altKey: "videoDish", group: "kitchen" },
  { kind: "photo", name: "interior-bar", altKey: "interiorBar", group: "inside" },

  { kind: "video", name: "terrace-crowd", altKey: "videoTerrace", group: "terrace" },
  { kind: "photo", name: "family-table", altKey: "familyTable", group: "inside" },
  { kind: "video", name: "duck-wok", altKey: "videoDish", group: "kitchen" },
  { kind: "video", name: "guests-bun", altKey: "videoInside", group: "inside" },

  { kind: "photo", name: "guests-dining", altKey: "guestsDining", group: "inside" },
  { kind: "video", name: "duck-sizzling", altKey: "videoDuckSizzling", group: "kitchen" },
  { kind: "video", name: "dining-room", altKey: "videoInside", group: "inside" },
  { kind: "photo", name: "terrace-group", altKey: "terraceGroup", group: "terrace" },

  { kind: "video", name: "bun-bowls", altKey: "videoDish", group: "kitchen" },
  { kind: "video", name: "terrace-guests", altKey: "videoTerrace", group: "terrace" },
  { kind: "photo", name: "guests-table", altKey: "guestsTable", group: "inside" },
  { kind: "video", name: "steak", altKey: "videoDish", group: "kitchen" },

  { kind: "photo", name: "terrace-view", altKey: "terraceView", group: "terrace" },
  { kind: "video", name: "interior-walk", altKey: "videoInside", group: "inside" },
  { kind: "video", name: "pho", altKey: "videoDish", group: "kitchen" },
  { kind: "photo", name: "guests-sizzling", altKey: "guestsSizzling", group: "inside" },
];

/** Tiles shown in the "All" view before "Show more" (3 rows on desktop). */
const INITIAL = 12;

export default function Gallery({ dict }: { dict: Dict }) {
  const g = dict.gallery;
  const [idx, setIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | Group>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === "all" ? TILES : TILES.filter((t) => t.group === filter);
  const shown = filter === "all" && !expanded ? filtered.slice(0, INITIAL) : filtered;

  const items: LightboxItem[] = filtered.map((t) =>
    t.kind === "photo"
      ? { type: "image", src: photo(t.name).src, srcSet: photo(t.name).srcSet, alt: dict.alt[t.altKey] }
      : { type: "video", src: clip(t.name).src, poster: clip(t.name).still, alt: dict.alt[t.altKey] },
  );

  const chips: ("all" | Group)[] = ["all", "kitchen", "inside", "terrace"];

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

        <div className="reveal mt-10 flex flex-wrap gap-2" role="group" aria-label={g.title}>
          {chips.map((c) => {
            const on = c === filter;
            const n = c === "all" ? TILES.length : TILES.filter((t) => t.group === c).length;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={on}
                className={`rounded-full border px-4 py-2 text-[12px] font-semibold tracking-[0.08em] transition-colors ${
                  on ? "border-gold-400 bg-gold-400 text-navy-950" : "border-white/15 text-paper/75 hover:border-gold-400/60 hover:text-gold-200"
                }`}
              >
                {g.filters[c]} <span className={on ? "text-navy-950/60" : "text-paper/40"}>{n}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shown.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIdx(i)}
              aria-label={`${g.open}: ${dict.alt[t.altKey]}`}
              className="lift group img-zoom tab-in relative block aspect-[3/4] overflow-hidden rounded-md bg-navy-800"
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

        {shown.length < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setExpanded(true)} className="btn-line">
              {g.more} ({filtered.length - shown.length}) <ChevronDown className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      <Lightbox items={items} index={idx} onChange={setIdx} closeLabel={dict.nav.close} />
    </section>
  );
}
