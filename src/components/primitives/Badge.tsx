import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "status" | "sage" | "biscuit" | "mauve" | "dark" | "hairline";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "text-[10px] px-2.5 py-0.5 tracking-[0.14em] uppercase font-semibold",
    md: "text-[11px] px-3 py-1 tracking-[0.12em] uppercase font-semibold",
  };

  const variantClasses = {
    default: "bg-[#261C16]/5 text-[#261C16] border border-[#261C16]/10",
    status:
      "bg-[#5F7355]/10 text-[#5F7355] border border-[#5F7355]/20 font-medium",
    sage:
      "bg-[#5F7355]/15 text-[#5F7355] border border-[#5F7355]/30",
    biscuit:
      "bg-[#DBC5A6]/30 text-[#261C16] border border-[#DBC5A6]/60",
    mauve:
      "bg-[#8D6E66]/15 text-[#8D6E66] border border-[#8D6E66]/30",
    dark:
      "bg-[#261C16] text-[#F8F5EE] border border-transparent",
    hairline:
      "bg-transparent text-[#1C1917]/75 border border-[#261C16]/15",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
