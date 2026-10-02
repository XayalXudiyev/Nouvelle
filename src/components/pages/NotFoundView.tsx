"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/context";

export default function NotFoundView() {
  const { t, href } = useLang();
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-[10rem] leading-none font-semibold text-rose sm:text-[14rem]">404</p>
      <h1 className="mt-2 font-display text-5xl font-medium">{t.notFound.title}</h1>
      <p className="mt-3 text-muted">{t.notFound.text}</p>
      <Link href={href("/")} className="btn btn-primary mt-8">
        {t.notFound.home}
      </Link>
    </section>
  );
}
