import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileUtilityDock } from "@/components/layout/MobileUtilityDock";
import { constructMetadata } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${plusJakarta.variable} ${syne.variable} scroll-smooth`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[#F8F5EE] text-[#1C1917] antialiased selection:bg-[#DBC5A6] selection:text-[#261C16]">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#261C16] focus:text-[#F8F5EE] focus:rounded-md shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global architectural navigation */}
        <Navigation />

        {/* Main page content container with mobile dock padding */}
        <main id="main-content" className="flex-grow pb-24 md:pb-0">
          {children}
        </main>

        {/* Global architectural footer */}
        <Footer />

        {/* Mobile-first quick action conversion dock */}
        <MobileUtilityDock />
      </body>
    </html>
  );
}
