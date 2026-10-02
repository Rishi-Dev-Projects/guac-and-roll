import { Metadata } from "next";
import { siteConfig } from "@/data/site";

/**
 * Normalizes a URL by removing trailing slashes.
 */
function cleanUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Authoritative production site URL.
 * Populated strictly via NEXT_PUBLIC_SITE_URL in production / Vercel.
 * When unset (e.g. during local development or preview deployments), evaluates to null.
 * This guarantees that preview deployments or localhost never get indexed as production canonicals.
 */
export const authoritativeProductionUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL
  ? cleanUrl(process.env.NEXT_PUBLIC_SITE_URL)
  : null;

/**
 * Returns the effective base URL for metadata resolution.
 * If NEXT_PUBLIC_SITE_URL is configured, returns that authoritative URL.
 * Otherwise, falls back to http://localhost:3000 for local development.
 */
export function getSiteUrl(): string {
  if (authoritativeProductionUrl) {
    return authoritativeProductionUrl;
  }
  return "http://localhost:3000";
}

/**
 * Backward compatibility export.
 */
export const siteUrl = getSiteUrl();

export interface PageMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Constructs robust, production-safe metadata for Next.js App Router pages.
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/images/brand/logo-neon.jpg",
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title
    ? (title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`)
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const currentSiteUrl = getSiteUrl();

  // Canonical safety: emit canonical URL ONLY when authoritative production URL is configured.
  // This prevents localhost or temporary preview domains from masquerading as canonical production URLs.
  const alternates = authoritativeProductionUrl
    ? { canonical: `${authoritativeProductionUrl}${path}` }
    : undefined;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(currentSiteUrl),
    ...(alternates ? { alternates } : {}),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path || "/",
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
          alt: `${siteConfig.name} — Mexican-Inspired Cafe in Baben, Bardoli`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [
        {
          url: image,
          alt: `${siteConfig.name} — Baben, Bardoli`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Prepares the schema.org LocalBusiness / Restaurant JSON-LD structured data.
 * Adheres strictly to verified physical café attributes from src/data/site.ts.
 */
export function getLocalBusinessSchema() {
  const currentUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "CafeOrCoffeeShop"],
    "@id": `${currentUrl}/#restaurant`,
    name: siteConfig.name,
    description: siteConfig.description,
    image: `${currentUrl}/images/brand/logo-neon.jpg`,
    url: currentUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.location.shop}, ${siteConfig.location.building}, ${siteConfig.location.street}`,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      postalCode: siteConfig.location.postalCode,
      addressCountry: "IN",
    },
    servesCuisine: ["Mexican-inspired", "Cafe"],
    priceRange: "₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.location.googleMapsShareUrl,
    ],
  };
}
