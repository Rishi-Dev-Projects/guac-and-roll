"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hydration-safe media query subscription.
 *
 * Uses useSyncExternalStore so the server snapshot (`serverValue`) is used for
 * hydration and React re-renders once with the real value — no setState inside
 * effects, no hydration mismatch warnings.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True for mouse / trackpad devices that can hover precisely. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
