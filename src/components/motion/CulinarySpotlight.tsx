"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CropImage } from "@/components/motion/CropImage";
import { useCardDepth, useCoverflow } from "@/components/motion/useCoverflow";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { photos, spotlightFrames, type SpotlightFrame } from "@/data/visualArchive";
import { menuCategories, menuItems } from "@/data/menu";

const COUNT = spotlightFrames.length;
const pad = (n: number) => String(n).padStart(2, "0");

/** Facts derived from src/data/menu.ts — never hand-written. */
function categoryFacts(id: string) {
  const items = id === "all" ? menuItems : menuItems.filter((i) => i.category === id);
  const prices = items.map((i) => i.price);
  const category = menuCategories.find((c) => c.id === id);
  return {
    id,
    name: category ? category.name : "The full menu",
    href: category ? `/menu#${category.id}` : "/menu",
    count: items.length,
    min: Math.min(...prices),
    max: Math.max(...prices),
    names: items.map((i) => i.name),
  };
}

function SpotlightCard({
  frame,
  index,
  pos,
  onSelect,
}: {
  frame: SpotlightFrame;
  index: number;
  pos: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const { style, shade } = useCardDepth(pos, index, {
    spread: 58,
    spreadFar: 22,
    rotate: 22,
    depth: 120,
    scaleStep: 0.08,
    visible: 2,
  });
  const ratio = photos.table.width / frame.crop.w;
  return (
    <motion.div
      style={style}
      onClick={() => onSelect(index)}
      aria-hidden="true"
      className="[grid-area:1/1] w-[clamp(220px,64vw,400px)] lg:w-[clamp(280px,25vw,360px)] cursor-grab active:cursor-grabbing will-change-transform"
    >
      <div className="relative rounded-[1.4rem] bg-[#261C16] p-1.5 shadow-[0_40px_70px_-30px_rgba(38,28,22,0.6)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
          <CropImage
            photo={photos.table}
            crop={frame.crop}
            alt=""
            sizes={`(min-width: 1024px) ${Math.ceil(420 * ratio)}px, ${Math.ceil(64 * ratio)}vw`}
          />
          <span className="absolute top-3 left-3 rounded-full bg-[#1C1917]/70 backdrop-blur-sm px-2.5 py-1 font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5D48A]">
            Frame {pad(index + 1)}
          </span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-[1.4rem] bg-[#F8F5EE] pointer-events-none"
          style={{ opacity: shade }}
        />
      </div>
    </motion.div>
  );
}

function ProgressRule({ pos }: { pos: MotionValue<number> }) {
  const scaleX = useTransform(pos, (p) => (p + 1) / COUNT);
  return (
    <span className="relative block h-px w-full bg-[#261C16]/15 overflow-hidden" aria-hidden="true">
      <motion.span className="absolute inset-0 bg-[#261C16] origin-left" style={{ scaleX }} />
    </span>
  );
}

export function CulinarySpotlight() {
  const reduced = usePrefersReducedMotion();
  const sizer = useRef<HTMLDivElement>(null);
  const getStep = useCallback(() => (sizer.current?.offsetWidth ?? 320) * 0.58, []);
  const { pos, active, goTo, next, prev, stageRef, bind } = useCoverflow({
    count: COUNT,
    getStep,
    reduced,
  });

  const frame = spotlightFrames[active];
  const facts = frame.categories.map(categoryFacts);
  const identifiesCategoryOnly = frame.id === "plate" || frame.id === "glass";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Stage */}
      <div className="lg:col-span-7 min-w-0">
        <div
          ref={stageRef}
          {...bind}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Culinary spotlight: four details from one table photograph. Use left and right arrow keys to change frame."
          className="relative -mx-5 sm:mx-0 overflow-hidden py-6 grid place-items-center select-none touch-pan-y [perspective:1300px] outline-none rounded-3xl focus-visible:ring-2 focus-visible:ring-[#8D6E66] focus-visible:ring-offset-4 focus-visible:ring-offset-[#EFE8DC]"
        >
          <div
            ref={sizer}
            className="[grid-area:1/1] w-[clamp(220px,64vw,400px)] lg:w-[clamp(280px,25vw,360px)] aspect-[4/5] invisible"
            aria-hidden="true"
          />
          <div className="[grid-area:1/1] grid place-items-center w-full [transform-style:preserve-3d]">
            {spotlightFrames.map((f, i) => (
              <SpotlightCard key={f.id} frame={f} index={i} pos={pos} onSelect={goTo} />
            ))}
          </div>
        </div>
      </div>

      {/* Synchronised editorial panel */}
      <div className="relative z-10 lg:col-span-5 space-y-7">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold">
            <span className="text-[#8D6E66]">
              Frame {pad(active + 1)} / {pad(COUNT)}
            </span>
            <span className="text-[#7D6F66] font-medium">One photograph · four details</span>
          </div>
          <ProgressRule pos={pos} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={frame.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 min-h-[300px]"
          >
            <div className="space-y-3">
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-medium text-[#261C16] leading-tight">
                {frame.title}
              </h3>
              <p className="text-sm sm:text-base text-[#52463E] leading-relaxed">{frame.caption}</p>
            </div>

            <div className="border-t border-[#261C16]/15 divide-y divide-[#261C16]/10">
              {facts.map((f) => (
                <div key={f.id} className="py-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link
                      href={f.href}
                      className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#261C16] hover:text-[#8D6E66] transition-colors"
                    >
                      {f.name}
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <span className="text-xs text-[#52463E] tabular-nums whitespace-nowrap">
                      {f.count} {f.id === "all" ? "items" : "on the menu"} · ₹{f.min}–₹{f.max}
                    </span>
                  </div>
                  {f.id !== "all" && (
                    <p className="text-xs text-[#7D6F66] leading-relaxed">{f.names.join(" · ")}</p>
                  )}
                  {f.id === "all" && (
                    <p className="text-xs text-[#7D6F66] leading-relaxed">
                      {menuCategories.length} categories, transcribed from the printed card.
                    </p>
                  )}
                </div>
              ))}
            </div>

            {identifiesCategoryOnly && (
              <p className="text-[11px] text-[#7D6F66] italic leading-relaxed">
                The exact variety in this photograph isn&apos;t recorded, so we don&apos;t name it.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous frame"
            className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={active === COUNT - 1}
            aria-label="Next frame"
            className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="ml-2 font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] text-[#7D6F66]">
            Drag or swipe the frames
          </span>
        </div>
        <p className="sr-only" aria-live="polite">
          {`Frame ${active + 1} of ${COUNT}: ${frame.title}. ${frame.caption}`}
        </p>
      </div>
    </div>
  );
}
