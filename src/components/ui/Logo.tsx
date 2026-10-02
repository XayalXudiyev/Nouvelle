"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";
import NouvelleLogo from "./NouvelleLogo";

export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const { href, t } = useLang();
  return (
    <Link href={href("/")} aria-label={`${SITE.name} — ${t.nav.home}`} className={`group inline-flex items-center gap-2.5 ${className}`}>
      <NouvelleLogo className={`h-10 transition-opacity duration-300 group-hover:opacity-80 lg:h-12 ${light ? "text-ivory" : "text-ink"}`} />
      <span className="hidden border-l border-current/20 pl-2.5 text-[0.55rem] leading-tight font-semibold tracking-[0.22em] text-rose uppercase min-[400px]:block">
        Official
        <br />
        Azerbaijan
      </span>
    </Link>
  );
}
