import type { Metadata } from "next";
import { SITE } from "../site";
import { LANGS, OG_LOCALE, localePath, type Lang } from "./config";
import { DICTS } from "./dict";

/** Hər səhifə üçün dilə uyğun metadata + hreflang alternativləri */
export function buildMeta(lang: Lang, opts: { title?: string; description?: string; path: string; image?: string }): Metadata {
  const d = DICTS[lang];
  const description = opts.description ?? d.meta.description;
  const title = opts.title;
  return {
    title: title ?? { absolute: `${SITE.name} — ${d.meta.tagline}` },
    description,
    alternates: {
      canonical: localePath(lang, opts.path),
      languages: Object.fromEntries([...LANGS.map((l) => [l, localePath(l, opts.path)]), ["x-default", opts.path]]),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: SITE.name,
      title: title ? `${title} · ${SITE.name}` : `${SITE.name} — ${d.meta.tagline}`,
      description,
      url: localePath(lang, opts.path),
      images: [{ url: opts.image ?? "/img/promo/nouvelle-hero.webp" }],
    },
  };
}
