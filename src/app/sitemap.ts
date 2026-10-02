import type { MetadataRoute } from "next";
import { BRANDS, PRODUCTS } from "@/lib/data";
import { LANGS, localePath } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/mehsullar/",
    "/brendler/",
    "/endirimler/",
    "/faq/",
    "/elaqe/",
    ...BRANDS.map((b) => `/brendler/${b.slug}/`),
    ...PRODUCTS.map((p) => `/mehsullar/${p.slug}/`),
  ];
  return paths.map((p) => ({
    url: SITE.url + p,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : p.split("/").length > 3 ? 0.6 : 0.8,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, SITE.url + localePath(l, p)])) },
  }));
}
