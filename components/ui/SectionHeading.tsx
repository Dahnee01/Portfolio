"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "mb-16",
        align === "center" && "text-center"
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
        {title}
        <span className="text-gradient">.</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary max-w-lg mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
