"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { productsByBrand } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";

export default function BrandGrid() {
  const { t, href, brands } = useLang();
  return (
    <section className="container-x pb-24">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {brands().map((b, i) => (
          <motion.div
            key={b.slug}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={i % 3 === 1 ? "lg:translate-y-16" : ""}
          >
            <Link href={href(`/brendler/${b.slug}/`)} className="group relative block aspect-[3/4] overflow-hidden rounded-[2rem]" style={{ background: b.color }}>
              <Image src={b.cover} alt={b.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1.5 text-[0.65rem] font-semibold tracking-widest text-white uppercase backdrop-blur">
                {b.origin}
              </span>
              <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-rose group-hover:text-white">
                <ArrowUpRight className="size-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <span className="block text-xs text-white/60">{t.common.productsCount(productsByBrand(b.slug).length)}</span>
                <span className="mt-1 block font-display text-5xl leading-none font-medium sm:text-6xl">{b.name}</span>
                <span className="mt-1 block font-display text-lg text-white/70 italic">{b.tagline}</span>
                <span className="mt-3 line-clamp-3 block max-h-0 text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-24 group-hover:opacity-100">
                  {b.description}
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
