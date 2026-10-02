# Guac N' Roll Cafe — SEO & Production Configuration Guide
## Phase 3C: Production SEO, Metadata, Structured Data & Deployment Setup

**Date:** 2026-10-02  
**Platform:** Next.js 16.3.8 (React 19, Turbopack)  
**Status:** PHASE 3C COMPLETE — READY FOR DEPLOYMENT  
**Verified Source of Truth:** `src/data/site.ts`, `src/data/menu.ts`  

---

## 1. Metadata Architecture

Metadata is centralized in [`src/lib/seo.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/lib/seo.ts) via the `constructMetadata()` builder. Every public route exports a unique, conservative, factually confirmed title and description tailored for local Bardoli/Baben discovery:

| Route | Page Title | Meta Description | Primary Keywords / Focus |
|---|---|---|---|
| `/` | `Guac N' Roll Cafe — Mexican-Inspired Cafe in Bardoli` | A modern, warm, and earthy Mexican-inspired cafe in Baben, Bardoli. Featuring tacos, sizzlers, burrito bowls, specialty coffee, and handcrafted coolers. | Brand identity, Mexican-inspired cafe, Bardoli, Baben |
| `/menu` | `Food & Beverage Menu · Guac N' Roll Cafe` | View the complete 11-category food and beverage menu at Guac N' Roll Cafe in Baben, Bardoli. Featuring tacos, sizzlers, burritos, burrito bowls, quesadillas, smoothies, and specialty coffee. | 11 categories, 48 items, verified pricing (₹149 - ₹549) |
| `/about` | `About Guac N' Roll Cafe · Space, Atmosphere & Design` | Learn about the atmosphere, spatial design, and culinary concept of Guac N' Roll Cafe in Baben, Bardoli. Featuring terracotta breeze blocks, arched dining spaces, and Mexican-inspired comfort. | Architecture, celosia breeze blocks, third place, dining space |
| `/gallery` | `Visual Gallery · Space, Atmosphere & Food Imagery \| Guac N' Roll Cafe` | Explore photography of Guac N' Roll Cafe in Baben, Bardoli. Featuring terracotta celosia breeze blocks, arched dining areas, artisanal tableware, and Mexican-inspired dishes. | Authentic photography, exterior, interior, tableware |
| `/visit` | `Visit Guac N' Roll Cafe · Location, Hours & Directions` | Visit Guac N' Roll Cafe at Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli. Open daily 11:00 AM to 11:00 PM. Get Google Maps directions and location details. | Shop 9 & 10, Ambiance Twin City, Mota Road, daily hours, map |

---

## 2. Canonical URL Strategy

### The Canonical Safety Guardrail
To prevent search engines from indexing development (`localhost:3000`) or ephemeral Vercel preview URLs (`*-vercel.app`) as canonical production addresses, canonical tags are governed by an authoritative configuration rule:

1. **When `NEXT_PUBLIC_SITE_URL` is set:**
   - Evaluates to `authoritativeProductionUrl` (e.g., `https://guacnrollcafe.com`).
   - Every route emits `<link rel="canonical" href="https://guacnrollcafe.com/path">`.
2. **When `NEXT_PUBLIC_SITE_URL` is NOT set (development or preview environments):**
   - `authoritativeProductionUrl` evaluates to `null`.
   - `alternates` evaluates to `undefined`, and **NO canonical link tag is emitted**.
   - Guessed domains (such as `guacnroll.in` or `guacnrollcafe.local`) are strictly prevented from entering search indexes.

---

## 3. Open Graph Strategy

Configured globally across all routes using genuine photographic assets:

- **Type:** `website`
- **Locale:** `en_IN`
- **Site Name:** `Guac N' Roll Cafe`
- **Default Image:** `/images/brand/logo-neon.jpg` (1024 × 1024 authentic illuminated signage)
- **Image Alt:** `Guac N' Roll Cafe — Mexican-Inspired Cafe in Baben, Bardoli`
- **Dimensions:** 1024 × 1024 px
- **Zero AI-generated social cards:** Only authentic brand assets are referenced.

---

## 4. Twitter / X Strategy

- **Card Type:** `summary_large_image`
- **Image:** `/images/brand/logo-neon.jpg`
- **Handle:** None declared (no official Twitter account exists; no unverified handles invented).
- **Fallback:** Inherits title, description, and preview image from Open Graph.

---

## 5. Favicon & Site Icons

Generated from the authentic visual brand identity (`#261C16` Espresso Earth foundation, Celosia breeze-block motif, and `#F8F5EE` serif monogram):

1. **`public/icon.svg` & `src/app/icon.svg`:** Vector SVG icon (984 bytes) served with `type="image/svg+xml"`. Crisp at 16px, 32px, 64px, and retina displays.
2. **`public/favicon.ico` & `src/app/favicon.ico`:** Standard Windows/browser multi-resolution ICO file (1,048 bytes).
3. **`public/apple-touch-icon.png` & `src/app/apple-icon.png`:** 180 × 180 PNG icon for iOS Safari bookmarks and home-screen shortcuts.
4. **`public/icon-192.png` & `public/icon-512.png`:** Standard Progressive Web App (PWA) manifest icon targets.

---

## 6. Structured Data (JSON-LD)

Schema.org structured data is embedded on the homepage (`/`) and visit page (`/visit`):

```json
{
  "@context": "https://schema.org",
  "@type": ["Restaurant", "CafeOrCoffeeShop"],
  "@id": "https://[YOUR_DOMAIN]/#restaurant",
  "name": "Guac N' Roll Cafe",
  "description": "A modern, warm, and earthy Mexican-inspired cafe in Baben, Bardoli. Featuring tacos, sizzlers, burrito bowls, specialty coffee, and handcrafted coolers.",
  "image": "https://[YOUR_DOMAIN]/images/brand/logo-neon.jpg",
  "url": "https://[YOUR_DOMAIN]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop 9 & 10, Ambiance Twin City, Mota Road, Baben",
    "addressLocality": "Bardoli",
    "addressRegion": "Gujarat",
    "postalCode": "394601",
    "addressCountry": "IN"
  },
  "servesCuisine": ["Mexican-inspired", "Cafe"],
  "priceRange": "₹₹ (₹149 - ₹549)",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "23:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/guacnroll.cafe",
    "https://share.google/PXUAlW6Y3CEHXkXU1"
  ]
}
```

### Strict Non-Fabrication Rules Followed:
- ❌ **No fake telephone number**
- ❌ **No fake email address**
- ❌ **No fake star rating or fabricated review count**
- ❌ **No fake reservation policy**
- ❌ **No business-wide "100% pure vegetarian" claims** (individual item vegetarian flags preserved)
- ❌ **No invented founder or history claims**
- ✅ **Verified operating hours:** 11:00 AM – 11:00 PM daily (confirmed via Google Business listing and exterior signage)
- ✅ **Verified address:** Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli (394601)

---

## 7. Sitemap (`/sitemap.xml`)

Dynamic route handler in [`src/app/sitemap.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/app/sitemap.ts):

- Includes **only** the 5 real public routes:
  1. `/` (Priority: 1.0, Change frequency: `daily`)
  2. `/menu` (Priority: 0.9, Change frequency: `daily`)
  3. `/about` (Priority: 0.7, Change frequency: `weekly`)
  4. `/gallery` (Priority: 0.7, Change frequency: `weekly`)
  5. `/visit` (Priority: 0.7, Change frequency: `weekly`)
- Resolves URLs dynamically using `getSiteUrl()`.

---

## 8. Robots (`/robots.txt`)

Dynamic route handler in [`src/app/robots.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/app/robots.ts):

```text
User-Agent: *
Allow: /
Disallow: /api/
```

- When `NEXT_PUBLIC_SITE_URL` is set in production:
  `Sitemap: https://[YOUR_DOMAIN]/sitemap.xml` is automatically appended.
- When running in preview or local development without `NEXT_PUBLIC_SITE_URL`:
  The sitemap directive is omitted to avoid search engine index contamination.

---

## 9. Environment Variable Setup

Documented in [`.env.example`](file:///c:/Users/rishi/Desktop/Guac&Roll/.env.example):

```bash
# Authoritative production site URL (no trailing slash)
NEXT_PUBLIC_SITE_URL=
```

### Development:
Leave unset. Defaults safely to `http://localhost:3000`.

### Production (Vercel):
Configure in **Vercel Dashboard > Project Settings > Environment Variables**:
- **Key:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://your-custom-domain.com` (e.g., `https://guacnrollcafe.com`)
- **Environments:** Select **Production** only. Leave unselected for Preview and Development.

---

## 10. Vercel Production Configuration

- **Framework Preset:** Next.js
- **Build Command:** `next build` (or `node ./node_modules/next/dist/bin/next build`)
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node.js Version:** 20.x or 22.x
- **Build Output:** 100% static prerender (SSG) across all 12 generated routes. Zero serverless cold-start latency.

---

## 11. Remaining Owner Inputs (Configuration Placeholders)

The following items are safely gated and ready for immediate activation once provided:

1. **Custom Domain:** Set `NEXT_PUBLIC_SITE_URL` in Vercel to activate canonical tags and production sitemap.
2. **Dedicated WhatsApp Mobile Number:** Update `placeholders.whatsapp` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts) with the 10-digit number. 1-tap WhatsApp ordering and inquiry buttons across the header, footer, local conversion section, and mobile dock will automatically activate.
3. **Official Phone Number:** Update `placeholders.phone` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts).
4. **Official Contact Email:** Update `placeholders.email` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts).
5. **Table Reservation Policy:** Update `placeholders.reservationStatus` once confirmed by café management.

---

## 12. Final SEO Checklist

- [x] Unique `<title>` on every route
- [x] Unique `<meta name="description">` on every route
- [x] Safe canonical URL logic preventing preview indexing
- [x] Open Graph tags with real 1024×1024 illuminated logo asset
- [x] Twitter Card summary_large_image configured
- [x] Valid vector SVG favicon, multi-resolution ICO, and Apple Touch Icon
- [x] Valid XML sitemap containing all 5 public routes
- [x] Safe `robots.txt` configuration
- [x] Schema.org `Restaurant` & `CafeOrCoffeeShop` JSON-LD structured data
- [x] Zero unsupported factual claims, fake phone numbers, or fake ratings
- [x] Zero TypeScript errors (`tsc --noEmit`)
- [x] Zero ESLint warnings or errors
- [x] 100% static prerender build passing
