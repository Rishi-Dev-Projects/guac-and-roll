# Guac N' Roll Cafe — Owner Data & Content Lock Report (Phase 3D)

**Date:** 2026-10-02  
**Status:** Content Frozen & Verified  
**Scope:** Phase 3D Owner Data Integration & Content Integrity  

---

## 1. Confirmed Owner Information

The following business attributes have been definitively verified against the physical printed menu, exterior architectural photography, and official verified Google / Instagram listings:

| Attribute | Verified Value | Source / Verification Method |
| :--- | :--- | :--- |
| **Business Name** | Guac N' Roll Cafe | Exterior signage fascia & printed menu artifact |
| **Concept & Cuisine** | Mexican-Inspired Cafe & Kitchen | Physical menu & brand brief |
| **Physical Address** | Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli, Gujarat 394601, India | Exterior facade signage & verified Google listing |
| **Operating Hours** | Daily (Mon — Sun), 11:00 AM — 11:00 PM | Verified Google Business profile & operational schedule |
| **Google Business Link** | `https://share.google/PXUAlW6Y3CEHXkXU1` | Direct Google Maps share link |
| **Instagram Account** | `@guacnroll.cafe` (`https://www.instagram.com/guacnroll.cafe`) | Confirmed live social account |
| **Menu Items & Pricing** | Complete 11-category menu (Starters, Tacos, Sizzlers, Pasta, Burritos, Burrito Bowls, Enchiladas, Quesadillas, Smoothies, Coffee, Mocktails) with exact rupee pricing | High-resolution physical menu photograph (`Assests/Screenshot 2026-10-02 112630.png`) |
| **Architectural Features** | Terracotta triangular breeze blocks (celosias), arched alcoves, lime-wash plaster, herringbone timber parquet, cordless amber lamps | Verified physical café photos |

---

## 2. Information Still Missing (Awaiting Owner Input)

The following operational details have **not** been provided by café management. In strict accordance with anti-slop and zero-fabrication standards, these fields are safely gated or omitted:

1. **WhatsApp Business Phone Number** (e.g. 10-digit number with country code `91...`)
2. **Dedicated Cafe Voice Phone Number** (for `tel:` click-to-call)
3. **Official Business Email Address** (e.g. `hello@...` or `contact@...`)
4. **Custom Production Domain** (e.g. `guacnroll.in` or `guacnrollcafe.com`)
5. **Reservation Policy** (e.g. walk-ins only, reservations accepted, table booking policy)
6. **Online Delivery Platform Profiles** (Swiggy / Zomato outlet links)

---

## 3. WhatsApp Status

* **Architecture State:** **Built, tested, and safely gated.**
* **Current UI Behavior:**
  * When unconfigured (`TODO_WHATSAPP_NUMBER`), the public UI displays a graceful pending state: `"Architecture Active · Setup in Progress"` / `"Awaiting Dedicated Number"`.
  * No broken links, dummy phone numbers, fake order carts, or fake checkout flows are rendered.
  * In the mobile utility dock, the WhatsApp action is conditionally hidden until activated.
* **Activation Path:**
  * Once the owner provides the number, update `siteConfig.placeholders.whatsapp` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts).
  * Direct 1-tap WhatsApp chat and ordering CTAs will automatically activate across the website.

---

## 4. Phone Status

* **Status:** **Gated / Absent.**
* **Current UI Behavior:**
  * Click-to-call (`tel:`) is not displayed since no verified voice phone number has been provided.
  * No placeholder phone numbers (e.g., `+91 99999...`, `1234567890`) exist in user-facing copy or schema.
* **Activation Path:**
  * Update `siteConfig.placeholders.phone` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts) once confirmed.

---

## 5. Email Status

* **Status:** **Omitted.**
* **Current UI Behavior:**
  * No arbitrary or personal email addresses are shown in the contact, visit, or footer areas.
  * Structured data does not declare an email field.
* **Activation Path:**
  * Update `siteConfig.placeholders.email` in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts) once an official business email is provided.

---

## 6. Domain Status

* **Status:** **Environment-driven URL architecture ready.**
* **Current Architecture:**
  * Configured via `NEXT_PUBLIC_SITE_URL` in [`.env.example`](file:///c:/Users/rishi/Desktop/Guac&Roll/.env.example) and consumed via [`src/lib/seo.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/lib/seo.ts).
  * When `NEXT_PUBLIC_SITE_URL` is omitted, the application falls back safely without emitting false production canonical tags.
  * Hardcoded domain URLs have been removed across all components, sitemap, and robots handlers.
* **Activation Path:**
  * When a custom domain is purchased and connected on Vercel, set `NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com` in environment variables.

---

## 7. Reservation Policy Status

* **Status:** **Omitted.**
* **Current UI Behavior:**
  * No unconfirmed claims regarding reservations (e.g., "walk-in only", "first-come, first-served", or "reservations accepted") are made anywhere in the application copy.
  * No fake booking buttons, calendars, or reservation widgets exist.
* **Activation Path:**
  * Once the café establishes and communicates a formal policy, a factual notice can be toggled in `siteConfig.placeholders.reservationStatus`.

---

## 8. Delivery Platform Status (Swiggy / Zomato)

* **Status:** **Unconfirmed / Omitted.**
* **Current UI Behavior:**
  * No Swiggy or Zomato badges, links, or ordering buttons are rendered.
  * Only direct in-person dining and verified physical visit directions are promoted.
* **Activation Path:**
  * Once official Swiggy or Zomato store URLs are provided, centralized configuration in [`src/data/site.ts`](file:///c:/Users/rishi/Desktop/Guac&Roll/src/data/site.ts) can be enabled.

---

## 9. Internal TODO Values Audit

A comprehensive codebase audit confirmed that **zero raw TODO placeholders** appear in rendered UI, metadata, or server responses:

| Placeholder Key | Location | Publicly Visible? | Current State |
| :--- | :--- | :--- | :--- |
| `TODO_DOMAIN` | `src/data/site.ts` | **No** (Internal config only) | Awaiting custom domain purchase |
| `TODO_PHONE_NUMBER` | `src/data/site.ts` | **No** (Internal config only) | Awaiting dedicated telephone number |
| `TODO_WHATSAPP_NUMBER` | `src/data/site.ts` | **No** (Internal config only) | Awaiting WhatsApp Business number |
| `TODO_BUSINESS_EMAIL` | `src/data/site.ts` | **No** (Internal config only) | Awaiting official business email |
| `TODO_RESERVATION_STATUS` | `src/data/site.ts` | **No** (Internal config only) | Awaiting owner reservation policy |

*HTTP response validation across all public routes (`/`, `/menu`, `/about`, `/gallery`, `/visit`, `/sitemap.xml`, `/robots.txt`) confirmed `containsTodo: false` on 100% of routes.*

---

## 10. Final Content Integrity Audit

All high-risk terms and potential AI-slop claims were audited and categorized:

| Audited Term / Concept | Categorization | Action Taken |
| :--- | :--- | :--- |
| `100% vegetarian` / `pure vegetarian` | **Omitted / Per-Item Only** | Business-wide claims removed. Vegetarian indicators kept strictly on confirmed physical menu items. |
| `best` / `#1` / `famous` / `award` | **Removed / Banned** | Zero occurrences. No superlative or unverified awards claimed. |
| `founder` / `owner name` | **Omitted** | No fabricated founder names or backgrounds. |
| `Luis Barragán` | **Removed** | Attributions removed; text grounded purely on observable Mexican modernist design elements. |
| `2700K lighting` | **Removed** | Technical lab claim replaced with observable description: "cordless warm amber lamps". |
| `stone-ground` | **Corrected** | Replaced with "freshly prepped" and "fresh avocados" to match printed menu wording. |
| `first-come, first-served` / `walk-in only` | **Removed** | Unverified reservation policy claims removed. |
| `university corridor` | **Grounded** | Replaced with factual geographic coordinates: "Ambiance Twin City, Mota Road, Baben". |
| `priceRange` | **Conservative** | Set strictly to `"₹₹"` in schema.org JSON-LD structured data. |
| `ratings` / `review quotes` | **Conservative** | No fabricated aggregate star ratings or testimonials. Direct links provided to verified Google Business profile. |

---

## 11. Verification Matrix

* **TypeScript Compilation (`tsc --noEmit`):** Clean (0 errors).
* **ESLint (`eslint .`):** Clean (0 warnings, 0 errors).
* **Production Build (`next build`):** Clean (All 12 routes prerendered statically).
* **HTTP Status Check:** All 7 public endpoints returned HTTP 200 with 0 TODO leaks.
* **Browser Subagent Testing:** Fully verified on `http://localhost:3001/` and `/visit` with 0 console errors and clean screenshots recorded.
