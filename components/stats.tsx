"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Briefcase, BookOpen, Crown, Trophy } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { stats } from "@/lib/data";

const iconMap = [Briefcase, BookOpen, Crown, Trophy];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const steps = 50;
    const increment = value / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <Section id="stats" bg="navy" ariaLabel="Statistik akademik" compact>
      <FadeIn className="mb-10 flex items-center gap-3">
        <span className="w-10 h-px bg-gold" />
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold">
          Indikator Karir
        </span>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-y border-white/10">
        {stats.map((stat, i) => {
          const Icon = iconMap[i] || Briefcase;
          return (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="p-6 md:p-8 h-full flex flex-col items-start gap-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="font-heading text-4xl md:text-5xl font-bold text-white leading-none tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-white/60">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
