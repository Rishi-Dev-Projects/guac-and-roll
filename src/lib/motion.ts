/**
 * Guac N' Roll Cafe — Motion Design System
 *
 * Philosophy: "Slow, Confident, Tactile"
 * Spring physics: Weighted, unhurried, zero bouncy gimmicks.
 * Hardware acceleration: Animate exclusively transform & opacity.
 * Full prefers-reduced-motion consideration.
 *
 * ponytail: Only the two variants used by HeroSection are exported.
 * Add back from git history if new animated sections are introduced.
 */

/**
 * Text & Title Reveal (Quiet, unhurried upward drift)
 * Used by: HeroSection
 */
export const textReveal = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 22,
      mass: 1,
      duration: 0.7,
    },
  },
};

/**
 * Architectural Image Reveal (Gentle scale settling + opacity)
 * Used by: HeroSection
 */
export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.03,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};
