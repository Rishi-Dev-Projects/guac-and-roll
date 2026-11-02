"use client";

import { MotionConfig } from "motion/react";

/**
 * Global Motion configuration.
 * reducedMotion="user" disables transform/layout animations for visitors who
 * request reduced motion (opacity transitions remain). Scroll-linked effects
 * handle reduced motion explicitly in their own components.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
