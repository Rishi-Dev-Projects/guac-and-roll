"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";

export function ArchwayThreshold() {
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
    offset: ["start start", "end end"],
  });

  // Math mappings as per blueprint
  // 0.00 - 0.35: Exterior locked at scale 1.0, text fades in
  // 0.35 - 0.70: Exterior scales up (camera approaches door)
  // 0.65 - 0.85: Cross-fade to interior
  
  const maxExteriorScale = isMobile ? 1.10 : 1.35;
  const exteriorScale = useTransform(
    scrollYProgress, 
    [0.35, 0.7], 
    [1.0, maxExteriorScale]
  );
  
  const exteriorOpacity = useTransform(
    scrollYProgress, 
    [0.65, 0.85], 
    [1.0, 0.0]
  );
  
  const interiorScale = useTransform(
    scrollYProgress, 
    [0.65, 0.85], 
    [1.08, 1.0]
  );
  
  const interiorOpacity = useTransform(
    scrollYProgress, 
    [0.65, 0.85], 
    [0.0, 1.0]
  );

  // Text motion
  const textOpacity = useTransform(
    scrollYProgress, 
    [0.05, 0.25, 0.55, 0.75], 
    [0, 1, 1, 0]
  );
  
  const textY = useTransform(
    scrollYProgress, 
    [0.05, 0.25], 
    [30, 0]
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[120vh] md:h-[180vh] bg-[#1C1917]"
      aria-label="Threshold Transition"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#1C1917]">
        
        {/* Layer 1: Exterior Façade Portal */}
        <motion.div 
          className="absolute inset-0 w-full h-full origin-center will-change-transform"
          style={{ scale: exteriorScale, opacity: exteriorOpacity, transform: "translateZ(0)" }}
        >
          <Image 
            src="/images/cafe/facade-exterior.png" 
            alt="Approaching the Guac N' Roll facade"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Subtle architectural vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-[#1C1917]/30" />
        </motion.div>
        
        {/* Layer 2: Interior Sanctuary */}
        <motion.div 
          className="absolute inset-0 w-full h-full origin-center will-change-transform"
          style={{ scale: interiorScale, opacity: interiorOpacity, transform: "translateZ(0)" }}
        >
          <Image 
            src="/images/cafe/interior-arches.png" 
            alt="Inside the Guac N' Roll sanctuary"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#261C16]/20" />
        </motion.div>

        {/* Layer 3: Architectural Framing Text */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
          style={{ opacity: textOpacity, y: textY, transform: "translateZ(0)" }}
        >
          {/* Section Interlude Index */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#F5D48A]">
              INTERLUDE · CROSSING THE THRESHOLD
            </span>
          </div>
          
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-5xl text-white font-medium leading-[1.25] tracking-[-0.015em] max-w-4xl drop-shadow-xl">
            Step past the terracotta breeze blocks into an interior sculpted from earth plaster, warm oak parquet, and quiet light.
          </h2>
          
          <div className="py-6 sm:py-10">
            <CelosiaPattern variant="divider" className="w-32 sm:w-48 h-3 sm:h-4 text-[#F5D48A]/80 drop-shadow-lg" />
          </div>

          <p className="font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-white/80 tracking-wide uppercase font-medium max-w-md drop-shadow-md">
            A third place built for students, friends, and unhurried conversations in Baben.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
