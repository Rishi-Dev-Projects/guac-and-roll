import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteConfig, isCafeCurrentlyOpen } from "@/data/site";

export function Navigation() {
  const isOpen = isCafeCurrentlyOpen();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#261C16]/10 transition-colors">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Brand mark */}
          <Link
            href="/"
            className="flex flex-col group focus-visible:outline-2 focus-visible:outline-offset-2 rounded-lg"
          >
            <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold tracking-tight text-[#261C16] group-hover:text-[#8D6E66] transition-colors">
              GUAC N&apos; ROLL
            </span>
            <span className="font-[family-name:var(--font-syne)] text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#7D6F66] font-semibold">
              Baben · Bardoli
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-plus-jakarta)] text-sm font-medium tracking-normal text-[#1C1917]/80 hover:text-[#261C16] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#261C16] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right utility actions */}
          <div className="flex items-center gap-3">
            {/* Live status pill */}
            <div className="hidden sm:flex items-center">
              <Badge variant={isOpen ? "status" : "default"} size="sm">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOpen ? "bg-[#5F7355] animate-pulse" : "bg-[#1C1917]/40"
                  }`}
                />
                {isOpen ? "Open Now" : "Opens 11 AM"}
              </Badge>
            </div>

            {/* Quick directions action */}
            <div className="hidden lg:block">
              <Button
                href={siteConfig.location.googleMapsShareUrl}
                isExternal
                variant="outline"
                size="sm"
                shape="architectural"
              >
                Directions
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
