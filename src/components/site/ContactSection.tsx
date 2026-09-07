"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTAButton, CTASubmitButton } from "./CTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  "Head of Construction",
  "Construction Program Director",
  "Construction Program Coordinator",
  "Head of Surveying",
  "Surveying Program Coordinator",
  "Civil Engineering Program Director",
  "Civil Engineering Faculty",
  "Dean of Engineering & Technology",
  "Director of Workforce Development",
  "Digital Learning Manager",
  "Learning Technology Manager",
  "Vocational Education Manager",
  "TAFE Program Manager",
  "Apprenticeship Program Director",
  "Other",
];

const INTERESTS = [
  "Construction Surveying",
  "Construction Safety",
  "Blueprint & Plan Reading",
  "Site Layout",
  "Construction Procedures",
  "Equipment Training",
  "Something else",
];

type FormState = {
  name: string;
  institution: string;
  role: string;
  email: string;
  program: string;
  interest: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  institution: "",
  role: "",
  email: "",
  program: "",
  interest: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Simple client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.institution.trim()) {
      setStatus("error");
      setError("Please fill in your name, institution and email so we can respond.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) {
      setStatus("error");
      setError("That email address doesn't look right. Please check and try again.");
      return;
    }

    setStatus("submitting");

    // Simulate submission — no backend wired up here.
    // In a production deployment this would POST to /api/contact or similar.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    setForm(INITIAL);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 border-t border-line/60 bg-background"
    >
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="container-tight relative z-10 section-padding">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — copy + CTAs */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  Have a practical exercise you&apos;d like to simulate?
                </>
              }
              description="Let's explore whether a 3D browser-based simulation could complement your curriculum. The conversation takes about 20 minutes — no slides, no pitch deck, no obligation."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3">
                <CTAButton href="#contact" variant="primary" size="lg">
                  Request a Demo
                </CTAButton>
                <CTAButton href="#pilot" variant="secondary" size="lg">
                  Discuss a Pilot
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Personal response within two business days. Every enquiry gets a
                personal reply — no mailing list.
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line/60 bg-surface/30 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-safety/40 bg-safety/10">
                        <CheckCircle2 className="h-7 w-7 text-safety" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-foreground">
                        Thank you — your enquiry has been received.
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        We&apos;ll respond personally within two business days
                        from the email address you provided. In the meantime,
                        feel free to explore the example simulator above.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm text-safety hover:underline focus-ring rounded"
                      >
                        Send another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      aria-label="Demo request form"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                            Name <span className="text-safety">*</span>
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Jane Smith"
                            className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                            Email <span className="text-safety">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane.smith@institution.edu"
                            className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="institution" className="text-xs uppercase tracking-wider text-muted-foreground">
                            Institution <span className="text-safety">*</span>
                          </Label>
                          <Input
                            id="institution"
                            type="text"
                            required
                            value={form.institution}
                            onChange={(e) => update("institution", e.target.value)}
                            placeholder="e.g. Northside TAFE"
                            className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="program" className="text-xs uppercase tracking-wider text-muted-foreground">
                            Program / Department
                          </Label>
                          <Input
                            id="program"
                            type="text"
                            value={form.program}
                            onChange={(e) => update("program", e.target.value)}
                            placeholder="e.g. Construction Surveying"
                            className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-xs uppercase tracking-wider text-muted-foreground">
                            Role
                          </Label>
                          <Select
                            value={form.role}
                            onValueChange={(v) => update("role", v)}
                          >
                            <SelectTrigger
                              id="role"
                              className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                            >
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interest" className="text-xs uppercase tracking-wider text-muted-foreground">
                            What would you like to simulate?
                          </Label>
                          <Select
                            value={form.interest}
                            onValueChange={(v) => update("interest", v)}
                          >
                            <SelectTrigger
                              id="interest"
                              className="h-11 bg-background/60 border-line/70 focus-visible:border-safety/50"
                            >
                              <SelectValue placeholder="Select a focus area" />
                            </SelectTrigger>
                            <SelectContent>
                              {INTERESTS.map((i) => (
                                <SelectItem key={i} value={i}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
                          Optional message
                        </Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Anything else worth knowing — cohort size, timeline, specific equipment, LMS, current bottlenecks."
                          className="bg-background/60 border-line/70 focus-visible:border-safety/50 resize-none"
                        />
                      </div>

                      {status === "error" ? (
                        <div className="flex items-start gap-2.5 rounded-md border border-red-500/30 bg-red-500/[0.06] p-3 text-sm text-red-300">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      ) : null}

                      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                          We respond to every enquiry personally. No mailing list.
                        </p>
                        <CTASubmitButton
                          variant="primary"
                          size="lg"
                          loading={status === "submitting"}
                        >
                          {status === "submitting" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-safety-foreground/30 border-t-safety-foreground" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Request a Demo
                            </>
                          )}
                        </CTASubmitButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
