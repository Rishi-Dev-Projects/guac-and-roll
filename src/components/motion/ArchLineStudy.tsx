"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useScrubProgress } from "@/components/motion/useScrubProgress";
import { photos } from "@/data/visualArchive";

/**
 * "One Arch, Three Times" — a continuous architectural line drawn over the
 * real photographs. Every path traces geometry measured on the photo itself
 * (source-pixel coordinates; see docs/PHASE-7-INTERACTION-AUDIT.md §5).
 * The SVG viewBox equals the photo size and uses `slice`, so it stays locked
 * to the `object-cover` image at every viewport size.
 */

interface Segment {
  id: string;
  letter: string;
  d: string;
  /** Portion of the overall study progress during which this segment draws. */
  range: [number, number];
  marker: { x: number; y: number };
  label: string;
  note: string;
}

const FACADE: Segment[] = [
  {
    id: "door",
    letter: "A",
    // Forecourt line → arched door frame → forecourt line
    d: "M30 772 H433 V611 A76 76 0 0 1 585 611 V772 H707",
    range: [0.0, 0.16],
    marker: { x: 509, y: 535 },
    label: "The arched door",
    note: "Cut through the breeze-block screen on the shopfront.",
  },
  {
    id: "sign",
    letter: "B",
    // Screen edge → underside of the fascia → round-bottomed signboard
    d: "M707 772 V440 H267 V560 A62 62 0 0 1 143 560 V440",
    range: [0.16, 0.33],
    marker: { x: 205, y: 622 },
    label: "The signboard",
    note: "Its rounded base is the arch, turned upside down.",
  },
  {
    id: "gable",
    letter: "C",
    // Fascia → column → gable roof
    d: "M143 440 H52 V108 L365 2 L680 108 V395",
    range: [0.33, 0.5],
    marker: { x: 208, y: 56 },
    label: "Fascia & gable",
    note: "The roofline that frames the whole front.",
  },
];

const INTERIOR: Segment[] = [
  {
    id: "kitchen",
    letter: "D",
    d: "M318 582 A241 241 0 0 1 800 582",
    range: [0.52, 0.8],
    marker: { x: 559, y: 341 },
    label: "The kitchen arch",
    note: "Inside, the door's arch returns as the pass-through to the kitchen.",
  },
  {
    id: "niches",
    letter: "E",
    d: "M166 455 V362 A14 14 0 0 1 194 362 V455 M915 462 V437 A25 25 0 0 1 965 437 V462 M1072 398 V420 A38 38 0 0 0 1148 420 V398",
    range: [0.8, 1.0],
    marker: { x: 940, y: 412 },
    label: "Wall niches",
    note: "And again at small scale, holding vases along the walls.",
  },
];

function TracedPath({ seg, progress }: { seg: Segment; progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, seg.range, [0, 1], { clamp: true });
  const opacity = useTransform(pathLength, [0, 0.02], [0, 1]);
  return (
    <g>
      <motion.path
        d={seg.d}
        fill="none"
        stroke="#1C1917"
        strokeOpacity={0.5}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength, opacity }}
      />
      <motion.path
        d={seg.d}
        fill="none"
        stroke="#F5D48A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength, opacity }}
      />
    </g>
  );
}

function Marker({ seg, progress, r }: { seg: Segment; progress: MotionValue<number>; r: number }) {
  const opacity = useTransform(progress, [seg.range[1] - 0.02, seg.range[1] + 0.02], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <circle cx={seg.marker.x} cy={seg.marker.y} r={r} fill="#F5D48A" stroke="#1C1917" strokeWidth={r * 0.12} />
      <text
        x={seg.marker.x}
        y={seg.marker.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={r * 1.05}
        fontWeight={700}
        fill="#261C16"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        {seg.letter}
      </text>
    </motion.g>
  );
}

function Plate({
  photo,
  segments,
  progress,
  markerR,
  className,
  frameClass,
  sizes,
}: {
  photo: (typeof photos)["facade"] | (typeof photos)["interior"];
  segments: Segment[];
  progress: MotionValue<number>;
  markerR: number;
  className: string;
  frameClass: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#261C16] border border-[#261C16]/12 shadow-[0_24px_48px_-20px_rgba(38,28,22,0.25)] ${frameClass}`}>
      <div className={`relative w-full ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover object-center" />
        <svg
          viewBox={`0 0 ${photo.width} ${photo.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {segments.map((s) => (
            <TracedPath key={s.id} seg={s} progress={progress} />
          ))}
          {segments.map((s) => (
            <Marker key={s.id} seg={s} progress={progress} r={markerR} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function LegendRow({ seg, progress }: { seg: Segment; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [seg.range[0], seg.range[1]], [0.38, 1]);
  const scaleX = useTransform(progress, seg.range, [0, 1], { clamp: true });
  return (
    <motion.li style={{ opacity }} className="relative py-3.5 flex items-start gap-4">
      <span className="mt-0.5 w-6 h-6 rounded-full bg-[#F5D48A] text-[#261C16] font-[family-name:var(--font-syne)] text-[11px] font-bold flex items-center justify-center shrink-0">
        {seg.letter}
      </span>
      <div className="space-y-0.5">
        <p className="font-semibold text-sm text-[#1C1917]">{seg.label}</p>
        <p className="text-xs text-[#52463E] leading-relaxed">{seg.note}</p>
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-px bg-[#8D6E66] origin-left"
        style={{ scaleX }}
      />
    </motion.li>
  );
}

export function ArchLineStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useScrubProgress(ref, ["start 0.8", "end 0.6"]);

  return (
    <div ref={ref} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        <figure className="lg:col-span-5 space-y-3">
          <Plate
            photo={photos.facade}
            segments={FACADE}
            progress={progress}
            markerR={17}
            className="aspect-[4/5]"
            frameClass="rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-2xl"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <figcaption className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] text-[#7D6F66]">
            Outside · the shopfront on Mota Road
          </figcaption>
        </figure>
        <figure className="lg:col-span-7 space-y-3">
          <Plate
            photo={photos.interior}
            segments={INTERIOR}
            progress={progress}
            markerR={24}
            className="aspect-[4/3]"
            frameClass="rounded-2xl"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <figcaption className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] text-[#7D6F66]">
            Inside · the main dining room
          </figcaption>
        </figure>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 border-t border-[#261C16]/12">
        {[...FACADE, ...INTERIOR].map((s) => (
          <LegendRow key={s.id} seg={s} progress={progress} />
        ))}
      </ol>
    </div>
  );
}
