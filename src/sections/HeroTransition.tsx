import React from "react";
import { Container } from "@/components/primitives/Container";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";

export function HeroTransition() {
  return (
    <section className="relative w-full bg-[#F8F5EE] py-16 sm:py-20 md:py-24 border-b border-[#261C16]/10 overflow-hidden">
      <Container size="editorial">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Section Interlude Index */}
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
              INTERLUDE · CROSSING THE THRESHOLD
            </span>
          </div>

          {/* Architectural Poetic Statement */}
          <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[#261C16] font-medium leading-[1.25] tracking-[-0.015em]">
            Step past the terracotta breeze blocks into an interior sculpted from earth plaster, warm oak parquet, and quiet light.
          </p>

          {/* Architectural Celosia Punctuation Mark */}
          <div className="py-2">
            <CelosiaPattern variant="divider" className="w-56 h-4 text-[#DBC5A6]" />
          </div>

          {/* Quiet Narrative Lead-In */}
          <p className="font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-[#7D6F66] tracking-wide uppercase font-medium max-w-md">
            A third place built for students, friends, and unhurried conversations in Baben.
          </p>
        </div>
      </Container>
    </section>
  );
}
