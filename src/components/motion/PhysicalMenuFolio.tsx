"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";

const pages = [...menuCategories].sort((a, b) => a.order - b.order);
const TOTAL = pages.length;
const pad = (n: number) => String(n).padStart(2, "0");
const itemsFor = (id: string) => menuItems.filter((i) => i.category === id);

/** Page pose for its position relative to the open page. */
function pose(rel: number, desktop: boolean) {
  if (rel < 0) {
    // Turned: lifted off the left hinge and laid away.
    return { rotateY: desktop ? -118 : -96, x: 0, y: 0, z: 30, rotateZ: 0, opacity: 0 };
  }
  if (rel === 0) return { rotateY: 0, x: 0, y: 0, z: 0, rotateZ: 0, opacity: 1 };
  const d = Math.min(rel, 3);
  return {
    rotateY: 0,
    x: d * (desktop ? 9 : 4),
    y: d * (desktop ? 9 : 5),
    z: -d * 26,
    rotateZ: rel % 2 === 0 ? -0.7 : 0.9,
    opacity: rel > 3 ? 0 : 1,
  };
}

function FolioPage({ category, index }: { category: MenuCategory; index: number }) {
  const items = itemsFor(category.id);
  return (
    <div className="h-full flex flex-col bg-[#FBF8F1] rounded-[10px] border border-[#261C16]/12 px-4 py-5 sm:px-9 sm:py-8">
      {/* Running head — echoes the printed card */}
      <div className="flex items-center justify-between pb-3 border-b border-[#261C16]/15 font-[family-name:var(--font-syne)] text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-bold">
        <span className="text-[#261C16]">Guac N&apos; Roll · Menu</span>
        <span className="text-[#8D6E66] tabular-nums">
          Page {pad(index + 1)} / {pad(TOTAL)}
        </span>
      </div>

      <div className="pt-6 sm:pt-8 pb-4 flex items-end justify-between gap-4 border-b-2 border-[#261C16]">
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl sm:text-3xl font-bold uppercase tracking-[0.04em] text-[#261C16] leading-tight">
            {category.name}
          </h3>
          {category.subtitle && (
            <p className="mt-1.5 font-[family-name:var(--font-playfair)] italic text-xs sm:text-sm text-[#7D6F66]">
              {category.subtitle}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-playfair)] italic text-5xl sm:text-7xl leading-none text-[#DBC5A6] shrink-0 -mb-1"
        >
          {pad(index + 1)}
        </span>
      </div>

      <ul className="flex-1 divide-y divide-[#261C16]/10">
        {items.map((item) => (
          <li key={item.id} className="py-3.5 sm:py-4">
            <div className="flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-plus-jakarta)] text-[15px] sm:text-base font-semibold text-[#1C1917] leading-snug">
                {item.name}
              </span>
              {item.isSignature && (
                <span className="font-[family-name:var(--font-syne)] text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#DBC5A6]/45 text-[#261C16] shrink-0 self-center">
                  Signature
                </span>
              )}
              <span aria-hidden="true" className="hidden sm:block flex-1 border-b border-dotted border-[#261C16]/25 translate-y-[-4px] min-w-4" />
              <span className="ml-auto sm:ml-0 font-[family-name:var(--font-plus-jakarta)] text-[15px] sm:text-base font-semibold tabular-nums text-[#261C16] whitespace-nowrap">
                ₹{item.price}
              </span>
            </div>
            {item.description && (
              <p className="mt-1 font-[family-name:var(--font-playfair)] italic text-xs sm:text-[13px] text-[#52463E] leading-relaxed sm:pr-12">
                {item.description}
                {item.servingInfo ? ` · ${item.servingInfo}` : ""}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="pt-4 mt-2 border-t border-[#261C16]/10 flex items-center justify-between text-[10px] text-[#7D6F66]">
        <span>Prices in INR</span>
        <span className="font-[family-name:var(--font-syne)] uppercase tracking-[0.2em]">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}

export function PhysicalMenuFolio({ initialCategory = "tacos" }: { initialCategory?: string }) {
  // `prev` keeps the outgoing page mounted so a direct jump still turns it away.
  const [{ page, prev }, setFolio] = useState(() => {
    const start = Math.max(0, pages.findIndex((p) => p.id === initialCategory));
    return { page: start, prev: start };
  });
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);

  const go = (i: number) =>
    setFolio((s) => {
      const next = Math.max(0, Math.min(TOTAL - 1, i));
      return next === s.page ? s : { page: next, prev: s.page };
    });

  // Keep the active tab visible in the mobile rail (horizontal only — never scrolls the page).
  useEffect(() => {
    const rail = railRef.current;
    const tab = rail?.querySelector<HTMLElement>(`[data-index="${page}"]`);
    if (!rail || !tab) return;
    const target = tab.offsetLeft - rail.clientWidth / 2 + tab.offsetWidth / 2;
    rail.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  }, [page, reduced]);

  // The hinge keeps its weighted spring; opacity has its own quick tween so an
  // outgoing page clears before its text can overlap the incoming page.
  const transition = reduced
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 62,
        damping: 17,
        mass: 1.1,
        opacity: { duration: 0.2, ease: "easeOut" as const },
      };

  const current = pages[page];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
      {/* Index of courses — desktop */}
      <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
        <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.22em] font-bold text-[#8D6E66] block mb-3">
          Index of Courses
        </span>
        <nav aria-label="Menu folio pages" className="space-y-0.5">
          {pages.map((c, i) => {
            const isActive = i === page;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => go(i)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full min-h-[40px] text-left py-2 px-3 rounded-lg flex items-center justify-between text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#261C16] text-[#F8F5EE] font-semibold"
                    : "text-[#1C1917]/70 hover:text-[#261C16] hover:bg-[#261C16]/5 font-medium"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`font-[family-name:var(--font-syne)] text-[10px] ${isActive ? "text-[#DBC5A6]" : "text-[#7D6F66]"}`}>
                    {pad(i + 1)}
                  </span>
                  <span>{c.name}</span>
                </span>
                <span className={`text-[10px] tabular-nums ${isActive ? "text-[#DBC5A6]" : "text-[#7D6F66]"}`}>
                  {itemsFor(c.id).length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="lg:col-span-8 min-w-0">
        {/* Category rail — touch */}
        <div
          ref={railRef}
          className="lg:hidden -mx-5 sm:-mx-8 px-5 sm:px-8 mb-6 overflow-x-auto scrollbar-none flex items-center gap-2"
          role="group"
          aria-label="Menu folio pages"
        >
          {pages.map((c, i) => (
            <button
              key={c.id}
              data-index={i}
              type="button"
              onClick={() => go(i)}
              aria-current={i === page ? "page" : undefined}
              className={`min-h-[44px] px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                i === page ? "bg-[#261C16] text-[#F8F5EE]" : "bg-[#261C16]/5 text-[#1C1917]/70"
              }`}
            >
              <span className="opacity-60 text-[10px]">{pad(i + 1)}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* The folio object */}
        <div
          tabIndex={0}
          role="region"
          aria-roledescription="menu folio"
          aria-label="Printed menu folio. Use left and right arrow keys or swipe to turn pages."
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(page + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(page - 1); }
          }}
          onPointerDown={(e) => {
            swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
          }}
          onPointerUp={(e) => {
            const s = swipe.current;
            swipe.current = null;
            if (!s || s.id !== e.pointerId) return;
            const dx = e.clientX - s.x;
            const dy = e.clientY - s.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(page + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => (swipe.current = null)}
          className="relative touch-pan-y outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-[#8D6E66] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F5EE] pr-3 pb-4 sm:pr-8 sm:pb-8"
        >
          {/* Static ground shadow — painted once, outside the animated stack */}
          <div
            aria-hidden="true"
            className="absolute -bottom-6 left-[8%] right-[8%] h-12 rounded-[50%] bg-[radial-gradient(closest-side,rgba(38,28,22,0.28),transparent)]"
          />
          {/* Back board & spine — the physical folder the pages sit in */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[#261C16]"
          >
            <div className="absolute left-2 sm:left-3 top-6 bottom-6 border-l border-dashed border-[#DBC5A6]/35" />
          </div>

          <div className="relative grid p-2 pl-5 sm:p-4 sm:pl-8 [perspective:1800px]">
            <div className="[grid-area:1/1] grid [transform-style:preserve-3d]">
              {pages.map((c, i) => {
                const rel = i - page;
                // Only the outgoing page and the visible stack animate and paint (≤ 5 layers);
                // the rest stay in layout (stable folio height) but are invisible and snap instantly.
                const mounted = (rel >= -1 && rel <= 3) || i === prev;
                return (
                  <motion.article
                    key={c.id}
                    initial={false}
                    animate={pose(rel, desktop)}
                    transition={mounted ? transition : { duration: 0 }}
                    style={{ transformOrigin: "left center", zIndex: rel === 0 ? 50 : rel < 0 ? 60 : 40 - rel }}
                    className={`[grid-area:1/1] [backface-visibility:hidden] ${mounted ? "" : "invisible"} ${rel === 0 ? "" : "pointer-events-none select-none"}`}
                    aria-hidden={rel !== 0}
                    inert={rel !== 0}
                  >
                    <FolioPage category={c} index={i} />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page controls & progression */}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 0}
            aria-label="Previous menu page"
            className="w-11 h-11 rounded-full border border-[#261C16]/20 text-[#261C16] flex items-center justify-center hover:bg-[#261C16] hover:text-[#F8F5EE] transition-colors disabled:opacity-30 disabled:pointer-events-none shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-baseline justify-between gap-3 font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="text-[#261C16] tabular-nums">
                {pad(page + 1)} / {pad(TOTAL)}
              </span>
              <span className="text-[#7D6F66] font-medium truncate">
                Next: {page < TOTAL - 1 ? pages[page + 1].name : "Back to the start"}
              </span>
            </div>
            <span className="relative block h-px bg-[#261C16]/15" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 bg-[#261C16] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${((page + 1) / TOTAL) * 100}%` }}
              />
            </span>
          </div>
          <button
            type="button"
            onClick={() => go(page < TOTAL - 1 ? page + 1 : 0)}
            aria-label={page < TOTAL - 1 ? "Next menu page" : "Back to the first menu page"}
            className="w-11 h-11 rounded-full bg-[#261C16] text-[#F8F5EE] flex items-center justify-center hover:bg-[#3A2B22] transition-colors shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {`Page ${page + 1} of ${TOTAL}: ${current.name}, ${itemsFor(current.id).length} items.`}
        </p>
      </div>
    </div>
  );
}
