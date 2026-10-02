"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getBrand, getCategory, type Product, type BrandSlug, type CategorySlug } from "../data";
import { localePath, type Lang } from "./config";
import { DICTS } from "./dict";
import { brandsFor, categoriesFor, faqFor, localizeBrand, localizeCategory, localizeProduct } from "./content";

const LangContext = createContext<Lang>("az");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  const lang = useContext(LangContext);
  return {
    lang,
    t: DICTS[lang],
    href: (path: string) => localePath(lang, path),
    product: (p: Product) => localizeProduct(p, lang),
    brand: (slug: BrandSlug) => localizeBrand(getBrand(slug)!, lang),
    category: (slug: CategorySlug) => localizeCategory(getCategory(slug)!, lang),
    brands: () => brandsFor(lang),
    categories: () => categoriesFor(lang),
    faq: () => faqFor(lang),
  };
}
