import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Divider } from "@/components/primitives/Divider";
import { siteConfig } from "@/data/site";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function Footer() {
  return (
    <footer className="w-full bg-[#261C16] text-[#F8F5EE] pt-20 pb-28 md:pb-12 border-t border-[#261C16]">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <span className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold tracking-tight block">
              GUAC N&apos; ROLL
            </span>
            <p className="font-[family-name:var(--font-syne)] text-[10px] text-[#DBC5A6] uppercase tracking-[0.22em] font-semibold">
              Cafe · Baben · Bardoli
            </p>
            <p className="text-sm text-[#F8F5EE]/70 leading-relaxed max-w-sm">
              An architectural corner for Mexican-inspired comfort, specialty coffee, and unhurried afternoons at Ambiance Twin City, Mota Road.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-medium bg-[#5F7355]/25 text-[#DBC5A6] border border-[#5F7355]/40 px-3 py-1 rounded-full uppercase tracking-wider">
                Cafe &amp; Kitchen
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DBC5A6]">
              Exploration
            </h3>
            <ul className="space-y-3 text-sm text-[#F8F5EE]/80">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#DBC5A6] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Location & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DBC5A6]">
              Sanctuary Details
            </h3>
            <div className="space-y-4 text-sm text-[#F8F5EE]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-1 text-[#DBC5A6] shrink-0" />
                <address className="not-italic leading-relaxed text-xs sm:text-sm">
                  {siteConfig.location.shop}, {siteConfig.location.building}
                  <br />
                  {siteConfig.location.street}
                  <br />
                  {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.postalCode}
                </address>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 mt-1 text-[#DBC5A6] shrink-0" />
                <div>
                  <p className="font-medium text-[#F8F5EE] text-xs sm:text-sm">{siteConfig.hours.days}</p>
                  <p className="text-xs text-[#F8F5EE]/70">{siteConfig.hours.formatted}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Community Actions (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DBC5A6]">
              Arrival
            </h3>
            <div className="space-y-3">
              <a
                href={siteConfig.location.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#F8F5EE]/5 border border-[#F8F5EE]/10 hover:border-[#DBC5A6]/40 hover:bg-[#F8F5EE]/10 transition-all text-xs group"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DBC5A6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#F8F5EE]/5 border border-[#F8F5EE]/10 hover:border-[#DBC5A6]/40 hover:bg-[#F8F5EE]/10 transition-all text-xs group"
              >
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#DBC5A6]" />
                  <span>Instagram</span>
                </div>
                <span className="text-[10px] text-[#DBC5A6]">{siteConfig.social.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        <Divider tone="dark" className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EE]/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Baben, Bardoli, Gujarat.
          </p>
          <p className="font-[family-name:var(--font-syne)] text-[10px] tracking-[0.2em] uppercase text-[#DBC5A6]/60">
            Tactile Modernist Mexican Cafe
          </p>
        </div>
      </Container>
    </footer>
  );
}
