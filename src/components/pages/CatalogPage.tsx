import PageHeader from "@/components/ui/PageHeader";
import CatalogClient from "@/components/product/CatalogClient";
import { SKU_COUNT } from "@/lib/data";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/config";

export const catalogMeta = (lang: Lang) =>
  buildMeta(lang, { title: DICTS[lang].catalog.metaTitle, description: DICTS[lang].catalog.metaDesc, path: "/mehsullar/" });

export default function CatalogPage({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  return (
    <>
      <PageHeader crumbs={[{ label: t.nav.products }]} title={t.catalog.title} text={t.catalog.text(Math.floor(SKU_COUNT / 10) * 10)} />
      <CatalogClient />
    </>
  );
}
