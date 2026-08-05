"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, X as CloseIcon, User } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { platformConfig } from "@/components/ui/social-icons";
import { professor, socialAccounts, type SocialAccount } from "@/lib/data";

export function Contact() {
  const [active, setActive] = useState<SocialAccount | null>(null);

  useEffect(() => {
    if (!active) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <Section id="contact" bg="navy" ariaLabelledBy="contact-heading">
      <SectionHeader
        label="Kontak"
        titleId="contact-heading"
        title="Mari Terhubung."
        description="Pilih salah satu kanal media sosial resmi di bawah untuk melihat seluruh platform tempat Prof. Dr. Ahmad hadir."
        tone="gold"
      />

      {/* 4 account cards */}
      <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
        {socialAccounts.map((account, i) => (
          <StaggerItem key={account.id}>
            <AccountCard account={account} index={i} onClick={() => setActive(account)} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Direct contact strip */}
      <FadeIn delay={0.2} className="border border-white/15 bg-white/[0.02] divide-y md:divide-y-0 md:divide-x divide-white/10 grid md:grid-cols-3">
        <ContactStripItem icon={Mail} label="Email" value={professor.email} href={`mailto:${professor.email}`} />
        <ContactStripItem icon={Phone} label="Telepon" value={professor.phone} href={`tel:${professor.phone}`} />
        <ContactStripItem icon={MapPin} label="Alamat" value={professor.address} />
      </FadeIn>

      {/* Modal */}
      <AnimatePresence>
        {active && <SocialModal account={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  );
}

/* ── Account card ── */

function AccountCard({
  account,
  index,
  onClick,
}: {
  account: SocialAccount;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:border-gold/50 transition-all duration-300 flex flex-col"
    >
      {/* Photo area — dark neutral backdrop keeps colorful avatar contained */}
      <div className="relative aspect-square bg-[oklch(0.20_0.03_252)] overflow-hidden">
        {/* Subtle radial spotlight */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, oklch(0.28 0.05 252) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        {/* Photo — contained + centered */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <div className="relative w-full h-full">
            <Image
              src={account.image}
              alt={`Avatar akun ${account.name}`}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 240px, 45vw"
            />
          </div>
        </div>
        {/* Corner marker */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-gold/80">
          <span className="w-1.5 h-1.5 bg-gold" />
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Account name pill */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-navy border border-gold/40">
          <span className="font-heading text-[11px] font-bold text-gold tracking-wider uppercase">
            {account.name}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 border-t border-white/10">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-white leading-snug mb-2 break-all">
          <User className="h-3 w-3 text-gold flex-shrink-0" strokeWidth={1.5} />
          {account.handle}
        </p>
        <p className="text-[11px] text-white/45 leading-relaxed mb-4 flex-1">
          {account.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gold group-hover:text-white transition-colors">
          {account.platforms.length} Platform
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
        </span>
      </div>
    </button>
  );
}

/* ── Contact strip item ── */

function ContactStripItem({
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
  const content = (
    <>
      <div className="p-2 border border-white/15 flex-shrink-0">
        <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-0.5">
          {label}
        </p>
        <p className="text-xs md:text-sm font-medium text-white leading-snug break-all">
          {value}
        </p>
      </div>
    </>
  );
  return (
    <div className="p-4 md:p-5">
      {href ? (
        <a href={href} className="flex items-center gap-3 group hover:text-gold transition-colors">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3">{content}</div>
      )}
    </div>
  );
}

/* ── Modal ── */

function SocialModal({
  account,
  onClose,
}: {
  account: SocialAccount;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white border border-navy w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-navy transition-colors z-10 border border-neutral-200 hover:border-navy"
          aria-label="Tutup"
        >
          <CloseIcon className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* Header — avatar + title */}
        <div className="p-6 md:p-8 border-b border-neutral-200 flex items-start gap-5">
          {/* Avatar frame */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 bg-[oklch(0.20_0.03_252)] border border-navy overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at center, oklch(0.28 0.05 252) 0%, transparent 65%)" }}
              aria-hidden="true"
            />
            <Image
              src={account.image}
              alt=""
              fill
              className="object-contain p-2"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-3">
              <span className="w-6 h-px bg-gold" />
              Media Sosial · {account.name}
            </p>
            <h3 id="modal-title" className="font-heading text-xl md:text-2xl font-bold text-navy leading-tight mb-1.5 break-all">
              {account.handle}
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">{account.description}</p>
          </div>
        </div>

        {/* Platforms grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-neutral-200 border-b border-neutral-200">
          {account.platforms.map((p, i) => {
            const cfg = platformConfig[p.platform];
            const Icon = cfg.icon;
            return (
              <a
                key={p.platform}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 flex items-center gap-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="p-2 border border-neutral-200 group-hover:border-navy transition-colors flex-shrink-0">
                  <Icon className="h-4 w-4 text-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm font-semibold text-navy leading-snug">
                    {cfg.label}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-neutral-300 group-hover:text-navy transition-colors flex-shrink-0"
                  strokeWidth={1.5}
                />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        {account.email && (
          <div className="p-5 md:p-6 flex flex-wrap items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Email Akun
            </span>
            <a
              href={`mailto:${account.email}`}
              className="text-navy font-semibold hover:text-gold transition-colors break-all"
            >
              {account.email}
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
