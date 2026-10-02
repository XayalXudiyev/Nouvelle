"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/context";
import { SITE } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/Icons";

const COLS = [
  ["/img/poster/razor-02.webp", "/img/poster/redone-02.webp", "/img/promo/nouvelle-kera-model.webp", "/img/poster/razor-13.webp", "/img/poster/redone-18.webp"],
  ["/img/promo/nouvelle-hero.webp", "/img/poster/redone-21.webp", "/img/poster/razor-08.webp", "/img/promo/redist-hairspray.webp", "/img/poster/redone-10.webp"],
  ["/img/poster/redone-19.webp", "/img/poster/razor-18.webp", "/img/promo/nouvelle-color-tulips.webp", "/img/poster/redone-13.webp", "/img/poster/razor-04.webp"],
  ["/img/poster/redone-26.webp", "/img/promo/redist-silver.webp", "/img/poster/razor-12.webp", "/img/poster/redone-29.webp", "/img/promo/nouvelle-blonde-stone.webp"],
];

export default function Lookbook() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-ivory sm:py-28">
      <div className="container-x relative z-10 mb-12 text-center">
        <SectionHeading align="center" light eyebrow={t.lookbook.eyebrow} title={t.lookbook.title} text={t.lookbook.text} />
      </div>
      <div className="relative h-[620px] sm:h-[760px]">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-4 sm:px-4 lg:grid-cols-4">
          {COLS.map((col, ci) => (
            <div key={ci} className={`relative overflow-hidden ${ci === 2 ? "hidden sm:block" : ""} ${ci === 3 ? "hidden lg:block" : ""}`}>
              <div
                className="flex flex-col gap-3 sm:gap-4"
                style={{ animation: `lookbook ${38 + ci * 6}s linear infinite`, animationDirection: ci % 2 ? "reverse" : "normal" }}
              >
                {[...col, ...col].map((src, i) => (
                  <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl" aria-hidden={i >= col.length}>
                    <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="relative z-10 mt-10 flex justify-center">
        <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn btn-light">
          <InstagramIcon className="size-5" /> {t.common.followInstagram} · {SITE.instagramHandle}
        </a>
      </div>
    </section>
  );
}
