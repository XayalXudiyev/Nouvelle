"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Component, useState, type ReactNode } from "react";
import { ArrowRight, BadgePercent } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import Magnetic from "@/components/ui/Magnetic";
import { Sparkle } from "@/components/ui/Icons";
import { PRODUCTS, SKU_COUNT, finalPrice } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n/context";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** WebGL dəstəklənmədikdə statik kompozisiya qalır */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const ease = [0.16, 1, 0.3, 1] as const;

function StaticComposition() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[70%] w-[70%]">
        <Image src="/img/hq/kera-cream.webp" alt="" width={231} height={614} priority className="absolute top-[6%] left-[22%] h-[82%] w-auto drop-shadow-2xl" />
        <Image src="/img/hq/wax-red.webp" alt="" width={585} height={823} priority className="absolute right-[8%] bottom-[2%] h-[44%] w-auto drop-shadow-2xl" />
        <Image src="/img/hq/cck006.webp" alt="" width={758} height={900} priority className="absolute top-0 right-[4%] h-[46%] w-auto rotate-[-18deg] drop-shadow-2xl" />
      </div>
    </div>
  );
}

const kera = PRODUCTS.find((p) => p.slug === "nouvelle-kera-sublime-hero-cream")!;

export default function Hero() {
  const [ready, setReady] = useState(false);
  const { t, href } = useLang();
  const h = t.hero;

  return (
    <section className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem] sm:-mt-[4.75rem] sm:pt-[4.75rem] lg:-mt-[5rem] lg:pt-[5rem]">
      {/* fon */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-blush/70 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-[#e9e2fb] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-gold-2/30 blur-[100px]" />
      </div>

      <div className="container-x relative grid min-h-[calc(100svh-5.5rem)] items-center gap-6 pb-10 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-16">
        <div className="relative z-10 pt-8 lg:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 py-1.5 pr-4 pl-1.5 text-xs font-semibold backdrop-blur"
          >
            <span className="rounded-full bg-ink px-2.5 py-1 text-[0.65rem] tracking-wider text-ivory">{h.pillTag}</span>
            {h.pill}
          </motion.p>

          <SplitText
            as="h1"
            animateOnMount
            delay={0.15}
            text={h.title}
            className="font-display text-[min(3.6rem,13vw)] leading-[0.88] font-medium tracking-tight [overflow-wrap:anywhere] sm:text-[5.5rem] lg:text-[6.4rem] xl:text-[7.4rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {h.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link href={href("/mehsullar/")} className="btn btn-primary">
                {h.cta} <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={href("/endirimler/")} className="btn btn-ghost">
                <BadgePercent className="size-4 text-rose" /> {h.deals}
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line border-t border-line pt-6"
          >
            {[
              ["6", h.stats[0]],
              [`${Math.floor(SKU_COUNT / 10) * 10}+`, h.stats[1]],
              [h.oneDay, h.stats[2]],
            ].map(([n, l]) => (
              <div key={l} className="px-4 first:pl-0">
                <dt className="font-display text-3xl font-semibold lining-nums sm:text-4xl">{n}</dt>
                <dd className="text-xs tracking-wide text-muted uppercase">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 3D səhnə */}
        <div className="relative h-[440px] sm:h-[540px] lg:h-[min(720px,calc(100svh-7rem))]">
          <motion.div
            aria-hidden
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
            style={{ originY: 1 }}
            className="absolute bottom-0 left-1/2 h-[92%] w-[min(78%,520px)] -translate-x-1/2 rounded-t-full bg-gradient-to-b from-white/90 via-blush/60 to-blush-2/40 shadow-[inset_0_2px_30px_rgba(255,255,255,0.9)]"
          />
          <div aria-hidden className="absolute bottom-0 left-1/2 h-10 w-[min(90%,600px)] -translate-x-1/2 rounded-[100%] bg-ink/10 blur-xl" />

          {!ready && <StaticComposition />}
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.2 }}>
            <SceneBoundary>
              <HeroScene onReady={() => setReady(true)} />
            </SceneBoundary>
          </motion.div>

          {/* üzən şüşə kartlar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="absolute top-[8%] left-0 sm:left-[2%]"
          >
            <Link href={href(`/mehsullar/${kera.slug}/`)} className="card-glass flex items-center gap-3 rounded-2xl p-2 pr-4 shadow-xl transition-transform duration-500 hover:-translate-y-1 animate-[float_6s_ease-in-out_infinite]">
              <span className="relative grid size-12 place-items-center overflow-hidden rounded-xl bg-blush">
                <Image src="/img/hq/kera-cream.webp" alt="" width={40} height={106} className="h-11 w-auto" />
              </span>
              <span>
                <span className="block text-[0.65rem] font-semibold tracking-wider text-muted uppercase">Kera Sublime</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-bold text-rose">{formatPrice(finalPrice(kera))}</span>
                  <span className="text-xs text-muted line-through">{formatPrice(kera.price)}</span>
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.3, ease }}
            className="absolute right-0 bottom-[14%] sm:right-[2%]"
          >
            <Link href={href("/brendler/razorline/")} className="flex items-center gap-3 rounded-2xl bg-ink p-2 pr-4 text-ivory shadow-2xl transition-transform duration-500 hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-xl bg-white/10">
                <Image src="/img/hq/cck006.webp" alt="" width={44} height={60} className="h-10 w-auto -rotate-12" />
              </span>
              <span>
                <span className="block text-[0.65rem] font-semibold tracking-wider text-gold-2 uppercase">{h.razorChip}</span>
                <span className="font-bold">{h.razorChipValue}</span>
              </span>
            </Link>
          </motion.div>

          {/* fırlanan dairəvi yazı */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, ease }}
            className="absolute bottom-[4%] left-[3%] hidden size-28 sm:block"
          >
            <svg viewBox="0 0 100 100" className="size-full animate-spin-slow">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-ink text-[9.5px] font-semibold tracking-[0.32em] uppercase">
                <textPath href="#circle">{h.ring}</textPath>
              </text>
            </svg>
            <Sparkle className="absolute inset-0 m-auto size-6 text-rose" />
          </motion.div>
        </div>
      </div>

      {/* aşağı göstərici */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="eyebrow text-[0.6rem] text-muted">{h.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollline_1.8s_ease-in-out_infinite] bg-ink" />
        </span>
      </motion.div>
    </section>
  );
}
