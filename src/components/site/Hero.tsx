"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
// Note: useReducedMotion is only read inside useEffect (post-hydration) to
// avoid SSR/client mismatches. CSS @media (prefers-reduced-motion: reduce)
// in globals.css handles the scan-line animation visibility.
import {
  Maximize2,
  Move3d,
  ChevronRight,
} from "lucide-react";
import { CTAButton } from "./CTAButton";

const HERO_FRAMES = [
  "/hero/frame-1.webp",
  "/hero/frame-2.webp",
  "/hero/frame-3.webp",
  "/hero/frame-4.webp",
  "/hero/frame-5.webp",
  "/hero/frame-6.webp",
];

const FRAME_INTERVAL_MS = 3000;

function SimulatorViewport() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(true);
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(HERO_FRAMES.length).fill(false),
  );
  // Preload all frames
  useEffect(() => {
    HERO_FRAMES.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      };
    });
  }, []);

  // Advance frame
  useEffect(() => {
    if (prefersReduced || !active) return;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % HERO_FRAMES.length);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReduced, active]);

  const ready = loaded.every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0d1118] via-[#0a0d13] to-[#070a0e] shadow-2xl shadow-black/40"
    >
      {/* Top toolbar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-line/70 bg-background/70 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-3 hidden text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:inline">
            Construction Surveying Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded border border-line/70 bg-surface/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground sm:inline-flex">
            <Move3d className="h-3 w-3" /> WebGL
          </span>
          <Maximize2 className="h-3.5 w-3.5 text-muted-foreground/70" />
        </div>
      </div>

      {/* Image sequence */}
      <div className="absolute inset-0">
        {HERO_FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              i === frame ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Scan-line animation */}
        {active ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-safety/30 animate-scan" />
        ) : null}

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.05_0.005_250_/_0.65))]" />

        {/* Loading shimmer */}
        {!ready && (
          <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-br from-[#0d1118] via-[#1a2129] to-[#0d1118]" />
        )}
      </div>

      {/* Frame progress dots */}
      <div className="absolute inset-x-0 top-14 z-30 flex items-center justify-center gap-1.5 sm:top-16">
        {HERO_FRAMES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setFrame(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === frame
                ? "w-5 bg-safety"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to frame ${i + 1}`}
          />
        ))}
      </div>

    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative hero-glow overflow-hidden bg-background"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-safety/30 to-transparent" />

      <div className="container-tight relative z-10 grid grid-cols-1 gap-12 px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pb-24 lg:pt-16">
        {/* Left — copy */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-safety" />
            For Construction · Surveying · Civil Engineering Education
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-5xl lg:text-[3.5rem]"
          >
            Practice Construction Skills
            <br />
            <span className="text-gradient-safety">Before the Physical Lab.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Browser-based 3D simulations that let students practice real-world
            procedures, receive feedback and demonstrate competency — before
            they touch physical equipment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CTAButton href="#contact" variant="primary" size="xl">
              Request a Demo
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </CTAButton>
            <CTAButton href="#example-simulator" variant="secondary" size="xl">
              See Example Simulator
            </CTAButton>
          </motion.div>
        </div>

        {/* Right — simulator viewport */}
        <div className="lg:col-span-6">
          <SimulatorViewport />
        </div>
      </div>
    </section>
  );
}
