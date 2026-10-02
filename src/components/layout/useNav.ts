"use client";

import { useLang } from "@/lib/i18n/context";

export function useNav() {
  const { t, href } = useLang();
  return [
    { href: href("/"), key: "/", label: t.nav.home },
    { href: href("/mehsullar/"), key: "/mehsullar/", label: t.nav.products },
    { href: href("/brendler/"), key: "/brendler/", label: t.nav.brands },
    { href: href("/endirimler/"), key: "/endirimler/", label: t.nav.deals, hot: true },
    { href: href("/faq/"), key: "/faq/", label: t.nav.faq },
    { href: href("/elaqe/"), key: "/elaqe/", label: t.nav.contact },
  ];
}
