"use client";

import { motion } from "framer-motion";
import { Mail, ArrowDown, Building2, MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";
import { professor } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white flex items-center"
      aria-label="Profil utama"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-28 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

          {/* ── Photo card — contained, portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-1 md:order-2 mx-auto md:mx-0 w-full max-w-sm"
          >
            {/* Frame */}
            <div className="relative aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden">
              <Image
                src="/professor.png"
                alt="Prof. Dr. Ahmad, S.E., M.Si."
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 400px, 90vw"
                priority
              />
            </div>

            {/* Frame corner markers */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-navy" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-navy" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-navy" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-navy" />

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <span>◆ 01 / Portrait</span>
              <span>ULM · Est. 1995</span>
            </div>
          </motion.div>

          {/* ── Text ── */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mb-8 flex items-center gap-3 justify-center md:justify-start"
            >
              <span className="w-10 h-px bg-navy" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-navy">
                Rektor ULM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="font-heading leading-[0.95] tracking-tight text-navy mb-6"
            >
              <span className="block text-lg md:text-xl font-normal opacity-60 mb-2">
                Prof. Dr.
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">
                Ahmad
              </span>
              <span className="block text-xl md:text-2xl font-normal text-neutral-500 mt-3">
                S.E., M.Si.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              className="flex flex-col gap-2.5 mb-8 text-sm text-neutral-500 max-w-md mx-auto md:mx-0"
            >
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <Building2 className="h-3.5 w-3.5 text-gold flex-shrink-0" strokeWidth={1.5} />
                <span>{professor.university}</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" strokeWidth={1.5} />
                <span>Banjarmasin, Kalimantan Selatan</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <GraduationCap className="h-3.5 w-3.5 text-gold flex-shrink-0" strokeWidth={1.5} />
                <span>Universitas Hasanuddin · S3 Manajemen</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              className="flex flex-wrap gap-x-4 gap-y-1.5 mb-10 justify-center md:justify-start"
            >
              {professor.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs font-medium text-neutral-400 hover:text-gold transition-colors duration-300 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 h-11 px-6 text-sm font-semibold bg-navy text-white hover:bg-black transition-colors duration-300"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                Hubungi
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 h-11 px-2 text-sm font-medium text-navy border-b border-navy hover:text-gold transition-colors duration-300"
              >
                Pelajari Lebih
                <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
