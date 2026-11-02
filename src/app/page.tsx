import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/sections/HeroSection";
import { ArchwayThreshold } from "@/sections/ArchwayThreshold";
import { SpatialCafeSection } from "@/sections/SpatialCafeSection";
import { CulinarySpotlightSection } from "@/sections/CulinarySpotlightSection";
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

      {/* ARRIVAL — 1. The shopfront comes into view */}
      <HeroSection />

      {/* ENTERING — 2. Through the arched door (pinned camera sequence) */}
      <ArchwayThreshold />

      {/* DISCOVERING THE SPACE — 3. Chapter 02: One arch, three times */}
      <SpatialCafeSection />

      {/* EXPLORING THE FOOD — 4. Chapter 03: The Culinary Spotlight */}
      <CulinarySpotlightSection />

      {/* BROWSING THE MENU — 5. Chapter 04: The Menu Folio */}
      <EditorialMenuSection />

      {/* EXPERIENCING THE ATMOSPHERE — 6. Chapter 05: The Social Ritual */}
      <SocialRitualSection />

      {/* 7. Chapter 06: The Memory Ribbon */}
      <CuratedGallerySection />

      {/* VISITING — 8. Chapter 07: Come Find The Sign */}
      <LocalConversionSection />
    </>
  );
}
