import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/sections/HeroSection";
import { ArchwayThreshold } from "@/sections/ArchwayThreshold";
import { SpatialCafeSection } from "@/sections/SpatialCafeSection";
import { EditorialMenuSection } from "@/sections/EditorialMenuSection";
import { SocialRitualSection } from "@/sections/SocialRitualSection";
import { CuratedGallerySection } from "@/sections/CuratedGallerySection";
import { LocalConversionSection } from "@/sections/LocalConversionSection";
import { constructMetadata, getLocalBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata();

export default function HomePage() {
  const jsonLd = getLocalBusinessSchema();

  return (
    <>
      {/* Schema.org LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Primary Benchmark: The Architectural Threshold Hero */}
      <HeroSection />

      {/* 2. Hero-to-Content Breathing Transition */}
      <ArchwayThreshold />

      {/* 3. Spatial Cafe Storytelling: Chapter 02 (The Physical Sanctuary) */}
      <SpatialCafeSection />

      {/* 4. Interactive Editorial Menu: Chapter 03 (The Culinary Repertoire) */}
      <EditorialMenuSection />

      {/* 5. The Social Ritual: Chapter 04 (Between Class & Twilight) */}
      <SocialRitualSection />

      {/* 6. Visual Evidence: Chapter 05 (Through the Architectural Lens) */}
      <CuratedGallerySection />

      {/* 7. Local Business Conversion: Chapter 06 (Come Find The Sign) */}
      <LocalConversionSection />
    </>
  );
}
