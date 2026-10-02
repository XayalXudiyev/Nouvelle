"use client";

import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { Suspense, useCallback, useEffect, useState, useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { BRANDS, CATEGORIES, PRODUCTS, finalPrice, getBrand, type BrandSlug, type CategorySlug } from "@/lib/data";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/format";
import ProductCard from "./ProductCard";

type Sort = "pop" | "asc" | "desc" | "disc";
const SORTS: Sort[] = ["pop", "disc", "asc", "desc"];

const norm = (s: string) =>
  s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

/** URL parametrlərini (?kateqoriya=...) filtr vəziyyətinə ötürür. Server render-ə təsir etmir. */
function ParamsSync({ apply }: { apply: (sp: URLSearchParams) => void }) {
  const sp = useSearchParams();
  useEffect(() => apply(new URLSearchParams(sp.toString())), [sp, apply]);
  return null;
}

export default function CatalogClient({ lockBrand }: { lockBrand?: BrandSlug }) {
  const { t, product, categories, brands: locBrands } = useLang();
  const tc = t.catalog;
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [brand, setBrand] = useState<BrandSlug | "all">(lockBrand ?? "all");
  const [onlySale, setOnlySale] = useState(false);
  const [sort, setSort] = useState<Sort>("pop");
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);

  // URL-dən filtrlər (?kateqoriya=...&brend=...&endirim=1)
  const apply = useCallback(
    (sp: URLSearchParams) => {
      const c = sp.get("kateqoriya");
      const b = sp.get("brend");
      setCat(c && CATEGORIES.some((x) => x.slug === c) ? (c as CategorySlug) : "all");
      if (!lockBrand) setBrand(b && BRANDS.some((x) => x.slug === b) ? (b as BrandSlug) : "all");
      setOnlySale(sp.get("endirim") === "1");
    },
    [lockBrand],
  );

  useEffect(() => {
    if (lockBrand) return;
    const sp = new URLSearchParams();
    if (cat !== "all") sp.set("kateqoriya", cat);
    if (brand !== "all") sp.set("brend", brand);
    if (onlySale) sp.set("endirim", "1");
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [cat, brand, onlySale, lockBrand]);

  const base = PRODUCTS.filter((p) => (lockBrand ? p.brand === lockBrand : true)).map(product);
  const terms = norm(dq.trim()).split(/\s+/).filter(Boolean);
  let list = base.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (brand === "all" || p.brand === brand) &&
      (!onlySale || p.discount) &&
      terms.every((t) => norm(`${p.name} ${p.short} ${p.code ?? ""} ${getBrand(p.brand)?.name} ${p.variants?.map((v) => v.label + " " + (v.code ?? "")).join(" ") ?? ""}`).includes(t)),
  );
  if (sort === "asc") list = [...list].sort((a, b) => finalPrice(a) - finalPrice(b));
  if (sort === "desc") list = [...list].sort((a, b) => finalPrice(b) - finalPrice(a));
  if (sort === "disc") list = [...list].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  if (sort === "pop") list = [...list].sort((a, b) => Number(!!b.badges?.includes("hit")) - Number(!!a.badges?.includes("hit")));

  const cats = categories().filter((c) => base.some((p) => p.category === c.slug));
  const brands = locBrands().filter((b) => base.some((p) => p.brand === b.slug));
  const active = (cat !== "all" ? 1 : 0) + (!lockBrand && brand !== "all" ? 1 : 0) + (onlySale ? 1 : 0) + (q ? 1 : 0);

  const reset = () => {
    setCat("all");
    if (!lockBrand) setBrand("all");
    setOnlySale(false);
    setQ("");
  };

  return (
    <section className="container-x pb-24" id="kataloq">
      {!lockBrand && (
        <Suspense fallback={null}>
          <ParamsSync apply={apply} />
        </Suspense>
      )}
      {/* filtr paneli */}
      <div className="sticky top-[var(--header-offset,5.25rem)] z-30 -mx-4 mb-8 px-4 transition-[top] duration-500 ease-out-expo sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="card-glass rounded-[1.5rem] p-2.5 shadow-[0_20px_50px_-30px_rgba(21,18,20,0.35)] sm:rounded-full">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <LayoutGroup id="cats">
              <div className="no-scrollbar -mx-1 flex flex-1 gap-1 overflow-x-auto px-1">
                {[{ slug: "all" as const, name: tc.all }, ...cats].map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setCat(c.slug)}
                    className={cn("relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors", cat === c.slug ? "text-ivory" : "text-ink/70 hover:text-ink")}
                  >
                    {cat === c.slug && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                    <span className="relative">{c.name}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div className="flex items-center gap-2">
              <label className="relative flex h-11 flex-1 items-center rounded-full bg-white/80 pr-3 pl-10 sm:w-56 sm:flex-none">
                <Search className="absolute left-3.5 size-4 text-muted" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tc.search} className="w-full bg-transparent text-sm outline-none" aria-label={tc.searchAria} />
                {q && (
                  <button onClick={() => setQ("")} aria-label={tc.reset}>
                    <X className="size-4 text-muted" />
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="mr-1 size-4 text-muted" />
        {!lockBrand &&
          brands.map((b) => (
            <button
              key={b.slug}
              onClick={() => setBrand(brand === b.slug ? "all" : b.slug)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-all",
                brand === b.slug ? "border-rose bg-rose text-white" : "border-line hover:border-ink",
              )}
            >
              {b.name}
            </button>
          ))}
        <button
          onClick={() => setOnlySale((v) => !v)}
          className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-all", onlySale ? "border-rose bg-rose text-white" : "border-line hover:border-ink")}
          aria-pressed={onlySale}
        >
          {tc.onlySale}
        </button>
        <div className="relative ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-transparent pr-9 pl-4 text-sm outline-none hover:border-ink"
            aria-label={tc.sort}
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {tc.sorts[s]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <p className="font-medium text-ink">{tc.found(list.length)}</p>
        {active > 0 && (
          <button onClick={reset} className="link-underline font-medium text-rose">
            {tc.reset}
          </button>
        )}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 12) * 0.03 }}
            >
              <ProductCard product={p} priority={i < 4} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-4xl">{tc.none}</p>
          <p className="mt-2 text-muted">{tc.noneText}</p>
          <button onClick={reset} className="btn btn-primary mt-6">
            {tc.reset}
          </button>
        </div>
      )}
    </section>
  );
}
