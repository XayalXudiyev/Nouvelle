import "../globals.css";
import RootShell, { rootMetadata, rootViewport } from "@/components/layout/RootShell";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function AzLayout({ children }: LayoutProps<"/">) {
  return <RootShell lang="az">{children}</RootShell>;
}
