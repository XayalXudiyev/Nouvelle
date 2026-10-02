"use client";

import { motion, LayoutGroup } from "motion/react";
import { useState } from "react";
import type { FaqGroup } from "@/lib/faq";
import { useLang } from "@/lib/i18n/context";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { ManagerTrigger } from "@/components/manager/ManagerCard";
import { cn } from "@/lib/format";

const GROUPS: (FaqGroup | "all")[] = ["all", "order", "delivery", "products", "discounts"];

export default function FaqClient() {
  const { t, faq } = useLang();
  const [g, setG] = useState<FaqGroup | "all">("all");
  const items = faq().filter((f) => g === "all" || f.group === g);
  return (
    <section className="container-x grid gap-12 pb-24 lg:grid-cols-[1fr_320px]">
      <div>
        <LayoutGroup id="faq-groups">
          <div className="no-scrollbar mb-8 flex gap-1 overflow-x-auto rounded-full bg-cream p-1.5">
            {GROUPS.map((x) => (
              <button key={x} onClick={() => setG(x)} className={cn("relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium", g === x ? "text-ivory" : "text-ink/70 hover:text-ink")}>
                {g === x && <motion.span layoutId="faq-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.faqPage.groups[x]}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <FaqAccordion key={g} items={items} />
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] bg-blush p-6">
          <p className="font-display text-3xl leading-tight font-medium">{t.faqPage.still}</p>
          <p className="mt-2 text-sm text-muted">{t.faqPage.stillText}</p>
          <ManagerTrigger variant="card" className="mt-6" />
        </div>
      </aside>
    </section>
  );
}
