"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const navLinks = [
  { href: "#about", label: "Tentang" },
  { href: "#education", label: "Pendidikan" },
  { href: "#experience", label: "Pengalaman" },
  { href: "#publications", label: "Publikasi" },
  { href: "#awards", label: "Penghargaan" },
  { href: "#organizations", label: "Organisasi" },
  { href: "#contact", label: "Kontak" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const activeSection = useActiveSection();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-navy shadow-lg shadow-navy/10"
            : "bg-navy/95 backdrop-blur-sm"
        )}
      >
        <nav className="content-wide h-[64px] flex items-center justify-between px-6 md:px-10 lg:px-16">
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            aria-label="Kembali ke atas"
          >
            <span className="font-heading text-sm font-bold text-white tracking-tight">
              Prof. Dr. Ahmad
            </span>
            <span className="hidden sm:inline text-[10px] font-medium text-white/40 border-l border-white/15 pl-2.5">
              Rektor ULM
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 text-[11px] font-medium transition-all duration-300 ",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/55 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-gold "
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            className="md:hidden p-2 -mr-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-64 bg-navy border-l border-white/10 p-5 pt-20"
          >
            <ul className="flex flex-col gap-0.5" role="list">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium  transition-colors",
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/55 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </>
  );
}
