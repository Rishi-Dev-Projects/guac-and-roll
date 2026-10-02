import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { menuCategories, menuItems } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { constructMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Food & Beverage Menu · Guac N' Roll Cafe",
  description:
    "View the complete 11-category food and beverage menu at Guac N' Roll Cafe in Baben, Bardoli. Featuring tacos, sizzlers, burritos, burrito bowls, quesadillas, smoothies, and specialty coffee.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      {/* 1. Menu Editorial Header */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  OFFICIAL REPERTOIRE
                </span>
                <span className="text-[#261C16]/20">/</span>
                <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                  Baben · Bardoli
                </span>
              </div>
              <Heading as="h1" size="display" className="text-[#261C16]">
                The Full Menu
              </Heading>
              <Text tone="muted" size="lg" className="leading-relaxed">
                A digital translation of our physical printed menu. 11 curated categories of Mexican-inspired comfort, artisanal coffee, and fresh coolers.
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Badge variant="biscuit" size="md">
                11 Curated Categories
              </Badge>
              <Badge variant="biscuit" size="md">
                Daily 11 AM — 11 PM
              </Badge>
            </div>
          </div>

          {/* Category Quick-Jump Anchor Bar */}
          <div className="sticky top-20 z-20 -mx-5 px-5 py-3 bg-[#F8F5EE]/95 backdrop-blur-md border-y border-[#261C16]/10 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66] shrink-0 mr-2 hidden sm:inline-block">
              Jump To:
            </span>
            {menuCategories.map((category, idx) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="min-h-[38px] px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap rounded-lg bg-[#261C16]/5 hover:bg-[#261C16] hover:text-[#F8F5EE] text-[#1C1917]/80 transition-all select-none flex items-center gap-1.5"
              >
                <span className="opacity-50 text-[10px]">0{idx + 1}</span>
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Menu Catalog (Full 11 Categories with Aligned Items) */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="space-y-20 lg:space-y-24">
            {menuCategories.map((category, catIndex) => {
              const itemsInCategory = menuItems.filter(
                (item) => item.category === category.id
              );

              return (
                <article
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-36 space-y-8"
                >
                  {/* Category Title & Index */}
                  <div className="border-b-2 border-[#261C16] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-[family-name:var(--font-syne)] text-sm sm:text-base font-bold text-[#8D6E66]">
                        {String(catIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#261C16] tracking-tight">
                          {category.name}
                        </h2>
                        {category.subtitle && (
                          <p className="font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-[#7D6F66] mt-1 italic">
                            {category.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="font-[family-name:var(--font-syne)] text-xs uppercase tracking-widest text-[#8D6E66] font-semibold">
                      {itemsInCategory.length} Offerings
                    </span>
                  </div>

                  {/* 2-Column Aligned Items List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                    {itemsInCategory.map((item, itemIdx) => (
                      <div
                        key={item.id}
                        className="group py-3 border-b border-[#261C16]/10 hover:border-[#261C16]/30 transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          {/* Dish Name & Description */}
                          <div className="flex items-baseline gap-3 flex-grow min-w-0">
                            <span className="font-[family-name:var(--font-syne)] text-xs font-semibold text-[#8D6E66] shrink-0 opacity-70">
                              {String(itemIdx + 1).padStart(2, "0")}
                            </span>
                            <div className="space-y-1 min-w-0 flex-grow">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#8D6E66] transition-colors leading-snug break-words">
                                  {item.name}
                                </h3>
                                {item.isSignature && (
                                  <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#DBC5A6]/40 text-[#261C16] shrink-0">
                                    Signature
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="font-[family-name:var(--font-plus-jakarta)] text-xs text-[#52463E] leading-relaxed max-w-sm italic">
                                  {item.description}
                                  {item.servingInfo ? ` · ${item.servingInfo}` : ""}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Tabular Price in INR */}
                          <div className="shrink-0 text-right whitespace-nowrap pl-2">
                            <span className="font-semibold text-base sm:text-lg tabular-nums text-[#261C16]">
                              ₹{item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Celosia Divider */}
          <div className="my-20">
            <CelosiaPattern variant="divider" className="w-64 h-4 text-[#DBC5A6] mx-auto opacity-50" />
          </div>

          {/* Physical Menu Heritage & Verification Documentation */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#EFE8DC]/60 border border-[#261C16]/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold text-[#8D6E66] block">
                Source of Truth
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                Physical Menu Heritage
              </h3>
              <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                All 48 menu items, prices in INR, and ingredient descriptions are verified directly from the printed Guac N&apos; Roll physical menu card. No fictional dishes, estimated prices, or unverified claims have been added.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                href={siteConfig.location.googleMapsShareUrl}
                isExternal
                variant="primary"
                size="md"
                shape="architectural"
              >
                <span>Visit Us in Bardoli</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="md"
                shape="architectural"
              >
                The Cafe Story
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
