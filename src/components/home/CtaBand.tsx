"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { PHONE, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";
import { ManagerTrigger } from "@/components/manager/ManagerCard";
import { WhatsAppIcon } from "@/components/ui/Icons";
import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";

export default function CtaBand() {
  const { t } = useLang();
  const c = t.cta;
  return (
    <section className="container-x pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-rose px-6 py-16 text-white sm:rounded-[3rem] sm:px-14 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-16 hidden w-[380px] rotate-[-10deg] opacity-90 md:block lg:right-10">
          <Image src="/img/hq/wax-red.webp" alt="" width={585} height={823} className="h-auto w-full drop-shadow-2xl" />
        </div>
        <div aria-hidden className="pointer-events-none absolute -top-10 right-[28%] hidden w-[150px] rotate-[18deg] lg:block">
          <Image src="/img/hq/kera-oil.webp" alt="" width={329} height={811} className="h-auto w-full drop-shadow-2xl" />
        </div>
        <div className="relative max-w-2xl">
          <p className="eyebrow mb-5 text-white/70">{c.eyebrow}</p>
          <SplitText
            text={c.title}
            className="font-display text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl"
            accentClass="italic text-ink"
          />
          <p className="mt-6 max-w-lg text-lg text-white/80">{c.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a href={whatsappLink(c.waText)} target="_blank" rel="noreferrer" className="btn h-14 bg-white px-8 text-ink hover:bg-ink hover:text-white">
                <WhatsAppIcon className="size-5 text-[#1f9f55]" /> {c.wa}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={PHONE.href} className="btn h-14 border border-white/40 px-8 hover:bg-white/10">
                <Phone className="size-5" /> {PHONE.display}
              </a>
            </Magnetic>
          </div>
          <ManagerTrigger light className="mt-6" />
        </div>
      </div>
    </section>
  );
}
