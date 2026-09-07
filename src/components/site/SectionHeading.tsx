import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-soft/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-safety">
            <span className="h-1.5 w-1.5 rounded-full bg-safety" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]",
            align === "center" && "mx-auto",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
