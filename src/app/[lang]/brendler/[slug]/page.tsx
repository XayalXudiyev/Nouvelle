import BrandPage, { brandMeta } from "@/components/pages/BrandPage";
import { BRANDS } from "@/lib/data";
import type { Lang } from "@/lib/i18n/config";

export const generateStaticParams = () => BRANDS.map((x) => ({ slug: x.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/brendler/[slug]">) {
  const { lang, slug } = await params;
  return brandMeta(lang as Lang, slug);
}

export default async function Page({ params }: PageProps<"/[lang]/brendler/[slug]">) {
  const { lang, slug } = await params;
  return <BrandPage lang={lang as Lang} slug={slug} />;
}
