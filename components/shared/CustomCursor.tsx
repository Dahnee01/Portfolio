"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isTouch, setIsTouch] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${e.clientY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      {/* Grid pattern layer revealed by cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage: `radial-gradient(300px circle at var(--cursor-x) var(--cursor-y), black 10%, transparent 70%)`,
          maskImage: `radial-gradient(300px circle at var(--cursor-x) var(--cursor-y), black 10%, transparent 70%)`,
        }}
      />

      {/* Spotlight glow following cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          background:
            "radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </>
  );
}
