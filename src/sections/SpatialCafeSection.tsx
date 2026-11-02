import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Badge } from "@/components/primitives/Badge";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { ArchLineStudy } from "@/components/motion/ArchLineStudy";

export function SpatialCafeSection() {
  return (
    <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10 overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 02 · THE PHYSICAL SANCTUARY
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Baben, Bardoli
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              Sculpted Arches &amp; Unhurried Light
            </Heading>
          </div>

          <div className="md:text-right shrink-0">
            <Badge variant="biscuit">Interior Atmosphere</Badge>
          </div>
        </div>

        {/* Architectural line study — drawn over the real photographs */}
        <div className="mb-16 sm:mb-20 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#261C16] font-medium leading-[1.2]">
              One arch, <span className="italic text-[#8D6E66]">three times</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed max-w-md">
              Scroll to trace the building. The line follows only what the photographs show &mdash; the door, the sign, the roof &mdash; then carries the same arch inside.
            </p>
          </div>
          <ArchLineStudy />
        </div>

        {/* Spatial narrative & material notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#261C16] font-medium leading-[1.2]">
                A Space Made to Stay
              </h3>
              <Text tone="muted" size="base" className="leading-[1.7]">
                Located at Ambiance Twin City in Baben, Guac N&apos; Roll was built to slow down the day. Sweeping plaster curves in dusty adobe mauve frame an open pass-through kitchen, while natural daylight filters past the exterior celosia screen into intimate dining corners.
              </Text>
            </div>

            <div className="pt-2 hidden sm:block opacity-40">
              <CelosiaPattern variant="divider" className="w-64 h-3 text-[#DBC5A6]" />
            </div>
          </div>
          <div className="lg:col-span-7">
            {/* Architectural Features (Editorial Hairline List — No Card Boxes) */}
            <div className="border-t border-[#261C16]/12 divide-y divide-[#261C16]/10 text-xs sm:text-sm">
              <div className="py-4 flex items-start gap-4">
                <span className="font-[family-name:var(--font-syne)] font-bold text-[#8D6E66] shrink-0 text-xs">
                  01
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-[#1C1917] tracking-tight">
                    Sweeping Plaster Arches
                  </h4>
                  <p className="text-[#52463E] leading-relaxed text-xs">
                    Curved ceiling forms and recessed wall alcoves finished in tactile adobe mauve lime wash.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <span className="font-[family-name:var(--font-syne)] font-bold text-[#8D6E66] shrink-0 text-xs">
                  02
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-[#1C1917] tracking-tight">
                    Herringbone Timber Parquet
                  </h4>
                  <p className="text-[#52463E] leading-relaxed text-xs">
                    Blonde oak floors laid in a classic chevron rhythm, pairing warmth with architectural durability.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <span className="font-[family-name:var(--font-syne)] font-bold text-[#8D6E66] shrink-0 text-xs">
                  03
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-[#1C1917] tracking-tight">
                    Cordless Ambient Lighting
                  </h4>
                  <p className="text-[#52463E] leading-relaxed text-xs">
                    Individual minimalist black table lamps create pools of intimate warm light as evening settles over Bardoli.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <span className="font-[family-name:var(--font-syne)] font-bold text-[#8D6E66] shrink-0 text-xs">
                  04
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-[#1C1917] tracking-tight">
                    Space for Lingering
                  </h4>
                  <p className="text-[#52463E] leading-relaxed text-xs">
                    Comfortably spaced solid wood chairs and walnut tables designed for post-lecture debriefs and shared plates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
