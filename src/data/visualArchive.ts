/**
 * Visual Archive — internal asset map (Phase 7)
 *
 * Every entry points at a real photograph in /public/images.
 * "Detail" fragments are crops of those photographs; captions describe only
 * what is actually visible in the frame. No image is associated with a named
 * menu item, because the archive contains no per-dish photography.
 *
 * Coordinates are in the source image's own pixel space.
 */

export interface PhotoSource {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const photos = {
  facade: {
    src: "/images/cafe/facade-exterior.png",
    width: 731,
    height: 978,
    alt: "Guac N' Roll Cafe shopfront: gabled roof, dark fascia, round-bottomed signboard and cream breeze-block screens with an arched glass door",
  },
  interior: {
    src: "/images/cafe/interior-arches.png",
    width: 1307,
    height: 975,
    alt: "Inside Guac N' Roll Cafe: curved mauve ceiling, an arched pass-through to the kitchen, wall niches, walnut tables and herringbone floor",
  },
  table: {
    src: "/images/food/tacos-drink-table.png",
    width: 732,
    height: 981,
    alt: "A table at Guac N' Roll Cafe with tacos on a sage-green platter, a layered cold drink and the printed menu",
  },
  menu: {
    src: "/images/menu/physical-menu.png",
    width: 770,
    height: 977,
    alt: "The printed Guac N' Roll menu card with an avocado engraving and three columns of dishes and prices",
  },
  neon: {
    src: "/images/brand/logo-neon.jpg",
    width: 1024,
    height: 1024,
    alt: "Illuminated GUAC N' ROLL lettering on a dark background",
  },
} as const satisfies Record<string, PhotoSource>;

export type PhotoKey = keyof typeof photos;

/**
 * Architectural geometry measured on the real photographs (source pixels).
 * Used by the Archway Threshold camera and the Arch Line Study overlay.
 */
export const facadeGeometry = {
  /** Glass aperture inside the arched door frame. */
  doorGlass: { x: 446, y: 548, w: 125, h: 222 },
  /** Centre of the door arch opening. */
  doorCentre: { x: 508.5, y: 659 },
} as const;

export interface MemoryFragment {
  id: string;
  photo: PhotoKey;
  /** 4:5 crop rectangle (w = 0.8 × h). */
  crop: CropRect;
  kind: "Photograph" | "Detail" | "Brand";
  title: string;
  place: string;
  caption: string;
}

/** Ordered as a walk: street → door → sign → inside → table → menu. */
export const memoryFragments: MemoryFragment[] = [
  {
    id: "shopfront",
    photo: "facade",
    crop: { x: 0, y: 30, w: 731, h: 914 },
    kind: "Photograph",
    title: "The Shopfront",
    place: "Shop 9 & 10 · Ambiance Twin City",
    caption: "Gabled roof, a dark fascia band and cream breeze-block screens on Mota Road.",
  },
  {
    id: "arched-door",
    photo: "facade",
    crop: { x: 389, y: 505, w: 240, h: 300 },
    kind: "Detail",
    title: "The Arched Door",
    place: "Detail · from the shopfront",
    caption: "A glass door set into an arch cut through the breeze-block screen.",
  },
  {
    id: "signboard",
    photo: "facade",
    crop: { x: 97, y: 370, w: 216, h: 270 },
    kind: "Detail",
    title: "The Signboard",
    place: "Detail · from the shopfront",
    caption: "GUAC N' ROLL lettered on a round-bottomed panel hung from the fascia.",
  },
  {
    id: "wordmark",
    photo: "neon",
    crop: { x: 102, y: 0, w: 819, h: 1024 },
    kind: "Brand",
    title: "The Wordmark, Lit",
    place: "Brand lettering",
    caption: "The same geometric GUAC N' ROLL letterforms, illuminated.",
  },
  {
    id: "dining-room",
    photo: "interior",
    crop: { x: 169, y: 0, w: 780, h: 975 },
    kind: "Photograph",
    title: "The Dining Room",
    place: "Inside · Shop 9 & 10",
    caption: "A curved mauve ceiling over walnut tables and a herringbone floor.",
  },
  {
    id: "kitchen-arch",
    photo: "interior",
    crop: { x: 319, y: 240, w: 480, h: 600 },
    kind: "Detail",
    title: "The Kitchen Arch",
    place: "Detail · from the dining room",
    caption: "An arched pass-through opens onto the kitchen counter — the door's arch, repeated inside.",
  },
  {
    id: "niches",
    photo: "interior",
    crop: { x: 880, y: 300, w: 300, h: 375 },
    kind: "Detail",
    title: "Niches & Table Lamps",
    place: "Detail · from the dining room",
    caption: "Arched and U-shaped wall niches above tables lit by cordless lamps.",
  },
  {
    id: "one-table",
    photo: "table",
    crop: { x: 0, y: 33, w: 732, h: 915 },
    kind: "Photograph",
    title: "One Table",
    place: "At the table",
    caption: "Tacos on a sage-green platter, a layered cold drink and the printed menu.",
  },
  {
    id: "printed-menu",
    photo: "menu",
    crop: { x: 0, y: 8, w: 770, h: 962 },
    kind: "Photograph",
    title: "The Printed Menu",
    place: "The source of truth",
    caption: "The printed card every dish and price on this website is transcribed from.",
  },
];

/**
 * Culinary Spotlight frames — four details of the single real food photograph.
 * Linked to menu categories only where the category is visibly present.
 */
export interface SpotlightFrame {
  id: string;
  crop: CropRect;
  title: string;
  caption: string;
  /** Category ids from src/data/menu.ts whose facts are shown alongside. */
  categories: Array<"tacos" | "mocktails" | "smoothies" | "all">;
}

export const spotlightFrames: SpotlightFrame[] = [
  {
    id: "plate",
    crop: { x: 260, y: 461, w: 416, h: 520 },
    title: "The Plate",
    caption: "Crisp folded tacos under shredded cheese and olive rings, on a sage-green platter.",
    categories: ["tacos"],
  },
  {
    id: "glass",
    crop: { x: 23, y: 350, w: 304, h: 380 },
    title: "The Glass",
    caption: "A layered cold drink — red into orange into blue — finished with a sprig of mint.",
    categories: ["mocktails", "smoothies"],
  },
  {
    id: "menu-card",
    crop: { x: 81, y: 0, w: 448, h: 560 },
    title: "The Printed Menu",
    caption: "The table menu and its standee — the card this website's menu is taken from.",
    categories: ["all"],
  },
  {
    id: "table",
    crop: { x: 0, y: 33, w: 732, h: 915 },
    title: "The Whole Table",
    caption: "One table, as it was served: plate, glass, menu and napkins.",
    categories: ["all"],
  },
];
