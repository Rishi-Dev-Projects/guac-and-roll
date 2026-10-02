import React from "react";
import { CelosiaPattern } from "@/components/icons/CelosiaPattern";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  withCelosiaMotif?: boolean;
  tone?: "hairline" | "subtle" | "contrast" | "dark";
  className?: string;
}

export function Divider({
  label,
  withCelosiaMotif = false,
  tone = "hairline",
  className = "",
  ...props
}: DividerProps) {
  const toneClasses = {
    hairline: "border-[#261C16]/12",
    subtle: "border-[#261C16]/6",
    contrast: "border-[#261C16]/24",
    dark: "border-[#F8F5EE]/12",
  };

  if (withCelosiaMotif) {
    return (
      <div className={`relative flex items-center justify-center py-6 ${className}`} {...props}>
        <div className={`flex-grow border-t ${toneClasses[tone]}`} />
        <div className="flex-shrink mx-6">
          <CelosiaPattern variant="divider" className="w-48 h-4 text-[#DBC5A6]" />
        </div>
        <div className={`flex-grow border-t ${toneClasses[tone]}`} />
      </div>
    );
  }

  if (label) {
    return (
      <div className={`relative flex items-center py-4 ${className}`} {...props}>
        <div className={`flex-grow border-t ${toneClasses[tone]}`} />
        <span className="flex-shrink mx-4 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#1C1917]/50 font-semibold font-[family-name:var(--font-syne)]">
          {label}
        </span>
        <div className={`flex-grow border-t ${toneClasses[tone]}`} />
      </div>
    );
  }

  return (
    <hr
      className={`w-full border-0 border-t ${toneClasses[tone]} my-6 ${className}`}
      {...props}
    />
  );
}
