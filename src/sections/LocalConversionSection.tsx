import React from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Heading } from "@/components/primitives/Heading";
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
import { MapPin, Clock, ArrowUpRight, MessageCircle, Star } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function LocalConversionSection() {
  const status = getCafeOpenStatus();
  const whatsappConfigured = isWhatsAppConfigured();
  const whatsappUrl = getWhatsAppUrl("Hello Guac N' Roll, I would like to inquire about table availability.");

  return (
    <Section spacing="standard" background="primary" className="border-b border-[#261C16]/10">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#261C16]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
                CHAPTER 06 · THE LOCAL ARRIVAL
              </span>
              <span className="text-[#261C16]/20">/</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6F66] font-medium font-[family-name:var(--font-syne)]">
                Baben · Bardoli
              </span>
            </div>
            <Heading as="h2" size="display" className="text-[#261C16]">
              Come Find The Sign
            </Heading>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={status.isOpen ? "status" : "default"} size="md">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? "bg-[#5F7355] animate-pulse" : "bg-[#1C1917]/40"
                }`}
              />
              <span>{status.statusText}</span>
              <span className="sr-only">({status.ariaLabel})</span>
            </Badge>
          </div>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Column 1: Physical Venue Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Address & Navigation Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#EFE8DC]/50 border border-[#261C16]/10 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66] block">
                    PHYSICAL SANCTUARY
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#261C16]">
                    Shop 9 &amp; 10, Ambiance Twin City
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#261C16]/5 text-[#8D6E66] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <address className="not-italic text-sm sm:text-base text-[#52463E] leading-relaxed">
                Mota Road, Baben, Bardoli
                <br />
                Gujarat 394601, India
                <br />
                <span className="text-xs text-[#7D6F66]">
                  (Ambiance Twin City, Mota Road)
                </span>
              </address>

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
            <div className="p-8 sm:p-10 rounded-3xl bg-[#EFE8DC]/50 border border-[#261C16]/10 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#8D6E66] block">
                    OPERATING RHYTHM
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#261C16]">
                    Seven Days a Week
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#261C16]/5 text-[#8D6E66] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#261C16]/10 text-sm sm:text-base">
                  <span className="font-medium text-[#261C16]">Monday through Sunday</span>
                  <span className="font-semibold tabular-nums text-[#261C16]">
                    11:00 AM — 11:00 PM
                  </span>
                </div>
                <p className="text-xs text-[#7D6F66]">
                  Open daily from 11:00 AM to 11:00 PM.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Digital Proof & Direct Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google Reviews Block (Strictly Authentic - No fake star counts or fake reviews) */}
            <div className="p-8 rounded-3xl bg-[#F8F5EE] border border-[#261C16]/10 space-y-4 shadow-[0_20px_40px_-15px_rgba(38,28,22,0.05)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#DBC5A6]/40 flex items-center justify-center text-[#261C16]">
                  <Star className="w-4 h-4 fill-[#261C16]" />
                </div>
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                  COMMUNITY IMPRESSIONS
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#261C16]">
                Read Authentic Reviews on Google
              </h3>

              <p className="text-xs sm:text-sm text-[#52463E] leading-relaxed">
                We believe genuine guest impressions speak louder than fabricated quotes. Explore real feedback and diner photos directly on our verified Google Business profile.
              </p>

              <div className="pt-1">
                <Button
                  href={siteConfig.social.googleReviewUrl}
                  isExternal
                  variant="outline"
                  size="sm"
                  shape="architectural"
                  className="w-full sm:w-auto"
                >
                  <span>Explore Google Reviews</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Instagram Connection ("FOLLOW THE ROLL") */}
            <div className="p-8 rounded-3xl bg-[#261C16] text-[#F8F5EE] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#DBC5A6]">
                  FOLLOW THE ROLL
                </span>
                <InstagramIcon className="w-5 h-5 text-[#DBC5A6]" />
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold">
                @guacnroll.cafe
              </h3>

              <p className="text-xs sm:text-sm text-[#F8F5EE]/75 leading-relaxed">
                Daily drink features, behind-the-scenes kitchen craft, and evening moments from Baben.
              </p>

              <div className="pt-2">
                <Button
                  href={siteConfig.social.instagram}
                  isExternal
                  variant="secondary"
                  size="sm"
                  shape="architectural"
                  className="w-full sm:w-auto"
                >
                  <span>Follow on Instagram</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* WhatsApp Ordering Architecture Block */}
            <div className="p-6 rounded-2xl bg-[#EFE8DC]/30 border border-[#261C16]/10 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#8D6E66]" />
                <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E66]">
                  WHATSAPP ORDERING STATUS
                </span>
              </div>

              {whatsappConfigured && whatsappUrl ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#52463E] leading-relaxed">
                    Direct WhatsApp ordering is active for takeaways and table inquiries.
                  </p>
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
                </div>
              ) : (
                <div className="space-y-1.5 text-xs text-[#52463E] leading-relaxed">
                  <p className="font-medium text-[#261C16]">
                    Direct WhatsApp Ordering Setup in Progress
                  </p>
                  <p className="text-[11px] text-[#7D6F66]">
                    Awaiting verified business phone number connection from café management. For current dining and takeout, visit us directly at Shop 9 &amp; 10, Ambiance Twin City.
                  </p>
                </div>
              )}
            </div>

            {/* Celosia Divider */}
            <div className="pt-2">
              <CelosiaPattern variant="divider" className="w-48 h-3 text-[#DBC5A6] opacity-60" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
