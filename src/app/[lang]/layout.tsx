import "../globals.css";
import RootShell, { rootMetadata, rootViewport } from "@/components/layout/RootShell";
import { isLang, type Lang } from "@/lib/i18n/config";

export const metadata = rootMetadata;
export const viewport = rootViewport;

// Yalnız EN və RU prefiksli səhifələr yaradılır; AZ kök ünvanlardadır.
export const generateStaticParams = () => [{ lang: "en" }, { lang: "ru" }];
export const dynamicParams = false;

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return <RootShell lang={(isLang(lang) ? lang : "az") as Lang}>{children}</RootShell>;
}
