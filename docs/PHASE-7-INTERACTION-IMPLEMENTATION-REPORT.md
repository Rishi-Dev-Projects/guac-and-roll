# Phase 7 — Interaction Implementation Report

**Stage:** 06 (final)
**Branch:** `claude/dazzling-volta-o0dfyv`
**Related:** `PHASE-7-INTERACTION-AUDIT.md` (Stage 01) · `PHASE-7-INTERACTION-PLAN.md` (Stage 02) · screenshots in `docs/phase-7-qa/`
**Deployment:** not deployed. `vercel.json` / `next.config.ts` untouched.

---

## 1. Existing implementation audited

I inspected the whole repository: one commit, clean tree, `origin/main` identical. Stack: Next 16.3.8, React 19.2.8, Tailwind 4, `motion` 13.5.0.

**Important discrepancy.** `FacadeStudy`, `CulinaryFocusLens`, `PhysicalMenuFolio`, `ArchiveRibbon`, the Phase 5G.1 Archway text panel, and the phone integration described in the brief **do not exist in this repository** (verified by full-tree search; details in the audit, §2). They were built new inside the existing architecture, and the contrast-safe Archway panel the brief asked to preserve was implemented.

Baseline before changes: `tsc` 0 · `eslint` **1 error** (`MobileMenu.tsx:23`) · `next build` 0.

## 2. COCOVA principles studied

I studied the live site in Chromium (Playwright) at 1440×900 and 390×844, scripting scrolls, drags and clicks:
- product-swap hero (3 buttons)
- cylindrical drag memory tree (focusable `article`s)
- WebGL particle product morph
- a **3600 px pinned** line-drawing section, still **~3000 px pinned on mobile**
- a menu deck with neighbours at `scale(.95)` / `opacity .38`
- a review track

**Translated:** synchronised media + metadata; tactile drag through memories; scroll-scrubbed line drawing; a printed multi-page menu with prev/next/direct selection.

**Rejected:**
- the tree metaphor, the particle canvas and the particle footer, because they are COCOVA's identity
- the review track, because there are no verified reviews to show
- long mobile pins

No layouts, art, colours, type or timings were copied.

## 3. New interactions implemented

Hierarchy, as planned: **4 signature** interactions, **2 secondary**, then small feedback.

| Tier | Interaction | Where |
| --- | --- | --- |
| Signature 1 | **Archway Threshold — through the door** | `sections/ArchwayThreshold.tsx` |
| Signature 2 | **Arch Line Study — "One arch, three times"** | `components/motion/ArchLineStudy.tsx` in `SpatialCafeSection` |
| Signature 3 | **Physical Menu Folio** | `components/motion/PhysicalMenuFolio.tsx` in `EditorialMenuSection` |
| Signature 4 | **Memory Ribbon** + rotary progress seal | `components/motion/MemoryRibbon.tsx` in `CuratedGallerySection` |
| Secondary | **Culinary Spotlight** (new chapter) | `components/motion/CulinarySpotlight.tsx`, `sections/CulinarySpotlightSection.tsx` |
| Secondary | **Hero — the cafe comes into view** | `sections/HeroSection.tsx` |
| Feedback | Lightbox directional transitions/swipe; card hover depth; drawer and dock refinements | `GalleryLightbox`, `MobileMenu`, `MobileUtilityDock` |

New homepage sequence: **Arrival** (Hero) → **Entering** (Archway) → **Discovering the space** (Ch.02 line study) → **Exploring the food** (Ch.03 Spotlight) → **Browsing the menu** (Ch.04 Folio) → **Atmosphere** (Ch.05 Social Ritual, left calm on purpose; Ch.06 Memory Ribbon) → **Visiting** (Ch.07).

## 4. 3D implementation approach

- **CSS 3D only** (`perspective`, `rotateX/Y`, `translateZ`, `preserve-3d`, `backface-visibility`) driven by Motion `MotionValue`s.
- **No Three.js / R3F.** No 3D model, depth map or cut-out of the cafe exists; a WebGL scene would mean inventing architecture.
- **No GSAP.** One pinned sequence did not justify a second animation engine. Motion's `useScroll` + `useTransform` gave scrubbed, reversible, release-safe timelines. **No dependencies were added.**
- All real-photo depth uses real photographs only:
  - the Archway moves a camera through the **measured** door aperture (731×978 source pixels, door centre (508.5, 659))
  - the Hero separates the facade and neon photographs in Z
- **Hydration safety:** `useMediaQuery` (built on `useSyncExternalStore`) replaces `setState`-in-effect viewport detection. `useScrubProgress` pipes scroll progress into a MotionValue that starts at 0 on the server and holds the final state under reduced motion.

## 5. Carousel implementation

`components/motion/useCoverflow.ts` is a custom engine (about 200 lines), not a library:
- One float `pos` MotionValue drives each card's x / rotateY / z / scale / opacity / tilt through `useCardDepth`. React state changes **only** when the rounded index changes.
- Pointer drag captures only after horizontal intent (6 px, |dx| > |dy|), so card clicks and vertical scrolling stay native (`touch-action: pan-y`).
- Rubber-banding at the ends; velocity projection capped at one card beyond the release point; spring snap.
- Horizontal trackpad deltas are consumed only when |deltaX| > |deltaY|. **Vertical wheel is never intercepted** (verified: a 300 px vertical wheel over the ribbon scrolled the page 300 px).
- Keyboard: ←/→/Home/End on a focusable `role="region"` with `aria-roledescription="carousel"`, plus an `aria-live` announcement.

## 6. Menu folio interaction

- **11 printed pages**, set from `menuCategories` / `menuItems` only (48 items; `/menu` still renders all 48 prices).
- The pages use the cafe's own printed-menu grammar: caps category headings, hairline rules, italic serif descriptions, right-aligned ₹ prices.
- Pages sit in one grid cell (constant height: **808 px desktop / 782 px mobile across all 11 jumps**) on an espresso back-board with a stitched spine. Up to 3 pages show behind as offset, slightly rotated card edges.
- **Turn forward:** the page lifts off its left hinge (`rotateY → −118°`, `backface-visibility: hidden`) while the next page comes forward in Z. **Back:** it swings home. Opacity has its own 0.2 s tween so turning text never overlaps.
- Controls: an index of courses (desktop) or a category rail that follows the active tab horizontally only (touch); prev/next; `NN / 11` counter; progress rule; "Next: …" label; ←/→ keys; swipe.
- Inactive pages are `inert` + `aria-hidden` (10 inert at any time).
- `/menu` (the plain full list) is **unchanged**.

## 7. Memory experience

Nine fragments in `data/visualArchive.ts`. Five are full photographs; four are honest crops of those photographs (arched door, signboard, kitchen arch, niches). All are rendered by `CropImage`, which positions the real image so a 4:5 rectangle fills the card without distortion. Captions describe only what is visible.

- **Desktop:** printed-photo cards. Arched windows are used for full photographs, and rectangular prints for details.
- The ribbon is in 3D perspective: the centre card is upright and sharp, while neighbours recede (z, rotateY, scale, shade) with a slight tactile tilt.
- A **rotary seal** turns continuously with drag. It is the only circular object on the site and it is the progress indicator, not decoration.
- **Touch (<1024 px):** a separate, native `scroll-snap` list with no 3D and no JS drag; the active card is detected from scroll position.
- Both layouts are switched by CSS, so there is no hydration swap; the hidden layout's lazy images never download.

## 8. Architecture interaction

**Arch Line Study.** An amber line traced over the real photographs, using only geometry measured on them:
- facade: forecourt → **door arch** → screen edge → fascia → **signboard** → column → **gable**
- interior: **kitchen pass-through arch** → **wall niches**

The SVG `viewBox` equals each photo's pixel size with `preserveAspectRatio="xMidYMid slice"`, so it stays locked to the `object-cover` image at every viewport. Lettered markers A–E and a legend light up as each element completes.

It is **not pinned**: progress is scrubbed by the block's own passage through the viewport, and it un-draws on reverse scroll.

**Archway Threshold.** A sticky camera dolly through the arched door:
- `scale = S^smoothstep(t)` around the door centre, with the door drifting to screen centre
- the interior fades in **through the door's arch-masked glass**
- at the end of the dolly, the through-the-glass interior is laid out to land **pixel-for-pixel** on the full-resolution interior layer, so the hand-over only sharpens (verified in screenshots 05–06)
- the walk continues a few steps into the room (scale 1→1.05)
- the editorial copy is on a **solid espresso panel** (`#1C1917` at 92%), not text-on-photo, and gets a compact variant on viewports shorter than 500 px
- a progress rail reads Outside · Threshold · Inside

Pin length is 320 vh desktop / 240 vh mobile. It releases at the section end and still works after back/forward navigation.

## 9. Desktop behaviour

Pointer tilt and parallax on the hero (mouse only; measured transform `matrix3d(…)` after a pointer move, `none` before). Drag, trackpad and keyboard work on the Spotlight and Ribbon. Hinge turns and the index work on the Folio. The Spotlight was tightened after QA found its neighbour card overlapping the text panel at 1440 px.

## 10. Mobile behaviour

- The Archway geometry is recomputed per viewport, so the door is centred on portrait phones.
- Panels clear both the 80 px header and the dock.
- No hero tilt.
- The ribbon is native scroll-snap; the spotlight and folio use touch swipe with vertical scroll preserved (measured: a vertical swipe over the spotlight scrolled the page by 297–340 px).
- 44 px controls throughout.
- The dock gained **Call**: 4 items, each ≥ 56×44.

## 11. Performance

Measured in headless Chromium against the **baseline commit built and served side-by-side**. Local loopback, so absolute times are optimistic.

| Metric | Baseline | Phase 7 |
| --- | --- | --- |
| LCP 1440×900 (median of 3) | 300 ms | 220 ms |
| LCP 390×844 (median of 3) | 1612 ms | 164 ms |
| CLS | 0 | 0 |
| JS transferred (home) | 215 KB | 233 KB (+18 KB) |

The mobile LCP gain comes from replacing the hero image's opacity-0 entrance with a clip reveal that keeps it painted, from switching deprecated `priority` to `loading="eager"` + `fetchPriority="high"`, and from removing `priority` from two below-the-fold full-bleed images.

**Frame timing** (rAF deltas, headless, **software compositing, no GPU**):

| Interaction | p50 | p95 | Frames > 20 ms |
| --- | --- | --- | --- |
| Archway wheel-scroll | 16.7 ms | 16.8 ms | 1 % |
| Line study scroll | 16.7 ms | 16.7 ms | 0 % |
| Memory ribbon drag + snap | 16.7 ms | 16.8 ms | 2.5 % |
| Folio turns, 390 px | 16.7 ms | 16.8 ms | 0.6 % |
| Folio turns, 1440 px | **33.3 ms** | 50 ms | 72 % |

The folio started at 50 ms p50. Isolation experiments showed the cost came from 11 large shadowed layers re-compositing. I limited animated/painted pages to ≤5 and removed shadows from the animated layers, which brought it to 33 ms. The remaining desktop cost is software rasterisation of ~760×800 px 3D layers; I could not measure it on a GPU here. **No 60 fps claim is made for desktop folio turns.**

## 12. Accessibility

Verified in the browser:
- **Skip link** is the first Tab stop.
- **Carousels:** focusable regions with a visible focus ring, live announcements, and arrow keys.
- **Lightbox:** grid tiles are now `button`s. The modal has `role="dialog"`, `aria-modal`, and `aria-labelledby`. Initial focus goes to Close. Focus is trapped (8 Tabs stayed inside) and returns to the opening tile. Escape, ←/→ and swipe all work.
- **Mobile drawer:** `inert` + `aria-hidden` when closed (it was previously tabbable off-screen). Focus moves in on open, is trapped (12 Tabs), and Escape returns it to the toggle.
- **Reduced motion** (`MotionConfig reducedMotion="user"` + explicit states):
  - Archway unpinned (792 px), showing the final interior with both panels
  - hero transform `none`
  - lines fully drawn (`dashoffset 0`)
  - folio swaps instantly
  - no console output
- No essential information depends on animation; everything is real HTML text.

## 13. TypeScript

`npx tsc --noEmit` → **exit 0**.

## 14. ESLint

`npx eslint src/` → **exit 0** (the baseline's 1 error in `MobileMenu.tsx` is fixed by `useSyncExternalStore`).

## 15. Production build

`npx next build` → **exit 0**; all 10 routes `○ (Static)`, same as baseline.

## 16. Browser verification

Scripted Playwright runs against `next start` (production build):
- **Overflow** (`scrollWidth − clientWidth`, measured while walking each full page): **0 px** on `/`, `/menu`, `/about`, `/gallery`, `/visit` at 320×568, 360×640, 375×667, 390×844, 393×852, 412×915, 430×932, 667×375, 844×390, 1024×900, 1280×800, 1440×900.
  - 1024 initially showed 7 px, traced to the pre-existing footer Instagram handle; it now wraps.
- **Console / runtime:** 0 errors, 0 warnings, 0 failed requests, 0 HTTP ≥ 400 across all of the above, including hydration.
- **Scroll:** slow and fast (instant jumps between Archway states), reverse scroll returns to identical states, pin release, back/forward navigation (scroll-linking reattaches).
- **Input:** mouse drag, horizontal trackpad wheel, CDP touch swipes (spotlight, folio, native ribbon), keyboard.
- **SEO / business data** (baseline vs Phase 7 HTML): title, OG image, robots, sitemap, canonical guard and single h1 are unchanged. JSON-LD is unchanged except for the added `telephone: +918320002128`. Address and hours are identical. Instagram and Maps links are present. **0 WhatsApp links** (still gated).
- **Screenshots:** 20 key states in `docs/phase-7-qa/`.

## 17. Files changed

**New**
- `src/components/motion/` — `useCoverflow.ts`, `useScrubProgress.ts`, `CropImage.tsx`, `MotionProvider.tsx`, `MemoryRibbon.tsx`, `CulinarySpotlight.tsx`, `PhysicalMenuFolio.tsx`, `ArchLineStudy.tsx`
- `src/sections/CulinarySpotlightSection.tsx`
- `src/data/visualArchive.ts` (asset map + measured geometry)
- `src/lib/useMediaQuery.ts`
- `docs/PHASE-7-INTERACTION-AUDIT.md`, `docs/PHASE-7-INTERACTION-PLAN.md`, this report, `docs/phase-7-qa/*.jpg`

**Modified**
- `sections/HeroSection.tsx`, `sections/ArchwayThreshold.tsx` (same export), `sections/SpatialCafeSection.tsx`, `sections/EditorialMenuSection.tsx`, `sections/CuratedGallerySection.tsx`
- `sections/SocialRitualSection.tsx`, `sections/LocalConversionSection.tsx` (chapter numbers; Local Conversion also gained a Call button)
- `app/page.tsx` (order), `app/layout.tsx` (MotionProvider), `app/visit/page.tsx` (Call)
- `components/gallery/GalleryLightbox.tsx`, `components/layout/MobileMenu.tsx`, `components/layout/MobileUtilityDock.tsx`, `components/layout/Footer.tsx`
- `components/primitives/Button.tsx` (`tel:`/`mailto:` render as plain anchors)
- `data/site.ts` (`contact` block; removed unused `placeholders.phone`)
- `lib/seo.ts` (`telephone`)

Routes, sitemap, robots, canonical logic and `/menu` are untouched.

## 18. Known limitations

1. **The brief described components that were never committed** (§1), so these are new implementations. If a newer branch with Phase 5G.1 exists elsewhere, it should be reconciled with this one.
2. **Phone number added from the brief.** It was not previously in the codebase, so the owner should confirm it before deploying.
3. **One food photograph only.** The Culinary Spotlight is four details of one table, linked to menu *categories*, never to named dishes. More real dish photography would let it grow.
4. **Desktop folio turn cost** is 33 ms p50 under software compositing; not measured on GPU hardware.
5. **Navigation open/closed pill** is computed at build time (static prerender), so it reflects build time, not live hours. Pre-existing and out of scope.
6. **Copy vs photo:** existing copy calls the breeze blocks "terracotta"; the photographs show cream/biscuit blocks. Copy was not changed (business content).
7. During the Archway dolly, the facade source (731 px wide) is visibly soft at high zoom before the full-resolution interior takes over. This is inherent to the asset; a higher-resolution facade photo would sharpen it.
8. Frame timings and LCP were measured locally in headless Chromium, not on real devices or networks.
