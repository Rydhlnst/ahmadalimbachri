"use client";

import { ArrowUp, Mail, MapPin } from "lucide-react";
import { professor } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white border-t border-white/10" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 mb-10">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {professor.nameShort}
            </p>
            <p className="text-sm text-white/50 mb-0.5">{professor.titleEn}</p>
            <p className="text-sm text-white/35">{professor.university}</p>
          </div>

          <div className="flex flex-col md:items-end justify-between gap-5">
            <div className="flex flex-col gap-2 md:items-end">
              <a href={`mailto:${professor.email}`} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                {professor.email}
              </a>
              <p className="inline-flex items-center gap-2 text-sm text-white/40">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                Banjarmasin, Kalimantan Selatan
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-gold transition-colors duration-300"
              aria-label="Kembali ke atas"
            >
              Kembali ke Atas
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-5" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-white/35 tabular-nums uppercase tracking-wider">
          <p>© {currentYear} · {professor.nameShort}</p>
          <p>Made with care · Banjarmasin · ID</p>
        </div>
      </div>
    </footer>
  );
}
