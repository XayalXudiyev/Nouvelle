export const LANGS = ["az", "en", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "az";
export const LANG_LABEL: Record<Lang, string> = { az: "AZ", en: "EN", ru: "RU" };
export const LANG_NAME: Record<Lang, string> = { az: "Azərbaycan", en: "English", ru: "Русский" };
export const OG_LOCALE: Record<Lang, string> = { az: "az_AZ", en: "en_US", ru: "ru_RU" };

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** Daxili yolu dilə uyğun prefikslə qaytarır: ("en", "/mehsullar/") → "/en/mehsullar/" */
export function localePath(lang: Lang, path: string) {
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? `/${lang}/` : `/${lang}${path}`;
}

/** Cari yoldan dil prefiksini çıxarır: "/ru/faq/" → "/faq/" */
export function stripLocale(pathname: string) {
  const m = pathname.match(/^\/(en|ru)(\/.*)?$/);
  return m ? m[2] || "/" : pathname;
}
