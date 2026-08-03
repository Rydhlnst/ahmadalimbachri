"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  duration = 0.7,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.12 });
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up: { y: shouldReduceMotion ? 0 : 40, x: 0 },
    down: { y: shouldReduceMotion ? 0 : -40, x: 0 },
    left: { x: shouldReduceMotion ? 0 : 40, y: 0 },
    right: { x: shouldReduceMotion ? 0 : -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInBlurProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeInBlur({
  children,
  delay = 0,
  className,
  once = true,
}: FadeInBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.12 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: shouldReduceMotion ? "none" : "blur(8px)" }
      }
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 28,
          scale: shouldReduceMotion ? 1 : 0.98,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({ className, color }: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        backgroundColor: color,
      }}
      className={className}
    />
  );
}

interface TimelineItemProps {
  children: ReactNode;
  icon: ReactNode;
  index?: number;
  className?: string;
  showLine?: boolean;
}

export function TimelineItem({
  children,
  icon,
  index = 0,
  className,
  showLine = true,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`relative flex gap-6 md:gap-10 pb-12 last:pb-0 ${className ?? ""}`}>
      {/* Timeline vertical line */}
      {showLine && (
        <div className="hidden md:flex flex-col items-center flex-shrink-0 relative">
          {/* Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: EASE }}
            className="absolute top-12 bottom-0 w-px bg-gold/30 origin-top"
            style={{ transformOrigin: "top" }}
          />
          {/* Icon dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.1,
              ease: EASE,
              type: shouldReduceMotion ? "tween" : "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="w-12 h-12 rounded-full bg-white border-2 border-gold/40 flex items-center justify-center z-10 relative shadow-sm"
          >
            {icon}
          </motion.div>
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: EASE }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function Parallax({
  children,
  className,
  offset = 50,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={{ y: shouldReduceMotion ? 0 : y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScaleIn({
  children,
  delay = 0,
  className,
  once = true,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.12 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface LineRevealProps {
  className?: string;
  delay?: number;
}

export function LineReveal({ className, delay = 0 }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={cn("h-px bg-gold/30 origin-left", className)}
    />
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
