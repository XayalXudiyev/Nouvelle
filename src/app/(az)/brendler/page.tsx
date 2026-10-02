import BrandsPage, { brandsMeta } from "@/components/pages/BrandsPage";

export const metadata = brandsMeta("az");

export default function Page() {
  return <BrandsPage lang="az" />;
}
