"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { productsByBrand } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BrandList() {
  const [active, setActive] = useState<number | null>(null);
  const { t, href, brands } = useLang();
  const BRANDS = brands();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <section className="container-x py-20 sm:py-28">
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
        <SectionHeading eyebrow={t.brandList.eyebrow} title={t.brandList.title} />
        <p className="max-w-md text-muted lg:justify-self-end">{t.brandList.text}</p>
      </div>

      <div
        className="relative"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setActive(null)}
      >
        <ul className="border-t border-line">
          {BRANDS.map((b, i) => (
            <li key={b.slug} onPointerEnter={() => setActive(i)} className="border-b border-line">
              <Link href={href(`/brendler/${b.slug}/`)} className="group relative flex items-center gap-4 overflow-hidden py-6 sm:gap-8 sm:py-8">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                  style={{ background: b.color }}
                />
                <span className="relative w-8 font-display text-lg text-muted transition-colors duration-500 group-hover:text-white/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative flex-1 font-display text-[2.6rem] leading-none font-medium tracking-tight transition-all duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-white sm:text-7xl lg:text-8xl">
                  {b.name}
                </span>
                <span className="relative hidden text-right text-sm text-muted transition-colors duration-500 group-hover:text-white/80 md:block">
                  {b.origin}
                  <br />
                  <span className="text-xs">{t.common.productsCount(productsByBrand(b.slug).length)}</span>
                </span>
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="size-5" />
                </span>
                {/* mobil üçün kiçik şəkil */}
                <span className="relative size-14 shrink-0 overflow-hidden rounded-xl md:hidden">
                  <Image src={b.cover} alt="" fill sizes="56px" className="object-cover" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* kursoru izləyən şəkil (masaüstü) */}
        <motion.div style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block">
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative -mt-[150px] -ml-[110px] h-[300px] w-[220px] overflow-hidden rounded-3xl shadow-2xl"
                style={{ background: BRANDS[active].color }}
              >
                <Image src={BRANDS[active].cover} alt="" fill sizes="220px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
