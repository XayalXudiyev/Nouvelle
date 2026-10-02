import PageHeader from "@/components/ui/PageHeader";
import BrandGrid from "@/components/brand/BrandGrid";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/config";

export const brandsMeta = (lang: Lang) => buildMeta(lang, { title: DICTS[lang].brands.metaTitle, description: DICTS[lang].brands.metaDesc, path: "/brendler/" });

export default function BrandsPage({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  return (
    <>
      <PageHeader crumbs={[{ label: t.nav.brands }]} title={t.brands.title} text={t.brands.text} />
      <BrandGrid />
    </>
  );
}
