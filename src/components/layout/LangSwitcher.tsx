"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { LANGS, LANG_LABEL, LANG_NAME, localePath, stripLocale, type Lang } from "@/lib/i18n/config";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/format";

/** Eyni səhifənin digər dildəki ünvanı */
export function useSwitchHref() {
  const pathname = usePathname();
  return (l: Lang) => {
    const qs = typeof window !== "undefined" ? window.location.search : "";
    return localePath(l, stripLocale(pathname)) + qs;
  };
}

export function LangInline({ className }: { className?: string }) {
  const { lang } = useLang();
  const to = useSwitchHref();
  return (
    <div className={cn("flex gap-1 rounded-full bg-white/10 p-1", className)}>
      {LANGS.map((l) => (
        <a key={l} href={to(l)} hrefLang={l} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", l === lang ? "bg-ivory text-ink" : "text-white/70 hover:text-white")}>
          {LANG_LABEL[l]}
        </a>
      ))}
    </div>
  );
}

export default function LangSwitcher() {
  const { lang, t } = useLang();
  const to = useSwitchHref();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors hover:bg-white/70"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.lang}
      >
        <Globe className="size-4" />
        {LANG_LABEL[lang]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-44 origin-top-right overflow-hidden rounded-2xl bg-ivory p-1.5 shadow-2xl ring-1 ring-line"
            role="listbox"
          >
            {LANGS.map((l) => (
              <li key={l}>
                <a
                  href={to(l)}
                  hrefLang={l}
                  role="option"
                  aria-selected={l === lang}
                  className={cn("flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white", l === lang && "font-semibold")}
                >
                  <span>
                    <span className="mr-2 text-xs text-muted">{LANG_LABEL[l]}</span>
                    {LANG_NAME[l]}
                  </span>
                  {l === lang && <Check className="size-4 text-rose" />}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
