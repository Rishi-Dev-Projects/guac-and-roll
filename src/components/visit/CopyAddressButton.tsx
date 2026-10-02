"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyAddressButtonProps {
  address: string;
  className?: string;
}

export function CopyAddressButton({ address, className = "" }: CopyAddressButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text if clipboard fails
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy cafe address to clipboard"
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#261C16]/15 hover:border-[#261C16]/40 bg-[#F8F5EE] text-[#261C16] hover:bg-[#261C16] hover:text-[#F8F5EE] transition-all select-none min-h-[38px] ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#5F7355]" />
          <span>Address Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 opacity-60" />
          <span>Copy Address</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Address copied to clipboard" : ""}
      </span>
    </button>
  );
}
