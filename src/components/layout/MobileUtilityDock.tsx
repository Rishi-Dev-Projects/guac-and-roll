import React from "react";
import Link from "next/link";
import { siteConfig, isWhatsAppConfigured, getWhatsAppUrl } from "@/data/site";
import { MapPin, BookOpen, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function MobileUtilityDock() {
  const whatsappConfigured = isWhatsAppConfigured();
  const whatsappUrl = getWhatsAppUrl("Hello Guac N' Roll, I would like to inquire about table availability / takeaway orders.");

  return (
    <div
      className="fixed inset-x-4 z-40 md:hidden select-none pointer-events-auto"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      role="navigation"
      aria-label="Quick Action Bar"
    >
      <div className="mx-auto max-w-sm bg-[#261C16]/95 backdrop-blur-md border border-white/20 text-[#F8F5EE] shadow-2xl rounded-full px-3 py-1.5 flex items-center justify-around">
        {/* 1. Directions */}
        <a
          href={siteConfig.location.googleMapsShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-white/80 hover:text-white active:scale-95 transition-all text-center"
          aria-label="Get Google Maps Directions to Guac N' Roll Cafe"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-[#DBC5A6]" />
          <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-semibold">
            Directions
          </span>
        </a>

        {/* 2. Menu */}
        <Link
          href="/menu"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-white/80 hover:text-white active:scale-95 transition-all text-center"
          aria-label="View Menu"
        >
          <BookOpen className="w-4 h-4 mb-0.5 text-[#DBC5A6]" />
          <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-semibold">
            Menu
          </span>
        </Link>

        {/* 3. Instagram */}
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-white/80 hover:text-white active:scale-95 transition-all text-center"
          aria-label="Follow Guac N' Roll on Instagram"
        >
          <InstagramIcon className="w-4 h-4 mb-0.5 text-[#DBC5A6]" />
          <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-semibold">
            Instagram
          </span>
        </a>

        {/* 4. WhatsApp (Strictly Gated - Only rendered when real number configured) */}
        {whatsappConfigured && whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-[#5F7355] hover:text-[#7ba06d] active:scale-95 transition-all text-center"
            aria-label="Chat and Order on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 mb-0.5 text-[#5F7355]" />
            <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-wider font-semibold">
              WhatsApp
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
