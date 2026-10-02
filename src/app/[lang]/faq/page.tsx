import FaqPage, { faqMeta } from "@/components/pages/FaqPage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  return faqMeta(lang as Lang);
}

export default async function Page({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  return <FaqPage lang={lang as Lang} />;
}
