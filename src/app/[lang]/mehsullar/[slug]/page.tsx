import ProductPage, { productMeta } from "@/components/pages/ProductPage";
import { PRODUCTS } from "@/lib/data";
import type { Lang } from "@/lib/i18n/config";

export const generateStaticParams = () => PRODUCTS.map((x) => ({ slug: x.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/mehsullar/[slug]">) {
  const { lang, slug } = await params;
  return productMeta(lang as Lang, slug);
}

export default async function Page({ params }: PageProps<"/[lang]/mehsullar/[slug]">) {
  const { lang, slug } = await params;
  return <ProductPage lang={lang as Lang} slug={slug} />;
}
