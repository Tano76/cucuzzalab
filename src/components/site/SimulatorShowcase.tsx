"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Ruler,
  Layers3,
  Mountain,
  Construction,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

type Module = {
  id: string;
  number: string;
  title: string;
  short: string;
  icon: typeof Settings2;
  description: string;
  objectives: string[];
};

const MODULES: Module[] = [
  {
    id: "equipment",
    number: "01",
    title: "Equipment Setup",
    short: "Position and level surveying equipment.",
    icon: Settings2,
    description:
      "Students learn to position, level and prepare surveying equipment before taking measurements. The simulator validates each setup step.",
    objectives: [
      "Position the tripod over the control point",
      "Level the instrument using footscrews",
      "Confirm the line of sight is horizontal",
    ],
  },
  {
    id: "twopeg",
    number: "02",
    title: "Two-Peg Test",
    short: "Identify collimation error.",
    icon: Ruler,
    description:
      "Students perform the two-peg test and calculate the collimation error. The simulator records each reading and guides the calculation if a systematic error is detected.",
    objectives: [
      "Take near and far backsight and foresight readings",
      "Compute the collimation error",
      "Determine if the instrument is within tolerance",
    ],
  },
  {
    id: "leveling",
    number: "03",
    title: "Leveling",
    short: "Backsights, foresights, benchmarks.",
    icon: Layers3,
    description:
      "Students practice differential leveling: backsights, foresights, transferring elevations from a known benchmark, and computing the height of instrument. Readings are recorded in a simulated field book.",
    objectives: [
      "Establish the height of instrument from a benchmark",
      "Take foresight to a turning point",
      "Close the level loop within tolerance",
    ],
  },
  {
    id: "contour",
    number: "04",
    title: "Contour Mapping",
    short: "Collect points, interpret terrain.",
    icon: Mountain,
    description:
      "Students collect spot elevations across a grid and interpret terrain from the resulting contour map. Contours render in real time as data is collected.",
    objectives: [
      "Record elevations at each grid point",
      "Generate contour lines from collected data",
      "Identify ridges, valleys and slopes",
    ],
  },
  {
    id: "cutfill",
    number: "05",
    title: "Cut & Fill",
    short: "Earthwork calculations.",
    icon: Construction,
    description:
      "Students compare proposed and existing elevations to calculate cut and fill volumes for construction earthwork. The design surface is visualised against the existing terrain.",
    objectives: [
      "Compare existing and design elevations",
      "Identify cut and fill zones",
      "Calculate total earthwork quantities",
    ],
  },
  {
    id: "report",
    number: "06",
    title: "Assessment & Reporting",
    short: "Recorded activity, exported evidence.",
    icon: ClipboardCheck,
    description:
      "Student activity and results are recorded throughout each module. Instructors review completion status, scores and step-by-step activity. Reports export as CSV or PDF.",
    objectives: [
      "Per-student completion status and scores",
      "Time-on-task recorded automatically",
      "Exportable CSV / PDF evidence of learning",
    ],
  },
];

export function SimulatorShowcase() {
  const [active, setActive] = useState<Module>(MODULES[1]);

  return (
    <section
      id="example-simulator"
      className="relative border-t border-line/60 bg-background"
    >
      <div className="container-tight section-padding">
        <SectionHeading
          eyebrow="Example simulation"
          title="Construction Surveying Simulator"
          description="A built, working simulator showing how practical construction training translates into an interactive digital environment. Each module can be adapted to your institution's terminology, equipment and assessment criteria."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — module list */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Modules
              </span>
            </Reveal>
            <ul className="mt-4 space-y-2">
              {MODULES.map((mod, i) => {
                const isActive = active.id === mod.id;
                return (
                  <Reveal key={mod.id} delay={i * 0.04}>
                    <li>
                      <button
                        type="button"
                        onClick={() => setActive(mod)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all focus-ring",
                          isActive
                            ? "border-safety/40 bg-safety/[0.06]"
                            : "border-line/60 bg-surface/30 hover:border-line hover:bg-surface/50",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-semibold transition-colors",
                            isActive
                              ? "border-safety/50 bg-safety/15 text-safety"
                              : "border-line/60 bg-surface text-muted-foreground",
                          )}
                        >
                          {mod.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <mod.icon
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isActive ? "text-safety" : "text-muted-foreground",
                              )}
                            />
                            <h3 className="text-sm font-semibold text-foreground">
                              {mod.title}
                            </h3>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {mod.short}
                          </p>
                        </div>
                      </button>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Right — active module details */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="surface-card overflow-hidden p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-safety">
                        Module {active.number}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-line" />
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        Construction Surveying Simulator
                      </span>
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                      {active.title}
                    </h3>
                  </div>
                  <span className="hidden rounded-full border border-line/70 bg-surface/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:inline-flex">
                    Example
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                {/* Objectives */}
                <div className="mt-5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    What students practise
                  </span>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {active.objectives.map((obj) => (
                      <li
                        key={obj}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-safety/80" />
                        <span className="leading-snug">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <Reveal delay={0.1}>
              <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-lg border border-line/60 bg-surface-soft/40 p-5 sm:flex-row sm:items-center">
                <p className="text-sm font-medium text-foreground">
                  Want to see it in action? A live walkthrough takes about 20 minutes.
                </p>
                <CTAButton href="#contact" variant="primary" size="md">
                  Request a Demo
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
