"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  /** "*söz*" və ya "*bir neçə söz*" ilə işarələnmiş hissə kursiv və rəngli göstərilir */
  accentClass?: string;
  animateOnMount?: boolean;
};

type Token = { word: string; accent: boolean; index: number };

function tokenize(text: string): Token[][] {
  const out: Token[][] = [];
  let inAccent = false;
  let index = 0;
  for (const line of text.split("\n")) {
    const row: Token[] = [];
    for (const raw of line.split(" ")) {
      let word = raw;
      if (word.startsWith("*")) {
        inAccent = true;
        word = word.slice(1);
      }
      const accent = inAccent;
      if (word.endsWith("*")) {
        inAccent = false;
        word = word.slice(0, -1);
      }
      row.push({ word, accent, index: index++ });
    }
    out.push(row);
  }
  return out;
}

/** Başlıqları söz-söz maskadan yuxarı qaldıraraq göstərir. */
export default function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  accentClass = "italic text-rose",
  animateOnMount = false,
}: Props) {
  const lines = tokenize(text);
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      <motion.span initial="hidden" {...trigger} className="block" aria-hidden>
        {lines.map((row, li) => (
          <span key={li} className="block">
            {row.map((t, wi) => (
              <Fragment key={wi}>
                <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                  <motion.span
                    className={`inline-block will-change-transform ${t.accent ? accentClass : ""}`}
                    variants={{
                      hidden: { y: "115%", rotate: 4 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + t.index * stagger },
                      },
                    }}
                  >
                    {t.word}
                  </motion.span>
                </span>
                {wi < row.length - 1 && " "}
              </Fragment>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
