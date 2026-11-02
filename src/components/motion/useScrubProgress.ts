"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useScroll } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Scroll progress for an element, as a MotionValue.
 *
 * - Never triggers React renders (pure MotionValue piping).
 * - Fully reversible: it mirrors scrollYProgress in both directions.
 * - Under prefers-reduced-motion it holds `reducedValue` (the calm, final state).
 * - Starts at 0 on the server and during hydration, so markup always matches.
 */
export function useScrubProgress(
  target: RefObject<HTMLElement | null>,
  offset: ScrollOffset,
  reducedValue = 1
) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset });
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reduced) {
      progress.set(reducedValue);
      return;
    }
    progress.set(scrollYProgress.get());
    return scrollYProgress.on("change", (v) => progress.set(v));
  }, [reduced, reducedValue, scrollYProgress, progress]);

  return { progress, reduced };
}
