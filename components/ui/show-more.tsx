"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Show first N items; expose expand/collapse state.
 */
export function useShowMore<T>(items: T[], initial = 3) {
  const [expanded, setExpanded] = useState(false);
  const showAll = expanded || items.length <= initial;
  return {
    visible: showAll ? items : items.slice(0, initial),
    expanded,
    hasMore: items.length > initial,
    hiddenCount: Math.max(0, items.length - initial),
    toggle: () => setExpanded((v) => !v),
    reset: () => setExpanded(false),
  };
}

interface ShowMoreButtonProps {
  expanded: boolean;
  hiddenCount: number;
  onToggle: () => void;
  label?: string;
}

export function ShowMoreButton({
  expanded,
  hiddenCount,
  onToggle,
  label = "item",
}: ShowMoreButtonProps) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={onToggle}
        className="group inline-flex items-center gap-2.5 h-11 px-6 text-[11px] font-semibold uppercase tracking-widest border border-navy text-navy hover:bg-navy hover:text-white transition-colors duration-300"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            Tampilkan Lebih Sedikit
          </>
        ) : (
          <>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            Tampilkan {hiddenCount} {label} Lainnya
          </>
        )}
      </button>
    </div>
  );
}
