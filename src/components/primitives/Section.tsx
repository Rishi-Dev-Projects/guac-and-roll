import React from "react";

// background: "primary"/"oatmeal" and "dark"/"espresso" are identical pairs (kept for caller compatibility)
// spacing: "default"/"standard" and "relaxed"/"hero" are identical pairs (kept for caller compatibility)
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  background?: "primary" | "inset" | "dark" | "transparent";
  spacing?: "none" | "compact" | "standard" | "hero";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  background = "primary",
  spacing = "standard",
  className = "",
  children,
  ...props
}: SectionProps) {
  const bgClasses: Record<string, string> = {
    primary: "bg-[#F8F5EE] text-[#1C1917]",
    inset: "bg-[#EFE8DC]/60 text-[#1C1917] border-y border-[#261C16]/10",
    dark: "bg-[#261C16] text-[#F8F5EE]",
    transparent: "bg-transparent",
  };

  const spacingClasses: Record<string, string> = {
    none: "py-0",
    compact: "py-10 md:py-16",
    standard: "py-20 md:py-28 lg:py-32",
    hero: "py-24 md:py-36",
  };

  const resolvedBg = bgClasses[background] ?? bgClasses.primary;
  const resolvedSpacing = spacingClasses[spacing] ?? spacingClasses.standard;

  return (
    <Component
      className={`relative w-full ${resolvedBg} ${resolvedSpacing} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
