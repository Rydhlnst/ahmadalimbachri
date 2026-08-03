import { MapPin, ArrowUpRight, Mic, Calendar } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { PhotoSkeleton } from "@/components/ui/photo-skeleton";
import { Section, SectionHeader, Panel } from "@/components/ui/section";
import { expertContributions, type ExpertContribution } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryLabel = {
  policy: "Kebijakan",
  academic: "Akademik",
  government: "Pemerintahan",
  public: "Publik",
};

export function ExpertContributions() {
  const sorted = [...expertContributions].sort((a, b) => b.year - a.year);
  const years = [...new Set(sorted.map((c) => c.year))].sort((a, b) => b - a);

  return (
    <Section id="contributions" bg="white" ariaLabelledBy="contributions-heading">
      <SectionHeader
        label="Kontribusi Kepakaran"
        titleId="contributions-heading"
        title="Forum Akademik & Kebijakan Publik"
        description="Peran sebagai narasumber, panelis, dan ahli dalam berbagai forum strategis di tingkat regional maupun nasional."
      />

      <div className="space-y-16">
        {years.map((year, yearIndex) => {
          const yearItems = sorted.filter((c) => c.year === year);
          return (
            <FadeIn key={year} delay={yearIndex * 0.05}>
              <div>
                <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-navy">
                  <span className="flex items-baseline gap-3">
                    <Calendar className="h-4 w-4 text-gold self-center" strokeWidth={1.5} />
                    <span className="font-heading text-3xl md:text-4xl font-bold text-navy leading-none tabular-nums">
                      {year}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 tabular-nums">
                    {String(yearItems.length).padStart(2, "0")} · Kegiatan
                  </span>
                </div>

                <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {yearItems.map((c, i) => (
                    <StaggerItem key={c.id}>
                      <ContributionCard contribution={c} index={i} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

function ContributionCard({ contribution, index }: { contribution: ExpertContribution; index: number }) {
  return (
    <Panel className="group flex flex-col h-full">
      <PhotoSkeleton aspect="landscape" index={index + 1} label={categoryLabel[contribution.category]} />
      <div className="p-5 flex flex-col flex-1 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Mic className="h-3 w-3" strokeWidth={1.5} />
            {categoryLabel[contribution.category]}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-navy transition-colors duration-300" strokeWidth={1.5} />
        </div>

        <h4 className={cn("font-heading font-bold text-navy leading-snug text-sm md:text-base mb-4 flex-1 text-justify")}>
          {contribution.event}
        </h4>

        <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-semibold text-navy">
            <Mic className="h-3 w-3 text-gold" strokeWidth={1.5} />
            {contribution.role}
          </span>
          <span className="flex items-center gap-1 text-neutral-400">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {contribution.location}
          </span>
        </div>
      </div>
    </Panel>
  );
}
