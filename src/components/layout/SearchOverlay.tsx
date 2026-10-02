"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, getBrand } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";
import Price from "@/components/ui/Price";
import { lockScroll } from "./SmoothScroll";

const norm = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g");

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, href, product } = useLang();
  const SUGGEST = t.search.suggestions;
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    lockScroll(open);
    if (open) setTimeout(() => input.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  const terms = norm(dq.trim()).split(/\s+/).filter(Boolean);
  const results = terms.length
    ? PRODUCTS.map(product).filter((p) => {
        const hay = norm(
          [p.name, p.short, getBrand(p.brand)?.name, p.code, p.category, ...(p.variants?.map((v) => `${v.label} ${v.code ?? ""}`) ?? [])].join(" "),
        );
        return terms.every((w) => hay.includes(w) || (["qayci", "ножницы", "scissors"].includes(w) && p.brand === "razorline"));
      }).slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={t.common.search}>
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-[28px] bg-ivory shadow-2xl sm:mt-20"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 shrink-0 text-rose" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.search.placeholder}
                className="h-16 w-full bg-transparent text-base outline-none placeholder:text-muted/70 sm:text-lg"
                aria-label={t.common.search}
              />
              <button onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full bg-cream" aria-label={t.common.close}>
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-3" data-lenis-prevent>
              {!terms.length && (
                <div className="p-3">
                  <p className="eyebrow mb-3 text-muted">{t.search.popular}</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGEST.map((s) => (
                      <button key={s} onClick={() => setQ(s)} className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-ivory">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {terms.length > 0 && results.length === 0 && <p className="p-6 text-center text-muted">{t.search.none(q)}</p>}
              <ul>
                {results.map((p, i) => (
                  <motion.li key={p.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link href={href(`/mehsullar/${p.slug}/`)} onClick={onClose} className="group flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-white">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl" style={{ background: p.tint }}>
                        <Image src={p.image} alt="" fill sizes="64px" className={p.cover ? "object-cover" : "object-contain p-1.5"} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.65rem] tracking-widest text-muted uppercase">{getBrand(p.brand)?.name}</span>
                        <span className="block truncate font-semibold">{p.name}</span>
                        <Price product={p} size="sm" />
                      </span>
                      <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rose" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              {terms.length > 0 && (
                <Link href={href("/mehsullar/")} onClick={onClose} className="mt-2 block rounded-2xl bg-cream p-4 text-center text-sm font-semibold transition-colors hover:bg-sand">
                  {t.search.all}
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
