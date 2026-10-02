"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProductCarousel from "@/components/product/ProductCarousel";
import { useLang } from "@/lib/i18n/context";
import type { Product } from "@/lib/data";

export default function Bestsellers({ products, eyebrow, title }: { products: Product[]; eyebrow?: string; title?: string }) {
  const { t } = useLang();
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow ?? t.bestsellers.eyebrow} title={title ?? t.bestsellers.title} className="mb-12" />
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
