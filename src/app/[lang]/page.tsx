import HomePage, { homeMeta } from "@/components/pages/HomePage";
import type { Lang } from "@/lib/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return homeMeta(lang as Lang);
}

export default function Page() {
  return <HomePage />;
}
