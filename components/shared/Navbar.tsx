"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const MOBILE_ITEMS = NAV_ITEMS.filter((item) =>
  ["Home", "Projects", "Skills", "Contact"].includes(item.label)
);

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );
      observer.observe(element);
      observers.push(observer);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop navbar — top center */}
      <motion.nav
        className={cn(
          "hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-2 py-2 gap-1 items-center transition-all duration-500",
          isScrolled
            ? "glass shadow-[0_0_30px_var(--glass-shadow)]"
            : "bg-transparent border border-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {NAV_ITEMS.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="relative px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-surface-hover"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
        <div className="mx-1 w-px h-5 bg-border" />
        <ThemeToggle />
      </motion.nav>

      {/* Mobile navbar — bottom center */}
      <motion.nav
        className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 py-2 gap-1 items-center shadow-[0_0_30px_var(--glass-shadow)]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {MOBILE_ITEMS.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="relative px-3 py-2 text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 rounded-full bg-surface-hover"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
        <ThemeToggle />
      </motion.nav>
    </>
  );
}
