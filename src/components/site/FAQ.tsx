"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";

const FAQS = [
  {
    q: "Does this replace hands-on training?",
    a: "No. The simulator complements physical labs and field experience — it doesn't replace them. Students still need supervised time with real equipment. The simulator adds a layer of structured practice before, between and after those sessions, so the limited lab hours they do get are used for higher-value work.",
  },
  {
    q: "Do students need VR headsets?",
    a: "No. The core experience runs entirely in a modern web browser on a standard computer or laptop. VR or AR can be explored for specific projects where it adds genuine educational value, but it is never a prerequisite.",
  },
  {
    q: "Can you build simulations around our curriculum?",
    a: "Yes — that's the default engagement model. We work from your existing practical exercises, module descriptions, assessment criteria and terminology. You don't need to redesign your curriculum; the simulation is shaped to fit your teaching.",
  },
  {
    q: "Can it integrate with our LMS?",
    a: "Custom LMS integration can be developed — common options include LMS deep-linking, SCORM or xAPI packaging, single sign-on and gradebook return. We don't currently ship pre-built LMS plugins; integration is scoped as part of a custom engagement.",
  },
  {
    q: "Can we start with a pilot?",
    a: "Yes — and it's the recommended starting point. Choose one practical exercise from your existing curriculum, build the simulation, test it with instructors, evaluate it with one cohort for one teaching cycle, then decide whether to expand. No large enterprise commitment, no multi-year contract.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative border-t border-line/60 bg-surface-soft/30">
      <div className="container-tight section-padding">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions."
          description="If yours isn't listed here, ask it in the form below — every enquiry gets a personal response."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="rounded-xl border border-line/60 bg-surface/30 px-5 md:px-6"
              >
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="border-line/60"
                  >
                    <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:no-underline">
                      <span className="flex items-start gap-3">
                        <span className="font-mono text-[11px] font-semibold text-safety">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{faq.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      <span className="block pl-7">{faq.a}</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="sticky top-24 rounded-xl border border-line/60 bg-surface/30 p-6">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-safety">
                  Still have questions?
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Ask directly.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Most questions are specific to your institution. The fastest
                  way to get a real answer is a 20-minute conversation.
                </p>
                <div className="mt-5">
                  <CTAButton href="#contact" variant="primary" size="md">
                    Request a Demo
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
