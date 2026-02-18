"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { BENTO } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowingBorder } from "@/components/ui/GlowingBorder";
import { TechIcon } from "@/components/ui/TechIcon";
import { MapPin, Zap } from "lucide-react";

// ---------- Tech Stack Marquee ----------
function TechStackTile() {
  const items = BENTO.techStack;

  return (
    <GlowingBorder className="md:col-span-2" innerClassName="p-5 overflow-hidden">
      <p className="text-xs uppercase tracking-widest text-text-tertiary mb-3">
        Tech Stack
      </p>
      <div className="overflow-hidden">
        <div className="flex gap-8 animate-marquee">
          {[...items, ...items].map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-2 shrink-0"
            >
              <TechIcon name={item.icon} className="w-5 h-5" />
              <span className="text-sm text-text-secondary whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlowingBorder>
  );
}

// ---------- Location Tile (SVG dot grid) ----------
function LocationTile() {
  return (
    <GlowingBorder
      className="md:col-span-2 md:row-span-2"
      innerClassName="p-5 relative overflow-hidden"
    >
      <p className="text-xs uppercase tracking-widest text-text-tertiary mb-2">
        Location
      </p>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-accent-text" />
        <span className="text-text-primary text-sm">{BENTO.location.city}</span>
      </div>

      {/* SVG Dot Grid Map */}
      <svg
        viewBox="0 0 200 160"
        className="w-full h-auto opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Generate dot grid */}
        {Array.from({ length: 16 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 10 + 5}
              cy={row * 10 + 5}
              r={1}
              fill="var(--dot-color)"
            />
          ))
        )}
        {/* Highlighted location point (approximate Lagos position) */}
        <circle cx={105} cy={85} r={3} fill="var(--accent)" />
        <circle
          cx={105}
          cy={85}
          r={8}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          opacity={0.4}
          className="pulse-ring"
        />
        <circle
          cx={105}
          cy={85}
          r={14}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={0.5}
          opacity={0.2}
          className="pulse-ring"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>
    </GlowingBorder>
  );
}

// ---------- Animated Counter ----------
function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          value % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, value]);

  return (
    <div className="flex flex-col">
      <span ref={ref} className="text-2xl font-bold text-gradient">
        0{suffix}
      </span>
      <span className="text-xs text-text-tertiary mt-1">{label}</span>
    </div>
  );
}

// ---------- Metrics Tile ----------
function MetricsTile() {
  return (
    <GlowingBorder className="md:col-span-2" innerClassName="p-5">
      <p className="text-xs uppercase tracking-widest text-text-tertiary mb-4">
        Metrics
      </p>
      <div className="grid grid-cols-2 gap-4">
        {BENTO.metrics.map((metric) => (
          <AnimatedCounter
            key={metric.label}
            value={metric.value}
            suffix={metric.suffix}
            label={metric.label}
          />
        ))}
      </div>
    </GlowingBorder>
  );
}

// ---------- Currently Building Tile ----------
function CurrentlyBuildingTile() {
  return (
    <GlowingBorder className="md:col-span-2" innerClassName="p-5">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs uppercase tracking-widest text-text-tertiary">
          Currently Building
        </p>
        {BENTO.currentlyBuilding.isLive && (
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-[10px] text-accent-text uppercase tracking-wider font-medium">
              Live
            </span>
          </div>
        )}
      </div>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-surface flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-4 h-4 text-accent-text" />
        </div>
        <div>
          <p className="text-text-primary font-medium text-sm">
            {BENTO.currentlyBuilding.project}
          </p>
          <p className="text-text-tertiary text-xs mt-1">
            {BENTO.currentlyBuilding.description}
          </p>
        </div>
      </div>
    </GlowingBorder>
  );
}

// ---------- Main About Section ----------
export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="About Me"
        subtitle="A snapshot of what I do, where I am, and what I'm working on."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]"
      >
        <motion.div variants={staggerItem} className="md:col-span-2">
          <TechStackTile />
        </motion.div>
        <motion.div
          variants={staggerItem}
          className="md:col-span-2 md:row-span-2"
        >
          <LocationTile />
        </motion.div>
        <motion.div variants={staggerItem} className="md:col-span-2">
          <MetricsTile />
        </motion.div>
        <motion.div variants={staggerItem} className="md:col-span-2">
          <CurrentlyBuildingTile />
        </motion.div>
      </motion.div>
    </section>
  );
}
