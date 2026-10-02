import { cn } from "@/lib/format";

/** Rəsmi Nouvelle loqosu (vektor). Rəng `currentColor`-dan götürülür. */
export default function NouvelleLogo({ className, title = "Nouvelle — new generation" }: { className?: string; title?: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn("inline-block aspect-[576/227] bg-current", className)}
      style={{
        WebkitMask: "url(/img/nouvelle-logo.svg) center / contain no-repeat",
        mask: "url(/img/nouvelle-logo.svg) center / contain no-repeat",
      }}
    />
  );
}
