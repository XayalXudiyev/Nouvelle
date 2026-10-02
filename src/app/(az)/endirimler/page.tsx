import DealsPage, { dealsMeta } from "@/components/pages/DealsPage";

export const metadata = dealsMeta("az");

export default function Page() {
  return <DealsPage lang="az" />;
}
