import React from "react";

export interface CelosiaPatternProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "single-row" | "screen" | "divider";
}

/**
 * CelosiaPattern: Bespoke SVG vector abstraction of the triangular terracotta
 * breeze-block screen wall observed on the Guac N' Roll exterior facade (Shop 9 & 10).
 */
export function CelosiaPattern({
  className = "w-full h-8 text-[#DBC5A6]/40",
  variant = "divider",
  ...props
}: CelosiaPatternProps) {
  if (variant === "single-row") {
    return (
      <svg
        viewBox="0 0 400 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <pattern
          id="celosia-single"
          width="24"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          {/* Alternating rhythmic triangular voids */}
          <polygon points="12,4 2,28 22,28" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <polygon points="0,4 12,4 6,16" fill="currentColor" fillOpacity="0.15" />
          <polygon points="12,4 24,4 18,16" fill="currentColor" fillOpacity="0.15" />
          <line x1="0" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
        <rect width="100%" height="32" fill="url(#celosia-single)" />
      </svg>
    );
  }

  if (variant === "screen") {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <pattern
          id="celosia-screen-grid"
          width="32"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {/* Triangular rhythmic lattice */}
          <polygon points="16,4 4,44 28,44" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <polygon points="0,4 16,4 8,24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <polygon points="16,4 32,4 24,24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="46" x2="32" y2="46" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#celosia-screen-grid)" />
      </svg>
    );
  }

  // Default: elegant horizontal architectural divider strip
  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-3" aria-hidden="true">
      <svg
        width="280"
        height="18"
        viewBox="0 0 280 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <g stroke="currentColor" strokeWidth="1" opacity="0.65">
          <polygon points="20,2 10,16 30,16" />
          <polygon points="50,2 40,16 60,16" />
          <polygon points="80,2 70,16 90,16" />
          <polygon points="110,2 100,16 120,16" />
          <polygon points="140,2 130,16 150,16" />
          <polygon points="170,2 160,16 180,16" />
          <polygon points="200,2 190,16 210,16" />
          <polygon points="230,2 220,16 240,16" />
          <polygon points="260,2 250,16 270,16" />
          <line x1="0" y1="9" x2="10" y2="9" strokeDasharray="2 2" />
          <line x1="270" y1="9" x2="280" y2="9" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  );
}
