import React from "react";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { ArrowRight } from "lucide-react";

export function CuratedGallerySection() {
  const moments = [
    {
      title: "The Breeze-Block Screen",
      category: "Architecture",
      src: "/images/cafe/facade-exterior.png",
      caption: "Kiln-fired terracotta celosias filtering Gujarat daylight at Shop 9 & 10.",
      shape: "rounded-t-[3rem] rounded-b-2xl",
    },
    {
      title: "Sculpted Mauve Arches",
      category: "Interior",
      src: "/images/cafe/interior-arches.png",
      caption: "Lime-plaster ceiling curves, ceramic display niches, and blonde oak herringbone floor.",
      shape: "rounded-2xl",
    },
    {
      title: "Artisanal Tableware",
      category: "Culinary",
      src: "/images/food/tacos-drink-table.png",
      caption: "Hand-folded crispy tacos served on raw-rim ceramic platters with layered botanical coolers.",
      shape: "rounded-2xl",
    },
  ];

  return (
    <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 05 · VISUAL EVIDENCE
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Authentic Photography
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              Through the Architectural Lens
            </Heading>
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

        {/* Asymmetric Editorial Photographic Spread (7 cols featured / 5 cols stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Featured Architectural Portal (7 cols) */}
          <div className="lg:col-span-7 group space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-t-[3.5rem] sm:rounded-t-[4rem] rounded-b-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.08)]">
              <Image
                src={moments[0].src}
                alt={moments[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
              />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#EFE8DC]/50 border border-[#261C16]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase font-bold tracking-wider text-[#8D6E66]">
                    01 · {moments[0].category}
                  </span>
                  <span className="text-[#261C16]/20">/</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#261C16]">
                    {moments[0].title}
                  </h3>
                </div>
                <p className="text-[#52463E] leading-relaxed max-w-lg">
                  {moments[0].caption}
                </p>
              </div>
              <span className="text-[11px] text-[#7D6F66] shrink-0 font-[family-name:var(--font-syne)] uppercase tracking-wider">
                Shop 9 &amp; 10
              </span>
            </div>
          </div>

          {/* RIGHT: Stacked Complementary Moments (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {moments.slice(1).map((moment, idx) => (
              <div key={moment.title} className="group space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_16px_36px_-12px_rgba(38,28,22,0.06)]">
                  <Image
                    src={moment.src}
                    alt={moment.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#261C16] group-hover:text-[#8D6E66] transition-colors">
                      {moment.title}
                    </h3>
                    <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase font-bold tracking-wider text-[#8D6E66]">
                      0{idx + 2} · {moment.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#52463E] leading-relaxed">
                    {moment.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
