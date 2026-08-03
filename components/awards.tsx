"use client";

import { Award, Building2, Calendar } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { PhotoSkeleton } from "@/components/ui/photo-skeleton";
import { Section, SectionHeader, Panel } from "@/components/ui/section";
import { useShowMore, ShowMoreButton } from "@/components/ui/show-more";
import { awards } from "@/lib/data";

export function Awards() {
  const { visible, expanded, hasMore, hiddenCount, toggle } = useShowMore(awards);

  return (
    <Section id="awards" bg="white" ariaLabelledBy="awards-heading">
      <SectionHeader
        label="Penghargaan"
        titleId="awards-heading"
        title="Penghargaan & Apresiasi"
        description="Bentuk pengakuan atas dedikasi dalam bidang akademik, kepemimpinan, dan pengabdian masyarakat."
      />

      <Stagger className="grid gap-6 md:gap-8 md:grid-cols-3">
        {visible.map((award, i) => (
          <StaggerItem key={`${award.title}-${award.year}`}>
            <Panel className="flex flex-col h-full">
              <PhotoSkeleton aspect="portrait" index={i + 1} label="Award" />
              <div className="p-6 flex flex-col flex-1 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-5">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gold">
                    <Award className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Penghargaan
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-navy tabular-nums">
                    <Calendar className="h-3 w-3" strokeWidth={1.5} />
                    {award.year}
                  </span>
                </div>

                <h3 className="font-heading text-base md:text-lg font-bold text-navy leading-snug mb-3">
                  {award.title}
                </h3>

                <div className="flex items-start gap-2 mb-4">
                  <Building2 className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {award.issuer}
                  </p>
                </div>

                {award.description && (
                  <p className="text-xs text-neutral-500 leading-relaxed mt-auto pt-4 border-t border-neutral-200 text-justify">
                    {award.description}
                  </p>
                )}
              </div>
            </Panel>
          </StaggerItem>
        ))}
      </Stagger>
      {hasMore && (
        <ShowMoreButton expanded={expanded} hiddenCount={hiddenCount} onToggle={toggle} label="penghargaan" />
      )}
    </Section>
  );
}
