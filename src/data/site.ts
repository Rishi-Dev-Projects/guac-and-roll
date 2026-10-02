/**
 * Site Configuration & Business Data
 * Source of Truth: Physical cafe assets, Google Business listing, and owner brief.
 * 
 * IMPORTANT:
 * - NEVER invent missing business information.
 * - Missing items are explicitly flagged with TODO_ placeholders.
 */

export const siteConfig = {
  name: "Guac N' Roll Cafe",
  tagline: "Mexican-Inspired Cafe in Bardoli",
  description:
    "A modern, warm, and earthy Mexican-inspired cafe in Baben, Bardoli. Featuring tacos, sizzlers, burrito bowls, specialty coffee, and handcrafted coolers.",

  // Physical Location (Confirmed from exterior facade and Google listing)
  location: {
    shop: "Shop 9 & 10",
    building: "Ambiance Twin City",
    street: "Mota Road, Baben",
    city: "Bardoli",
    state: "Gujarat",
    postalCode: "394601",
    country: "India",
    formattedAddress:
      "Shop 9 & 10, Ambiance Twin City, Mota Road, Baben, Bardoli, Gujarat 394601, India",
    areaLandmark: "Ambiance Twin City, Mota Road, Baben",
    googleMapsShareUrl: "https://share.google/PXUAlW6Y3CEHXkXU1",
    // Embed map query fallback using verified address
    googleMapsEmbedQuery:
      "Guac+N+Roll+Cafe+Ambiance+Twin+City+Mota+Road+Baben+Bardoli+Gujarat",
  },

  // Operating Hours (Confirmed: Daily 11:00 AM – 11:00 PM)
  hours: {
    days: "Daily",
    open: "11:00 AM",
    close: "11:00 PM",
    openHour24: 11,
    closeHour24: 23,
    formatted: "11:00 AM – 11:00 PM",
  },

  // Social & Community Links
  social: {
    instagram: "https://www.instagram.com/guacnroll.cafe",
    instagramHandle: "@guacnroll.cafe",
    googleReviewUrl: "https://share.google/PXUAlW6Y3CEHXkXU1",
  },

  // Dietary Classification
  dietary: {
    note: "Dietary preferences are indicated per item on the printed menu.",
  },

  // ============================================================================
  // OWNER ACTION REQUIRED TO ACTIVATE WHATSAPP ORDERING:
  // Replace "TODO_WHATSAPP_NUMBER" with the cafe's dedicated 10-digit WhatsApp
  // business phone number with country code (e.g., "919876543210").
  // Once updated, 1-tap WhatsApp ordering and direct inquiries will automatically
  // activate across the entire website.
  // ============================================================================
  placeholders: {
    domain: "TODO_DOMAIN",
    phone: "TODO_PHONE_NUMBER",
    whatsapp: "TODO_WHATSAPP_NUMBER",
    email: "TODO_BUSINESS_EMAIL",
    reservationStatus: "TODO_RESERVATION_STATUS",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Visit", href: "/visit" },
  ],
} as const;

/**
 * Checks whether the WhatsApp ordering number has been configured by the owner.
 */
export function isWhatsAppConfigured(): boolean {
  const number = siteConfig.placeholders.whatsapp;
  return Boolean(number && !number.startsWith("TODO_") && number.length >= 10);
}

/**
 * Helper to generate a WhatsApp chat link.
 * Returns null if the owner has not yet configured the verified number.
 */
export function getWhatsAppUrl(customMessage?: string): string | null {
  if (!isWhatsAppConfigured()) {
    return null;
  }
  const baseUrl = `https://wa.me/${siteConfig.placeholders.whatsapp}`;
  if (!customMessage) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(customMessage)}`;
}

/**
 * Helper to determine if the cafe is currently open based on Indian Standard Time (IST).
 */
export function isCafeCurrentlyOpen(): boolean {
  // Current time in IST (UTC+5:30)
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utcTime + 3600000 * 5.5);
  const hour = istTime.getHours();

  return hour >= siteConfig.hours.openHour24 && hour < siteConfig.hours.closeHour24;
}

/**
 * Detailed, accessible open/closed status for screen readers and UI badges.
 */
export function getCafeOpenStatus(): {
  isOpen: boolean;
  statusText: string;
  ariaLabel: string;
  scheduleText: string;
} {
  const isOpen = isCafeCurrentlyOpen();
  return {
    isOpen,
    statusText: isOpen ? "Open Now" : "Opens at 11:00 AM",
    ariaLabel: isOpen
      ? "Cafe is currently open until 11:00 PM Indian Standard Time"
      : "Cafe is currently closed. Opens daily at 11:00 AM Indian Standard Time",
    scheduleText: "Daily · 11:00 AM — 11:00 PM",
  };
}

