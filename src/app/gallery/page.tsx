import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { siteConfig } from "@/data/site";
import { constructMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Visual Gallery · Space, Atmosphere & Food Imagery",
  description:
    "Explore photography of Guac N' Roll Cafe in Baben, Bardoli. Featuring terracotta celosia breeze blocks, arched dining areas, artisanal tableware, and Mexican-inspired dishes.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      {/* 1. Archive Header */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 sm:mb-12">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  ARCHIVAL EVIDENCE
                </span>
                <span className="text-[#261C16]/20">/</span>
                <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                  Baben · Bardoli
                </span>
              </div>
              <Heading as="h1" size="display" className="text-[#261C16]">
                The Spatial &amp; Culinary Gallery
              </Heading>
              <Text tone="muted" size="lg" className="leading-relaxed">
                Direct visual documentation of our physical venue at Ambiance Twin City, our tactile materials, printed menu artifacts, and honest tableware.
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Badge variant="biscuit" size="md">
                100% Real Photography
              </Badge>
              <Badge variant="biscuit" size="md">
                Artisanal Tableware
              </Badge>
            </div>
          </div>

          {/* 2. Interactive Lightbox & Category Explorer */}
          <GalleryLightbox />

          {/* Celosia Divider */}
          <div className="my-16 sm:my-20">
            <CelosiaPattern variant="divider" className="w-64 h-4 text-[#DBC5A6] mx-auto opacity-50" />
          </div>

          {/* 3. Photographic Integrity & Spatial Context */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#EFE8DC]/60 border border-[#261C16]/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold text-[#8D6E66] block">
                Visual Standards Policy
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                Physical Authenticity First
              </h3>
              <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                Every image featured in this archive was captured at our real premises at Shop 9 &amp; 10, Ambiance Twin City, Mota Road. We do not use stock food imagery or synthetic 3D renders. What you see is what you experience when you visit our tables.
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
                <span>Visit Us in Baben</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                href="/menu"
                variant="outline"
                size="md"
                shape="architectural"
              >
                Explore The Menu
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
