import React from "react";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextTone = "default" | "muted" | "subtle" | "light" | "accent" | "botanical";
type TextMeasure = "prose" | "narrow" | "none";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?: TextSize;
  tone?: TextTone;
  weight?: "normal" | "medium" | "semibold" | "bold";
  measure?: TextMeasure;
  className?: string;
  children: React.ReactNode;
}

export function Text({
  as: Component = "p",
  size = "base",
  tone = "default",
  weight = "normal",
  measure = "none",
  className = "",
  children,
  ...props
}: TextProps) {
  const sizeClasses: Record<TextSize, string> = {
    xs: "text-xs leading-normal",
    sm: "text-sm leading-relaxed",
    base: "text-base leading-[1.68]",
    lg: "text-lg leading-[1.65]",
    xl: "text-xl leading-[1.6]",
  };

  const toneClasses: Record<TextTone, string> = {
    default: "text-[#1C1917]", // Charcoal ink
    muted: "text-[#52463E]", // Editorial 70% contrast
    subtle: "text-[#7D6F66]", // Metadata & counts
    light: "text-[#F8F5EE]/85", // Oatmeal on dark espresso surfaces
    accent: "text-[#8D6E66]", // Adobe mauve
    botanical: "text-[#5F7355]", // Sage ceramic
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const measureClasses: Record<TextMeasure, string> = {
    prose: "max-w-[65ch]",
    narrow: "max-w-[45ch]",
    none: "",
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${toneClasses[tone]} ${weightClasses[weight]} ${measureClasses[measure]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
