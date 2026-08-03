"use client";

import { GraduationCap, Building2, BookOpen, MapPin, Calendar } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { PhotoSkeleton } from "@/components/ui/photo-skeleton";
import { Section, SectionHeader, Panel } from "@/components/ui/section";
import { useShowMore, ShowMoreButton } from "@/components/ui/show-more";
import { education } from "@/lib/data";

export function Education() {
  const { visible, expanded, hasMore, hiddenCount, toggle } = useShowMore(education);

  return (
    <Section id="education" bg="neutral" ariaLabelledBy="education-heading">
      <SectionHeader
        label="Pendidikan"
        titleId="education-heading"
        title="Riwayat Akademik"
        description="Tiga jenjang pendidikan tinggi ditempuh di Universitas Hasanuddin, Makassar — Fakultas Ekonomi, Jurusan Manajemen."
      />

      <Stagger className="grid md:grid-cols-3 gap-6 md:gap-8">
        {visible.map((edu, i) => (
          <StaggerItem key={`${edu.degree}-${edu.year}`}>
            <Panel className="flex flex-col h-full">
              <PhotoSkeleton
                aspect="portrait"
                index={i + 1}
                label={edu.degree.split(" ")[0]}
              />
              <div className="p-6 flex flex-col flex-1 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gold">
                    <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {edu.degree.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-navy tabular-nums">
                    <Calendar className="h-3 w-3" strokeWidth={1.5} />
                    {edu.year}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-navy leading-snug mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-neutral-400 mb-5">{edu.degreeEn}</p>

                <div className="mt-auto space-y-3 pt-4 border-t border-neutral-200">
                  <FactRow icon={Building2} label="Institusi" value={edu.institution} />
                  <FactRow icon={BookOpen} label="Program" value={`${edu.major} · ${edu.faculty}`} />
                  <FactRow icon={MapPin} label="Lokasi" value={edu.location} />
                </div>
              </div>
            </Panel>
          </StaggerItem>
        ))}
      </Stagger>
      {hasMore && (
        <ShowMoreButton expanded={expanded} hiddenCount={hiddenCount} onToggle={toggle} label="pendidikan" />
      )}
    </Section>
  );
}

function FactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
          {label}
        </p>
        <p className="text-xs text-navy leading-snug">{value}</p>
      </div>
    </div>
  );
}
