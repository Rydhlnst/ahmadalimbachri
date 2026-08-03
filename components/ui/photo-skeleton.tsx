import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoSkeletonProps {
  aspect?: "portrait" | "portrait-tall" | "square" | "landscape";
  label?: string;
  index?: number;
  className?: string;
}

/**
 * Portrait photo placeholder — neutral, sharp-edged.
 * Swap for <Image> when real photos arrive.
 */
export function PhotoSkeleton({
  aspect = "portrait",
  label,
  index,
  className,
}: PhotoSkeletonProps) {
  const aspectClass = {
    "portrait": "aspect-[3/4]",
    "portrait-tall": "aspect-[4/6]",
    "square": "aspect-square",
    "landscape": "aspect-[4/3]",
  }[aspect];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group",
        aspectClass,
        className
      )}
    >
      {/* Neutral base */}
      <div className="absolute inset-0 bg-neutral-200" />

      {/* Diagonal texture — subtle premium hairlines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* Corner label */}
      {(label || index !== undefined) && (
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          {index !== undefined && (
            <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
          )}
          {label && <span>{label}</span>}
        </div>
      )}

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon className="h-8 w-8 text-neutral-400" strokeWidth={1} />
      </div>

      {/* Bottom-right corner cut for premium feel */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neutral-400 tabular-nums">
        {aspect === "portrait" ? "3:4" : aspect === "portrait-tall" ? "4:6" : aspect === "square" ? "1:1" : "4:3"}
      </div>
    </div>
  );
}
