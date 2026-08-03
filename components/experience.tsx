"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Building2, GraduationCap, Crown, Landmark, Briefcase } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { useShowMore, ShowMoreButton } from "@/components/ui/show-more";
import { experience, type Experience } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all",         label: "Semua",         icon: Briefcase },
  { value: "leadership",  label: "Kepemimpinan",  icon: Crown },
  { value: "academic",    label: "Akademik",      icon: GraduationCap },
  { value: "government",  label: "Pemerintahan",  icon: Landmark },
  { value: "industry",    label: "Industri",      icon: Building2 },
];

const categoryIcon = {
  academic: GraduationCap,
  leadership: Crown,
  government: Landmark,
  industry: Building2,
};

function ExperienceRow({ exp, index }: { exp: Experience; index: number }) {
  const Icon = categoryIcon[exp.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group grid grid-cols-[28px_1fr_auto] md:grid-cols-[28px_1fr_auto] gap-4 md:gap-8 items-center py-5 border-b border-neutral-200 hover:bg-neutral-50 -mx-4 px-4 transition-colors duration-300"
    >
      <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
      <div className="min-w-0">
        <p className="font-semibold text-navy text-sm md:text-base leading-snug group-hover:text-gold transition-colors duration-300 mb-0.5">
          {exp.role}
        </p>
        <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
          <span>{exp.organization}</span>
          {exp.location && (
            <span className="flex items-center gap-1 text-neutral-400">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {exp.location}
            </span>
          )}
        </div>
      </div>
      <span className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 tabular-nums whitespace-nowrap">
        <Calendar className="h-3 w-3" strokeWidth={1.5} />
        {exp.period}
      </span>
    </motion.div>
  );
}

export function Experience() {
  const [active, setActive] = useState("all");

  const filtered = [...experience]
    .filter((e) => active === "all" || e.category === active)
    .sort((a, b) => b.startYear - a.startYear);

  const { visible, expanded, hasMore, hiddenCount, toggle, reset } = useShowMore(filtered);

  const handleCategoryChange = (value: string) => {
    setActive(value);
    reset();
  };

  return (
    <Section id="experience" bg="white" ariaLabelledBy="experience-heading">
      <SectionHeader
        label="Pengalaman"
        titleId="experience-heading"
        title="Riwayat Karir"
        description="Dari industri, akademik, hingga peran kepemimpinan lintas dekade."
      />

      <FadeIn delay={0.08} className="flex flex-wrap border border-neutral-200 w-fit mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 md:px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 border-r border-neutral-200 last:border-r-0",
              active === cat.value ? "bg-navy text-white" : "bg-white text-neutral-500 hover:text-navy"
            )}
          >
            <cat.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </FadeIn>

      <FadeIn delay={0.12}>
        <div className="grid grid-cols-[28px_1fr_auto] gap-4 md:gap-8 pb-3 border-b-2 border-navy">
          <span />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Posisi &amp; Institusi
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Periode
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}>
            {visible.map((exp, i) => (
              <ExperienceRow key={`${exp.role}-${exp.startYear}`} exp={exp} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        {hasMore && (
          <ShowMoreButton expanded={expanded} hiddenCount={hiddenCount} onToggle={toggle} label="pengalaman" />
        )}
      </FadeIn>
    </Section>
  );
}
