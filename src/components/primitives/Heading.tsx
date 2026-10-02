import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "subheading" | "eyebrow";
type HeadingFont = "serif" | "brand" | "sans";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  font?: HeadingFont;
  className?: string;
  children: React.ReactNode;
}

export function Heading({
  as: Component = "h2",
  size,
  font,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const resolvedSize = size || (Component as HeadingSize);

  // If font not explicitly provided, choose sensible defaults
  const resolvedFont =
    font ||
    (resolvedSize === "eyebrow"
      ? "brand"
      : resolvedSize === "h4" || resolvedSize === "subheading"
      ? "sans"
      : "serif");

  const sizeClasses: Record<HeadingSize, string> = {
    display:
      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.06]",
    h1: "text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.12]",
    h2: "text-2xl sm:text-3xl md:text-4xl tracking-[-0.015em] leading-[1.18]",
    h3: "text-xl sm:text-2xl tracking-normal leading-[1.24]",
    h4: "text-lg sm:text-xl tracking-normal leading-[1.3]",
    subheading: "text-sm sm:text-base font-medium tracking-normal leading-relaxed",
    eyebrow: "text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#8D6E66]",
  };

  const fontClasses: Record<HeadingFont, string> = {
    serif: "font-[family-name:var(--font-playfair)]",
    brand: "font-[family-name:var(--font-syne)]",
    sans: "font-[family-name:var(--font-plus-jakarta)]",
  };

  return (
    <Component
      className={`${fontClasses[resolvedFont]} ${sizeClasses[resolvedSize]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
