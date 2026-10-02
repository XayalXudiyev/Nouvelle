import BrandPage, { brandMeta } from "@/components/pages/BrandPage";
import { BRANDS } from "@/lib/data";

export const generateStaticParams = () => BRANDS.map((x) => ({ slug: x.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/brendler/[slug]">) {
  const { slug } = await params;
  return brandMeta("az", slug);
}

export default async function Page({ params }: PageProps<"/brendler/[slug]">) {
  const { slug } = await params;
  return <BrandPage lang="az" slug={slug} />;
}
