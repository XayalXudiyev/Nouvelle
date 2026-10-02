"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n/context";
import { ManagerTrigger } from "@/components/manager/ManagerCard";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";

export default function ContactClient() {
  const { t } = useLang();
  const c = t.contactPage;
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [`${c.msgName}: ${form.name}`, `${c.msgPhone}: ${form.phone}`, "", form.message].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener");
  };

  const field = "h-14 w-full rounded-2xl border border-line bg-white/70 px-5 text-base outline-none transition-colors focus:border-ink";

  return (
    <section className="container-x grid gap-10 pb-24 lg:grid-cols-[360px_1fr] lg:gap-16">
      {/* vizitka */}
      <div className="flex flex-col items-center gap-6 lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow self-start text-rose">{c.cardTitle}</p>
        <motion.div initial={{ rotate: -6, y: 40, opacity: 0 }} whileInView={{ rotate: -3, y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 90, damping: 14 }} className="w-full">
          <ManagerTrigger variant="card" className="mx-auto max-w-[340px]" />
        </motion.div>
        <p className="text-center text-sm text-muted">{t.manager.tapHint}</p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {SITE.phones.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.08}>
              <a href={p.href} className="group flex h-full items-center gap-4 rounded-[1.75rem] bg-ink p-6 text-ivory transition-colors hover:bg-rose">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs tracking-widest text-white/50 uppercase">{c.phones}</span>
                  <span className="block text-2xl font-semibold tabular-nums">{p.display}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <a href={`mailto:${SITE.email}`} className="group flex h-full items-center gap-4 rounded-[1.75rem] border border-line bg-white/60 p-6 transition-colors hover:border-ink">
              <span className="grid size-12 place-items-center rounded-2xl bg-blush text-rose">
                <Mail className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs tracking-widest text-muted uppercase">{c.email}</span>
                <span className="block truncate text-lg font-semibold">{SITE.email}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.24}>
            <a href={whatsappLink(t.manager.greeting)} target="_blank" rel="noreferrer" className="flex h-full items-center gap-4 rounded-[1.75rem] bg-[#1f9f55] p-6 text-white transition-colors hover:bg-[#178a48]">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
                <WhatsAppIcon className="size-6" />
              </span>
              <span>
                <span className="block text-xs tracking-widest text-white/70 uppercase">WhatsApp</span>
                <span className="block text-lg font-semibold tabular-nums">{SITE.phones[0].display}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.28} className="sm:col-span-2">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-[1.75rem] bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] p-6 text-white transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white/20">
                <InstagramIcon className="size-6" />
              </span>
              <span className="flex-1">
                <span className="block text-xs tracking-widest text-white/80 uppercase">Instagram</span>
                <span className="block text-lg font-semibold">{SITE.instagramHandle}</span>
              </span>
              <span className="hidden text-sm font-semibold sm:block">{t.common.followInstagram} →</span>
            </a>
          </Reveal>
          <Reveal delay={0.3} className="sm:col-span-2">
            <div className="grid gap-4 rounded-[1.75rem] border border-line bg-white/60 p-6 sm:grid-cols-2">
              <p className="flex items-center gap-3">
                <Clock className="size-5 text-rose" />
                <span>
                  <span className="block text-xs tracking-widest text-muted uppercase">{c.hours}</span>
                  {t.footer.hours}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-5 text-rose" />
                <span>
                  <span className="block text-xs tracking-widest text-muted uppercase">{c.address}</span>
                  {t.footer.address}
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={submit} className="rounded-[2rem] bg-cream p-6 sm:p-10">
            <h2 className="font-display text-4xl font-medium">{c.formTitle}</h2>
            <p className="mt-2 text-muted">{c.formText}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={c.name} aria-label={c.name} className={field} autoComplete="name" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={c.phone} aria-label={c.phone} className={field} type="tel" autoComplete="tel" />
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={c.message} aria-label={c.message} rows={5} className={`${field} h-auto py-4 sm:col-span-2`} />
            </div>
            <button type="submit" className="btn btn-primary mt-6 h-14 px-8">
              <Send className="size-4" /> {c.send}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
