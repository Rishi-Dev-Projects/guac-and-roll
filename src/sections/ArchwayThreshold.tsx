"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { useScrubProgress } from "@/components/motion/useScrubProgress";
import { facadeGeometry, photos } from "@/data/visualArchive";

/**
 * ARCHWAY THRESHOLD — "Through the door"
 *
 * A camera dolly through the real arched door of the shopfront.
 * The facade photo is laid out in a "cover box" that preserves its own pixel
 * coordinates, so the door's measured position is exact at every viewport.
 * The interior photograph is seen through the door's glass aperture as the
 * camera approaches; once the aperture fills the screen, the full-resolution
 * interior settles in. Fully scrubbed: reverse scrolling plays it backwards.
 */

const IW = photos.facade.width;
const IH = photos.facade.height;
const GLASS = facadeGeometry.doorGlass;
const DOOR = facadeGeometry.doorCentre;

// Scroll choreography (fractions of the pinned distance)
const DOLLY: [number, number] = [0.14, 0.7];
const SETTLE: [number, number] = [0.7, 0.8];
const INTERIOR_POS = 0.43; // object-position x of the interior photograph

interface Geometry {
  vw: number;
  vh: number;
  k: number; // px per source pixel
  ox: number; // box offset
  oy: number;
  maxScale: number;
  /** Interior image rect inside the glass aperture (aperture-local px). */
  glimpse: { left: number; top: number; width: number; height: number };
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function measure(vw: number, vh: number): Geometry {
  const k = Math.max(vw / IW, vh / IH);
  const boxW = IW * k;
  const boxH = IH * k;
  const ox = clamp(vw * 0.5 - DOOR.x * k, vw - boxW, 0);
  const oy = clamp(vh * 0.6 - DOOR.y * k, vh - boxH, 0);
  const maxScale = Math.max(vw / (GLASS.w * k), vh / (GLASS.h * k)) * 1.18;

  // At the end of the dolly a box-local point P lands on screen at
  //   vw/2 + (P.x - DOOR.x·k)·S   (and likewise for y).
  // Lay the interior out inside the glass so that, at that moment, it sits
  // exactly where the full-screen interior layer (object-cover) will be —
  // the cross-fade then only sharpens the image, it never ghosts.
  const ck = Math.max(vw / photos.interior.width, vh / photos.interior.height);
  const cw = photos.interior.width * ck;
  const ch = photos.interior.height * ck;
  const coverLeft = (vw - cw) * INTERIOR_POS;
  const coverTop = (vh - ch) * 0.5;
  const glimpse = {
    left: (coverLeft - vw / 2) / maxScale + DOOR.x * k - GLASS.x * k,
    top: (coverTop - vh / 2) / maxScale + DOOR.y * k - GLASS.y * k,
    width: cw / maxScale,
    height: ch / maxScale,
  };
  return { vw, vh, k, ox, oy, maxScale, glimpse };
}

export function ArchwayThreshold() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry>(() => measure(1440, 900));
  const { progress } = useScrubProgress(sectionRef, ["start start", "end end"], 1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => setGeo(measure(stage.clientWidth, stage.clientHeight)));
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // ---- Camera (facade box) -------------------------------------------------
  const t = useTransform(progress, DOLLY, [0, 1], { clamp: true });
  // Geometric interpolation: perceptually constant dolly speed.
  const scale = useTransform(t, (v) => Math.pow(geo.maxScale, v * v * (3 - 2 * v)));
  const centreShift = useTransform(scale, (s) => (s - 1) / Math.max(0.0001, geo.maxScale - 1));
  const doorScreenX = geo.ox + DOOR.x * geo.k;
  const doorScreenY = geo.oy + DOOR.y * geo.k;
  const x = useTransform(centreShift, (e) => (geo.vw / 2 - doorScreenX) * e);
  const y = useTransform(centreShift, (e) => (geo.vh / 2 - doorScreenY) * e);

  // Interior seen through the glass — the eye adjusts as we approach.
  const glimpse = useTransform(progress, [0.08, 0.42], [0, 1], { clamp: true });
  const facadeOpacity = useTransform(progress, SETTLE, [1, 0], { clamp: true });

  // Full-resolution interior settles in once the aperture fills the screen.
  const interiorOpacity = useTransform(progress, SETTLE, [0, 1], { clamp: true });
  // …and the walk continues a few steps into the room.
  const interiorScale = useTransform(progress, [SETTLE[1], 1], [1, 1.05], { clamp: true });

  // ---- Editorial panels -----------------------------------------------------
  const panelOpacity = useTransform(progress, [0, 0.04, 0.34, 0.44], [1, 1, 1, 0]);
  const panelY = useTransform(progress, [0.34, 0.44], [0, -24], { clamp: true });
  const insideOpacity = useTransform(progress, [0.8, 0.9], [0, 1], { clamp: true });
  const insideY = useTransform(progress, [0.8, 0.9], [18, 0], { clamp: true });
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  const boxStyle: React.CSSProperties = {
    left: geo.ox,
    top: geo.oy,
    width: IW * geo.k,
    height: IH * geo.k,
    transformOrigin: `${DOOR.x * geo.k}px ${DOOR.y * geo.k}px`,
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[240vh] md:h-[320vh] motion-reduce:h-auto! bg-[#1C1917]"
      aria-label="Threshold: from the street, through the arched door, into the dining room"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] motion-reduce:relative motion-reduce:h-[88svh] w-full overflow-hidden bg-[#1C1917]"
      >
        {/* Layer 1 — the shopfront, as one camera-moved plane */}
        <motion.div
          className="absolute"
          style={{ ...boxStyle, x, y, scale, opacity: facadeOpacity }}
        >
          <Image
            src={photos.facade.src}
            alt="The Guac N' Roll shopfront, approached from the forecourt"
            fill
            sizes="(max-width: 768px) 170vw, 100vw"
            className="object-fill"
          />
          {/* Layer 2 — the interior, seen through the arched door's glass */}
          <motion.div
            aria-hidden="true"
            className="absolute overflow-hidden"
            style={{
              left: GLASS.x * geo.k,
              top: GLASS.y * geo.k,
              width: GLASS.w * geo.k,
              height: GLASS.h * geo.k,
              borderRadius: "50% 50% 0 0 / 28% 28% 0 0",
              opacity: glimpse,
            }}
          >
            <div className="absolute" style={geo.glimpse}>
              <Image src={photos.interior.src} alt="" fill sizes="100vw" className="object-fill" />
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/55 via-transparent to-[#1C1917]/35 pointer-events-none" />
        </motion.div>

        {/* Layer 3 — the dining room, full resolution */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ opacity: interiorOpacity, scale: interiorScale }}
        >
          <Image
            src={photos.interior.src}
            alt="Inside Guac N' Roll: the arched pass-through to the kitchen, mauve ceiling curves and walnut tables"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: `${INTERIOR_POS * 100}% 50%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Contrast-safe editorial panel — solid surface, never text-on-photo */}
        <motion.div
          className="absolute z-10 inset-x-4 top-24 sm:inset-x-auto sm:left-8 lg:left-12 sm:top-auto sm:bottom-24 sm:max-w-md [@media(max-height:500px)]:top-[5.5rem]! [@media(max-height:500px)]:bottom-auto! [@media(max-height:500px)]:max-w-sm! motion-reduce:opacity-100! motion-reduce:transform-none!"
          style={{ opacity: panelOpacity, y: panelY }}
        >
          <div className="rounded-2xl bg-[#1C1917]/92 border border-[#F8F5EE]/12 p-5 sm:p-7 [@media(max-height:500px)]:p-4! shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
            <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#F5D48A]">
              Interlude · Crossing the threshold
            </span>
            <h2 className="mt-3 [@media(max-height:500px)]:mt-1.5! font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-[1.75rem] [@media(max-height:500px)]:text-lg! text-[#F8F5EE] font-medium leading-[1.25] tracking-[-0.01em]">
              Step through the arched door, out of the breeze-block screen and into the light inside.
            </h2>
            <div className="[@media(max-height:500px)]:hidden">
              <CelosiaPattern variant="divider" className="w-28 h-3 text-[#F5D48A]/70" />
            </div>
            <p className="[@media(max-height:500px)]:hidden font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-[#F8F5EE]/80 leading-relaxed">
              A third place built for students, friends, and unhurried conversations in Baben.
            </p>
          </div>
        </motion.div>

        {/* Arrival caption once inside */}
        <motion.div
          className="absolute z-10 inset-x-4 bottom-40 md:bottom-24 sm:inset-x-auto sm:right-8 lg:right-12 sm:max-w-sm [@media(max-height:500px)]:top-[5.5rem]! [@media(max-height:500px)]:bottom-auto! motion-reduce:opacity-100! motion-reduce:transform-none!"
          style={{ opacity: insideOpacity, y: insideY }}
        >
          <div className="rounded-2xl bg-[#F8F5EE]/95 border border-[#261C16]/10 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]">
            <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
              Inside · Shop 9 &amp; 10
            </span>
            <p className="mt-2 font-[family-name:var(--font-playfair)] text-lg text-[#261C16] leading-snug">
              The arch you walked through returns over the kitchen counter.
            </p>
          </div>
        </motion.div>

        {/* Threshold progress rail */}
        <div
          className="absolute z-10 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 bottom-[6.5rem] md:bottom-8 [@media(max-height:500px)]:hidden motion-reduce:hidden"
          aria-hidden="true"
        >
          <div className="flex justify-between font-[family-name:var(--font-syne)] text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-bold text-[#F8F5EE]/85 mb-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            <span>Outside</span>
            <span>Threshold</span>
            <span>Inside</span>
          </div>
          <div className="relative h-px bg-[#F8F5EE]/25">
            <motion.div className="absolute inset-0 bg-[#F5D48A] origin-left" style={{ scaleX: railScale }} />
          </div>
        </div>
      </div>
    </section>
  );
}
