"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: "Architecture" | "Interior" | "Culinary" | "Menu Artifact";
  caption: string;
  details: string;
  aspect: "4/3" | "16/9" | "3/4" | "1/1";
  shape?: "arch" | "rounded" | "restrained";
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "facade-exterior",
    src: "/images/cafe/facade-exterior.png",
    title: "Celosia Breeze-Block Façade",
    category: "Architecture",
    caption:
      "Perforated triangular terracotta screen wall and espresso-cased entry portal.",
    details:
      "Captured at dusk along Mota Road in Baben, Bardoli. The geometric breeze blocks filter ambient daylight while the warm illuminated signage welcomes patrons entering from Ambiance Twin City.",
    aspect: "4/3",
    shape: "arch",
  },
  {
    id: "interior-arches",
    src: "/images/cafe/interior-arches.png",
    title: "Sculptural Adobe Mauve Arches",
    category: "Interior",
    caption:
      "Sweeping curved lime-plaster ceiling arches and herringbone timber parquet.",
    details:
      "The primary architectural gesture of Guac N' Roll Cafe. Soft adobe mauve plaster forms continuous vaulted transitions, framing recessed display niches for ceramic vessels and intimate table settings.",
    aspect: "4/3",
    shape: "arch",
  },
  {
    id: "tacos-drink-table",
    src: "/images/food/tacos-drink-table.png",
    title: "Crispy Tacos & Citrus Layered Cooler",
    category: "Culinary",
    caption:
      "Hand-folded crispy tacos served on artisanal sage ceramic tableware.",
    details:
      "Signature taco plating featuring freshly prepped guacamole and cotija crumble, resting on an organic sage-glazed platter with raw clay edges, served alongside a layered citrus refresher.",
    aspect: "4/3",
    shape: "rounded",
  },
  {
    id: "logo-neon",
    src: "/images/brand/logo-neon.jpg",
    title: "Illuminated Geometric Wordmark",
    category: "Architecture",
    caption:
      "Custom condensed typography with warm amber neon illumination.",
    details:
      "The physical exterior signplate above Shop 9 & 10. Condensed modernist letterforms cast a warm amber glow against the deep espresso matte fascia along Mota Road in Baben.",
    aspect: "1/1",
    shape: "rounded",
  },
  {
    id: "physical-menu",
    src: "/images/menu/physical-menu.png",
    title: "Printed Editorial Menu Card",
    category: "Menu Artifact",
    caption:
      "3-column printed menu card with archival botanical avocado engraving.",
    details:
      "The authentic source of truth for all 48 menu items and verified INR prices. Printed on tactile cream cardstock with editorial serif headers and hand-drawn crosshatched avocado artwork.",
    aspect: "4/3",
    shape: "restrained",
  },
];

type CategoryFilter = "All" | "Architecture" | "Interior" | "Culinary" | "Menu Artifact";

export function GalleryLightbox() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === "All"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === selectedCategory);

  const currentPhoto = activeIndex !== null ? filteredPhotos[activeIndex] : null;

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  }, [activeIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  }, [activeIndex, filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const categories: { label: string; value: CategoryFilter; count: number }[] = [
    { label: "All Archives", value: "All", count: galleryPhotos.length },
    {
      label: "Architecture & Façade",
      value: "Architecture",
      count: galleryPhotos.filter((p) => p.category === "Architecture").length,
    },
    {
      label: "Interior Sanctuary",
      value: "Interior",
      count: galleryPhotos.filter((p) => p.category === "Interior").length,
    },
    {
      label: "Culinary Craft",
      value: "Culinary",
      count: galleryPhotos.filter((p) => p.category === "Culinary").length,
    },
    {
      label: "Menu Artifacts",
      value: "Menu Artifact",
      count: galleryPhotos.filter((p) => p.category === "Menu Artifact").length,
    },
  ];

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8 sm:mb-12 border-b border-[#261C16]/10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.value);
                setActiveIndex(null);
              }}
              className={`min-h-[44px] px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 select-none whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? "bg-[#261C16] text-[#F8F5EE] shadow-sm"
                  : "bg-[#261C16]/5 text-[#52463E] hover:bg-[#261C16]/10 hover:text-[#261C16]"
              }`}
              aria-pressed={isActive}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#261C16]/10 text-[#7D6F66]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Asymmetric Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {filteredPhotos.map((photo, index) => {
          // Asymmetric column spans: 1st full/prominent, others staggered
          const colSpan =
            index === 0
              ? "md:col-span-8"
              : index === 1
              ? "md:col-span-4"
              : index === 2
              ? "md:col-span-5"
              : index === 3
              ? "md:col-span-3"
              : "md:col-span-4";

          return (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className={`${colSpan} group cursor-pointer`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#EFE8DC]/50 border border-[#261C16]/10 transition-all duration-500 group-hover:border-[#261C16]/30 group-hover:shadow-[0_20px_40px_-15px_rgba(38,28,22,0.08)]">
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden ${
                    photo.aspect === "1/1"
                      ? "aspect-square"
                      : photo.aspect === "16/9"
                      ? "aspect-[16/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />

                  {/* Subtle Gradient & Hover Indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#261C16]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-6 text-white">
                    <span className="font-[family-name:var(--font-syne)] text-xs uppercase tracking-widest font-semibold">
                      Inspect Photographic Evidence
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="p-4 sm:p-5 space-y-1.5 bg-[#F8F5EE]/90 border-t border-[#261C16]/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg font-bold text-[#261C16] group-hover:text-[#8D6E66] transition-colors">
                      {photo.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#261C16]/5 text-[#8D6E66] shrink-0 font-[family-name:var(--font-syne)]">
                      {photo.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#52463E] leading-relaxed line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#261C16]/90 backdrop-blur-md"
            onClick={handleClose}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row bg-[#F8F5EE] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview Side */}
              <div className="relative w-full md:w-3/5 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-[#261C16] flex items-center justify-center">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain"
                />

                {/* Nav Arrows inside image for mobile */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Editorial Documentation Side */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none space-y-6">
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                      ARCHIVAL MOMENT {String(activeIndex + 1).padStart(2, "0")} / {String(filteredPhotos.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-8 h-8 rounded-full bg-[#261C16]/5 hover:bg-[#261C16] hover:text-[#F8F5EE] text-[#261C16] flex items-center justify-center transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="inline-block text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#DBC5A6]/40 text-[#261C16] font-[family-name:var(--font-syne)]">
                    {currentPhoto.category}
                  </span>

                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#261C16] leading-tight">
                    {currentPhoto.title}
                  </h2>

                  <p className="text-sm font-medium text-[#261C16]/90 italic">
                    {currentPhoto.caption}
                  </p>

                  <div className="w-12 h-px bg-[#261C16]/20 my-2" />

                  <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                    {currentPhoto.details}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-[#261C16]/10 flex items-center justify-between text-xs text-[#7D6F66]">
                  <span className="font-[family-name:var(--font-syne)] text-[11px] uppercase tracking-wider">
                    Use &larr; &rarr; keys to browse
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-3 py-1.5 rounded-lg border border-[#261C16]/20 hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-3 py-1.5 rounded-lg border border-[#261C16]/20 hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
