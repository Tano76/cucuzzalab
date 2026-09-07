"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the app in Framer Motion's MotionConfig with reducedMotion="user".
 *
 * This automatically disables animations for users who have
 * prefers-reduced-motion: reduce enabled in their OS/browser settings —
 * WITHOUT changing the rendered DOM structure. This is critical for
 * avoiding SSR/client hydration mismatches: the server and client always
 * render the same element types and attributes, and Framer Motion handles
 * the reduced-motion preference purely through its animation engine
 * (transitions become instant, transforms are skipped).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
