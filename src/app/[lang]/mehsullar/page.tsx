import CatalogPage, { catalogMeta } from "@/components/pages/CatalogPage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/mehsullar">) {
  const { lang } = await params;
  return catalogMeta(lang as Lang);
}

export default async function Page({ params }: PageProps<"/[lang]/mehsullar">) {
  const { lang } = await params;
  return <CatalogPage lang={lang as Lang} />;
}
