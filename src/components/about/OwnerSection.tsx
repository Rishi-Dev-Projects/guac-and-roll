"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { owner } from "@/data/owner";
import { menuCategories, menuItems } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

const pad = (n: number) => String(n).padStart(2, "0");
const ARCH = "9999px 9999px 1.25rem 1.25rem";

/** Seal text around the arch — the site's single circular motif, reused. */
const SEAL_TEXT = `THE HOST · GUAC N' ROLL · SHOP 9 & 10 · SINCE ${owner.since} · `;

function ArchPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
      {/* Arched window — the same gesture as the shopfront door */}
      <div
        className="relative aspect-[3/4] overflow-hidden border border-[#F5D48A]/25 bg-[radial-gradient(120%_80%_at_50%_30%,#3A2B22_0%,#1C1917_70%)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
        style={{ borderRadius: ARCH }}
      >
        {owner.photo ? (
          <Image
            src={owner.photo}
            alt={owner.photoAlt ?? `${owner.name}, ${owner.role} of Guac N' Roll Cafe`}
            fill
            sizes="(max-width: 1024px) 340px, 34vw"
            className="object-cover"
          />
        ) : (
          <>
            {/* Breeze-block lattice, barely there */}
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full text-[#DBC5A6] opacity-[0.07]">
              <defs>
                <pattern id="host-lattice" width="28" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="14,3 3,37 25,37" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="39" x2="28" y2="39" stroke="currentColor" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#host-lattice)" />
            </svg>
            {/* Monogram, lit like the neon wordmark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
              <span className="font-[family-name:var(--font-playfair)] italic text-[5.5rem] sm:text-[7rem] leading-none text-[#F5D48A] [text-shadow:0_0_18px_rgba(245,212,138,0.55),0_0_48px_rgba(245,212,138,0.25)]">
                {owner.monogram}
              </span>
              <span className="mt-4 h-px w-16 bg-[#F5D48A]/40" />
              <span className="mt-3 font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.32em] text-[#DBC5A6]/70">
                Portrait to come
              </span>
            </div>
          </>
        )}
        {/* Threshold glow at the base of the arch */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F5D48A]/10 to-transparent pointer-events-none"
        />
      </div>

      {/* Rotating seal, orbiting the arch's shoulder */}
      <div
        aria-hidden="true"
        className="absolute -right-4 sm:-right-8 top-[38%] w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#261C16] border border-[#F5D48A]/30 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_36s_linear_infinite] motion-reduce:animate-none">
          <defs>
            <path id="host-seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text
            fill="#DBC5A6"
            fontSize="9.2"
            letterSpacing="2.1"
            style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700 }}
          >
            <textPath href="#host-seal-path">{SEAL_TEXT}</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-playfair)] italic text-xl text-[#F5D48A]">
          {owner.monogram.charAt(0)}
        </span>
      </div>
    </div>
  );
}

/** The name, written as if signed — stroke drawn, then inked. */
function Signature() {
  const reduced = usePrefersReducedMotion();
  return (
    <svg viewBox="0 0 320 70" className="w-56 sm:w-64 h-auto overflow-visible" aria-hidden="true">
      <motion.text
        x="4"
        y="50"
        fontSize="40"
        fill="#F5D48A"
        stroke="#F5D48A"
        strokeWidth="0.8"
        strokeDasharray="900"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}
        {...(reduced
          ? // Reduced motion: already signed — no drawing.
            { initial: false, animate: { strokeDashoffset: 0, fillOpacity: 1 }, transition: { duration: 0 } }
          : {
              initial: { strokeDashoffset: 900, fillOpacity: 0 },
              whileInView: { strokeDashoffset: 0, fillOpacity: 1 },
              viewport: { once: true, amount: 0.8 },
              transition: {
                strokeDashoffset: { duration: 2.2, ease: [0.45, 0, 0.2, 1] as const },
                fillOpacity: { duration: 0.8, delay: 1.6 },
              },
            })}
      >
        {owner.name}
      </motion.text>
      <motion.path
        d="M6 62 C 90 56, 190 66, 300 58"
        fill="none"
        stroke="#F5D48A"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinecap="round"
        {...(reduced
          ? { initial: false, animate: { pathLength: 1 }, transition: { duration: 0 } }
          : {
              initial: { pathLength: 0 },
              whileInView: { pathLength: 1 },
              viewport: { once: true, amount: 0.8 },
              transition: { duration: 0.9, delay: 1.9, ease: "easeOut" as const },
            })}
      />
    </svg>
  );
}

function Conversation() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const entries = owner.conversation;

  const select = (i: number, focus = false) => {
    const next = (i + entries.length) % entries.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
      <div
        role="tablist"
        aria-label="In conversation with the host"
        aria-orientation="vertical"
        className="md:col-span-5 flex flex-col border-t border-[#F8F5EE]/12"
        onKeyDown={(e) => {
          const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
          if (e.key in keys) {
            e.preventDefault();
            select(active + keys[e.key], true);
          }
          if (e.key === "Home") { e.preventDefault(); select(0, true); }
          if (e.key === "End") { e.preventDefault(); select(entries.length - 1, true); }
        }}
      >
        {entries.map((entry, i) => {
          const isActive = i === active;
          return (
            <button
              key={entry.question}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`host-q-${i}`}
              aria-selected={isActive}
              aria-controls="host-answer"
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative text-left min-h-[44px] py-3.5 pl-9 pr-2 border-b border-[#F8F5EE]/12 transition-colors ${
                isActive ? "text-[#F8F5EE]" : "text-[#F8F5EE]/55 hover:text-[#F8F5EE]/85"
              }`}
            >
              <span
                className={`absolute left-0 top-4 font-[family-name:var(--font-syne)] text-[10px] font-bold tabular-nums ${
                  isActive ? "text-[#F5D48A]" : "text-[#DBC5A6]/50"
                }`}
              >
                {pad(i + 1)}
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg leading-snug">
                {entry.question}
              </span>
              {isActive && (
                <motion.span
                  layoutId="host-tab-rule"
                  className="absolute left-0 right-0 -bottom-px h-px bg-[#F5D48A]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer — a printed card that flips into place */}
      <div className="md:col-span-7 [perspective:1200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id="host-answer"
            role="tabpanel"
            aria-labelledby={`host-q-${active}`}
            initial={{ opacity: 0, rotateX: -14, y: 14 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 10, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50% 0%" }}
            className="relative rounded-2xl bg-[#F8F5EE] text-[#261C16] p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] -rotate-[0.6deg]"
          >
            <span
              aria-hidden="true"
              className="absolute -top-5 left-6 font-[family-name:var(--font-playfair)] text-7xl leading-none text-[#8D6E66]"
            >
              &ldquo;
            </span>
            <span className="block font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.24em] font-bold text-[#8D6E66]">
              {pad(active + 1)} / {pad(entries.length)}
            </span>
            <p className="mt-3 font-[family-name:var(--font-playfair)] text-lg sm:text-xl leading-relaxed">
              {entries[active].answer}
            </p>
            <span className="mt-5 block text-xs text-[#7D6F66]">— {owner.name}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HostsTable() {
  const item = menuItems.find((i) => i.id === owner.favouriteItemId);
  if (!item) return null;
  const category = menuCategories.find((c) => c.id === item.category);
  return (
    <Link
      href={`/menu#${item.category}`}
      className="group relative block rounded-xl bg-[#DBC5A6] text-[#261C16] p-5 sm:pl-8 sm:pr-6 transition-transform duration-300 hover:-rotate-1 hover:-translate-y-0.5"
    >
      {/* Ticket notches */}
      <span aria-hidden="true" className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1C1917]" />
      <span aria-hidden="true" className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1C1917]" />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.24em] font-bold text-[#261C16]/70 sm:border-r sm:border-dashed sm:border-[#261C16]/30 sm:pr-6">
          On the host&apos;s table
        </span>
        <div className="flex-1 min-w-[180px]">
          <p className="font-[family-name:var(--font-playfair)] text-lg font-bold leading-tight">{item.name}</p>
          <p className="text-[11px] text-[#261C16]/70 italic">
            {category?.name} · {owner.favouriteNote}
          </p>
        </div>
        <span className="font-semibold tabular-nums text-lg">₹{item.price}</span>
        <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}

export function OwnerSection() {
  return (
    <section
      aria-labelledby="host-heading"
      className="relative w-full overflow-hidden bg-[#1C1917] text-[#F8F5EE] py-20 md:py-28 lg:py-32"
    >
      {/* Amber light pooling behind the arch, like the table lamps at dusk */}
      <div
        aria-hidden="true"
        className="absolute -left-1/4 top-0 w-[70%] h-[80%] bg-[radial-gradient(closest-side,rgba(245,212,138,0.10),transparent)] pointer-events-none"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Mobile order: title → portrait → conversation. Desktop: portrait left, text right. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-16 lg:gap-y-10 items-start">
          {/* Title */}
          <div className="lg:col-start-6 lg:col-span-7 lg:row-start-1 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-[family-name:var(--font-syne)] text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#F5D48A]">
                CHAPTER 04 · THE HOST
              </span>
              {owner.isMock && (
                <span className="rounded-full border border-dashed border-[#F5D48A]/50 px-2.5 py-0.5 font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.18em] text-[#F5D48A]/80">
                  Preview · owner details to be confirmed
                </span>
              )}
            </div>
            <h2
              id="host-heading"
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl tracking-[-0.025em] leading-[1.06]"
            >
              The Person Behind <span className="italic text-[#DBC5A6]">the Arch</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F8F5EE]/75 leading-relaxed max-w-[56ch]">
              {owner.intro}
            </p>
          </div>

          {/* Arch portrait, name, signature */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-2 space-y-8 lg:sticky lg:top-28">
            <ArchPortrait />
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Signature />
              </div>
              <p className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.26em] font-bold text-[#DBC5A6]">
                {owner.role} · Since {owner.since}
              </p>
            </div>
          </div>

          {/* The conversation */}
          <div className="lg:col-start-6 lg:col-span-7 lg:row-start-2 space-y-10">
            <blockquote className="relative pl-6 border-l-2 border-[#F5D48A]/60">
              <p className="font-[family-name:var(--font-playfair)] italic text-2xl sm:text-3xl leading-snug text-[#F8F5EE]">
                &ldquo;{owner.quote}&rdquo;
              </p>
            </blockquote>

            <div className="space-y-5">
              <span className="block font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.24em] font-bold text-[#DBC5A6]/80">
                In conversation
              </span>
              <Conversation />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
              <div className="flex-1 px-2.5">
                <HostsTable />
              </div>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-lg border border-[#F8F5EE]/25 text-sm text-[#F8F5EE] hover:border-[#F5D48A] hover:text-[#F5D48A] transition-colors shrink-0"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Say hello</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
