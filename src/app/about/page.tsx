import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";
import { siteConfig } from "@/data/site";
import { constructMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Guac N' Roll Cafe · Space, Atmosphere & Design",
  description:
    "Learn about the atmosphere, spatial design, and culinary concept of Guac N' Roll Cafe in Baben, Bardoli. Featuring terracotta breeze blocks, arched dining spaces, and Mexican-inspired comfort.",
  path: "/about",
});

const materialPalette = [
  {
    name: "Espresso Earth",
    hex: "#261C16",
    role: "Primary Dark Foundation",
    description: "Extracted from exterior signage fascia, arched door casings, and walnut tables.",
  },
  {
    name: "Adobe Mauve",
    hex: "#8D6E66",
    role: "Architectural Curve Accent",
    description: "Extracted from sculpted interior ceiling arches and recessed wall alcoves.",
  },
  {
    name: "Celosia Biscuit",
    hex: "#DBC5A6",
    role: "Secondary Warm Neutral",
    description: "Extracted from kiln-fired triangular breeze blocks filtering Gujarat daylight.",
  },
  {
    name: "Oatmeal Plaster",
    hex: "#F8F5EE",
    role: "Primary Light Canvas",
    description: "Extracted from textured lime-wash walls and printed physical menu paper stock.",
  },
  {
    name: "Sage Ceramic",
    hex: "#5F7355",
    role: "Botanical Food Accent",
    description: "Extracted from handmade organic taco platters, fresh avocados, and herbs.",
  },
  {
    name: "Warm Amber Glow",
    hex: "#F5D48A",
    role: "Atmospheric Illumination",
    description: "Extracted from backlit exterior lettering and cordless tabletop LED lamps.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Monograph Hero Header */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  BRAND &amp; SPATIAL MONOGRAPH
                </span>
                <span className="text-[#261C16]/20">/</span>
                <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                  Baben · Bardoli
                </span>
              </div>
              <Heading as="h1" size="display" className="text-[#261C16]">
                Tactile Modernist Warmth
              </Heading>
              <Text tone="muted" size="lg" className="leading-relaxed">
                Guac N&apos; Roll bridges Mexican culinary warmth with contemporary architectural serenity. An unhurried third place conceived for Baben, Bardoli.
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Badge variant="biscuit" size="md">
                Modernist Sanctuary
              </Badge>
              <Badge variant="biscuit" size="md">
                Cafe &amp; Kitchen
              </Badge>
            </div>
          </div>

          {/* Hero Split: Photographic Anchor + Manifesto Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Visual Anchor */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-t-[3.5rem] rounded-b-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.06)]">
                <Image
                  src="/images/cafe/interior-arches.png"
                  alt="Sculpted adobe mauve plaster arches and herringbone parquet inside Guac N' Roll Cafe"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-[#7D6F66] italic">
                Interior sanctuary: Sculpted lime-plaster arches, ceramic display alcoves, and herringbone timber parquet.
              </p>
            </div>

            {/* Core Manifesto Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                THE BRAND CORE
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#261C16] leading-tight">
                Where social energy coexists with architectural poise.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#52463E] leading-relaxed">
                <p>
                  Most youth cafés rely on garish neon colors, fast-food plastic furniture, and chaotic stimulation. Guac N&apos; Roll takes a deliberate step in the opposite direction.
                </p>
                <p>
                  We believe that young people, college students, and local families deserve spaces that honor their intelligence and peace. Spaces built with authentic kiln-fired clay, sculpted lime plaster, and warm natural timber.
                </p>
              </div>

              <div className="pt-2">
                <CelosiaPattern variant="divider" className="w-48 h-3 text-[#DBC5A6] opacity-60" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Chapter 01: The Architectural Origin (Mexican Modernism without Clichés) */}
      <Section spacing="standard" background="inset" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Architectural Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  CHAPTER 01 · ARCHITECTURAL DNA
                </span>
                <Heading as="h2" size="h2" className="text-[#261C16]">
                  Mexican Heritage Without Caricature
                </Heading>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#52463E] leading-relaxed">
                <p>
                  Mexico possesses one of the world&apos;s most sophisticated architectural legacies. Our design honors that tradition through restraint rather than cartoonish stereotypes:
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D6E66] mt-2 shrink-0" />
                    <span>
                      <strong className="text-[#261C16]">The Celosia Breeze-Block Screen:</strong> Our exterior triangular terracotta lattice filters Gujarat&apos;s afternoon sunlight into gentle geometric shadow patterns across the entrance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D6E66] mt-2 shrink-0" />
                    <span>
                      <strong className="text-[#261C16]">Sculpted Earth-Plaster Arches:</strong> Fluid, tactile transitions between seating zones that frame intimate moments and create a sense of shelter.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D6E66] mt-2 shrink-0" />
                    <span>
                      <strong className="text-[#261C16]">Cordless Amber Lighting:</strong> Tabletop mushroom lamps emit a soft warm glow, encouraging conversation to stretch well past sunset.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Façade Asset */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.06)]">
                <Image
                  src="/images/cafe/facade-exterior.png"
                  alt="Perforated terracotta celosia breeze block facade of Guac N' Roll Cafe at Ambiance Twin City"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-[#7D6F66] italic">
                Shop 9 &amp; 10, Ambiance Twin City: Kiln-fired terracotta celosia screen wall and dark espresso-cased entry portal.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Chapter 02: The Third Place Philosophy & Student Life */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Anchor (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="space-y-3">
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  CHAPTER 02 · THE THIRD PLACE
                </span>
                <Heading as="h2" size="display" className="text-[#261C16]">
                  Between Class &amp; Home
                </Heading>
              </div>
              <Text tone="muted" size="base" className="leading-relaxed">
                Situated at Ambiance Twin City on Mota Road in Baben, Guac N&apos; Roll was conceived as a comfortable third place for relaxed afternoons and evening gatherings—free from rush, noise, or commercial pressure.
              </Text>
              <div className="pt-2">
                <CelosiaPattern variant="divider" className="w-48 h-3 text-[#DBC5A6] opacity-60" />
              </div>
            </div>

            {/* Right Architectural Rhythms (7 cols, Hairline-Divided) */}
            <div className="lg:col-span-7 border-t border-[#261C16]/12 divide-y divide-[#261C16]/10">
              <div className="py-6 sm:py-8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-[#8D6E66]">
                    01 · AFTERNOON PAUSE
                  </span>
                  <span className="text-[11px] text-[#7D6F66] font-[family-name:var(--font-syne)] uppercase tracking-wider">
                    Daylight Hours
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                  Linger Without Hurry
                </h3>
                <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed max-w-xl">
                  Tables with comfortable seating where you can open a notebook, read, or catch up with friends after morning lectures. We never pressure you to turn over your seat.
                </p>
              </div>

              <div className="py-6 sm:py-8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-[#8D6E66]">
                    02 · SHARED TABLES
                  </span>
                  <span className="text-[11px] text-[#7D6F66] font-[family-name:var(--font-syne)] uppercase tracking-wider">
                    Communal Dining
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                  Food Meant to Pass
                </h3>
                <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed max-w-xl">
                  Loaded platters of warm tortilla chips, freshly prepped guacamole, crisp taco sets, and sizzling fajita skillets built specifically for passing around with friends at generous communal tables.
                </p>
              </div>

              <div className="py-6 sm:py-8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-syne)] text-xs font-bold text-[#8D6E66]">
                    03 · EVENING GLOW
                  </span>
                  <span className="text-[11px] text-[#7D6F66] font-[family-name:var(--font-syne)] uppercase tracking-wider">
                    Dusk to 11 PM
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                  A Calm Dusk Shift
                </h3>
                <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed max-w-xl">
                  As night falls across Baben, overhead ambient lights dim and cordless tabletop lamps cast an intimate, warm amber circle over every table until 11:00 PM daily.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Chapter 03: Culinary Sincerity & Craft */}
      <Section spacing="standard" background="inset" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Culinary Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.06)]">
                <Image
                  src="/images/food/tacos-drink-table.png"
                  alt="Folded crispy tacos served on artisanal sage ceramic platter with layered citrus beverage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-[#7D6F66] italic">
                Mexican-inspired comfort: Served on artisanal sage ceramic platters with avocado crema.
              </p>
            </div>

            {/* Culinary Sincerity Narrative */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  CHAPTER 03 · CULINARY SINCERITY
                </span>
                <Heading as="h2" size="h2" className="text-[#261C16]">
                  Culinary Craft &amp; Mexican Warmth
                </Heading>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#52463E] leading-relaxed">
                <p>
                  Mexican cuisine shares notable affinities with Indian culinary traditions—an emphasis on freshly ground spices, roasted chilis, warm beans, and hand-rolled tortillas.
                </p>
                <p>
                  Our kitchen in Baben focuses on authentic culinary preparation: fresh avocados, in-house salsas, bubbling fajita skillets, and hand-folded tacos served on artisanal ceramics.
                </p>
                <p>
                  Paired with our specialty espresso drinks and botanical coolers, we offer an unhurried dining experience crafted for Bardoli.
                </p>
              </div>

              <div className="pt-2">
                <Button href="/menu" variant="primary" size="md" shape="architectural">
                  Explore The 11-Category Menu
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Chapter 04: The Material Palette */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
              CHAPTER 04 · MATERIALITY
            </span>
            <Heading as="h2" size="display" className="text-[#261C16]">
              The Physical Palette
            </Heading>
            <Text tone="muted" size="base" className="leading-relaxed">
              Every color in our digital and physical world is extracted directly from the tactile materials that shape Guac N&apos; Roll Cafe.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialPalette.map((item) => (
              <div
                key={item.hex}
                className="p-6 rounded-2xl bg-[#EFE8DC]/40 border border-[#261C16]/10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border border-black/10 shrink-0 shadow-sm"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-[#261C16]">
                      {item.name}
                    </h3>
                    <span className="font-mono text-xs text-[#7D6F66]">
                      {item.hex}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8D6E66] block font-[family-name:var(--font-syne)]">
                    {item.role}
                  </span>
                  <p className="text-xs text-[#52463E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Honest Brand Integrity Statement & Visit CTA */}
      <Section spacing="standard" background="inset" className="border-b border-[#261C16]/10">
        <Container size="standard">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#EFE8DC]/80 border border-[#261C16]/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                AUTHENTIC FOUNDATIONS
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#261C16]">
                Visit Us in Baben, Bardoli
              </h3>
              <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                Open daily from 11:00 AM to 11:00 PM at Shop 9 &amp; 10, Ambiance Twin City, Mota Road. Step through the arches and take your time.
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
                <span>Get Directions (Google Maps)</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                href="/gallery"
                variant="outline"
                size="md"
                shape="architectural"
              >
                Browse Spatial Archive
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
