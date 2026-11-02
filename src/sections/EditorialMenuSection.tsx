import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { PhysicalMenuFolio } from "@/components/motion/PhysicalMenuFolio";
import { menuCategories, menuItems } from "@/data/menu";
import { ArrowRight } from "lucide-react";

export function EditorialMenuSection() {
  return (
    <Section
      id="menu-folio"
      spacing="standard"
      background="primary"
      className="border-b border-[#261C16]/10 overflow-x-clip"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 04 · THE PRINTED MENU
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Turn the pages
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              The Menu Folio
            </Heading>
            <p className="text-sm sm:text-base text-[#52463E] leading-relaxed max-w-[52ch]">
              Every page is set from our printed menu card — {menuCategories.length} courses,{" "}
              {menuItems.length} dishes and drinks, prices exactly as printed.
            </p>
          </div>

          <div className="md:text-right shrink-0">
            <Badge variant="biscuit">Mexican-Inspired Repertoire</Badge>
          </div>
        </div>

        <PhysicalMenuFolio initialCategory="tacos" />

        {/* Plain-list fallback & reassurance */}
        <div className="mt-14 pt-8 border-t border-[#261C16]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7D6F66] text-center sm:text-left">
            Prefer a single list? The full menu page shows every course at once.
          </p>
          <Button
            href="/menu"
            variant="outline"
            size="md"
            shape="architectural"
            className="group w-full sm:w-auto"
          >
            <span>View Full {menuCategories.length}-Category Menu</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
