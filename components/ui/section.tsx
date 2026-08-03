import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  bg?: "white" | "neutral" | "navy";
  compact?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Unified section wrapper — same max-width, same padding, everywhere.
 */
export function Section({
  id,
  ariaLabel,
  ariaLabelledBy,
  bg = "white",
  compact = false,
  children,
  className,
}: SectionProps) {
  const bgClass = {
    white: "bg-white",
    neutral: "bg-neutral-50",
    navy: "bg-navy",
  }[bg];

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        bgClass,
        compact ? "py-16 md:py-20" : "py-24 md:py-32 lg:py-36",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  label: string;
  title?: string;
  titleId?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "navy" | "gold";
  className?: string;
}

/**
 * Consistent editorial header: hairline + label + heading + description.
 */
export function SectionHeader({
  label,
  title,
  titleId,
  description,
  align = "left",
  tone = "navy",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "";
  const toneColor = tone === "gold" ? "text-gold" : "text-navy";
  const toneBar = tone === "gold" ? "bg-gold" : "bg-navy";

  return (
    <div className={cn("mb-14 flex flex-col", alignClass, className)}>
      <div className={cn("flex items-center gap-3 mb-6", align === "center" && "justify-center")}>
        <span className={cn("w-10 h-px", toneBar)} />
        <span className={cn("text-[11px] font-semibold tracking-[0.25em] uppercase", toneColor)}>
          {label}
        </span>
        {align === "center" && <span className={cn("w-10 h-px", toneBar)} />}
      </div>

      {title && (
        <h2
          id={titleId}
          className={cn(
            "font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] max-w-3xl",
            tone === "gold" ? "text-white" : "text-navy",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            "text-base leading-relaxed max-w-xl mt-5 text-justify",
            tone === "gold" ? "text-white/60" : "text-neutral-500",
            align === "center" && "mx-auto text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Sharp bordered card — reusable everywhere.
 */
export function Panel({
  children,
  bordered = true,
  className,
}: {
  children: React.ReactNode;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white",
        bordered && "border border-neutral-200 hover:border-navy transition-colors duration-500",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Consistent icon-labeled row — used in facts/contact/details.
 */
export function DataRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Content = () => (
    <span className="text-sm font-semibold text-navy break-words">{value}</span>
  );

  return (
    <div className="grid grid-cols-[24px_120px_1fr] gap-4 md:gap-6 items-center py-4 border-b border-neutral-200 last:border-b-0">
      <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
        {label}
      </span>
      {href ? (
        <a href={href} className="text-sm font-semibold text-navy hover:text-gold transition-colors break-all">
          {value}
        </a>
      ) : (
        <Content />
      )}
    </div>
  );
}
