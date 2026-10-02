import { finalPrice, type Product } from "@/lib/data";
import { formatPrice, cn } from "@/lib/format";

export default function Price({
  product,
  size = "md",
  className,
  light,
}: {
  product: Pick<Product, "price" | "discount">;
  size?: "sm" | "md" | "lg";
  className?: string;
  light?: boolean;
}) {
  const fp = finalPrice(product);
  const big = { sm: "text-base", md: "text-lg", lg: "text-3xl sm:text-4xl" }[size];
  const small = { sm: "text-xs", md: "text-sm", lg: "text-base sm:text-lg" }[size];
  return (
    <div className={cn("flex items-baseline gap-2 tabular-nums", className)}>
      <span className={cn(big, "font-bold tracking-tight", product.discount ? "text-rose" : light ? "text-ivory" : "text-ink")}>
        {formatPrice(fp)}
      </span>
      {product.discount ? (
        <span className={cn(small, "line-through decoration-1", light ? "text-ivory/50" : "text-muted/80")}>
          {formatPrice(product.price)}
        </span>
      ) : null}
    </div>
  );
}
