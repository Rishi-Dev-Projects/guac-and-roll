import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark-outline";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "architectural";
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  shape = "architectural",
  href,
  isExternal,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium select-none cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.985] active:translate-y-[0.5px] disabled:opacity-50 disabled:pointer-events-none";

  const shapeClasses = {
    pill: "rounded-full",
    architectural: "rounded-lg",
  };

  const sizeClasses = {
    sm: "text-xs px-3.5 py-2 gap-1.5 tracking-wide",
    md: "text-sm px-5 py-2.5 gap-2 tracking-normal",
    lg: "text-base px-7 py-3 gap-2.5 tracking-normal",
  };

  const variantClasses = {
    primary:
      "bg-[#261C16] text-[#F8F5EE] hover:bg-[#3A2B22] border border-transparent shadow-[0_2px_8px_-2px_rgba(38,28,22,0.15)]",
    secondary:
      "bg-[#DBC5A6] text-[#261C16] hover:bg-[#CFB795] border border-transparent",
    outline:
      "bg-transparent text-[#261C16] border border-[#261C16]/20 hover:border-[#261C16] hover:bg-[#261C16]/5",
    ghost:
      "bg-transparent text-[#261C16] hover:bg-[#261C16]/6 border border-transparent",
    "dark-outline":
      "bg-transparent text-[#F8F5EE] border border-[#F8F5EE]/25 hover:border-[#F8F5EE] hover:bg-[#F8F5EE]/10",
  };

  const combinedClasses = `${baseClasses} ${shapeClasses[shape]} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
