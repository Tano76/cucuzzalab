"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
};

/**
 * Reveal-on-scroll wrapper using Framer Motion.
 *
 * Always renders the same element type (motion[as]) on both server and client
 * to avoid hydration mismatches. Reduced-motion handling is delegated to a
 * top-level <MotionConfig reducedMotion="user"> wrapper (see layout.tsx),
 * which automatically disables animations for users with
 * prefers-reduced-motion: reduce — without changing the DOM structure.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
