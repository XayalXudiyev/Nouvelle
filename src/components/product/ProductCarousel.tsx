"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Mousewheel, A11y } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import { useLang } from "@/lib/i18n/context";

export default function ProductCarousel({ products, light = false }: { products: Product[]; light?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { t } = useLang();
  return (
    <div className="relative">
      <Swiper
        modules={[FreeMode, Navigation, Mousewheel, A11y]}
        freeMode={{ enabled: true, momentumRatio: 0.6, sticky: false }}
        mousewheel={{ forceToAxis: true }}
        grabCursor
        slidesPerView={1.6}
        spaceBetween={14}
        navigation={{ prevEl: `.prev-${id}`, nextEl: `.next-${id}` }}
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3.2, spaceBetween: 20 },
          1100: { slidesPerView: 4.2, spaceBetween: 24 },
          1400: { slidesPerView: 4.6, spaceBetween: 28 },
        }}
        className="!overflow-visible"
      >
        {products.map((p) => (
          <SwiperSlide key={p.slug} className="!h-auto">
            <ProductCard product={p} className="h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8 flex justify-end gap-2">
        {[
          { cls: `prev-${id}`, Icon: ArrowLeft, label: t.common.prev },
          { cls: `next-${id}`, Icon: ArrowRight, label: t.common.next },
        ].map(({ cls, Icon, label }) => (
          <button
            key={cls}
            className={`${cls} grid size-12 place-items-center rounded-full border transition-all duration-300 disabled:opacity-30 [&.swiper-button-disabled]:opacity-30 ${
              light ? "border-white/25 text-ivory hover:bg-ivory hover:text-ink" : "border-ink/15 hover:bg-ink hover:text-ivory"
            }`}
            aria-label={label}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
