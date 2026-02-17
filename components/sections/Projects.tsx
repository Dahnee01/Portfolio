"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowingBorder } from "@/components/ui/GlowingBorder";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

function ProjectCard({ data, index }: { data: (typeof PROJECTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "flex flex-col gap-8 py-12 md:py-20",
        "md:flex-row",
        !isEven && "md:flex-row-reverse"
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Project image with parallax */}
      <div className="flex-1 overflow-hidden rounded-xl">
        <motion.div
          style={{ y: imageY }}
          className="relative aspect-video rounded-xl overflow-hidden group"
        >
          {/* Placeholder gradient — themed via CSS classes in globals.css */}
          <div
            className={cn(
              "w-full h-full",
              `project-gradient-${index}`
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-text-faint">
                {data.title}
              </span>
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
        </motion.div>
      </div>

      {/* Project info */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
          {data.title}
        </h3>
        <p className="mt-3 text-text-secondary leading-relaxed">
          {data.longDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {data.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-accent-surface text-accent-text border border-accent-border shadow-[0_0_10px_var(--glow-sm)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-6">
          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-text transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {data.githubUrl && (
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Featured Projects"
        subtitle="A selection of work I'm most proud of."
      />

      <div className="divide-y divide-border-subtle">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} data={project} index={i} />
        ))}
      </div>
    </section>
  );
}
