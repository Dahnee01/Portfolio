"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowingBorder } from "@/components/ui/GlowingBorder";
import { Briefcase, Code, Palette } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  fulltime: <Briefcase className="w-3.5 h-3.5" />,
  contract: <Code className="w-3.5 h-3.5" />,
  freelance: <Palette className="w-3.5 h-3.5" />,
};

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey so far."
      />

      <div ref={containerRef} className="relative mt-12 ml-4 md:ml-8">
        {/* Background track */}
        <div className="absolute left-3 md:left-4 top-0 bottom-0 w-[2px] bg-border" />

        {/* Filled progress line */}
        <motion.div
          className="absolute left-3 md:left-4 top-0 w-[2px] bg-accent origin-top"
          style={{
            height: lineHeight,
            boxShadow: "0 0 10px var(--glow-lg)",
          }}
        />

        {/* Experience cards */}
        <div className="space-y-12 pl-10 md:pl-16">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Glowing node */}
              <div className="absolute -left-10 md:-left-16 top-6 flex items-center justify-center">
                <div
                  className="w-3 h-3 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px var(--glow-border)" }}
                />
              </div>

              <GlowingBorder>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-accent-text text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-text-tertiary bg-tag-bg px-2 py-1 rounded-full flex items-center gap-1.5">
                        {typeIcons[exp.type]}
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-text-tertiary mb-3">{exp.period}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-tag-bg text-text-secondary border border-border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowingBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
