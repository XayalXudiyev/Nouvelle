import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import ProductView from "@/components/product/ProductView";
import Bestsellers from "@/components/home/Bestsellers";
import { finalPrice, getProduct, related } from "@/lib/data";
import { buildMeta } from "@/lib/i18n/meta";
import { DICTS } from "@/lib/i18n/dict";
import { localizeProduct, localizeCategory } from "@/lib/i18n/content";
import { localePath, type Lang } from "@/lib/i18n/config";
import { getCategory, getBrand } from "@/lib/data";
import { SITE } from "@/lib/site";

export function productMeta(lang: Lang, slug: string) {
  const raw = getProduct(slug);
  if (!raw) return {};
  const p = localizeProduct(raw, lang);
  return buildMeta(lang, {
    title: `${p.name}${p.volume ? ` · ${p.volume}` : ""}`,
    description: `${p.short}. ${p.description}`.slice(0, 300),
    path: `/mehsullar/${slug}/`,
    image: p.image,
  });
}

export default function ProductPage({ lang, slug }: { lang: Lang; slug: string }) {
  const raw = getProduct(slug);
  if (!raw) notFound();
  const t = DICTS[lang];
  const p = localizeProduct(raw, lang);
  const cat = localizeCategory(getCategory(p.category)!, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: `${SITE.url}${p.image}`,
    description: p.description,
    sku: p.code ?? p.slug,
    brand: { "@type": "Brand", name: getBrand(p.brand)?.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "AZN",
      price: finalPrice(p),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}${localePath(lang, `/mehsullar/${p.slug}/`)}`,
    },
  };

  return (
    <>
      <PageHeader crumbs={[{ href: "/mehsullar/", label: t.nav.products }, { href: `/mehsullar/?kateqoriya=${cat.slug}`, label: cat.name }, { label: p.name }]} />
      <div className="container-x pb-10">
        <ProductView product={raw} />
      </div>
      <Bestsellers products={related(raw)} eyebrow={t.product.relatedEyebrow} title={t.product.related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
