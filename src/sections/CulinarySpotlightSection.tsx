import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { CulinarySpotlight } from "@/components/motion/CulinarySpotlight";

export function CulinarySpotlightSection() {
  return (
    <Section spacing="standard" background="inset" className="overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 03 · THE CULINARY SPOTLIGHT
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                At the table
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              One Table, <span className="italic text-[#8D6E66]">Up Close</span>
            </Heading>
          </div>
          <p className="text-xs sm:text-sm text-[#52463E] max-w-xs leading-relaxed">
            Four details from a single photograph taken at our table — paired with what the printed menu actually lists.
          </p>
        </div>

        <CulinarySpotlight />
      </Container>
    </Section>
  );
}
