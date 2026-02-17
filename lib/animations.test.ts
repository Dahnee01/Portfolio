import { describe, it, expect } from "vitest";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
  wordReveal,
  slideInLeft,
  slideInRight,
} from "./animations";

describe("animation variants", () => {
  it("fadeInUp has hidden (opacity:0) and visible (opacity:1) states", () => {
    expect(fadeInUp.hidden).toHaveProperty("opacity", 0);
    expect(fadeInUp.visible).toHaveProperty("opacity", 1);
  });

  it("staggerContainer configures staggerChildren", () => {
    const visible = staggerContainer.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, unknown>;
    expect(transition.staggerChildren).toBeGreaterThan(0);
  });

  it("staggerItem has hidden and visible states", () => {
    expect(staggerItem.hidden).toHaveProperty("opacity", 0);
    expect(staggerItem.visible).toHaveProperty("opacity", 1);
  });

  it("cardHover has rest and hover states", () => {
    expect(cardHover.rest).toHaveProperty("scale", 1);
    const hover = cardHover.hover as Record<string, unknown>;
    expect(hover.scale).toBeGreaterThan(1);
  });

  it("wordReveal visible is a function that accepts index for staggered delay", () => {
    expect(typeof wordReveal.visible).toBe("function");
    const result = (wordReveal.visible as (i: number) => Record<string, unknown>)(2);
    expect(result).toHaveProperty("opacity", 1);
    expect((result.transition as Record<string, number>).delay).toBeCloseTo(0.24);
  });

  it("slideInLeft/slideInRight are mirror variants", () => {
    expect(slideInLeft.hidden).toHaveProperty("x", -60);
    expect(slideInRight.hidden).toHaveProperty("x", 60);
    expect(slideInLeft.visible).toHaveProperty("x", 0);
    expect(slideInRight.visible).toHaveProperty("x", 0);
  });
});
