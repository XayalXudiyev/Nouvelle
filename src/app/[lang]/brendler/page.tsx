import BrandsPage, { brandsMeta } from "@/components/pages/BrandsPage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/brendler">) {
  const { lang } = await params;
  return brandsMeta(lang as Lang);
}

export default async function Page({ params }: PageProps<"/[lang]/brendler">) {
  const { lang } = await params;
  return <BrandsPage lang={lang as Lang} />;
}
