"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";

export default function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="hidden w-8 shrink-0 font-display text-lg text-muted sm:block">{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex-1 text-lg leading-snug font-semibold transition-colors sm:text-xl ${isOpen ? "text-rose" : "group-hover:text-rose"}`}>{f.q}</span>
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo ${
                    isOpen ? "rotate-45 border-rose bg-rose text-white" : "border-line group-hover:border-ink"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 leading-relaxed text-muted sm:pl-[3.25rem]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
