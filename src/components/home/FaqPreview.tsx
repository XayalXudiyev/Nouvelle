"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { PHONE, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";
import { ManagerTrigger } from "@/components/manager/ManagerCard";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function FaqPreview() {
  const { t, href, faq } = useLang();
  const f = t.faqPreview;
  return (
    <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} text={f.text} />
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappLink(f.waText)} target="_blank" rel="noreferrer" className="btn bg-[#1f9f55] text-white hover:bg-[#178a48]">
            <WhatsAppIcon className="size-5" /> WhatsApp
          </a>
          <a href={PHONE.href} className="btn btn-ghost">
            {PHONE.display}
          </a>
        </div>
        <ManagerTrigger className="mt-6" />
        <br />
        <Link href={href("/faq/")} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
          <span className="link-underline">{f.all}</span> <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <FaqAccordion items={faq().slice(0, 6)} />
    </section>
  );
}
