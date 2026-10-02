"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Keyboard, A11y } from "swiper/modules";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/context";
import { lockScroll } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/format";

export default function BrandGallery({ images, dark }: { images: string[]; dark?: boolean }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, images.length]);

  return (
    <section className={cn("overflow-hidden py-20 sm:py-28", dark ? "bg-ink-2 text-ivory" : "bg-cream")}>
      <div className="container-x mb-12">
        <SectionHeading eyebrow={t.brands.gallery} title={t.brands.galleryTitle} light={dark} />
      </div>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Keyboard, A11y]}
        effect="coverflow"
        centeredSlides
        loop
        grabCursor
        slidesPerView="auto"
        speed={900}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        coverflowEffect={{ rotate: 22, stretch: 0, depth: 220, modifier: 1, slideShadows: false, scale: 0.88 }}
        className="!overflow-visible !py-4"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src} className="!w-[68vw] sm:!w-[340px]">
            <button onClick={() => setOpen(i)} className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.5)]" aria-label={`${t.brands.gallery} ${i + 1}`}>
              <Image src={src} alt="" fill sizes="340px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white/85 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/90 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={open}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[82vh] w-[min(92vw,calc(82vh*0.72))]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={images[open]} alt="" fill sizes="90vw" className="rounded-2xl object-contain" />
              </motion.div>
            </AnimatePresence>
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white" aria-label={t.common.close}>
              <X className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open - 1 + images.length) % images.length);
              }}
              className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white sm:left-6"
              aria-label={t.common.prev}
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open + 1) % images.length);
              }}
              className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white sm:right-6"
              aria-label={t.common.next}
            >
              <ArrowRight className="size-5" />
            </button>
            <p className="absolute bottom-5 font-display text-lg text-white/70 tabular-nums">
              {open + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
