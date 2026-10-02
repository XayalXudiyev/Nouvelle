"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Səhifə kilidi (modal/menyu açıq olanda) */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Telefonda native scroll həm daha axıcıdır, həm də hər kadr işləyən rAF dövrəsi olmur
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    // giriş ekranı açıq olanda scroll gözləyir (Loader.tsx)
    if (document.documentElement.classList.contains("is-loading")) {
      lenis.stop();
      window.addEventListener("nv:loaded", () => lenis?.start(), { once: true });
    }
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
