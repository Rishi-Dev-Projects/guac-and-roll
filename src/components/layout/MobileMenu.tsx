"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/primitives/Button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="p-2.5 rounded-lg text-[#261C16] hover:bg-[#261C16]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Portaled Drawer and Backdrop */}
      {mounted && createPortal(
        <div className="md:hidden" style={{ zIndex: 99999 }}>
          {/* Backdrop */}
          {isOpen && (
            <div
              className="fixed inset-0 z-40 bg-[#261C16]/40 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#F8F5EE] border-l border-[#261C16]/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_24px_48px_-16px_rgba(38,28,22,0.18)] ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#261C16]/10">
                <div>
                  <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight text-[#261C16] block">
                    GUAC N&apos; ROLL
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-[9px] tracking-[0.2em] uppercase text-[#7D6F66] font-semibold">
                    Baben · Bardoli
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-lg text-[#261C16] hover:bg-[#261C16]/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-8 flex flex-col space-y-3" aria-label="Mobile Navigation">
                {siteConfig.navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium py-2.5 px-3.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#261C16] text-[#F8F5EE]"
                          : "text-[#1C1917] hover:bg-[#261C16]/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer info in drawer */}
            <div className="pt-6 border-t border-[#261C16]/10 space-y-4 text-xs text-[#1C1917]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[#8D6E66] shrink-0" />
                <span className="leading-relaxed">
                  {siteConfig.location.shop}, {siteConfig.location.building}, Baben, Bardoli
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8D6E66] shrink-0" />
                <span>{siteConfig.hours.days}: {siteConfig.hours.formatted}</span>
              </div>

              <Button
                href={siteConfig.location.googleMapsShareUrl}
                isExternal
                variant="outline"
                size="sm"
                shape="architectural"
                className="w-full text-xs mt-2"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
