"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, ArrowUpRight } from "lucide-react";
import { type Product } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";
import { cart } from "@/lib/cart";
import { cn } from "@/lib/format";
import Price from "@/components/ui/Price";

export default function ProductCard({ product: raw, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const router = useRouter();
  const { t, href: lh, product: loc, brand: getB } = useLang();
  const product = loc(raw);
  const brand = getB(product.brand);
  const href = lh(`/mehsullar/${product.slug}/`);
  const hasVariants = !!product.variants?.length;
  const swatches = product.variants?.filter((v) => v.swatch) ?? [];
  const badges = product.badges?.filter((b) => b !== "nagd") ?? [];
  const photo = !!product.photo;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] transition-[border-radius] duration-700 ease-out-expo group-hover:rounded-[2.4rem]"
        style={{ background: product.tint }}
      >
        <Link href={href} className="absolute inset-0" aria-label={product.name}>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1/4 left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full opacity-70 blur-2xl transition-transform duration-1000 ease-out-expo group-hover:scale-110"
            style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.85), transparent)" }}
          />
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "transition-transform duration-[1.2s] ease-out-expo",
              product.cover && "object-cover group-hover:scale-[1.07]",
              photo && "object-cover mix-blend-multiply group-hover:scale-[1.06] group-hover:-rotate-2",
              !product.cover &&
                !photo &&
                "object-contain p-[14%] drop-shadow-[0_24px_24px_rgba(40,20,25,0.22)] group-hover:-rotate-3 group-hover:scale-[1.08]",
            )}
          />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount ? (
            <span className="rounded-full bg-rose px-2.5 py-1 text-[0.7rem] font-bold text-white shadow-lg shadow-rose/30">
              −{product.discount}%
            </span>
          ) : null}
          {badges.map((b) => (
            <span key={b} className="rounded-full bg-white/85 px-2.5 py-1 text-[0.62rem] font-semibold tracking-wide text-ink uppercase backdrop-blur">
              {t.badge[b]}
            </span>
          ))}
        </div>

        <span className="pointer-events-none absolute top-3 right-3 hidden size-9 translate-y-1 place-items-center rounded-full bg-white/80 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:grid">
          <ArrowUpRight className="size-4" />
        </span>

        <button
          type="button"
          onClick={() => (hasVariants ? router.push(href) : cart.add(product.slug))}
          className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-ink text-ivory shadow-xl transition-all duration-500 ease-out-expo hover:scale-110 hover:bg-rose sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
          aria-label={`${product.name} — ${hasVariants ? t.common.chooseVariant : t.common.addAria}`}
        >
          <Plus className="size-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="eyebrow text-[0.6rem] text-muted">
          {brand?.name}
          {product.volume ? ` · ${product.volume}` : ""}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[0.92rem] leading-snug font-semibold text-ink sm:text-base">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <Price product={product} size="sm" />
          {swatches.length > 0 && (
            <div className="flex shrink-0 items-center -space-x-1.5" aria-label={`${swatches.length} variant`}>
              {swatches.slice(0, 4).map((v) => (
                <span key={v.id} className="size-4 rounded-full border-2 border-ivory" style={{ background: v.swatch }} />
              ))}
              {swatches.length > 4 && <span className="pl-2.5 text-[0.65rem] font-semibold text-muted">+{swatches.length - 4}</span>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
