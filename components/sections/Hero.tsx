"use client";

import { motion } from "framer-motion";
import { HERO } from "@/lib/data";
import { staggerContainer, wordReveal } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDown, Download } from "lucide-react";

const beams = [
  { startX: "10%", endX: "15%", angle: "15deg", colorVar: "var(--beam-1)", duration: 12 },
  { startX: "30%", endX: "25%", angle: "-20deg", colorVar: "var(--beam-2)", duration: 15 },
  { startX: "55%", endX: "60%", angle: "10deg", colorVar: "var(--beam-1)", duration: 10 },
  { startX: "75%", endX: "70%", angle: "-15deg", colorVar: "var(--beam-3)", duration: 13 },
  { startX: "45%", endX: "50%", angle: "25deg", colorVar: "var(--beam-1)", duration: 11 },
  { startX: "90%", endX: "85%", angle: "-10deg", colorVar: "var(--beam-2)", duration: 14 },
];

function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, var(--glow-sm) 0%, transparent 70%)",
        }}
      />

      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute h-[200vh] w-[2px]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${beam.colorVar}, transparent)`,
            left: beam.startX,
            rotate: beam.angle,
            transformOrigin: "top center",
            filter: "blur(1px)",
            opacity: "var(--beam-opacity)",
          }}
          animate={{
            left: [beam.startX, beam.endX, beam.startX],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <BackgroundBeams />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Staggered headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-5"
          style={{ perspective: "1000px" }}
        >
          {HERO.headline.map((word, i) => (
            <motion.span
              key={i}
              variants={wordReveal}
              custom={i}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary inline-block"
              style={{
                textShadow:
                  word === "Future" || word === "Milliseconds."
                    ? "0 0 40px var(--glow-md)"
                    : "none",
              }}
            >
              {word === "Future" || word === "Milliseconds." ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleClick(HERO.ctaPrimary.href)}
            >
              {HERO.ctaPrimary.label}
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleClick(HERO.ctaSecondary.href)}
            >
              {HERO.ctaSecondary.label}
            </Button>
          </MagneticButton>
          <MagneticButton>
            <a
              href={HERO.resumeUrl}
              download
              className="relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 text-text-secondary hover:text-text-primary hover:bg-surface px-8 py-4 text-base"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </MagneticButton>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
