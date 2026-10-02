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
import { CopyAddressButton } from "@/components/visit/CopyAddressButton";
import {
  siteConfig,
  getCafeOpenStatus,
  isWhatsAppConfigured,
  getWhatsAppUrl,
} from "@/data/site";
import { constructMetadata, getLocalBusinessSchema } from "@/lib/seo";
import { MapPin, Clock, ArrowUpRight, MessageCircle, Star, Compass } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export const metadata: Metadata = constructMetadata({
  title: "Visit Guac N' Roll Cafe · Location, Hours & Directions",
  description:
    "Visit Guac N' Roll Cafe at Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli. Open daily 11:00 AM to 11:00 PM. Get Google Maps directions and location details.",
  path: "/visit",
});

export default function VisitPage() {
  const status = getCafeOpenStatus();
  const whatsappConfigured = isWhatsAppConfigured();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Guac N' Roll, I would like to inquire about table availability."
  );
  const jsonLd = getLocalBusinessSchema();

  return (
    <>
      {/* Schema.org JSON-LD Structured Data for Local Business SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Visit Hero: "FROM SCREEN → TO STREET" */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                  LOCAL SANCTUARY
                </span>
                <span className="text-[#261C16]/20">/</span>
                <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                  Baben · Bardoli
                </span>
              </div>
              <Heading as="h1" size="display" className="text-[#261C16]">
                Come Find The Sign.
              </Heading>
              <Text tone="muted" size="lg" className="leading-relaxed">
                Step through the terracotta breeze blocks into our architectural sanctuary. Open daily on Mota Road for Mexican-inspired comfort and specialty espresso.
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Badge variant={status.isOpen ? "status" : "default"} size="md">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? "bg-[#5F7355] animate-pulse" : "bg-[#1C1917]/40"
                  }`}
                />
                <span>{status.statusText}</span>
                <span className="sr-only">({status.ariaLabel})</span>
              </Badge>
              <Badge variant="biscuit" size="md">
                {status.scheduleText}
              </Badge>
            </div>
          </div>

          {/* Hero Visual Spread: Exterior Façade + Neon Signplate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Façade Screen Anchor (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[4/3] rounded-t-[3.5rem] rounded-b-2xl overflow-hidden bg-[#261C16]/5 border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.06)]">
                <Image
                  src="/images/cafe/facade-exterior.png"
                  alt="Guac N' Roll Cafe exterior breeze block celosia wall at Ambiance Twin City, Baben"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-[#7D6F66] italic pl-2">
                Shop 9 &amp; 10, Ambiance Twin City: Look for the perforated terracotta breeze blocks filtering Gujarat daylight along Mota Road.
              </p>
            </div>

            {/* Neon Signplate & Arrival Tip (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#261C16] border border-[#261C16]/10 shadow-lg">
                <Image
                  src="/images/brand/logo-neon.jpg"
                  alt="Guac N' Roll Cafe illuminated warm amber neon sign"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#EFE8DC]/50 border border-[#261C16]/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8D6E66]" />
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                    ARRIVAL ORIENTATION
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-bold text-[#261C16]">
                  At Ambiance Twin City
                </h3>
                <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                  Located along Mota Road in Baben. Free parking is available in front of Ambiance Twin City.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Physical Details: Address, Directions, and Map Orientation */}
      <Section spacing="standard" background="inset" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* Address & Quick Utility Block (6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F5EE] border border-[#261C16]/10 space-y-6 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.04)]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                      CONFIRMED ADDRESS
                    </span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#261C16]">
                      The Physical Coordinates
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#261C16]/5 text-[#8D6E66] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-base sm:text-lg text-[#261C16]">
                    Shop 9 &amp; 10, Ambiance Twin City
                  </p>
                  <address className="not-italic text-sm sm:text-base text-[#52463E] leading-relaxed">
                    Mota Road, Baben
                    <br />
                    Bardoli, Gujarat 394601, India
                  </address>
                  <p className="text-xs text-[#7D6F66] pt-1">
                    Landmark: Ambiance Twin City, Mota Road, Baben.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    href={siteConfig.location.googleMapsShareUrl}
                    isExternal
                    variant="primary"
                    size="md"
                    shape="architectural"
                    className="group"
                  >
                    <span>Get Directions (Google Maps)</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>

                  <CopyAddressButton address={siteConfig.location.formattedAddress} />
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F5EE] border border-[#261C16]/10 space-y-6 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.04)]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                      OPERATING HOURS
                    </span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#261C16]">
                      Seven Days a Week
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#261C16]/5 text-[#8D6E66] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#261C16]/10 text-sm sm:text-base">
                    <span className="font-medium text-[#261C16]">Daily (Mon — Sun)</span>
                    <span className="font-semibold tabular-nums text-[#261C16]">
                      11:00 AM — 11:00 PM
                    </span>
                  </div>
                  <p className="text-xs text-[#7D6F66] leading-relaxed">
                    Open daily from 11:00 AM to 11:00 PM.
                  </p>
                </div>
              </div>
            </div>

            {/* Geographic Orientation & Restrained Map Embed (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-4 sm:p-6 rounded-3xl bg-[#F8F5EE] border border-[#261C16]/10 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.04)] space-y-4">
                <div className="flex items-center justify-between px-2 pt-2">
                  <div className="space-y-0.5">
                    <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                      MAP UTILITY
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#261C16]">
                      Bardoli Location
                    </h3>
                  </div>
                  <Button
                    href={siteConfig.location.googleMapsShareUrl}
                    isExternal
                    variant="outline"
                    size="sm"
                    shape="architectural"
                  >
                    <span>Full Map View</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                {/* Restrained Map Embed: Clean utility frame, never dominates page */}
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#261C16]/10 bg-[#EFE8DC]">
                  <iframe
                    title="Guac N' Roll Cafe Location in Baben, Bardoli"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      siteConfig.location.googleMapsEmbedQuery
                    )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="text-xs text-[#7D6F66] px-2 leading-relaxed">
                  Interactive satellite &amp; street map centered on Shop 9 &amp; 10, Ambiance Twin City, Mota Road, Baben.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Community Proof (Google Reviews) & Digital Connection (Instagram + WhatsApp) */}
      <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Google Reviews Card */}
            <div className="p-8 rounded-3xl bg-[#EFE8DC]/50 border border-[#261C16]/10 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#DBC5A6]/40 flex items-center justify-center text-[#261C16]">
                    <Star className="w-4 h-4 fill-[#261C16]" />
                  </div>
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                    COMMUNITY PROOF
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#261C16]">
                  Unvarnished Google Reviews
                </h3>

                <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                  We don&apos;t fabricate review quotes or fake star counts. Inspect genuine guest experiences, diner photos, and community ratings directly on our verified Google profile.
                </p>
              </div>

              <div className="pt-4 border-t border-[#261C16]/10">
                <Button
                  href={siteConfig.social.googleReviewUrl}
                  isExternal
                  variant="outline"
                  size="sm"
                  shape="architectural"
                  className="w-full"
                >
                  <span>Explore Google Reviews</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Instagram Card ("FOLLOW THE ROLL") */}
            <div className="p-8 rounded-3xl bg-[#261C16] text-[#F8F5EE] space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#DBC5A6]">
                    FOLLOW THE ROLL
                  </span>
                  <InstagramIcon className="w-5 h-5 text-[#DBC5A6]" />
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold">
                  @guacnroll.cafe
                </h3>

                <p className="text-xs sm:text-sm text-[#F8F5EE]/75 leading-relaxed">
                  Daily stories, seasonal dish highlights, and glimpses into our kitchen craft in Baben.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Button
                  href={siteConfig.social.instagram}
                  isExternal
                  variant="secondary"
                  size="sm"
                  shape="architectural"
                  className="w-full"
                >
                  <span>Follow on Instagram</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* WhatsApp Ordering Setup Card */}
            <div className="p-8 rounded-3xl bg-[#EFE8DC]/50 border border-[#261C16]/10 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#8D6E66]" />
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                    DIRECT MESSAGING
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#261C16]">
                  WhatsApp Ordering
                </h3>

                {whatsappConfigured && whatsappUrl ? (
                  <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                    Direct WhatsApp communication is enabled for takeaway pre-orders and table inquiries.
                  </p>
                ) : (
                  <div className="space-y-2 text-xs sm:text-sm text-[#52463E] leading-relaxed">
                    <p className="font-medium text-[#261C16]">
                      Architecture Active · Setup in Progress
                    </p>
                    <p className="text-xs text-[#7D6F66]">
                      Awaiting verified business phone number connection from café management. For now, visit us directly at Shop 9 &amp; 10.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#261C16]/10">
                {whatsappConfigured && whatsappUrl ? (
                  <Button
                    href={whatsappUrl}
                    isExternal
                    variant="primary"
                    size="sm"
                    shape="architectural"
                    className="w-full"
                  >
                    <span>Order via WhatsApp</span>
                  </Button>
                ) : (
                  <span className="inline-block text-center w-full py-2 px-3 text-xs text-[#7D6F66] bg-[#261C16]/5 rounded-lg border border-[#261C16]/10">
                    Awaiting Dedicated Number
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Celosia Divider */}
          <div className="mt-16 sm:mt-20">
            <CelosiaPattern variant="divider" className="w-64 h-4 text-[#DBC5A6] mx-auto opacity-50" />
          </div>
        </Container>
      </Section>
    </>
  );
}
