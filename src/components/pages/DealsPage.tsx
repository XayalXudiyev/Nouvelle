import PageHeader from "@/components/ui/PageHeader";
import DealsClient from "@/components/deals/DealsClient";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/config";

export const dealsMeta = (lang: Lang) => buildMeta(lang, { title: DICTS[lang].dealsPage.metaTitle, description: DICTS[lang].dealsPage.metaDesc, path: "/endirimler/" });

export default function DealsPage({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  return (
    <>
      <PageHeader crumbs={[{ label: t.nav.deals }]} title={t.dealsPage.title} text={t.dealsPage.text} />
      <DealsClient />
    </>
  );
}
