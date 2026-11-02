# Phase 7 — Interaction Audit

**Stage:** 01 — Repository & reference audit
**Branch:** `claude/dazzling-volta-o0dfyv`
**Date:** 2026-11-02

---

## 1. Repository baseline (inspected, not assumed)

| Item | Finding |
| --- | --- |
| Project root | `/` of the repository (single Next.js app, no monorepo) |
| Git state | Clean working tree. One commit (`60f8056 Inital Commit`). `origin/main` is identical to the working branch. |
| Framework | Next.js **16.3.8** (App Router), React **19.2.8**, TypeScript 5, Tailwind CSS 4 |
| Animation stack | `motion` **13.5.0** (`motion/react`) — the only animation dependency. No GSAP, no Three.js, no Lenis. |
| Other runtime deps | `lucide-react` only |
| Scripts | `dev`, `build`, `start`, `lint` (`eslint`) |
| Deployment | `vercel.json` (`{"framework":"nextjs"}`), default `next.config.ts` |

### Baseline checks (before any Phase 7 change)

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | exit 0 |
| `npx eslint src/` | **exit 1** — 1 pre-existing error: `src/components/layout/MobileMenu.tsx:23` (`react-hooks/set-state-in-effect`, `setMounted(true)` in effect) |
| `npx next build` | exit 0 — all 10 routes statically prerendered |

### Next.js 16 notes (from `node_modules/next/dist/docs`)

- `next/image` `priority` is **deprecated** in v16 in favour of `preload` / `fetchPriority`. The current Hero and Archway still use `priority`.
- `images.qualities` now defaults to `[75]`. Only the default quality may be used without config changes.

## 2. Discrepancies between the Phase 7 brief and the actual repository

The brief describes components and features that **do not exist in this repository**. I verified this with a full-tree search (`grep -rn` over `src/` and `docs/`):

| Brief says exists | Actual state |
| --- | --- |
| `src/components/motion/FacadeStudy.tsx` | **Not present.** No `components/motion/` directory exists. |
| `src/components/motion/CulinaryFocusLens.tsx` | **Not present.** |
| `src/components/motion/PhysicalMenuFolio.tsx` | **Not present.** The menu interaction lives in `src/sections/EditorialMenuSection.tsx` (tab index + fading list). |
| `src/components/motion/ArchiveRibbon.tsx` | **Not present.** Homepage gallery is a static 3-image grid in `src/sections/CuratedGallerySection.tsx`. |
| Phase 5G.1 "contrast-safe editorial text panel" in the Archway | **Not present.** Archway text sits directly on the photo with `drop-shadow` only. |
| Phone integration (`83200 02128`, `tel:+918320002128`) | **Not present.** `siteConfig.placeholders.phone` is `"TODO_PHONE_NUMBER"`. No `tel:` link or `telephone` in JSON-LD. |

**Consequence:** Phase 7 builds these signature interactions **inside the existing architecture** (new files in `src/components/motion/`), rather than "elevating" files that were never committed. It also adds the contrast-safe Archway panel that the brief requires to be preserved. The phone number the owner supplied in the brief is added to `siteConfig` and surfaced. WhatsApp stays gated off because it is still `TODO_WHATSAPP_NUMBER`.

## 3. Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | 7 sections + JSON-LD `Restaurant`/`CafeOrCoffeeShop` |
| `/menu` | `src/app/menu/page.tsx` | Full 11-category list (static, server component). Sticky jump bar. **Must stay plain and usable.** |
| `/about` | `src/app/about/page.tsx` | Static editorial page |
| `/gallery` | `src/app/gallery/page.tsx` | Hosts `GalleryLightbox` (client) |
| `/visit` | `src/app/visit/page.tsx` | Address, hours, map iframe, directions |
| `robots.ts`, `sitemap.ts` | | Canonical only when `NEXT_PUBLIC_SITE_URL` set — keep untouched |

## 4. Homepage sections — current behaviour

| # | Section | File | Current motion | Assessment |
| --- | --- | --- | --- | --- |
| 1 | Hero | `sections/HeroSection.tsx` | Staggered text fade-in; facade fades in; ambient gradient + Celosia drift on scroll (desktop) | Solid composition but **flat**: the photo is a framed rectangle with a hover zoom. There is no depth between the facade and the neon detail. `isMobile` comes from `setState` in a resize effect, so SSR renders "mobile" and it flips after hydration. |
| 2 | ArchwayThreshold | `sections/ArchwayThreshold.tsx` | Sticky 100dvh; facade scales 1→1.35 then **cross-fades** to interior | The signature idea is right but the move is a zoom plus a dissolve; it never passes through a doorway. Text has no panel (legibility depends on the photo). Both full-bleed images are `priority` even though they are below the fold. |
| 3 | SpatialCafeSection | `sections/SpatialCafeSection.tsx` | None (server component) | Good copy and feature list; static image. Natural home for the architectural line study. |
| 4 | EditorialMenuSection | `sections/EditorialMenuSection.tsx` | Category buttons; list fades/shifts on change | Functional and accurate. It reads as a tab widget rather than a physical menu object. |
| 5 | SocialRitualSection | `sections/SocialRitualSection.tsx` | None | Fine as a calm "breath" between signature moments. Leave it calm. |
| 6 | CuratedGallerySection | `sections/CuratedGallerySection.tsx` | Hover zoom | Static 3-image spread; repeats images already used above. |
| 7 | LocalConversionSection | `sections/LocalConversionSection.tsx` | None | Conversion block. No phone. |

### Shared UI

- `Navigation` (server): sticky header. The open/closed pill is computed at **build time** (static prerender), so it shows the status at build time, not live. Pre-existing; outside Phase 7 scope, noted.
- `MobileMenu`: portal drawer, Escape closes, body scroll lock. **Issues:** the closed drawer stays in the tab order (it is only translated off-screen); there is no focus move or focus return; and it has the lint error above.
- `MobileUtilityDock`: Directions / Menu / Instagram (+ gated WhatsApp). There is no Call action, although calling is the primary local action.
- `GalleryLightbox`: **Issues:** grid tiles are `div onClick` (not keyboard reachable); the modal has no `role="dialog"`, no focus trap and no focus return; there is no swipe; and the image swap has no directional transition.
- `globals.css`: global `prefers-reduced-motion` rule (CSS only). This does **not** affect Motion JS animations or scroll-linked transforms, so those need explicit handling.

## 5. Asset map (complete public image library)

| Path | Size | What is genuinely visible | Usable geometry |
| --- | --- | --- | --- |
| `/images/cafe/facade-exterior.png` | 731×978 | Two-storey shopfront. Gabled roof with vertical slats, dark columns, glass balcony, dark fascia band, round-bottomed **GUAC N' ROLL** signboard, cream breeze-block screens (diamond/triangle lattice), **arched glass door** inside the right-hand screen, glazed shopfront with potted palms, polished forecourt | Ground y≈772; door arch centre (509, 611) r≈76; signboard x 143–267, round bottom r≈62; fascia y 395–440; gable apex (365, 2) |
| `/images/cafe/interior-arches.png` | 1307×975 | Dining room. Mauve curved ceiling band, **arched pass-through** to the open kitchen, arched and U-shaped wall niches with vases, walnut tables, cordless table lamps, herringbone floor | Kitchen arch: semicircle centre (559, 582) r≈241; niches at (915–965, 412–462), (1072–1148, 398–458), (166–194, 348–455) |
| `/images/food/tacos-drink-table.png` | 732×981 | **One** food photo: a plate of tacos on a sage-green platter, a layered red/orange/blue cold drink with mint, the printed menu + table standee, a napkin holder | Plate region ≈ (260–676, 461–981); glass ≈ (23–327, 350–730); menu ≈ (81–529, 0–560) |
| `/images/menu/physical-menu.png` | 770×977 | Scan/photo of the printed 3-column menu with avocado engraving | Source of truth for `src/data/menu.ts` |
| `/images/brand/logo-neon.jpg` | 1024×1024 | Illuminated wordmark | — |
| `Assests/*` | — | Original screenshots (not served) | — |

**Hard constraints derived from the asset map**

1. There is exactly **one food photograph**. It shows tacos (category-level match: *Tacos (4 Pcs)*). The specific taco variety and the specific drink **cannot be identified**, so no photo may be attached to a named menu item.
2. There is **no 3D model**, no depth map and no cut-out layer. A genuine WebGL cafe scene would require inventing geometry, so **Three.js / R3F is rejected** for this phase.
3. Every "fragment" in the Memory Ribbon must be either a full photograph or an honest crop of one, captioned only with what is visible.

## 6. COCOVA study (inspected live with Playwright, 1440×900 and 390×844)

I loaded `https://thecocova.in/` in Chromium, dumped its DOM structure, and scripted scrolls, drags and clicks. What I observed:

| Principle | COCOVA mechanism (observed) | Worth translating? |
| --- | --- | --- |
| A. Hero product showcase | 3 buttons (`Show Mango Thick Shake`, …) swap the foreground cup; caption/price change in sync | **Principle yes** (synchronised media + metadata). Guac N' Roll has no product cut-outs, so the translation is spatial depth on the real facade photograph. |
| B. Draggable memory carousel | `#memories`: SVG tree (31 paths); 9 `<article>` photo cards with `aria-label="View memory: …"`; container `tabindex` "Interactive 3D rotatable memory tree"; drag rotates the cards on a cylinder | **Yes** — the tactile drag-through-memories feel. The tree metaphor is theirs; ours becomes a **printed-photo ribbon** in 3D perspective with a rotary progress seal. |
| C. Product carousel with synced content | `#product-truth`: one `<canvas>` (WebGL particle morph) + marquee | Sync principle only. **The WebGL morph is rejected:** heavy, and nothing real to morph. |
| D. Scroll-drawn architectural line | `#vibe`: **3600 px** tall section, `.ritual-sticky` pinned; paths use `stroke-dasharray` = path length (1161px, 441px, …) and the offset is scrubbed by scroll; draws an invented storefront elevation. On mobile it is **still pinned at 3038 px.** | **Yes**, but ours traces **geometry visible in the real photos**, and it is **not pinned** (scrubbed by the element's own passage through the viewport). That avoids a 3000 px mobile pin. |
| E. Printed-menu multi-card | `#menu`: 15 printed cards; active `scale(1)`, neighbours `matrix(0.95…)` and `opacity .38`; category pills, prev/next, "Jump to Page n" dots | **Yes**, translated into a **stack of printed pages that turn on a hinge**, styled after Guac N' Roll's own printed menu (caps headings, hairline rules). Not a flat slider. |
| F. Prev/next + progression | Buttons + dots + counter | **Yes**: counters, progress bar, direct selection. |
| G. Guest stories | Horizontal review track | **No.** The cafe has no verified reviews on file, and inventing quotes is forbidden. The existing "Read Authentic Reviews on Google" link stays. |
| H. Chapter transitions | Section-level cross-fades; a marquee divider | Selective: one camera-like transition (Archway), not on every section. |
| I. Pacing | Long pinned ritual; most other sections are free-scrolling | Keep pinning to **one** sequence (Archway). |
| J. Mobile | Tree shrinks but stays drag-based; menu becomes a single centred card with pills on two rows; ritual still pinned | Ours is **separate**: native scroll-snap ribbon, no 3D on phones, no long pins. |
| — | Has a reduced-motion stylesheet; no page-level x-overflow (scrollWidth − clientWidth = 0) | Match both. |

**What will not be copied:** the tree, the drink cut-outs, the particle canvas, the particle-wordmark footer, the line-drawn storefront elevation (theirs is an invented illustration), their colours, typefaces, card doodles or timings.

## 7. What already works (keep)

- Accurate menu data (48 items, 11 categories, all `verifiedFromPhysicalMenu`)
- SEO: metadata, canonical guard, sitemap, robots, JSON-LD
- Brand palette, type system, primitives (`Button`, `Section`, `Container`, …)
- Skip link, focus-visible outline, reduced-motion CSS
- Mobile utility dock, drawer, safe-area handling
- `/menu` page as a plain, fully accessible list

## 8. What needs improvement (Phase 7 targets)

1. **No memorable signature interaction.** Everything is fade or hover-zoom.
2. Hero is flat, with no spatial depth between the two real photographs it already layers.
3. The Archway dissolves instead of passing *through* the door, and its text is unprotected.
4. There is no architectural line study, though the photos contain strong arch geometry: the door arch, the kitchen arch and the niche arches.
5. The menu reads as tabs, not as a printed object.
6. The gallery repeats images; the lightbox has keyboard/focus gaps.
7. Viewport detection via `setState` in effects (hydration flip plus a lint error).
8. Below-fold images are marked `priority` (deprecated prop; it also competes with the real LCP image).
9. Phone number is missing everywhere.
