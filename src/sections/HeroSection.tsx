"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { imageReveal, textReveal } from "@/lib/motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background pattern shift
  const patternX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 30]);

  // Ambient light diagonal drift (using x and y translates)
  const lightX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 40]);
  const lightY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 60]);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[#F8F5EE] border-b border-[#261C16]/10 pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 min-h-[92dvh] flex flex-col justify-center">
      {/* Background Subtle Architectural Motif (3% opacity) */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-[0.035] overflow-hidden select-none will-change-transform"
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
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.09,
                  delayChildren: 0.05,
                },
              },
            }}
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
              RIGHT COLUMN (5 cols): Dominant Architectural Exterior Image
              ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageReveal}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            {/* The Main Architectural Arched Portal Frame */}
            <div className="relative w-full rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/12 shadow-[0_24px_48px_-16px_rgba(38,28,22,0.12)]">
              {/* Aspect Ratio Box */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/cafe/facade-exterior.png"
                  alt="Guac N' Roll Cafe exterior breeze-block celosia screen wall and arched entrance in Bardoli"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025]"
                />
                {/* Daylight Shift Ambient Light Gradient */}
                <motion.div 
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none will-change-transform mix-blend-overlay"
                  style={{ 
                    x: lightX, 
                    y: lightY,
                    background: "radial-gradient(circle at 40% 40%, rgba(245, 212, 138, 0.15) 0%, transparent 60%)" 
                  }}
                />
              </div>

              {/* Inset Architectural Caption Tag */}
              <div className="p-4 sm:p-5 bg-[#F8F5EE] border-t border-[#261C16]/10 flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-playfair)] font-bold text-sm sm:text-base text-[#261C16]">
                    The Celosia Facade
                  </p>
                  <p className="text-[11px] text-[#7D6F66]">
                    Shop 9 & 10 · Ambiance Twin City, Bardoli
                  </p>
                </div>
                <Link
                  href="/gallery"
                  className="text-xs uppercase tracking-wider font-semibold text-[#8D6E66] hover:text-[#261C16] transition-colors"
                >
                  Gallery →
                </Link>
              </div>
            </div>

            {/* Layered Detail: Illuminated Neon Signage Detail Thumbnail (Desktop & Tablet) */}
            <div
              className="hidden sm:block absolute -bottom-6 -left-8 lg:-bottom-8 lg:-left-10 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-[#F8F5EE] shadow-[0_16px_36px_-10px_rgba(38,28,22,0.3)] bg-[#0D0B0A]"
              title="Illuminated GUAC N' ROLL Neon Signage"
            >
              <Image
                src="/images/brand/logo-neon.jpg"
                alt="Illuminated GUAC N' ROLL warm neon typography"
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5D48A]">
                  Night Glow
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
