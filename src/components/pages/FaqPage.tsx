import PageHeader from "@/components/ui/PageHeader";
import FaqClient from "@/components/faq/FaqClient";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import { faqFor } from "@/lib/i18n/content";
import type { Lang } from "@/lib/i18n/config";

export const faqMeta = (lang: Lang) => buildMeta(lang, { title: DICTS[lang].faqPage.metaTitle, description: DICTS[lang].faqPage.metaDesc, path: "/faq/" });

export default function FaqPage({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqFor(lang).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHeader crumbs={[{ label: t.nav.faq }]} title={t.faqPage.title} text={t.faqPage.text} />
      <FaqClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
