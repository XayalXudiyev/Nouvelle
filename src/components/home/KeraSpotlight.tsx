"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Check, Droplets, Sparkles, Waves, Clock, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Price from "@/components/ui/Price";
import { getProduct } from "@/lib/data";
import { cart } from "@/lib/cart";
import { useLang } from "@/lib/i18n/context";

const ICONS = [Waves, Droplets, Sparkles, Clock];
const CHIP_POS = [
  { c: "top-[8%] -left-4 sm:-left-10", d: 0.1 },
  { c: "top-[36%] -right-4 sm:-right-12", d: 0.25 },
  { c: "bottom-[26%] -left-6 sm:-left-14", d: 0.4 },
  { c: "bottom-[8%] -right-2 sm:-right-8", d: 0.55 },
];

const LINE = ["nouvelle-kera-sublime-shampoo", "nouvelle-kera-sublime-mask", "nouvelle-kera-sublime-oil"];

export default function KeraSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yBottle = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const { t, href, product } = useLang();
  const k = t.kera;
  const hero = product(getProduct("nouvelle-kera-sublime-hero-cream")!);
  const line = LINE.map((s) => getProduct(s)!);
  const FEATURES = k.features.map((tx, i) => ({ Icon: ICONS[i], t: tx }));
  const INGREDIENTS = k.ingredients.map((tx, i) => ({ t: tx, ...CHIP_POS[i] }));

  return (
    <section ref={ref} className="relative overflow-hidden bg-blush py-20 sm:py-28">
      <div aria-hidden className="glow pointer-events-none absolute -top-32 right-0 size-[40rem]" style={{ ["--glow" as string]: "rgb(255 255 255 / 0.5)" }} />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* vizual */}
        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div style={{ y }} className="relative aspect-[3/4.2] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-blush-2 shadow-[0_50px_100px_-40px_rgba(154,42,68,0.5)]">
            <video
              className="absolute inset-0 size-full object-cover"
              src="/video/kera-sublime.mp4"
              poster="/video/kera-sublime-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={hero.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-deep/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="font-display text-3xl leading-tight italic">{k.videoCaption}</p>
            </div>
          </motion.div>

          <motion.div style={{ y: yBottle, rotate: rot }} className="absolute -right-6 -bottom-10 w-[34%] drop-shadow-[0_30px_30px_rgba(80,20,35,0.35)] sm:-right-16">
            <Image src="/img/hq/kera-cream.webp" alt={hero.name} width={280} height={889} className="h-auto w-full" />
          </motion.div>

          {INGREDIENTS.map((g) => (
            <motion.span
              key={g.t}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: g.d }}
              className={`card-glass absolute ${g.c} flex items-center gap-2 rounded-full py-2 pr-4 pl-2 text-xs font-semibold shadow-lg sm:text-sm`}
            >
              <span className="grid size-6 place-items-center rounded-full bg-rose text-white">
                <Check className="size-3.5" />
              </span>
              {g.t}
            </motion.span>
          ))}
        </div>

        {/* mətn */}
        <div>
          <SectionHeading eyebrow={k.eyebrow} title={k.title} text={k.text} />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {FEATURES.map(({ Icon, t }, i) => (
              <Reveal key={t} delay={i * 0.08} y={20}>
                <li className="flex h-full items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm font-medium">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose/10 text-rose">
                    <Icon className="size-5" />
                  </span>
                  {t}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold tracking-wider text-rose-deep uppercase">{k.free}</span>
            {k.freeList.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-rose/30 px-3 py-1.5 text-xs font-semibold text-rose-deep">
                <X className="size-3" /> {t}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-5 rounded-[1.75rem] bg-ink p-5 text-ivory sm:p-6">
            <div className="flex-1">
              <p className="eyebrow text-[0.6rem] text-gold-2">{k.size}</p>
              <p className="mt-1 font-display text-2xl">Smoothing Hero Cream</p>
              <Price product={hero} size="md" light className="mt-1" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => cart.add(hero.slug)} className="btn btn-rose h-12">
                {t.common.addToCart}
              </button>
              <Link href={href(`/mehsullar/${hero.slug}/`)} className="btn h-12 border border-white/20 px-4 hover:bg-white/10" aria-label={t.common.more}>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {line.map((p, i) => (
              <Reveal key={p.slug} delay={0.3 + i * 0.08} y={20}>
                <Link href={href(`/mehsullar/${p.slug}/`)} className="group block rounded-2xl bg-white/70 p-3 text-center transition-colors hover:bg-white">
                  <span className="relative mx-auto block h-24 sm:h-28">
                    <Image src={p.image} alt={product(p).name} fill sizes="120px" className="object-contain transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:scale-105" />
                  </span>
                  <span className="mt-2 block text-[0.7rem] font-semibold sm:text-xs">{k.lineNames[i]}</span>
                  <Price product={p} size="sm" className="justify-center" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
