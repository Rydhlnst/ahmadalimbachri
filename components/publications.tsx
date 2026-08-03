"use client";

import { useState, useMemo } from "react";
import { Search, Globe, BookOpen, Presentation, FileText, Users, Calendar, Award } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, FadeInBlur } from "@/components/ui/motion";
import { PhotoSkeleton } from "@/components/ui/photo-skeleton";
import { Section, SectionHeader, Panel } from "@/components/ui/section";
import { publications, type Publication } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeConfig = {
  international: { label: "Internasional", icon: Globe },
  national:      { label: "Nasional",      icon: BookOpen },
  conference:    { label: "Konferensi",    icon: Presentation },
};

const TABS = [
  { value: "all",           label: "Semua" },
  { value: "international", label: "Internasional" },
  { value: "national",      label: "Nasional" },
  { value: "conference",    label: "Konferensi" },
];

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const config = typeConfig[pub.type];
  const Icon = config.icon;

  return (
    <Panel className="flex flex-col h-full">
      <div className="relative">
        <PhotoSkeleton aspect="landscape" index={index + 1} label={config.label} />
        {pub.indexing && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono font-bold text-white bg-navy px-2 py-1 tracking-wider">
            <Award className="h-3 w-3" strokeWidth={1.5} />
            {pub.indexing}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Icon className="h-3 w-3" strokeWidth={1.5} />
            {config.label}
          </span>
          <span className="flex items-center gap-1 text-navy tabular-nums">
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            {pub.year}
          </span>
        </div>

        <h3 className="font-heading text-sm md:text-base font-bold text-navy leading-snug mb-4 flex-1 text-justify">
          {pub.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-neutral-200 space-y-2">
          <div className="flex items-start gap-2 text-xs text-neutral-600 italic leading-snug">
            <FileText className="h-3 w-3 mt-0.5 text-gold flex-shrink-0" strokeWidth={1.5} />
            <span>{pub.journal}{pub.volume && <span className="not-italic text-neutral-400"> · {pub.volume}</span>}</span>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-3 w-3 mt-0.5 text-gold flex-shrink-0" strokeWidth={1.5} />
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              {pub.authors.map((author, i) => (
                <span key={author}>
                  <span className={cn(
                    (author.toLowerCase().includes("bachri") ||
                     author.toLowerCase().includes("ahmad alim") ||
                     author.toLowerCase().includes("aa bachri"))
                      ? "font-semibold text-navy"
                      : ""
                  )}>
                    {author}
                  </span>
                  {i < pub.authors.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Publications() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(
    () => publications.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.journal.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.some((a) => a.toLowerCase().includes(search.toLowerCase()))
    ),
    [search]
  );

  const byType: Record<string, Publication[]> = {
    all: filtered,
    international: filtered.filter((p) => p.type === "international"),
    national: filtered.filter((p) => p.type === "national"),
    conference: filtered.filter((p) => p.type === "conference"),
  };

  const items = byType[activeTab] ?? [];

  return (
    <Section id="publications" bg="neutral" ariaLabelledBy="publications-heading">
      <SectionHeader
        label="Riset & Publikasi"
        titleId="publications-heading"
        title="Publikasi Ilmiah"
        description="Pilihan publikasi internasional dan nasional dari penelitian terkini."
      />

      <FadeInBlur delay={0.1}>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" strokeWidth={1.5} />
            <input
              type="search"
              placeholder="Cari publikasi..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-neutral-200 focus:border-navy focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari publikasi"
            />
          </div>
          <div className="flex flex-wrap border border-neutral-200 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-widest border-r border-neutral-200 last:border-r-0 transition-colors duration-200",
                  activeTab === tab.value ? "bg-navy text-white" : "bg-white text-neutral-500 hover:text-navy"
                )}
              >
                {tab.label} <span className="ml-1 opacity-60 tabular-nums">{byType[tab.value].length}</span>
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 text-sm">
            Tidak ada publikasi yang cocok.
          </div>
        ) : (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((pub, i) => (
              <StaggerItem key={pub.id}>
                <PublicationCard pub={pub} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </FadeInBlur>
    </Section>
  );
}
