import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { MemoryRibbon } from "@/components/motion/MemoryRibbon";
import { ArrowRight } from "lucide-react";

export function CuratedGallerySection() {
  return (
    <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10 overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 06 · THE MEMORY RIBBON
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Authentic Photography
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              Fragments of the Cafe
            </Heading>
            <p className="text-sm sm:text-base text-[#52463E] leading-relaxed max-w-[52ch]">
              A walk from the street to the table, kept as prints: real photographs of Shop 9 &amp; 10, and the details inside them.
            </p>
          </div>

          <Button
            href="/gallery"
            variant="outline"
            size="md"
            shape="architectural"
            className="group shrink-0"
          >
            <span>Inspect All Archives</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <MemoryRibbon />
      </Container>
    </Section>
  );
}
