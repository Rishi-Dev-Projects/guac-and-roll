"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { useScrubProgress } from "@/components/motion/useScrubProgress";
import { useFinePointer } from "@/lib/useMediaQuery";
import { textReveal } from "@/lib/motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const SPRING = { stiffness: 120, damping: 20, mass: 0.6 };

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const fine = useFinePointer();

  // Scroll: the hero lifts away while the shopfront dollies slightly forward.
  // Under reduced motion progress holds at 0 (no movement at all).
  const { progress, reduced } = useScrubProgress(containerRef, ["start start", "end start"], 0);
  const textY = useTransform(progress, [0, 1], [0, -70]);
  const textOpacity = useTransform(progress, [0, 0.8], [1, 0.35]);
  const portalScale = useTransform(progress, [0, 1], [1, 1.06]);
  const portalY = useTransform(progress, [0, 1], [0, 40]);
  const patternX = useTransform(progress, [0, 1], [0, 30]);

  // Pointer depth: two real photographic planes separate in Z.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const tiltY = useTransform(sx, (v) => v * 3.5);
  const tiltX = useTransform(sy, (v) => v * -3);
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -8);
  const frontX = useTransform(sx, (v) => v * 16);
  const frontY = useTransform(sy, (v) => v * 12);
  const lightX = useTransform(sx, (v) => 40 + v * 22);
  const lightY = useTransform(sy, (v) => 38 + v * 18);
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(245, 212, 138, 0.24) 0%, transparent 58%)`;

  const interactive = fine && !reduced;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!interactive || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative w-full overflow-hidden bg-[#F8F5EE] border-b border-[#261C16]/10 pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 min-h-[92dvh] flex flex-col justify-center"
    >
      {/* Background Subtle Architectural Motif (3% opacity) */}
      <motion.div
        className="hidden md:block absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-[0.035] overflow-hidden select-none"
        aria-hidden="true"
        style={{ x: patternX }}
      >
        <CelosiaPattern variant="screen" className="w-full h-full text-[#261C16]" />
      </motion.div>

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ============================================================
              LEFT COLUMN (7 cols): Editorial Typography & Brand Statement
              ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.09,
                  delayChildren: 0.05,
                },
              },
            }}
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8"
          >
            {/* Eyebrow Spatial Index */}
            <motion.div
              variants={textReveal}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs"
            >
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-[#8D6E66]">
                01 · THE THRESHOLD
              </span>
              <span className="text-[#261C16]/30">/</span>
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[#7D6F66] font-medium">
                Baben · Bardoli, Gujarat
              </span>
            </motion.div>

            {/* Monumental Brand Heading */}
            <motion.div variants={textReveal} className="space-y-1">
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.035em] leading-[0.92] text-[#261C16]">
                <span className="block">GUAC</span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-5">
                  <span className="font-[family-name:var(--font-playfair)]">N&apos;</span>
                  <span className="italic font-normal text-[#8D6E66]">ROLL</span>
                  <span className="font-[family-name:var(--font-syne)] text-xs sm:text-sm tracking-[0.2em] uppercase text-[#7D6F66] font-semibold not-italic ml-1">
                    CAFE
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Editorial Concept & Narrative Anchor */}
            <motion.p
              variants={textReveal}
              className="font-[family-name:var(--font-plus-jakarta)] text-base sm:text-lg md:text-xl text-[#52463E] leading-[1.65] max-w-[44ch]"
            >
              A modern Mexican sanctuary framed by terracotta breeze blocks and sculpted earth arches. Mexican-inspired comfort, slow espresso, and unhurried afternoons.
            </motion.p>

            {/* Verified Location & Hours Badges */}
            <motion.div
              variants={textReveal}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#1C1917]/75 font-medium"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8D6E66] shrink-0" />
                <span>Shop 9 & 10, Ambiance Twin City</span>
              </div>
              <div className="hidden sm:block text-[#261C16]/20">·</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5F7355] shrink-0" />
                <span>Daily 11:00 AM — 11:00 PM</span>
              </div>
            </motion.div>

            {/* Primary Action Button (Architectural & Tactile) */}
            <motion.div
              variants={textReveal}
              className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Button
                href="/menu"
                variant="primary"
                size="lg"
                shape="architectural"
                className="group text-sm font-semibold tracking-wide"
              >
                <span>Explore The Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                href="/visit"
                variant="outline"
                size="lg"
                shape="architectural"
                className="text-sm font-semibold tracking-wide"
              >
                Find Our Tables
              </Button>
            </motion.div>

            {/* Bottom Factual Metadata Strip */}
            <motion.div
              variants={textReveal}
              className="pt-6 sm:pt-8 mt-2 border-t border-[#261C16]/10 grid grid-cols-2 gap-6 text-xs text-[#52463E]"
            >
              <div>
                <span className="block font-[family-name:var(--font-syne)] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66] mb-1">
                  Culinary Character
                </span>
                <span className="font-semibold text-[#1C1917]">
                  Mexican-Inspired Cafe &amp; Kitchen
                </span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-syne)] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66] mb-1">
                  Location
                </span>
                <span className="font-semibold text-[#1C1917]">
                  Shop 9 &amp; 10 · Ambiance Twin City
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT COLUMN (5 cols): The shopfront as a spatial stage.
              Back plane: facade photograph. Front plane: neon lettering.
              ============================================================ */}
          <motion.div
            style={{ scale: portalScale, y: portalY }}
            className="lg:col-span-5 relative mt-6 lg:mt-0 [perspective:1200px]"
          >
            <motion.div
              style={interactive ? { rotateX: tiltX, rotateY: tiltY } : undefined}
              className="relative [transform-style:preserve-3d]"
            >
              {/* The Main Architectural Arched Portal Frame — rises into view */}
              <motion.div
                initial={{ clipPath: "inset(24% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative w-full rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/12 shadow-[0_24px_48px_-16px_rgba(38,28,22,0.12)]"
              >
                {/* Aspect Ratio Box */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                  <motion.div
                    className="absolute -inset-[4%]"
                    style={interactive ? { x: backX, y: backY } : undefined}
                  >
                    <Image
                      src="/images/cafe/facade-exterior.png"
                      alt="Guac N' Roll Cafe exterior breeze-block celosia screen wall and arched entrance in Bardoli"
                      fill
                      loading="eager"
                      fetchPriority="high"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                  {/* Ambient amber light — follows the pointer on desktop */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{ background: light }}
                  />
                </div>

                {/* Inset Architectural Caption Tag */}
                <div className="p-4 sm:p-5 bg-[#F8F5EE] border-t border-[#261C16]/10 flex items-center justify-between">
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] font-bold text-sm sm:text-base text-[#261C16]">
                      The Celosia Facade
                    </p>
                    <p className="text-[11px] text-[#7D6F66]">
                      Shop 9 &amp; 10 · Ambiance Twin City, Bardoli
                    </p>
                  </div>
                  <Link
                    href="/gallery"
                    className="min-h-[44px] inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#8D6E66] hover:text-[#261C16] transition-colors"
                  >
                    Gallery →
                  </Link>
                </div>
              </motion.div>

              {/* Front plane: Illuminated neon lettering, lifted in Z (Desktop & Tablet) */}
              <motion.div
                className="hidden sm:block absolute -bottom-6 -left-8 lg:-bottom-8 lg:-left-10 w-36 h-36 sm:w-40 sm:h-40"
                style={interactive ? { x: frontX, y: frontY, z: 70 } : undefined}
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-[#F8F5EE] shadow-[0_22px_44px_-12px_rgba(38,28,22,0.38)] bg-[#0D0B0A]"
                  title="Illuminated GUAC N' ROLL Neon Signage"
                >
                  <Image
                    src="/images/brand/logo-neon.jpg"
                    alt="Illuminated GUAC N' ROLL warm neon typography"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                    <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5D48A]">
                      Night Glow
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
