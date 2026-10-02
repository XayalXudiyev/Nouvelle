"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n/context";

export default function PageHeader({
  crumbs,
  title,
  text,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  title?: string;
  text?: string;
  children?: React.ReactNode;
}) {
  const { t, href } = useLang();
  return (
    <header className={`relative overflow-hidden pt-8 sm:pt-12 ${title ? "pb-12 sm:pb-16" : "pb-6"}`}>
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 size-[30rem] rounded-full bg-blush/70 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -top-20 right-0 size-[24rem] rounded-full bg-[#ece6fb] blur-[110px]" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href={href("/")} className="hover:text-ink">
            {t.nav.home}
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3" />
              {c.href ? (
                <Link href={href(c.href)} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="line-clamp-1 text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        {title && <SplitText as="h1" animateOnMount text={title} className="font-display text-[3.2rem] leading-[0.92] font-medium tracking-tight sm:text-7xl lg:text-8xl" />}
        {text && (
          <Reveal delay={0.2} y={16}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{text}</p>
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}
