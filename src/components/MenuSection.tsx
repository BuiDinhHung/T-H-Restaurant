"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Camera, Flame, Search, X } from "lucide-react";
import Lightbox from "./Lightbox";
import { menus, type DishPhoto, type MenuCategory, type MenuItem, type MenuSection as Section } from "@/lib/menu";
import { localeConfig, type Dict, type LocaleKey } from "@/lib/i18n";

const START_PAGE: Record<string, number> = { s1: 0, s2: 2, s3: 3, s4: 3, s5: 4, s6: 9, s7: 10, s8: 10, s9: 11 };
const SCROLL_OFFSET = 230;

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function Chilies({ n, label }: { n?: number; label: string }) {
  if (!n) return null;
  return (
    <span className="inline-flex shrink-0 translate-y-[1px] text-accent" title={label} aria-label={`${label} ${n}/3`}>
      {Array.from({ length: n }).map((_, i) => (
        <Flame key={i} className="size-3.5 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

type Ctx = { spicy: string; photoLabel: string; show: (key: string) => void };
type Shot = { key: string; photo: DishPhoto; no?: number; title: string; sub?: string; price?: string };

const itemKey = (i: MenuItem) => `n${i.no}`;
const catKey = (s: Section, c: MenuCategory) => `c${s.id}${c.letter}`;

const categoryShots = (s: Section, c: MenuCategory): Shot[] => [
  ...(c.photo ? [{ key: catKey(s, c), photo: c.photo, title: `${c.letter} ${c.title}`.trim(), sub: c.vi }] : []),
  ...c.items.flatMap((i) => (i.photo ? [{ key: itemKey(i), photo: i.photo, no: i.no, title: i.name, sub: i.sub, price: i.price }] : [])),
];
const sectionShots = (s: Section): Shot[] => s.categories.flatMap((c) => categoryShots(s, c));

const NARROW_COLS: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-2" };
const WIDE_COLS: Record<number, string> = { 1: "grid-cols-1 sm:mx-auto sm:max-w-xl", 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" };

function CategoryPhotos({ shots, ctx, wide }: { shots: Shot[]; ctx: Ctx; wide?: boolean }) {
  if (!shots.length) return null;
  const n = shots.length;
  const cols = (wide ? WIDE_COLS : NARROW_COLS)[n] ?? (wide ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-3");
  const captions = n > 1;
  return (
    <ul className={`mt-4 mb-2 grid gap-3 sm:gap-4 ${cols}`}>
      {shots.map((p) => (
        <li key={p.key} className="min-w-0">
          <button
            type="button"
            onClick={() => ctx.show(p.key)}
            aria-label={`${ctx.photoLabel}: ${p.title}`}
            className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <span className={`block overflow-hidden border border-gold-500/40 bg-navy-900 ${captions ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
              <img
                src={p.photo.thumb}
                srcSet={p.photo.srcSet}
                sizes={captions ? "(min-width: 1024px) 260px, 50vw" : "(min-width: 1024px) 520px, 100vw"}
                alt=""
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className={`h-full w-full transition duration-700 ease-out group-hover:scale-105 ${captions ? "object-cover" : "object-contain"}`}
              />
            </span>
            {(captions || p.no !== undefined) && (
              <span className="mt-2 line-clamp-2 min-h-[32px] text-[11px] leading-4 font-semibold tracking-[0.04em] text-navy-900 uppercase">
                {p.no !== undefined && <span className="mr-1 text-accent tabular-nums">{p.no}.</span>}
                {p.no !== undefined ? p.title : p.sub || p.title}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Row({ item, ctx }: { item: MenuItem; ctx: Ctx }) {
  return (
    <li className="break-inside-avoid py-3.5">
      <div className="flex items-baseline gap-3">
        <span className="w-8 shrink-0 text-right text-[12px] font-semibold text-accent tabular-nums">{item.no}.</span>
        <span className="min-w-0 text-[13px] leading-snug font-semibold tracking-[0.04em] text-navy-900">
          {item.name} <Chilies n={item.spice} label={ctx.spicy} />
          {item.photo && (
            <button
              type="button"
              onClick={() => ctx.show(itemKey(item))}
              aria-label={`${ctx.photoLabel}: ${item.name}`}
              title={ctx.photoLabel}
              className="ml-1.5 inline-grid size-6 translate-y-[3px] place-items-center rounded-full border border-gold-500/50 text-gold-700 transition hover:bg-gold-500/15"
            >
              <Camera className="size-3.5" strokeWidth={1.75} />
            </button>
          )}
        </span>
        <span className="mx-1 hidden min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-navy-900/25 sm:block" aria-hidden />
        <span className="ml-auto shrink-0 text-right text-[13px] font-semibold whitespace-nowrap text-gold-700 tabular-nums sm:ml-0">{item.price}</span>
      </div>
      {(item.sub || item.size) && (
        <div className="mt-1 flex items-baseline justify-between gap-4 pl-11">
          <span className="font-display text-[15px] leading-snug text-ink-soft italic">{item.sub}</span>
          {item.size && <span className="shrink-0 text-[11px] tracking-wide text-ink-soft/80 tabular-nums">{item.size}</span>}
        </div>
      )}
    </li>
  );
}

function Category({ c, ctx, split, shots = [] }: { c: MenuCategory; ctx: Ctx; split?: boolean; shots?: Shot[] }) {
  return (
    <div className="break-inside-avoid">
      {(c.title || c.letter) && (
        <h4 className="border-b border-gold-500/50 pb-3 font-display text-2xl leading-tight font-semibold tracking-[0.02em] text-accent">
          {c.letter && <span className="mr-2 text-gold-700">{c.letter}</span>}
          {c.title}
          {c.vi && <span className="ml-3 text-lg font-normal tracking-normal text-ink-soft italic">{c.vi}</span>}
        </h4>
      )}
      {c.note && (
        <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] text-navy-900/70 uppercase">
          {c.note.text} · <span className="font-display text-[14px] font-normal tracking-normal normal-case italic">{c.note.vi}</span>
        </p>
      )}
      <CategoryPhotos shots={shots} ctx={ctx} wide={split} />
      <ul className={split ? "gap-x-16 lg:columns-2 [&>li]:border-b [&>li]:border-navy-900/8" : "divide-y divide-navy-900/8"}>
        {c.items.map((i) => (
          <Row key={i.no} item={i} ctx={ctx} />
        ))}
      </ul>
    </div>
  );
}

function SectionBlock({ s, ctx, heading = true }: { s: Section; ctx: Ctx; heading?: boolean }) {
  const single = s.categories.length === 1;
  return (
    <div>
      {heading && (
        <div className="text-center">
          <h3 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight font-semibold tracking-[0.03em]">
            <span className="text-gold-700">{s.roman}</span> <span className="text-accent">{s.title}</span>
          </h3>
          <p className="mt-1 font-display text-lg font-semibold tracking-[0.18em] text-navy-900">{s.vi}</p>
          <div className="ornament mt-4 justify-center" aria-hidden>
            <span className="size-1.5 rotate-45 bg-gold-500" />
          </div>
        </div>
      )}
      {single ? (
        <div className="mt-10">
          <Category c={s.categories[0]} ctx={ctx} split shots={categoryShots(s, s.categories[0])} />
        </div>
      ) : (
        <div className="mt-10 gap-x-16 space-y-10 lg:columns-2 lg:space-y-0 [&>*]:lg:mb-10">
          {s.categories.map((c, i) => (
            <Category key={i} c={c} ctx={ctx} shots={categoryShots(s, c)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuSection({ locale, dict }: { locale: LocaleKey; dict: Dict }) {
  const menu = menus[localeConfig[locale].menu];
  const m = dict.menu;
  const [tab, setTab] = useState(menu.sections[0].id);
  const [q, setQ] = useState("");
  const [viewer, setViewer] = useState<number | null>(null);
  const [dish, setDish] = useState<number | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const jump = (id: string) => {
    const el = document.getElementById(`menu-${id}`);
    if (!el) return;
    setTab(id);
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET, behavior: "smooth" });
  };

  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#menu-(s\d)$/);
      if (m && menu.sections.some((s) => s.id === m[1])) {
        setQ("");
        requestAnimationFrame(() => jump(m[1]));
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [menu]);

  useEffect(() => {
    if (q) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = menu.sections[0].id;
        for (const s of menu.sections) {
          const el = document.getElementById(`menu-${s.id}`);
          if (el && el.getBoundingClientRect().top - SCROLL_OFFSET - 40 <= 0) cur = s.id;
        }
        setTab(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menu, q]);

  useEffect(() => {
    const el = document.getElementById(`tab-${tab}`);
    const bar = el?.parentElement;
    if (el && bar) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [tab]);

  const pick = (id: string) => {
    if (q) {
      setQ("");
      requestAnimationFrame(() => requestAnimationFrame(() => jump(id)));
    } else jump(id);
  };

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return null;
    return menu.sections
      .map((s) => ({
        ...s,
        categories: s.categories
          .map((c) => ({ ...c, note: undefined, items: c.items.filter((i) => norm(`${i.no} ${i.name} ${i.sub ?? ""}`).includes(n)) }))
          .filter((c) => c.items.length),
      }))
      .filter((s) => s.categories.length);
  }, [q, menu]);
  const photos = useMemo(() => menu.sections.flatMap(sectionShots), [menu]);
  const ctx: Ctx = { spicy: m.spicy, photoLabel: m.photo, show: (key) => setDish(Math.max(0, photos.findIndex((p) => p.key === key))) };
  const count = results?.reduce((a, s) => a + s.categories.reduce((b, c) => b + c.items.length, 0), 0) ?? 0;
  const current = menu.sections.find((s) => s.id === tab) ?? menu.sections[0];
  const total = menu.sections.reduce((a, s) => a + s.categories.reduce((b, c) => b + c.items.length, 0), 0);

  return (
    <section id="menu" className="relative bg-ivory-100 py-24 text-ink sm:py-32">
      <div className="container-lux">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow reveal justify-center text-accent">{m.eyebrow}</p>
          <h2 className="display reveal mt-6 text-[clamp(2.6rem,6vw,4.6rem)] text-navy-900">{m.title}</h2>
          <p className="reveal mt-5 text-[13px] tracking-wide text-ink-soft">
            <strong className="font-semibold text-navy-900">{m.edition}</strong> <span className="mx-2 text-gold-700">·</span> {m.currency}
          </p>
          <p className="reveal mt-2 text-[12px] font-semibold tracking-[0.16em] text-gold-700 uppercase">{m.count.replaceAll("{n}", String(total))}</p>
        </header>

        <div ref={top} className="relative mx-auto mt-12 max-w-[1180px] border border-gold-500/50 bg-ivory-50 p-1.5 shadow-[0_40px_80px_-40px_rgba(11,18,54,0.35)]">
          <div className="border border-gold-500/25">
            <div className="sticky top-[72px] z-20 border-b border-gold-500/30 bg-ivory-50/95 backdrop-blur lg:top-20">
              <div className="flex flex-col gap-3 px-4 pt-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10">
                <label className="relative block w-full lg:max-w-xs">
                  <span className="sr-only">{m.search}</span>
                  <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" strokeWidth={1.5} />
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={m.search}
                    className="h-11 w-full rounded-full border border-navy-900/15 bg-white pr-10 pl-11 text-sm text-ink placeholder:text-ink-soft/70 focus:border-gold-500 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                  />
                  {q && (
                    <button onClick={() => setQ("")} aria-label="Clear" className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft hover:text-ink">
                      <X className="size-4" strokeWidth={1.5} />
                    </button>
                  )}
                </label>
                <button onClick={() => setViewer(START_PAGE[current.id] ?? 0)} className="btn-line-ink hidden h-10 lg:inline-flex">
                  <BookOpen className="size-4" strokeWidth={1.5} />
                  {m.original}
                </button>
              </div>
              <nav aria-label={m.title} className="mt-3 flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none] sm:px-7 lg:px-9">
                {menu.sections.map((s) => {
                  const on = !results && s.id === tab;
                  return (
                    <button
                      key={s.id}
                      id={`tab-${s.id}`}
                      onClick={() => pick(s.id)}
                      aria-pressed={on}
                      className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.06em] whitespace-nowrap transition-colors ${
                        on ? "bg-navy-900 text-gold-200" : "text-ink-soft hover:bg-navy-900/5 hover:text-navy-900"
                      }`}
                    >
                      <span className={on ? "text-gold-300" : "text-gold-700"}>{s.roman}</span> {s.title}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
              {results ? (
                <>
                  <p className="text-center text-[12px] font-semibold tracking-[0.2em] text-ink-soft uppercase">{m.results.replace("{n}", String(count))}</p>
                  {results.length === 0 && <p className="py-16 text-center font-display text-xl text-ink-soft italic">{m.empty}</p>}
                  <div className="space-y-12">
                    {results.map((s) => (
                      <SectionBlock key={s.id} s={s} ctx={ctx} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-20 lg:space-y-24">
                  {menu.sections.map((s) => (
                    <div key={s.id} id={`menu-${s.id}`}>
                      <SectionBlock s={s} ctx={ctx} />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col items-center gap-4 border-t border-gold-500/30 pt-8 text-center">
                <p className="inline-flex items-center gap-2 text-[12px] text-ink-soft">
                  <Flame className="size-3.5 fill-accent text-accent" strokeWidth={0} /> = {m.spicy}
                  <span className="mx-2 text-gold-700">·</span>
                  {menu.footnote}
                </p>
                <button onClick={() => setViewer(START_PAGE[current.id] ?? 0)} className="btn-line-ink lg:hidden">
                  <BookOpen className="size-4" strokeWidth={1.5} />
                  {m.original}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        items={menu.pages.map((src, i) => ({ type: "image" as const, src, alt: `${m.original} – ${dict.menu.edition}` }))}
        index={viewer}
        onChange={setViewer}
        closeLabel={dict.nav.close}
      />
      <Lightbox
        items={photos.map((p) => ({ type: "image" as const, src: p.photo.src, srcSet: p.photo.srcSet, alt: [p.no !== undefined ? `${p.no}. ${p.title}` : p.title, p.price].filter(Boolean).join(" · ") }))}
        index={dish}
        onChange={setDish}
        closeLabel={dict.nav.close}
      />
    </section>
  );
}
