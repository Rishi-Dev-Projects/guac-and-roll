"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

interface CoverflowOptions {
  count: number;
  /** Pixels of pointer travel that equal one item. Read lazily (layout may change). */
  getStep: () => number;
  reduced: boolean;
}

/**
 * Custom coverflow engine.
 *
 * - `pos` is a continuous MotionValue (0 … count-1). Every card derives its
 *   transform from it, so drag and snap animate without React re-renders.
 * - React state (`active`) only changes when the rounded index changes.
 * - Pointer drag captures only after a horizontal intent is detected, so
 *   vertical page scrolling (touch-action: pan-y) and card clicks stay native.
 * - Horizontal trackpad deltas are consumed only when they dominate; vertical
 *   wheel scrolling is never intercepted.
 */
export function useCoverflow({ count, getStep, reduced }: CoverflowOptions) {
  const pos = useMotionValue(0);
  const [active, setActive] = useState(0);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const max = count - 1;

  useMotionValueEvent(pos, "change", (v) => {
    const i = clamp(Math.round(v), 0, max);
    setActive((prev) => (prev === i ? prev : i));
  });

  const goTo = useCallback(
    (index: number) => {
      anim.current?.stop();
      const target = clamp(Math.round(index), 0, max);
      anim.current = animate(
        pos,
        target,
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 160, damping: 26, mass: 0.9, restDelta: 0.001 }
      );
    },
    [max, pos, reduced]
  );

  const next = useCallback(() => goTo(Math.round(pos.get()) + 1), [goTo, pos]);
  const prev = useCallback(() => goTo(Math.round(pos.get()) - 1), [goTo, pos]);

  // ---- Pointer drag -------------------------------------------------------
  const drag = useRef({
    id: -1,
    startX: 0,
    startY: 0,
    startPos: 0,
    dragging: false,
    samples: [] as Array<{ t: number; x: number }>,
    suppressClick: false,
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const d = drag.current;
      d.id = e.pointerId;
      d.startX = e.clientX;
      d.startY = e.clientY;
      d.startPos = pos.get();
      d.dragging = false;
      d.samples = [{ t: performance.now(), x: e.clientX }];
    },
    [pos]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (d.id !== e.pointerId) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (!d.dragging) {
        if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
        d.dragging = true;
        anim.current?.stop();
        d.startPos = pos.get();
        d.startX = e.clientX;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        return;
      }
      let p = d.startPos - (e.clientX - d.startX) / Math.max(1, getStep());
      // Rubber-band beyond the first/last card.
      if (p < 0) p = p * 0.35;
      if (p > max) p = max + (p - max) * 0.35;
      pos.set(p);
      const now = performance.now();
      d.samples.push({ t: now, x: e.clientX });
      while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
    },
    [getStep, max, pos]
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (d.id !== e.pointerId) return;
      d.id = -1;
      if (!d.dragging) return;
      d.dragging = false;
      d.suppressClick = true;
      const first = d.samples[0];
      const last = d.samples[d.samples.length - 1];
      const dt = Math.max(1, last.t - first.t);
      const velocity = (last.x - first.x) / dt; // px per ms
      const projected = pos.get() - (velocity * 140) / Math.max(1, getStep());
      // Momentum may carry at most one card beyond where the finger/cursor left it.
      const here = Math.round(pos.get());
      goTo(clamp(Math.round(projected), here - 1, here + 1));
    },
    [getStep, goTo, pos]
  );

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (drag.current.suppressClick) {
      drag.current.suppressClick = false;
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keys: Record<string, () => void> = {
        ArrowRight: next,
        ArrowLeft: prev,
        Home: () => goTo(0),
        End: () => goTo(max),
      };
      const fn = keys[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    },
    [goTo, max, next, prev]
  );

  // ---- Horizontal trackpad (non-passive so it can stop history swipe) -----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 1) return;
      e.preventDefault();
      anim.current?.stop();
      pos.set(clamp(pos.get() + e.deltaX / Math.max(1, getStep()), -0.25, max + 0.25));
      clearTimeout(timer);
      timer = setTimeout(() => goTo(pos.get()), 140);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, [getStep, goTo, max, pos]);

  useEffect(() => () => anim.current?.stop(), []);

  return {
    pos,
    active,
    goTo,
    next,
    prev,
    stageRef,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onKeyDown,
    },
  };
}

export interface CardDepthConfig {
  /** translateX (% of card width) for the first neighbour. */
  spread: number;
  /** Additional translateX (%) for each card beyond the first neighbour. */
  spreadFar: number;
  rotate: number;
  depth: number;
  scaleStep: number;
  /** Max |offset| still rendered visible. */
  visible: number;
  /** Optional tactile tilt (deg) applied to inactive cards. */
  tilt?: number;
}

/** Derives one card's 3D transform from the shared coverflow position. */
export function useCardDepth(pos: MotionValue<number>, index: number, cfg: CardDepthConfig) {
  const offset = useTransform(pos, (p) => index - p);
  const x = useTransform(offset, (d) => {
    const a = Math.abs(d);
    const mag = a <= 1 ? a * cfg.spread : cfg.spread + (a - 1) * cfg.spreadFar;
    return `${Math.sign(d) * mag}%`;
  });
  const rotateY = useTransform(offset, (d) => -clamp(d, -1, 1) * cfg.rotate);
  const z = useTransform(offset, (d) => -Math.min(Math.abs(d), 3) * cfg.depth);
  const scale = useTransform(offset, (d) => 1 - Math.min(Math.abs(d), 3) * cfg.scaleStep);
  const opacity = useTransform(offset, (d) => clamp(cfg.visible + 0.5 - Math.abs(d), 0, 1));
  const zIndex = useTransform(offset, (d) => Math.round(100 - Math.abs(d) * 10));
  const rotateZ = useTransform(offset, (d) => (cfg.tilt ? clamp(Math.abs(d), 0, 1) * cfg.tilt : 0));
  const shade = useTransform(offset, (d) => Math.min(Math.abs(d), 2) * 0.26);
  return { offset, style: { x, rotateY, z, scale, opacity, zIndex, rotateZ }, shade };
}
