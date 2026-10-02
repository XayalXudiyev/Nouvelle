import CatalogPage, { catalogMeta } from "@/components/pages/CatalogPage";

export const metadata = catalogMeta("az");

export default function Page() {
  return <CatalogPage lang="az" />;
}
