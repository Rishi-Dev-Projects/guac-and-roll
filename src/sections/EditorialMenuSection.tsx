"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { menuCategories, menuItems, MenuCategoryId } from "@/data/menu";
import { ArrowRight } from "lucide-react";

export function EditorialMenuSection() {
  // Default to tacos (one of the signature visual categories) or starters
  const [activeCategoryId, setActiveCategoryId] = useState<MenuCategoryId>("tacos");

  const activeCategory =
    menuCategories.find((cat) => cat.id === activeCategoryId) || menuCategories[1];

  const activeItems = menuItems.filter((item) => item.category === activeCategoryId);

  return (
    <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 03 · THE CULINARY REPERTOIRE
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Menu Repertoire
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              The Editorial Menu
            </Heading>
          </div>

          <div className="md:text-right shrink-0">
            <Badge variant="biscuit">Mexican-Inspired Repertoire</Badge>
          </div>
        </div>

        {/* Mobile Category Navigation (Horizontal scrollable rail) */}
        <div className="lg:hidden mb-8 -mx-5 px-5 overflow-x-auto scrollbar-none flex items-center gap-2">
          {menuCategories.map((category, idx) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`min-h-[44px] px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap rounded-lg transition-all select-none cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#261C16] text-[#F8F5EE]"
                    : "bg-[#261C16]/5 text-[#1C1917]/70 hover:bg-[#261C16]/10"
                }`}
              >
                <span className="opacity-60 text-[10px]">0{idx + 1}</span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Editorial Layout: 5 cols (Index & Anchor Image) / 7 cols (Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============================================================
              LEFT COLUMN (5 cols): Category Index Rail & Food Anchor Image
              ============================================================ */}
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-8 sticky top-28">
            {/* Category Navigation Index */}
            <div className="space-y-1">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold text-[#8D6E66] block mb-3">
                Index of Courses
              </span>
              <nav aria-label="Menu Category Index" className="space-y-1">
                {menuCategories.map((category, index) => {
                  const isActive = category.id === activeCategoryId;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategoryId(category.id)}
                      className={`w-full group text-left py-2 px-3 rounded-lg flex items-center justify-between text-xs tracking-wider uppercase transition-all select-none cursor-pointer ${
                        isActive
                          ? "bg-[#261C16] text-[#F8F5EE] font-semibold"
                          : "text-[#1C1917]/70 hover:text-[#261C16] hover:bg-[#261C16]/5 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-[family-name:var(--font-syne)] text-[10px] ${
                            isActive ? "text-[#DBC5A6]" : "text-[#7D6F66]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{category.name}</span>
                      </div>
                      <span
                        className={`text-[10px] tabular-nums ${
                          isActive ? "text-[#DBC5A6]" : "text-[#7D6F66]"
                        }`}
                      >
                        {menuItems.filter((i) => i.category === category.id).length} items
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Food Anchor Image (Selective Editorial Moment) */}
            <div className="pt-2">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/12 shadow-[0_16px_36px_-12px_rgba(38,28,22,0.1)]">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/food/tacos-drink-table.png"
                    alt="Crispy folded tacos on raw-clay green ceramic plate with layered mocktail"
                    fill
                    sizes="(max-width: 1200px) 40vw, 30vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-3 bg-[#F8F5EE] border-t border-[#261C16]/10 text-center">
                  <p className="text-[11px] text-[#52463E] italic">
                    Crispy folded tacos on handcrafted ceramic platter with layered tropical cooler
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN (7 cols): Active Category Header & Aligned Item List
              ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Category Lead Title */}
              <div className="border-b-2 border-[#261C16] pb-4 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#261C16] tracking-tight">
                    {activeCategory.name}
                  </h3>
                  {activeCategory.subtitle && (
                    <p className="font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-[#7D6F66] mt-1.5 italic">
                      {activeCategory.subtitle}
                    </p>
                  )}
                </div>
                <span className="font-[family-name:var(--font-syne)] text-xs uppercase tracking-widest text-[#8D6E66] font-bold shrink-0">
                  {activeItems.length} Offerings
                </span>
              </div>

              {/* Items List with Page-Turn Motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="divide-y divide-[#261C16]/10"
                >
                  {activeItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group py-5 first:pt-0 last:pb-0 transition-colors"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        {/* Title and Index */}
                        <div className="flex items-baseline gap-3 sm:gap-4 flex-grow min-w-0">
                          <span className="font-[family-name:var(--font-syne)] text-xs font-semibold text-[#8D6E66] shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="space-y-1 min-w-0 flex-grow">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-bold text-[#1C1917] group-hover:text-[#8D6E66] transition-colors leading-snug break-words">
                                {item.name}
                              </h4>
                              {item.isSignature && (
                                <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#DBC5A6]/40 text-[#261C16] shrink-0">
                                  Signature
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm text-[#52463E] leading-relaxed max-w-md italic">
                                {item.description}
                                {item.servingInfo ? ` · ${item.servingInfo}` : ""}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Leader dots & Tabular Pricing */}
                        <div className="shrink-0 text-right whitespace-nowrap pl-2">
                          <span className="font-semibold text-base sm:text-lg tabular-nums text-[#261C16]">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Menu Action & Reassurance */}
            <div className="mt-12 pt-8 border-t border-[#261C16]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#7D6F66]">
                Prices in INR. Freshly prepared in Baben, Bardoli.
              </p>
              <Button
                href="/menu"
                variant="outline"
                size="md"
                shape="architectural"
                className="group w-full sm:w-auto"
              >
                <span>View Full 11-Category Menu</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
