"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CropImage } from "@/components/motion/CropImage";
import { useCardDepth, useCoverflow } from "@/components/motion/useCoverflow";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { memoryFragments, photos, type MemoryFragment } from "@/data/visualArchive";

const pad = (n: number) => String(n).padStart(2, "0");
const COUNT = memoryFragments.length;
const ARCH_RADIUS = "50% 50% 6px 6px / 40% 40% 6px 6px";

function cropSizes(f: MemoryFragment, desktopPx: number, mobileVw: number) {
  const ratio = photos[f.photo].width / f.crop.w;
  return `(min-width: 1024px) ${Math.ceil(desktopPx * ratio)}px, ${Math.ceil(mobileVw * ratio)}vw`;
}

/** The printed-photograph object shared by both layouts. */
function PrintCard({ fragment, index, sizes }: { fragment: MemoryFragment; index: number; sizes: string }) {
  const arched = fragment.kind === "Photograph";
  return (
    <div className="w-full bg-[#FBF8F1] p-2.5 pb-0 rounded-xl border border-[#261C16]/10 shadow-[0_30px_60px_-28px_rgba(38,28,22,0.55)]">
      <div
        className="relative w-full aspect-[4/5] overflow-hidden bg-[#261C16]/10"
        style={{ borderRadius: arched ? ARCH_RADIUS : "6px" }}
      >
        <CropImage photo={photos[fragment.photo]} crop={fragment.crop} sizes={sizes} alt="" />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1.5 py-3">
        <span className="font-[family-name:var(--font-playfair)] text-[15px] font-bold text-[#261C16] leading-tight truncate">
          {fragment.title}
        </span>
        <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.2em] font-bold text-[#8D6E66] shrink-0 tabular-nums">
          {pad(index + 1)}
        </span>
      </div>
    </div>
  );
}

function FragmentMeta({ index }: { index: number }) {
  const f = memoryFragments[index];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={f.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2 min-h-[118px]"
      >
        <div className="flex items-center gap-2.5 font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold">
          <span className="text-[#8D6E66]">{f.kind}</span>
          <span className="text-[#261C16]/25">/</span>
          <span className="text-[#7D6F66] font-medium">{f.place}</span>
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-medium text-[#261C16] leading-tight">
          {f.title}
        </h3>
        <p className="text-sm text-[#52463E] leading-relaxed max-w-[52ch]">{f.caption}</p>
      </motion.div>
    </AnimatePresence>
  );
}

/** Rotary seal: a small circular progress object that turns with the ribbon. */
function RotarySeal({ pos, active }: { pos: MotionValue<number>; active: number }) {
  const rotate = useTransform(pos, (p) => (p * 360) / COUNT);
  return (
    <div className="relative w-14 h-14 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full text-[#261C16]">
        <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        {memoryFragments.map((_, i) => {
          const a = ((i * 360) / COUNT - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={28 + Math.cos(a) * 21}
              y1={28 + Math.sin(a) * 21}
              x2={28 + Math.cos(a) * 25}
              y2={28 + Math.sin(a) * 25}
              stroke="currentColor"
              strokeOpacity={i === active ? 0.9 : 0.3}
              strokeWidth="1.2"
            />
          );
        })}
      </svg>
      <motion.div className="absolute inset-0" style={{ rotate }}>
        <span className="absolute left-1/2 top-[1px] -ml-[3.5px] w-[7px] h-[7px] rounded-full bg-[#8D6E66] ring-2 ring-[#F5D48A]/70" />
      </motion.div>
      <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-syne)] text-[11px] font-bold text-[#261C16] tabular-nums">
        {pad(active + 1)}
      </span>
    </div>
  );
}

function RibbonCard({
  fragment,
  index,
  pos,
  onSelect,
  reduced,
}: {
  fragment: MemoryFragment;
  index: number;
  pos: MotionValue<number>;
  onSelect: (i: number) => void;
  reduced: boolean;
}) {
  const tilt = index % 2 === 0 ? -1.6 : 1.4;
  const { style, shade } = useCardDepth(pos, index, {
    spread: 78,
    spreadFar: 48,
    rotate: 34,
    depth: 170,
    scaleStep: 0.07,
    visible: 3,
    tilt: reduced ? 0 : tilt,
  });
  return (
    <motion.div
      style={style}
      className="[grid-area:1/1] w-[clamp(250px,23vw,330px)] cursor-grab active:cursor-grabbing will-change-transform"
      onClick={() => onSelect(index)}
      aria-hidden="true"
    >
      <div className="relative">
        <PrintCard fragment={fragment} index={index} sizes={cropSizes(fragment, 330, 80)} />
        <motion.div
          className="absolute inset-0 rounded-xl bg-[#261C16] pointer-events-none"
          style={{ opacity: shade }}
        />
      </div>
    </motion.div>
  );
}

function DesktopRibbon() {
  const reduced = usePrefersReducedMotion();
  const stepEl = useRef<HTMLDivElement>(null);
  const getStep = useCallback(() => (stepEl.current?.offsetWidth ?? 300) * 0.7, []);
  const { pos, active, goTo, next, prev, stageRef, bind } = useCoverflow({
    count: COUNT,
    getStep,
    reduced,
  });

  return (
    <div className="hidden lg:block">
      <div
        ref={stageRef}
        {...bind}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Memory ribbon: photographs and details of the cafe. Use left and right arrow keys to browse."
        className="relative h-[clamp(420px,40vw,560px)] grid place-items-center select-none touch-pan-y [perspective:1500px] outline-none rounded-3xl focus-visible:ring-2 focus-visible:ring-[#8D6E66] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F5EE]"
      >
        {/* Floor shadow — grounds the ribbon as a physical object */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(38,28,22,0.16),transparent)]"
        />
        <div ref={stepEl} className="[grid-area:1/1] w-[clamp(250px,23vw,330px)] invisible" aria-hidden="true" />
        <div className="[grid-area:1/1] grid place-items-center [transform-style:preserve-3d] w-full">
          {memoryFragments.map((f, i) => (
            <RibbonCard key={f.id} fragment={f} index={i} pos={pos} onSelect={goTo} reduced={reduced} />
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-8">
          <FragmentMeta index={active} />
        </div>
        <div className="col-span-4 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous memory"
            className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <RotarySeal pos={pos} active={active} />
          <button
            type="button"
            onClick={next}
            disabled={active === COUNT - 1}
            aria-label="Next memory"
            className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {`Memory ${active + 1} of ${COUNT}: ${memoryFragments[active].title}. ${memoryFragments[active].caption}`}
      </p>
      <p className="mt-6 font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] text-[#7D6F66]">
        Drag, swipe the trackpad, or use ← → to wander
      </p>
    </div>
  );
}

/** Distance between two snap points in the native scroll list. */
function snapStep(list: HTMLElement) {
  const first = list.children[0] as HTMLElement | undefined;
  const second = list.children[1] as HTMLElement | undefined;
  if (!first || !second) return 1;
  return second.offsetLeft - first.offsetLeft;
}

function TouchRibbon() {
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = Math.max(0, Math.min(COUNT - 1, Math.round(el.scrollLeft / snapStep(el))));
        setActive((prev) => (prev === i ? prev : i));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToIndex = (i: number) => {
    const el = listRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(COUNT - 1, i));
    el.scrollTo({ left: target * snapStep(el), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="lg:hidden">
      <ul
        ref={listRef}
        aria-label="Memory ribbon: photographs and details of the cafe"
        className="-mx-5 sm:-mx-8 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none overscroll-x-contain px-[12vw] sm:px-[calc(50vw-170px)] py-4"
      >
        {memoryFragments.map((f, i) => (
          <li
            key={f.id}
            className={`snap-center shrink-0 w-[76vw] max-w-[340px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === active ? "scale-100 opacity-100" : "scale-[0.93] opacity-60"
            }`}
            aria-label={`${i + 1} of ${COUNT}: ${f.title}`}
          >
            <PrintCard fragment={f} index={i} sizes={cropSizes(f, 340, 76)} />
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-5">
        <FragmentMeta index={active} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-[#261C16] tabular-nums">
              {pad(active + 1)} / {pad(COUNT)}
            </span>
            <span className="relative block w-20 h-px bg-[#261C16]/15" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 bg-[#8D6E66] transition-[width] duration-300"
                style={{ width: `${((active + 1) / COUNT) * 100}%` }}
              />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Previous memory"
              className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center active:bg-[#261C16] active:text-[#F8F5EE] disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === COUNT - 1}
              aria-label="Next memory"
              className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center active:bg-[#261C16] active:text-[#F8F5EE] disabled:opacity-30"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemoryRibbon() {
  return (
    <div>
      <DesktopRibbon />
      <TouchRibbon />
    </div>
  );
}
