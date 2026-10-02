import ProductPage, { productMeta } from "@/components/pages/ProductPage";
import { PRODUCTS } from "@/lib/data";

export const generateStaticParams = () => PRODUCTS.map((x) => ({ slug: x.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/mehsullar/[slug]">) {
  const { slug } = await params;
  return productMeta("az", slug);
}

export default async function Page({ params }: PageProps<"/mehsullar/[slug]">) {
  const { slug } = await params;
  return <ProductPage lang="az" slug={slug} />;
}
