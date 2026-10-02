import DealsPage, { dealsMeta } from "@/components/pages/DealsPage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/endirimler">) {
  const { lang } = await params;
  return dealsMeta(lang as Lang);
}

export default async function Page({ params }: PageProps<"/[lang]/endirimler">) {
  const { lang } = await params;
  return <DealsPage lang={lang as Lang} />;
}
