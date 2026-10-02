import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { ArrowRight, Coffee, Users, Moon } from "lucide-react";

export function SocialRitualSection() {
  const rituals = [
    {
      index: "01",
      icon: Coffee,
      title: "The Afternoon Pause",
      description:
        "Pull up a chair and decompress over freshly brewed specialty coffee, crisp tacos, or a chilled smoothie.",
    },
    {
      index: "02",
      icon: Users,
      title: "The Shared Platter",
      description:
        "Tacos in sets of four, freshly prepped guacamole, and loaded nachos supreme crafted to pass around with friends at a spacious communal table.",
    },
    {
      index: "03",
      icon: Moon,
      title: "Twilight Under Cordless Glow",
      description:
        "As sunset falls across Baben, warm cordless tabletop lamps take over, setting an intimate atmosphere for evening hangouts until 11:00 PM.",
    },
  ];

  return (
    <Section spacing="standard" background="inset" className="border-b border-[#261C16]/10">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 04 · THE SOCIAL RITUAL
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Baben · Mota Road
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              Afternoons &amp; Twilight
            </Heading>
          </div>

          <p className="text-xs sm:text-sm text-[#52463E] max-w-xs leading-relaxed">
            An unpretentious third place on Mota Road designed for slow afternoons, shared plates, and conversations that outlast the food.
          </p>
        </div>

        {/* Narrative & Ritual Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left: Atmospheric Manifesto Block */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F5EE] border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.05)] space-y-6">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66] block">
                THE THIRD PLACE ETHOS
              </span>

              <blockquote className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16] leading-snug">
                &ldquo;A cafe should never make you feel like your table has a countdown timer.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                Whether you&apos;re catching up with friends, reading quietly in a corner, or sharing an evening meal, our space was intentionally shaped for lingering.
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#261C16]/10">
                <span className="text-[11px] font-medium text-[#7D6F66]">
                  Open Daily · 11:00 AM — 11:00 PM
                </span>
                <Button
                  href="/about"
                  variant="outline"
                  size="sm"
                  shape="architectural"
                  className="group"
                >
                  <span>Our Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="hidden lg:block pl-2">
              <CelosiaPattern variant="divider" className="w-48 h-3 text-[#DBC5A6] opacity-60" />
            </div>
          </div>

          {/* Right: Three Social Rhythms */}
          <div className="lg:col-span-7 space-y-6">
            {rituals.map((ritual) => {
              const Icon = ritual.icon;
              return (
                <div
                  key={ritual.index}
                  className="p-6 sm:p-8 rounded-2xl bg-[#EFE8DC]/50 hover:bg-[#EFE8DC]/80 border border-[#261C16]/10 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#261C16]/5 text-[#8D6E66] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-bold text-[#261C16]">
                        {ritual.title}
                      </h3>
                    </div>
                    <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-[#8D6E66]">
                      {ritual.index}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed pl-12">
                    {ritual.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
