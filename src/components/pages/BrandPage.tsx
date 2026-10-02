import { notFound } from "next/navigation";
import BrandHero from "@/components/brand/BrandHero";
import BrandGallery from "@/components/brand/BrandGallery";
import CatalogClient from "@/components/product/CatalogClient";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBrand, type BrandSlug } from "@/lib/data";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import { localizeBrand } from "@/lib/i18n/content";
import type { Lang } from "@/lib/i18n/config";

const range = (pre: string, from: number, to: number, skip: number[] = []) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i)
    .filter((n) => !skip.includes(n))
    .map((n) => `/img/poster/${pre}-${String(n).padStart(2, "0")}.webp`);

export const GALLERIES: Partial<Record<BrandSlug, string[]>> = {
  razorline: range("razor", 2, 21, [19, 20]),
  redone: range("redone", 1, 30),
  nouvelle: [
    "/img/promo/nouvelle-hero.webp",
    "/img/promo/nouvelle-kera-poster.webp",
    "/img/promo/nouvelle-kera-model.webp",
    "/img/promo/nouvelle-kera-repair.webp",
    "/img/promo/nouvelle-kera-texture.webp",
    "/img/promo/kera-cream-card.webp",
    "/img/promo/curl-info.webp",
    "/img/promo/curl-shampoo-card.webp",
    "/img/promo/nouvelle-curl-bestsellers.webp",
    "/img/promo/nouvelle-blonde.webp",
    "/img/promo/nouvelle-blonde-info.webp",
    "/img/promo/nouvelle-color-new.webp",
    "/img/promo/nouvelle-color-tulips.webp",
  ],
  redist: [
    "/img/promo/redist-biotin-routine.webp",
    "/img/promo/redist-biotin-set.webp",
    "/img/promo/redist-expert.webp",
    "/img/promo/redist-silver.webp",
    "/img/promo/redist-garlic.webp",
    "/img/promo/redist-keratin-duo.webp",
    "/img/promo/redist-mask-before-after.webp",
    "/img/promo/redist-hairspray.webp",
    "/img/promo/redist-argan.webp",
    "/img/promo/redist-makeup-fix.webp",
  ],
};

export function brandMeta(lang: Lang, slug: string) {
  const b = getBrand(slug as BrandSlug);
  if (!b) return {};
  const lb = localizeBrand(b, lang);
  return buildMeta(lang, { title: b.name, description: lb.description, path: `/brendler/${slug}/`, image: b.cover });
}

export default function BrandPage({ lang, slug }: { lang: Lang; slug: string }) {
  const raw = getBrand(slug as BrandSlug);
  if (!raw) notFound();
  const t = DICTS[lang];
  const gallery = GALLERIES[raw.slug];
  return (
    <>
      <BrandHero slug={raw.slug} />
      {gallery && <BrandGallery images={gallery} dark={raw.dark} />}
      <section className="pt-20 sm:pt-28">
        <div className="container-x mb-4">
          <SectionHeading eyebrow={t.brands.collection} title={t.brands.products(raw.name)} />
        </div>
        <CatalogClient lockBrand={raw.slug} />
      </section>
    </>
  );
}
