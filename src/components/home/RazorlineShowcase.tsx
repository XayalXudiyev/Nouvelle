"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus, ShieldCheck, Gem, Hand } from "lucide-react";
import { PRODUCTS, finalPrice, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cart } from "@/lib/cart";
import { PHONE } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";

const SCISSORS = PRODUCTS.filter((p) => p.brand === "razorline" && p.code);

function ScissorCard({ p: raw, i }: { p: Product; i: number }) {
  const { t, href, product } = useLang();
  const p = product(raw);
  // spesifikasiyaları orijinal (az) etiketə görə tapırıq, dəyəri tərcümə olunmuş massivdən götürürük
  const spec = (l: string) => {
    const idx = raw.specs?.findIndex((s) => s.label === l) ?? -1;
    return idx >= 0 ? p.specs?.[idx]?.value : undefined;
  };
  return (
    <article className="group relative flex h-[min(68vh,560px)] min-h-[440px] w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-ink-3 to-ink-2 ring-1 ring-white/10 sm:w-[360px]">
      <span aria-hidden className="pointer-events-none absolute top-6 -right-4 font-display text-[7.5rem] leading-none font-semibold text-white/[0.04] [writing-mode:vertical-rl]">
        {p.code}
      </span>
      <span aria-hidden className="absolute top-1/3 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl transition-all duration-700 group-hover:bg-gold/40" />
      <div className="flex items-center justify-between p-6 pb-0">
        <span className="font-display text-sm text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
        <span className="rounded-full bg-rose px-2.5 py-1 text-[0.7rem] font-bold text-white">−{p.discount}%</span>
      </div>
      <Link href={href(`/mehsullar/${p.slug}/`)} className="relative mx-6 mt-2 flex-1" aria-label={p.name}>
        {p.photo ? (
          <Image src={p.gallery![0]} alt={p.name} fill sizes="360px" className="rounded-2xl object-cover opacity-90" />
        ) : (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="360px"
            className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110 group-hover:-rotate-[8deg]"
          />
        )}
      </Link>
      <div className="relative p-6 pt-4">
        <p className="eyebrow text-[0.6rem] text-gold-2">
          {spec("Növ")} · {spec("Ölçü")}
        </p>
        <h3 className="mt-1 font-display text-4xl leading-none font-medium text-ivory">{p.code}</h3>
        <p className="mt-1 text-sm text-white/50">{p.short}</p>
        <div className="mt-4 flex items-end justify-between">
          <div className="tabular-nums">
            <span className="block text-sm text-white/40 line-through">{formatPrice(p.price)}</span>
            <span className="text-2xl font-bold text-ivory">{formatPrice(finalPrice(p))}</span>
          </div>
          <button
            onClick={() => cart.add(p.slug)}
            className="grid size-12 place-items-center rounded-full bg-gold text-ink transition-all duration-500 ease-out-expo hover:scale-110 hover:bg-gold-2"
            aria-label={`${p.name} — ${t.common.addAria}`}
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function RazorlineShowcase() {
  const { t, href } = useLang();
  const r = t.razor;
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={section}
      className="relative bg-ink text-ivory"
      style={{ height: desktop ? `calc(100vh + ${dist}px)` : undefined }}
      aria-label="Razorline qayçıları"
    >
      <div className="grain relative overflow-hidden py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:gap-6 sm:px-6 lg:snap-none lg:overflow-visible lg:px-10"
        >
          <motion.div style={{ x: desktop ? x : 0 }} className="flex shrink-0 gap-4 sm:gap-6">
            {/* giriş paneli */}
            <div className="flex w-[86vw] shrink-0 snap-center flex-col justify-center pr-4 sm:w-[520px] lg:pr-16">
              <p className="eyebrow mb-5 inline-flex items-center gap-3 text-gold-2">
                <span className="h-px w-8 bg-current" /> {r.eyebrow}
              </p>
              <h2 className="font-display text-[3.2rem] leading-[0.92] font-medium tracking-tight sm:text-7xl">
                {r.title} <em className="text-gold-2">{r.accent}</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
                {r.text1} <strong className="text-ivory">{r.text2}</strong>.
              </p>
              <ul className="mt-8 grid grid-cols-3 gap-3 text-xs text-white/70">
                {[
                  { Icon: Gem, t: r.pills[0] },
                  { Icon: ShieldCheck, t: r.pills[1] },
                  { Icon: Hand, t: r.pills[2] },
                ].map(({ Icon, t }) => (
                  <li key={t} className="rounded-2xl border border-white/10 p-3">
                    <Icon className="mb-2 size-5 text-gold-2" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/40">{r.note}</p>
              <Link href={href("/brendler/razorline/")} className="btn btn-light mt-6 self-start">
                {r.all} <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {SCISSORS.map((p, i) => (
              <ScissorCard key={p.slug} p={p} i={i} />
            ))}

            {/* son panel */}
            <div className="relative flex h-[min(68vh,560px)] min-h-[440px] w-[78vw] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[2rem] sm:w-[360px]">
              <Image src="/img/poster/razor-21.webp" alt={r.last} fill sizes="360px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="relative p-6">
                <p className="font-display text-3xl leading-tight">{r.last}</p>
                <a href={PHONE.href} className="btn btn-light mt-5 h-12">
                  {PHONE.display}
                </a>
              </div>
            </div>
            <div className="w-1 shrink-0 lg:w-10" aria-hidden />
          </motion.div>
        </div>

        {/* proqres */}
        <div className="mx-4 mt-10 hidden h-px bg-white/10 sm:mx-6 lg:mx-10 lg:block">
          <motion.div style={{ width: progress }} className="h-px bg-gold-2" />
        </div>
      </div>
    </section>
  );
}
