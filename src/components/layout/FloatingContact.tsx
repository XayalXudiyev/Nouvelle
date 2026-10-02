"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";
import { ArrowUp } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getLenis } from "./SmoothScroll";

export default function FloatingContact() {
  const { t } = useLang();
  // məhsul səhifəsində mobil "səbətə" paneli var — düyməni bir az yuxarı qaldırırıq
  const onProduct = /^\/mehsullar\/[^/]+\/?$/.test(stripLocale(usePathname()));
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <div className={`fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6 lg:bottom-6 ${onProduct ? "bottom-24" : "bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6"}`}>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => {
              const l = getLenis();
              if (l) l.scrollTo(0, { duration: 1.6 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="grid size-11 place-items-center rounded-full bg-ivory text-ink shadow-lg ring-1 ring-line"
            aria-label={t.common.toTop}
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={whatsappLink(t.manager.greeting)}
        target="_blank"
        rel="noreferrer"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-500 ease-out-expo hover:scale-110"
        aria-label={t.common.writeWhatsapp}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsAppIcon className="relative size-7" />
      </a>
    </div>
  );
}
