import PageHeader from "@/components/ui/PageHeader";
import ContactClient from "@/components/contact/ContactClient";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/config";

export const contactMeta = (lang: Lang) => buildMeta(lang, { title: DICTS[lang].contactPage.metaTitle, description: DICTS[lang].contactPage.metaDesc, path: "/elaqe/" });

export default function ContactPage({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  return (
    <>
      <PageHeader crumbs={[{ label: t.nav.contact }]} title={t.contactPage.title} text={t.contactPage.text} />
      <ContactClient />
    </>
  );
}
