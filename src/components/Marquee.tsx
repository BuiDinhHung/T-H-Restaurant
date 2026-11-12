/** Endless band of words (two identical halves so the loop is seamless). */
export default function Marquee({ words, tone = "gold" }: { words: string[]; tone?: "gold" | "navy" }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-brand text-[clamp(1.05rem,2vw,1.5rem)] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">{w}</span>
          <span className={tone === "gold" ? "text-navy-900/50" : "text-gold-400"}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee overflow-hidden border-y py-5 ${
        tone === "gold" ? "border-gold-500/40 bg-gold-400 text-navy-950" : "border-gold-400/20 bg-navy-950 text-paper/80"
      }`}
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
