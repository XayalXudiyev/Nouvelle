import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { cn } from "@/lib/format";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light,
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={cn("eyebrow mb-4 inline-flex items-center gap-3", light ? "text-gold-2" : "text-rose")}>
            <span className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitText
        text={title}
        className={cn(
          "font-display text-[2.6rem] leading-[0.95] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl",
          light ? "text-ivory" : "text-ink",
        )}
        accentClass={light ? "italic text-gold-2" : "italic text-rose"}
      />
      {text && (
        <Reveal delay={0.15} y={20}>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-ivory/70" : "text-muted", align === "center" && "mx-auto max-w-2xl")}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
