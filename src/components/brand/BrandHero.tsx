"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { productsByBrand, type BrandSlug } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/format";

// Brend hero-sunda üzən məhsul kəsimləri
const FLOATERS: Partial<Record<BrandSlug, string[]>> = {
  nouvelle: ["/img/hq/kera-cream.webp", "/img/hq/curl-spray.webp", "/img/hq/kera-mask.webp"],
  redone: ["/img/hq/wax-red.webp", "/img/hq/spider-blue.webp", "/img/hq/wax-violetta.webp"],
  razorline: ["/img/hq/cck006.webp", "/img/hq/ak139.webp", "/img/hq/cak021te.webp"],
};

export default function BrandHero({ slug }: { slug: BrandSlug }) {
  const { t, href, brand } = useLang();
  const b = brand(slug);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const dark = !!b.dark;
  const floaters = FLOATERS[slug] ?? [];
  const count = productsByBrand(slug).length;

  return (
    <section ref={ref} className={cn("relative overflow-hidden", dark ? "bg-ink text-ivory" : "text-ink")} style={dark ? undefined : { background: `${b.color}22` }}>
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[40rem] rounded-full blur-[140px]" style={{ background: `${b.color}55` }} />
      <div className="container-x relative grid min-h-[78svh] items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <nav aria-label="Breadcrumb" className={cn("mb-8 flex items-center gap-1.5 text-xs", dark ? "text-white/50" : "text-muted")}>
            <Link href={href("/")}>{t.nav.home}</Link>
            <ChevronRight className="size-3" />
            <Link href={href("/brendler/")}>{t.nav.brands}</Link>
            <ChevronRight className="size-3" />
            <span className={dark ? "text-white" : "text-ink"}>{b.name}</span>
          </nav>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4" style={{ color: dark ? "#d9bd8c" : b.color }}>
            {b.origin} · {t.common.productsCount(count)}
          </motion.p>
          <h1 className="overflow-hidden font-display text-[4.5rem] leading-[0.85] font-semibold tracking-tighter sm:text-[8rem] lg:text-[9.5rem]">
            <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
              {b.name}
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={cn("mt-3 font-display text-2xl italic", dark ? "text-white/60" : "text-muted")}>
            {b.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={cn("mt-6 max-w-lg text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted")}
          >
            {b.description}
          </motion.p>
          <motion.a
            href="#kataloq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className={cn("btn mt-8", dark ? "btn-light" : "btn-primary")}
          >
            {t.brands.view} <ArrowDown className="size-4" />
          </motion.a>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
          <motion.div style={{ y }} className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-2xl">
            <motion.div initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
              <Image src={b.cover} alt={b.name} fill priority sizes="460px" className="object-cover" />
            </motion.div>
          </motion.div>
          {floaters.map((src, i) => (
            <motion.div
              key={src}
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.6, rotate: i % 2 ? 15 : -15 }}
              animate={{ opacity: 1, scale: 1, rotate: i % 2 ? 8 : -8 }}
              transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 120, damping: 14 }}
              className={cn(
                "absolute drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]",
                i === 0 && "-bottom-8 -left-6 w-[38%] sm:-left-14",
                i === 1 && "top-[10%] -right-6 w-[30%] sm:-right-12",
                i === 2 && "right-[6%] -bottom-10 w-[30%]",
              )}
            >
              <Image src={src} alt="" width={400} height={500} className="h-auto w-full animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: `${i * 1.2}s` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
