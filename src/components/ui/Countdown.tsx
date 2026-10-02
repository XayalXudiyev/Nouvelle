"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/context";

/** Cari ayın sonuna qədər geri sayım (kampaniya bitmə vaxtı). */
function endOfMonth() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth() + 1, 1, 0, 0, 0).getTime();
}

function Digit({ value, label, light }: { value: number; label: string; light?: boolean }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className={`relative h-14 w-14 overflow-hidden rounded-2xl sm:h-16 sm:w-16 ${light ? "bg-white/10" : "bg-white shadow-sm"}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center font-display text-3xl font-semibold tabular-nums sm:text-4xl"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`mt-1.5 text-[0.6rem] tracking-[0.2em] uppercase ${light ? "text-white/50" : "text-muted"}`}>{label}</span>
    </div>
  );
}

export default function Countdown({ light = false }: { light?: boolean }) {
  const { t } = useLang();
  const c = t.countdown;
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = endOfMonth();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const s = Math.floor((left ?? 0) / 1000);
  const parts = [
    { v: Math.floor(s / 86400), l: c.d },
    { v: Math.floor((s % 86400) / 3600), l: c.h },
    { v: Math.floor((s % 3600) / 60), l: c.m },
    { v: s % 60, l: c.s },
  ];
  return (
    <div className={`flex gap-2 transition-opacity duration-500 sm:gap-3 ${left === null ? "opacity-0" : "opacity-100"}`} aria-label={c.aria}>
      {parts.map((p) => (
        <Digit key={p.l} value={p.v} label={p.l} light={light} />
      ))}
    </div>
  );
}
