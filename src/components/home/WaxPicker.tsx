"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { getProduct } from "@/lib/data";
import { cart } from "@/lib/cart";
import Price from "@/components/ui/Price";
import { Sparkle } from "@/components/ui/Icons";
import { useLang } from "@/lib/i18n/context";

const WAXES = [
  { slug: "redone-wax-red", label: "Red", color: "#d3161f", bg: "#f8dcdc" },
  { slug: "redone-wax-blue", label: "Blue", color: "#1d3fbf", bg: "#dfe5fa" },
  { slug: "redone-wax-violetta", label: "Violetta", color: "#5b2bb5", bg: "#e8e0f8" },
  { slug: "redone-wax-cobra", label: "Cobra", color: "#a3121c", bg: "#f6d9d9" },
  { slug: "redone-wax-orange", label: "Orange", color: "#f26a1b", bg: "#fde5d4" },
  { slug: "redone-wax-olive", label: "Olive", color: "#1f6b3a", bg: "#dcefe2" },
  { slug: "redone-wax-green", label: "Green Matte", color: "#2f8a3c", bg: "#e2f1dc" },
  { slug: "redone-wax-quiksilver", label: "Quiksilver", color: "#3d3f44", bg: "#e6e6e8" },
  { slug: "redone-wax-argan", label: "Argan Matte", color: "#a0622f", bg: "#f5e6d8" },
  { slug: "redone-wax-keratin", label: "Keratin Matte", color: "#b9ad84", bg: "#f3efe1" },
  { slug: "redone-wax-fiber", label: "Creative Fiber", color: "#22b3a6", bg: "#d8f3f0" },
].map((w) => ({ ...w, product: getProduct(w.slug)! }));

export default function WaxPicker() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const w = WAXES[i];
  const { t, href, product } = useLang();
  const p = product(w.product);
  const x = t.wax;

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setI((v) => (v + 1) % WAXES.length), 3200);
    return () => clearInterval(t);
  }, [auto, inView]);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
  };

  return (
    <motion.section
      ref={ref}
      animate={{ backgroundColor: w.bg }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={x.colors}
    >
      {/* nəhəng ad */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={w.label}
            initial={{ y: "40%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-40%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-display text-[26vw] leading-none font-semibold tracking-tighter whitespace-nowrap lg:text-[17vw]"
            style={{ color: `${w.color}1a` }}
          >
            {w.label}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-4 inline-flex items-center gap-3" style={{ color: w.color }}>
            <span className="h-px w-8 bg-current" /> {x.eyebrow}
          </p>
          <h2 className="font-display text-5xl leading-[0.92] font-medium tracking-tight sm:text-6xl">
            {x.title1}
            <br />
            <em style={{ color: w.color }} className="transition-colors duration-700">
              {x.title2}
            </em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            {x.text}
          </p>
        </div>

        <div className="relative order-1 mx-auto aspect-square w-full max-w-[460px] lg:order-2">
          <motion.div
            className="absolute inset-[8%] rounded-full"
            animate={{ backgroundColor: w.color }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: 0.16 }}
          />
          <motion.div className="absolute inset-[18%] rounded-full border-2 border-dashed" animate={{ borderColor: w.color, rotate: i * 32 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ opacity: 0.35 }} />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, scale: 0.6, rotate: -25, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 25, y: -40 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="absolute inset-[10%]"
            >
              <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 80vw, 420px" className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)]" />
            </motion.div>
          </AnimatePresence>
          <Sparkle className="absolute top-[6%] right-[10%] size-8 animate-pulse" style={{ color: w.color }} />
        </div>

        <div className="order-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.45 }}>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">{x.code} {p.code} · {p.volume}</p>
              <h3 className="mt-1 font-display text-3xl leading-tight font-semibold sm:text-4xl">{p.name.replace("RedOne ", "")}</h3>
              <p className="mt-1 text-sm text-muted">{p.short}</p>
              <Price product={p} size="lg" className="mt-4" />
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex gap-2">
            <button onClick={() => cart.add(p.slug)} className="btn h-12 text-white transition-colors" style={{ background: w.color }}>
              <ShoppingBag className="size-4" /> {t.common.addToCart}
            </button>
            <Link href={href(`/mehsullar/${p.slug}/`)} className="btn btn-ghost h-12 px-4" aria-label={t.common.more}>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5" role="radiogroup" aria-label={x.colors}>
            {WAXES.map((wx, n) => (
              <button
                key={wx.slug}
                role="radio"
                aria-checked={n === i}
                aria-label={wx.label}
                title={wx.label}
                onClick={() => pick(n)}
                className="relative grid size-9 place-items-center rounded-full transition-transform duration-300 hover:scale-110"
              >
                {n === i && <motion.span layoutId="wax-ring" className="absolute -inset-1 rounded-full border-2" style={{ borderColor: wx.color }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="size-7 rounded-full shadow-inner ring-1 ring-black/10" style={{ background: wx.color }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
