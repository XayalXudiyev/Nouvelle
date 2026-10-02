import ContactPage, { contactMeta } from "@/components/pages/ContactPage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/elaqe">) {
  const { lang } = await params;
  return contactMeta(lang as Lang);
}

export default async function Page({ params }: PageProps<"/[lang]/elaqe">) {
  const { lang } = await params;
  return <ContactPage lang={lang as Lang} />;
}
