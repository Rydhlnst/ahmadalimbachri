import { Users, Calendar, CheckCircle2, Circle } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { organizations } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Organizations() {
  const active = organizations.filter((o) => o.endYear === null);
  const inactive = organizations.filter((o) => o.endYear !== null);

  return (
    <Section id="organizations" bg="neutral" ariaLabelledBy="organizations-heading">
      <SectionHeader
        label="Organisasi"
        titleId="organizations-heading"
        title="Profesi & Kemasyarakatan"
        description="Peran dalam berbagai organisasi profesional, akademik, dan kemasyarakatan di tingkat regional maupun nasional."
      />

      {active.length > 0 && (
        <div className="mb-14">
          <FadeIn className="flex items-center gap-3 mb-5 pb-3 border-b border-navy">
            <CheckCircle2 className="h-4 w-4 text-navy" strokeWidth={1.5} />
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-navy">
              Aktif Saat Ini
            </h3>
            <span className="flex-1" />
            <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
              {String(active.length).padStart(2, "0")} · Aktif
            </span>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-neutral-200 border border-neutral-200 bg-white">
            {active.map((org, i) => (
              <StaggerItem key={`${org.role}-${org.name}`}>
                <OrgRow org={org} active index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      {inactive.length > 0 && (
        <div>
          <FadeIn className="flex items-center gap-3 mb-5 pb-3 border-b border-neutral-300">
            <Circle className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Periode Selesai
            </h3>
            <span className="flex-1" />
            <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
              {String(inactive.length).padStart(2, "0")} · Selesai
            </span>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-neutral-200 border border-neutral-200 bg-white">
            {inactive.map((org, i) => (
              <StaggerItem key={`${org.role}-${org.name}`}>
                <OrgRow org={org} active={false} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </Section>
  );
}

function OrgRow({
  org,
  active,
  index,
}: {
  org: (typeof organizations)[0];
  active: boolean;
  index: number;
}) {
  return (
    <div className={cn("p-5 h-full group hover:bg-neutral-50 transition-colors duration-300", !active && "opacity-70")}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 tabular-nums">
          <Users className="h-3 w-3" strokeWidth={1.5} />
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 tabular-nums">
          <Calendar className="h-3 w-3" strokeWidth={1.5} />
          {org.period}
        </span>
      </div>
      <p className="text-sm font-bold text-navy leading-snug mb-1.5 group-hover:text-gold transition-colors duration-300">
        {org.role}
      </p>
      <p className="text-xs text-neutral-500 leading-relaxed text-justify">{org.name}</p>
    </div>
  );
}
