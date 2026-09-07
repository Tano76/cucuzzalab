import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CTAButton } from "./CTAButton";
import { ChevronRight } from "lucide-react";

const EXAMPLES = [
  "Two-Peg Test",
  "Site Set-Out",
  "Leveling Exercise",
  "Construction Safety Scenario",
  "Blueprint Reading",
];

const STEPS = [
  {
    n: "1",
    title: "Select one exercise",
    body: "Choose a single practical exercise from your existing curriculum — ideally one where students struggle or where lab capacity is the bottleneck.",
  },
  {
    n: "2",
    title: "Define, build & test",
    body: "Together we map the procedure, build the 3D simulation, and test it with a small group of instructors (and ideally a few students). You review at every milestone.",
  },
  {
    n: "3",
    title: "Run one cohort, then decide",
    body: "Use the simulator with one cohort for one teaching cycle. We measure engagement and instructor feedback together — then you decide whether to expand. No obligation.",
  },
];

export function PilotSection() {
  return (
    <section id="pilot" className="relative border-t border-line/60 bg-surface-soft/30">
      <div className="container-tight section-padding">
        <SectionHeading
          eyebrow="Pilot offer"
          title="Start with one practical exercise."
          description="The lowest-risk way to evaluate whether 3D simulation fits your program. No large enterprise commitment, no multi-year contract, no upfront platform fee."
        />

        {/* Examples */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Example pilot exercises:
            </span>
            {EXAMPLES.map((ex) => (
              <span
                key={ex}
                className="rounded-full border border-line/60 bg-surface/50 px-3 py-1 text-xs text-foreground/90"
              >
                {ex}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Pilot steps */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className="relative rounded-xl border border-line/60 bg-surface/30 p-5 transition-colors hover:border-line hover:bg-surface/60"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-safety/40 bg-safety/10 font-mono text-xs font-semibold text-safety">
                  {s.n}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-line/60 bg-background p-6 text-center md:p-8">
            <p className="max-w-xl text-balance text-base font-medium text-foreground md:text-lg">
              One exercise. One cohort. One teaching cycle. Then decide.
            </p>
            <p className="max-w-xl text-sm text-muted-foreground">
              Pricing is scoped to the complexity of the exercise and provided as
              part of the response to your enquiry — no surprises.
            </p>
            <div className="mt-2">
              <CTAButton href="#contact" variant="primary" size="lg">
                Discuss a Pilot
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
