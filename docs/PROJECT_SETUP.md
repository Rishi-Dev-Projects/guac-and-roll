# Guac N' Roll Cafe — Technical Project Setup & Architecture Guide

---

## 1. Tech Stack Overview

The Guac N' Roll Cafe web platform is engineered using modern, production-grade frontend technologies optimized for performance, search visibility, accessibility, and fast mobile delivery:

- **Framework:** Next.js (v16.3.8, App Router, React 19)
- **Language:** TypeScript (v5.x, Strict Mode)
- **Styling:** Tailwind CSS (v4) with centralized CSS Variables and `@theme` tokens
- **Typography:** `next/font/google` (`Playfair_Display`, `Plus_Jakarta_Sans`, `Syne`)
- **Icons:** `lucide-react` paired with custom SVG primitives
- **Motion:** `motion` (v13.5.0, hardware-accelerated spring physics)
- **Images:** `next/image` with responsive `sizes`, aspect-ratio containers, and priority loading
- **Quality & Linting:** ESLint (v9) with `eslint-config-next`
- **Hosting & Deployment Target:** Vercel

---

## 2. Why Each Technology Is Used

1. **Next.js App Router (React Server Components by Default):**
   - Renders 100% of static marketing and menu content on the server.
   - Zero client-side JavaScript overhead for static pages, ensuring sub-second first contentful paint (FCP) on mobile networks in Bardoli.
   - Built-in metadata API, sitemap generation, and robots handling.

2. **TypeScript (Strict Mode):**
   - Enforces strict typing across all 40+ menu items, categories, business coordinates, and UI primitives.
   - Eliminates runtime errors and guarantees data integrity between physical menu artifacts and digital views.

3. **Tailwind CSS v4:**
   - Ultra-fast native CSS compilation using `@theme`.
   - Centralizes all empirical brand colors (`#261C16`, `#8D6E66`, `#DBC5A6`, `#F8F5EE`, `#5F7355`, `#F5D48A`, `#1C1917`) into reusable semantic utility tokens.

4. **next/font/google:**
   - Zero layout shift (CLS: 0) with automatic font preloading and self-hosting.
   - Pairs editorial serif (`Playfair Display`) with warm humanist sans (`Plus Jakarta Sans`) and condensed modernist sans (`Syne`) to reflect the physical signage and printed menu.

5. **Motion:**
   - Declarative spring physics (`stiffness: 100, damping: 20`) replacing robotic easing.
   - Hardware-accelerated GPU transitions strictly using `transform` and `opacity`.

6. **Lucide React & Clean SVG Primitives:**
   - Lightweight, consistent 24x24 stroke iconography for navigation, hours, and directions.
   - Banned emojis are systematically replaced with crisp vector marks.

---

## 3. Directory Structure

```text
Guac&Roll/
├── Assests/                     # Original, untouched brand and menu photographs
│   ├── Guac&Roll.jpg           # Illuminated signage lettering
│   ├── Screenshot 2026-10-02 112630.png # Printed physical menu (3 columns)
│   ├── Screenshot 2026-10-02 112708.png # Exterior breeze-block facade
│   ├── Screenshot 2026-10-02 112836.png # Interior sculptural arches
│   └── Screenshot 2026-10-02 112903.png # Tacos on sage platter & layered cooler
├── docs/                        # Research, QA, and architectural documentation
│   ├── GUAC-N-ROLL-DESIGN-BRIEF.md # Discovery & design brief
│   ├── PRODUCTION-QA-REPORT.md # Phase 3A production readiness audit
│   ├── PONYTAIL-CLEANUP-REPORT.md # Phase 3B code quality & simplification report
│   └── PROJECT_SETUP.md        # Technical setup guide (this document)
├── public/                      # Static assets served by Next.js
│   └── images/
│       ├── brand/              # Logo and wordmark assets
│       │   └── logo-neon.jpg
│       ├── cafe/               # Architecture and interior spaces
│       │   ├── facade-exterior.png
│       │   └── interior-arches.png
│       ├── food/               # Dishes, plating, and beverages
│       │   └── tacos-drink-table.png
│       └── menu/               # Physical menu cards and scans
│           └── physical-menu.png
├── src/
│   ├── app/                    # Next.js App Router routes & layout
│   │   ├── about/              # /about route (Server Component)
│   │   ├── gallery/            # /gallery route (Server Component)
│   │   ├── menu/               # /menu route (Server Component)
│   │   ├── visit/              # /visit route (Server Component)
│   │   ├── globals.css         # Tailwind v4 theme (@theme) & base CSS
│   │   ├── layout.tsx          # Root layout with fonts, nav, footer, and dock
│   │   ├── page.tsx            # / (Home) route (Server Component)
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── components/
│   │   ├── gallery/
│   │   │   └── GalleryLightbox.tsx # Interactive lightbox & filter (Client Component)
│   │   ├── icons/              # Custom SVG primitives
│   │   │   ├── CelosiaPattern.tsx  # Architectural breeze-block patterns
│   │   │   └── InstagramIcon.tsx
│   │   ├── layout/             # Architectural shell components
│   │   │   ├── Footer.tsx            # Server Component
│   │   │   ├── MobileMenu.tsx        # Mobile drawer navigation (Client Component)
│   │   │   ├── MobileUtilityDock.tsx # Quick-action dock (Server Component)
│   │   │   └── Navigation.tsx       # Desktop navigation (Server Component)
│   │   ├── primitives/         # Composable atomic UI primitives
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Text.tsx
│   │   └── visit/
│   │       └── CopyAddressButton.tsx # Clipboard copy button (Client Component)
│   ├── data/                   # Typed local data structures (Single Source of Truth)
│   │   ├── menu.ts             # 11 verified categories & 48 menu items
│   │   └── site.ts             # Verified location, hours, social, and placeholders
│   ├── lib/                    # Helpers, utilities, and motion definitions
│   │   ├── motion.ts           # Hardware-accelerated spring physics variants
│   │   └── seo.ts              # Metadata and LocalBusiness JSON-LD schema helpers
│   └── sections/               # Architectural homepage section compositions
│       ├── CuratedGallerySection.tsx
│       ├── EditorialMenuSection.tsx  # Interactive category filter (Client Component)
│       ├── HeroSection.tsx           # Motion hero (Client Component)
│       ├── HeroTransition.tsx
│       ├── LocalConversionSection.tsx
│       ├── SocialRitualSection.tsx
│       └── SpatialCafeSection.tsx
├── eslint.config.mjs            # ESLint flat config
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration for Tailwind v4
└── tsconfig.json               # TypeScript configuration with path aliases (@/*)
```

---

## 4. Dependencies

### Core Production Dependencies
- `next` (`16.3.8`): Full-stack React framework with App Router and Turbopack.
- `react` (`19.2.8`): UI foundation.
- `react-dom` (`19.2.8`): DOM rendering engine.
- `lucide-react` (`^1.49.0`): Clean SVG icons.
- `motion` (`^13.5.0`): Physics-based motion library.

### Development Dependencies
- `typescript` (`^5`): Static type-checker.
- `@types/node`, `@types/react`, `@types/react-dom`: Type definitions.
- `tailwindcss` (`^4`) & `@tailwindcss/postcss` (`^4`): Tailwind CSS v4 compiler.
- `eslint` (`^9`) & `eslint-config-next` (`16.3.8`): Code style and rule enforcement.

---

## 5. Design-Token Architecture

All color, typographic, spatial, and elevation values are defined natively via Tailwind CSS v4 `@theme` in `src/app/globals.css`. By leveraging native CSS variables and `@theme`, there is zero runtime overhead, and duplicate token abstraction files (`tokens.ts`) have been completely eliminated.

### Palette Matrix
- **Espresso Earth (`#261C16`):** Primary dark foundation. Applied to headers, footers, primary buttons, and dark contrast sections.
- **Adobe Mauve (`#8D6E66`):** Architectural accent extracted from sculpted plaster arches. Applied to category tags, subtle borders, and icon containers.
- **Celosia Biscuit (`#DBC5A6`):** Secondary warm neutral derived from exterior breeze blocks. Applied to surface cards, subtle borders, and secondary buttons.
- **Oatmeal Plaster (`#F8F5EE`):** Primary canvas. Replaces harsh `#FFFFFF` to match the lime-plaster café walls and physical printed menu stock.
- **Sage Ceramic (`#5F7355`):** Botanical and pure-veg accent extracted from handcrafted ceramic tableware and mint garnishes.
- **Warm Amber Glow (`#F5D48A`):** Illumination accent from backlit signage and cordless table lamps.
- **Charcoal Ink (`#1C1917`):** High-contrast neutral ink for body copy.

---

## 6. Data Architecture

The application requires zero external database or CMS for V1. All data is structured locally in TypeScript:

### Site Configuration (`src/data/site.ts`)
- Verified business name: `Guac N' Roll Cafe`
- Verified address: `Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli, Gujarat 394601, India`
- Verified operating hours: `Daily, 11:00 AM – 11:00 PM`
- Verified Instagram: `https://www.instagram.com/guacnroll.cafe`
- Verified Google Maps share link: `https://share.google/PXUAlW6Y3CEHXkXU1`
- Explicit missing-information placeholders:
  - `TODO_WHATSAPP_NUMBER`
  - `TODO_PHONE_NUMBER`
  - `TODO_DOMAIN`
  - `TODO_RESERVATION_STATUS`
  - `TODO_BUSINESS_EMAIL`
- Helper utilities: `isCafeCurrentlyOpen()` (calculates open status using Indian Standard Time), `getWhatsAppUrl()`.

### Menu Data (`src/data/menu.ts`)
- 11 verified culinary categories:
  1. *Starters & Appetizers* (Guacamole & Chips, Queso Fundido, Elote, Nachos Supreme, Mexican Bhel, Avocado Toast)
  2. *Tacos (4 Pcs)* (Cauliflower, Crispy Avocado, Black Bean & Sweet Potato, Spinach Cheese, Paneer)
  3. *Sizzlers* (Mexican Veg, Paneer Fajita, Cheesy Nacho)
  4. *Pasta & Spaghetti* (Arrabbiata, Alfredo, Pesto, Aglio-e-Olio)
  5. *Burritos* (Veggie, Paneer, Tossed Veg, Chipotle Veg)
  6. *Burrito Bowls* (Mexican Rice, Black Bean, Paneer, Chipotle Veggie)
  7. *Enchiladas* (Three Cheese, Veg, Spinach Corn)
  8. *Quesadillas* (Veggie Supreme, Paneer, Spinach Corn, Mushroom Cheese)
  9. *Smoothies* (Avocado, Make Your Own, Berry Blast, Peanut Butter Banana)
  10. *Coffee* (Espresso, Americano, Cappuccino, Café Latte, Hazelnut Latte, Caramel Macchiato)
  11. *Mocktails* (Virgin Mojito, Mango Spicy Cooler, Cucumber Mint Cooler, Berry Hibiscus Fizz, Watermelon Basil Smash)
- Each item contains verified INR prices, ingredient descriptions, and dietary classifications (`isVegetarian: true`).

---

## 7. Image Architecture

- **Next/Image Enforcement:** All imagery is loaded via Next.js `<Image>` with explicit width/height or `fill` within responsive aspect-ratio containers (`ImageFrame`).
- **Aspect-Ratio Conventions:**
  - `4/3` and `16/9`: Spatial and architectural photography.
  - `arch` (`rounded-t-[3rem]`): Replicating the physical exterior and interior portal curves.
  - `1/1`: Dish close-ups and tableware highlights.
- **Original Asset Preservation:** The original files in `Assests/` remain completely untouched. Organized copies reside in `public/images/` with clear semantic names.

---

## 8. SEO Foundation

- **Metadata Architecture:** Centralized in `src/lib/seo.ts` using Next.js Metadata API. Supports dynamic titles, descriptions, canonical URLs, and Open Graph previews.
- **Dynamic Sitemap:** `src/app/sitemap.ts` generates `/sitemap.xml` covering `/`, `/menu`, `/about`, `/gallery`, and `/visit`.
- **Robots Route:** `src/app/robots.ts` generates `/robots.txt` disallowing private endpoints and declaring the sitemap URL.
- **Structured Data Preparation:** `getLocalBusinessSchema()` in `src/lib/seo.ts` formats schema.org `Restaurant` / `CafeOrCoffeeShop` JSON-LD data ready for Phase 2 injection.

---

## 9. Accessibility Foundation (WCAG 2.1 AA)

- **Color Contrast:** Charcoal Ink (`#1C1917`) on Oatmeal Plaster (`#F8F5EE`) exceeds 11:1 contrast ratio.
- **Semantic Structure:** Native `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<figure>`, and `<footer>` elements.
- **Accessible Navigation:** Skip-to-content link, keyboard focus indicators (`:focus-visible`), and ARIA modal dialog attributes on the mobile menu.
- **Anti-Emoji Policy:** Zero emojis in code, markup, or copy. Replaced with accessible SVG vector icons.
- **Reduced Motion:** Respects `prefers-reduced-motion: reduce`.

---

## 10. Current Missing Business Information

The following items are unresolved and require owner confirmation:
1. **Dedicated WhatsApp Mobile Number:** Needed for customer WhatsApp ordering and inquiry links.
2. **Official Telephone Number:** Needed for voice calls.
3. **Custom Production Domain:** Needed to replace placeholder `TODO_DOMAIN`.
4. **Official Contact Email:** Needed for customer inquiries.
5. **Table Reservation Policy:** Confirmation on whether bookings are accepted or if the café is walk-in only.
6. **Online Delivery Platform URLs:** Direct links to Swiggy or Zomato listings in Bardoli.

---

## 11. How to Run Locally

```bash
# 1. Clone or navigate to the project directory
cd "c:\Users\rishi\Desktop\Guac&Roll"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server with Turbopack
npm run dev
# Or directly:
node ./node_modules/next/dist/bin/next dev -p 3000

# 4. Open in browser
http://localhost:3000
```

---

## 12. How to Run Lint

```bash
# Run ESLint check
node ./node_modules/eslint/bin/eslint.js "src/**/*.{ts,tsx}"
# Or via npm script:
npm run lint
```

---

## 13. How to Run Production Build

```bash
# 1. Run full Next.js production build (Turbopack + TypeScript check)
node ./node_modules/next/dist/bin/next build
# Or via npm:
npm run build

# 2. Test production build locally
node ./node_modules/next/dist/bin/next start -p 3000
```

---

## 14. Vercel Deployment Notes

- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node.js Version:** 20.x or 22.x
- **Environment Variables (Optional):**
  - `NEXT_PUBLIC_SITE_URL`: Set to production domain once purchased (e.g. `https://guacnrollcafe.com`). Defaults to `https://guacnrollcafe.local` if unconfigured.
