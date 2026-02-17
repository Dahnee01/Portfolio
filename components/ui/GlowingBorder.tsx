"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  color?: string;
}

export function GlowingBorder({
  children,
  className,
  innerClassName,
  color,
}: GlowingBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative rounded-xl p-[1px]", className)}
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color ?? "var(--glow-border)"}, transparent 40%)`
          : "var(--glass-border)",
      }}
    >
      <div
        className={cn(
          "rounded-xl bg-background h-full w-full",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
