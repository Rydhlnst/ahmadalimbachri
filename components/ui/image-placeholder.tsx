import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Variant determines the visual style */
  variant?: "initial" | "icon" | "gradient";
  /** Text to extract initial from (for variant="initial") */
  text?: string;
  /** Aspect ratio */
  aspect?: "portrait" | "portrait-tall" | "square" | "landscape" | "video";
  /** Optional label in corner */
  label?: string;
  /** Optional index number in corner */
  index?: number;
  /** Additional CSS classes */
  className?: string;
  /** Size for icon variant */
  iconSize?: "sm" | "md" | "lg";
}

const aspectClasses = {
  portrait: "aspect-[3/4]",
  "portrait-tall": "aspect-[4/6]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  video: "aspect-[16/10]",
};

const iconSizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

/**
 * Reusable image placeholder component.
 * Shows a styled fallback when no image is available.
 */
export function ImagePlaceholder({
  variant = "icon",
  text,
  aspect = "landscape",
  label,
  index,
  className,
  iconSize = "md",
}: ImagePlaceholderProps) {
  const initial = text?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectClasses[aspect],
        className
      )}
    >
      {variant === "initial" ? (
        <>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy/80" />
          {/* Initial letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-4xl font-heading font-bold">
              {initial}
            </span>
          </div>
        </>
      ) : variant === "gradient" ? (
        <>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200" />
          {/* Diagonal texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 12px)",
            }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon
              className={cn("text-neutral-400", iconSizes[iconSize])}
              strokeWidth={1}
            />
          </div>
        </>
      ) : (
        <>
          {/* Neutral base */}
          <div className="absolute inset-0 bg-neutral-200" />
          {/* Diagonal texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 12px)",
            }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon
              className={cn("text-neutral-400", iconSizes[iconSize])}
              strokeWidth={1}
            />
          </div>
        </>
      )}

      {/* Corner label */}
      {(label || index !== undefined) && (
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          {index !== undefined && (
            <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
          )}
          {label && <span>{label}</span>}
        </div>
      )}

      {/* Bottom-right aspect ratio tag */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neutral-400/50 tabular-nums">
        {aspect === "portrait"
          ? "3:4"
          : aspect === "portrait-tall"
            ? "4:6"
            : aspect === "square"
              ? "1:1"
              : aspect === "video"
                ? "16:10"
                : "4:3"}
      </div>
    </div>
  );
}
