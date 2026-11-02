# Phase 7 — Interaction Design Plan

**Stage:** 02
**Depends on:** `docs/PHASE-7-INTERACTION-AUDIT.md`

## 0. Principles

- **The photograph is the subject.** Motion moves, frames, or traces real photographs. It never decorates them.
- **One pinned sequence only** (the Archway). Every other scroll effect is scrubbed by the element's own passage through the viewport, so the page never feels trapped.
- **No wheel hijacking.** Vertical wheel events are never intercepted. Horizontal trackpad deltas are used only while the pointer is over a carousel stage.
- **No per-frame React state.** All scroll, drag and pointer motion runs through Motion `MotionValue`s → `style`. React state changes only when the *active index* changes.
- **Two motion engines are not needed.** GSAP was evaluated. Motion 13's `useScroll` + `useTransform` already gives scrubbed, reversible, release-safe timelines for the one pinned sequence, so **no new dependency** is added. Three.js is rejected (no real 3D asset exists; see audit §5).
- **CSS 3D** (`perspective`, `rotateY`, `translateZ`) handles all depth.
- **Reduced motion** (`prefers-reduced-motion: reduce`): `MotionConfig reducedMotion="user"` globally, plus explicit static final states for every scroll-linked effect.
- **Hydration-safe viewport logic:** a `useMediaQuery` hook built on `useSyncExternalStore` replaces `setState`-in-effect.

## 1. Experience map

| Journey step | Section | Interaction tier |
| --- | --- | --- |
| ARRIVAL | Hero | Secondary (depth + pointer) |
| ENTERING | **Archway Threshold** | **Signature 1** |
| DISCOVERING THE SPACE | Spatial Cafe + **Arch Line Study** | **Signature 2** |
| EXPLORING THE FOOD | **Culinary Spotlight** (new) | Secondary-major |
| BROWSING THE MENU | **Physical Menu Folio** | **Signature 3** |
| EXPERIENCING THE ATMOSPHERE | Social Ritual (calm) → **Memory Ribbon** | **Signature 4** |
| VISITING | Local Conversion (+ phone) | Small feedback only |

---

## 2. Interactions

### 2.1 Hero — "The cafe comes into view"

| Field | Spec |
| --- | --- |
| Section | `sections/HeroSection.tsx` |
| Current | Text stagger; facade fades in; ambient gradient drifts on scroll |
| New | The facade portal is a 3D stage with two real photographic planes: the facade (back) and the neon sign (front, `translateZ`). On a fine pointer they separate by parallax and a ≤3.5° tilt; an amber light follows the pointer. On scroll, the heading lifts away and the portal slowly dollies forward (scale 1→1.06). On load, the arch frame rises into view (clip reveal). |
| Visual concept | Standing on the forecourt as the shopfront resolves |
| Motion concept | Springs on pointer motion values; scroll scrubbed by `useScroll(target: hero)` |
| Desktop | Tilt + parallax + light + scroll dolly |
| Mobile | No tilt (coarse pointer). Scroll dolly only; neon plane hidden as before (<640px) |
| Dependencies | `motion` (existing) |
| Performance | Transforms/opacity only; facade image switches from deprecated `priority` to `preload` (LCP) |
| Accessibility | Decorative motion only; no content depends on it |
| Acceptance | Pointer move changes the portal transform; scroll changes the heading transform; zero transforms under reduced motion; no hydration warning |

### 2.2 Archway Threshold — "Through the door" (Signature 1)

| Field | Spec |
| --- | --- |
| Section | `sections/ArchwayThreshold.tsx` (rewritten internally, same export/name) |
| Current | Facade zooms 1→1.35, then cross-fades to interior; text without panel |
| New | A camera dolly **through the real arched door**. The facade is laid out in a "cover box" that keeps the photo's own pixel coordinates. The door's glass aperture is an arch-masked window that progressively shows the interior photograph, like seeing inside as you approach. The camera scales geometrically around the door centre and drifts it to screen centre until the aperture fills the viewport. The full-resolution interior then settles in. A **contrast-safe editorial panel** (solid espresso, not a text shadow) carries the copy. A three-step rail (*Outside · Threshold · Inside*) shows progress. |
| Visual concept | Walking from Mota Road through the arched door into the dining room, using only the two real photographs |
| Motion concept | `scale = S^t` (perceptually linear dolly); geometry recomputed on resize into a ref; one `MotionValue` drives everything |
| Desktop | Section `320vh`, sticky stage `100dvh` |
| Mobile | Section `240vh`. The geometry is computed per viewport, so the door is centred on portrait phones |
| Reduced motion | Not pinned (`motion-reduce:h-auto`, stage static); shows the final interior state with the panel |
| Dependencies | none new |
| Performance | One transformed layer per photo; images are no longer `priority` (lazy with normal lookahead); no React state per frame |
| Accessibility | Panel text is real HTML with an h2; photos have alt text; the sticky stage contains no focusable traps |
| Acceptance | At p≈0 the facade is visible with the door in frame; at p≈0.5 the door fills most of the view showing the interior; at p≈1 the interior is crisp. Reverse scroll returns exactly. The pin releases at the section end. The panel stays ≥4.5:1 contrast. |

### 2.3 Spatial Cafe — "One arch, three times" architectural line study (Signature 2)

| Field | Spec |
| --- | --- |
| Section | `sections/SpatialCafeSection.tsx` + new `components/motion/ArchLineStudy.tsx` |
| Current | Static interior image + feature list |
| New | Two plates (facade, interior). A **continuous amber line** traces only geometry visible in each photo, in this order: forecourt line → **door arch** → screen edge → **signboard** → fascia → gable. It then continues into the interior: **kitchen pass-through arch** → **wall niches**. A legend (A–D) lights up as each element completes. |
| Visual concept | An architect's overlay drawn on the real photographs, showing that the door arch is repeated inside |
| Motion concept | `pathLength` scrubbed by `useScroll` over the figure's passage (`start 0.85` → `end 0.4`). **Not pinned.** |
| Desktop | Facade plate (portrait) + interior plate side by side; the line draws facade → interior |
| Mobile | Plates stack; each draws during its own passage |
| Reduced motion | Lines rendered fully drawn |
| Dependencies | none |
| Performance | SVG with `viewBox` = image pixel size and `preserveAspectRatio="xMidYMid slice"`, so the overlay matches `object-cover` exactly. Two strokes per path (shadow + amber). |
| Accessibility | SVG `aria-hidden`; legend is real text |
| Acceptance | The line sits on the door arch, signboard and kitchen arch at 1440, 1024 and 390 widths; it draws forward and un-draws in reverse |

### 2.4 Culinary Spotlight — "Focus lens" (new section)

| Field | Spec |
| --- | --- |
| Section | new `sections/CulinarySpotlightSection.tsx` + `components/motion/CulinarySpotlight.tsx` |
| Current | Food photo appears only as a small static card in the menu section |
| New | A restrained **coverflow of four frames cropped from the single real table photograph**: the plate, the glass, the printed menu, the whole table. The active frame is dominant; neighbours peek in perspective. The side panel updates in sync: frame number, title, factual caption, and **live menu facts from `menu.ts`** (e.g. "Tacos (4 Pcs) — 5 varieties, ₹329–₹399"). No frame is attached to a named dish. |
| Visual concept | Selecting a printed editorial spread; a loupe moving across one table |
| Motion concept | Shared `useCoverflow` engine: a float `MotionValue` position drives every card's x / rotateY / z / scale / shade; drag with velocity projection; spring snap |
| Desktop | Drag, ←/→ keys, prev/next, click a neighbour |
| Mobile | Same engine with flatter depth; horizontal swipe (`touch-action: pan-y` keeps vertical scroll native) |
| Reduced motion | Instant snap |
| Performance | One image source shared by all cards; crops via positioned `next/image` |
| Accessibility | `role="region"` + `aria-roledescription="carousel"`; live region announces "Frame 2 of 4: The glass"; buttons labelled; inactive cards `aria-hidden` |
| Acceptance | Position indicator, caption and menu facts change together; drag/swipe/keyboard all work; no named-dish/photo pairing |

### 2.5 Physical Menu Folio (Signature 3)

| Field | Spec |
| --- | --- |
| Section | `sections/EditorialMenuSection.tsx` → new `components/motion/PhysicalMenuFolio.tsx` |
| Current | Tab index + fading list |
| New | **A stack of 11 printed pages** set in the visual grammar of the cafe's own printed menu (caps category headings, hairline rules, right-aligned prices). The pages behind are visible as layered card edges. Turning forward lifts the page off its **left hinge** (`rotateY`) while the next page comes forward in Z; turning back swings it home. A counter ("Page 03 / 11"), a progress rule, prev/next, and a direct **index of courses** stay in sync. |
| Data | `menuCategories` / `menuItems` only (no invented content) |
| Desktop | Index rail (left 5 cols) + folio (right 7 cols); ←/→ when focused |
| Mobile | Category rail on top; one page; swipe left/right; large prev/next; shallower hinge |
| Reduced motion | No hinge; instant page swap |
| Fallback | `/menu` remains the full plain list (unchanged) |
| Performance | Only the active page ±3 are rendered with transforms; pages share one grid cell, so there is no layout jump |
| Accessibility | Inactive pages `inert` + `aria-hidden`; live region announces the page; buttons `aria-pressed`/`aria-current` |
| Acceptance | All 11 categories reachable by tabs, buttons, keys and swipe; prices/names identical to `menu.ts` |

### 2.6 Memory Ribbon (Signature 4)

| Field | Spec |
| --- | --- |
| Section | `sections/CuratedGallerySection.tsx` (hosts it) + `components/motion/MemoryRibbon.tsx` + `data/visualArchive.ts` |
| Current | Static 3-image spread |
| New | Nine **real fragments** (5 full photographs + 4 honest details cropped from them), printed-photo cards in a **3D perspective ribbon**. The centre card is sharp and upright; neighbours sit behind (`translateZ`, `rotateY`, scale, shade) with a slight tactile tilt. The metadata panel changes in sync. A small **rotary seal** marks position (the one circular object in the site, which serves as the progress indicator). |
| Desktop (≥1024) | Mouse drag with inertia, horizontal trackpad, ←/→/Home/End, prev/next, click any card |
| Mobile/tablet (<1024) | **Native** horizontal `scroll-snap` list (no 3D, no JS drag); active card detected from scroll position; prev/next buttons |
| Reduced motion | Instant snaps; no tilt |
| Performance | Both layouts rendered with CSS toggling (no hydration swap/CLS); images lazy, so the hidden layout never downloads |
| Accessibility | Region + live announcement; prev/next labelled; mobile list is a semantic list |
| Acceptance | No page-level horizontal overflow at 320–430px; drag/keys/swipe work; metadata matches the image |

### 2.7 Gallery & Lightbox (secondary)

`components/gallery/GalleryLightbox.tsx`:
- Grid tiles become `button`s.
- The modal becomes `role="dialog"` with `aria-modal`, `aria-labelledby`, initial focus, a Tab focus trap and focus return.
- Swipe left/right on the image.
- A directional, slightly 3D image transition.
- 44px controls.

The `/gallery` destination is preserved.

### 2.8 Global / small feedback

- `MotionProvider` (`MotionConfig reducedMotion="user"`) in the root layout.
- `useMediaQuery` (`useSyncExternalStore`).
- `MobileMenu`: fix the lint error; `inert` when closed; focus moves into the drawer on open and returns to the toggle on close.
- **Phone** `83200 02128` / `tel:+918320002128` added to `siteConfig.contact`, JSON-LD `telephone`, Footer, Local Conversion, Visit page, mobile drawer and Mobile dock (Call).
- Chapter labels renumbered for the new sequence.

## 3. Rejected options

| Option | Reason |
| --- | --- |
| Three.js / R3F cafe scene | No model or depth data; would fabricate architecture |
| GSAP ScrollTrigger | No capability gap versus Motion for one pin; it would add a second engine and ~60 KB |
| Swiper/Embla | The brief asks for custom editorial interactions; the engine is ~150 lines |
| Lenis / smooth scroll | The brief forbids forced smooth scrolling |
| Review carousel | No verified review content |
