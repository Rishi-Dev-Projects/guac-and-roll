import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "editorial" | "narrow" | "standard" | "wide" | "full";
  className?: string;
  children: React.ReactNode;
}

export function Container({
  size = "standard",
  className = "",
  children,
  ...props
}: ContainerProps) {
  const sizeClasses: Record<string, string> = {
    editorial: "max-w-3xl",
    narrow: "max-w-4xl",
    standard: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  const resolvedClass = sizeClasses[size] ?? sizeClasses.standard;

  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${resolvedClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
