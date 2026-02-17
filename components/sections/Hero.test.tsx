import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { Hero } from "./Hero";
import { HERO } from "@/lib/data";

describe("Hero", () => {
  it("renders with section id='hero'", () => {
    const { container } = renderWithTheme(<Hero />);
    expect(container.querySelector("#hero")).toBeInTheDocument();
  });

  it("renders all headline words", () => {
    renderWithTheme(<Hero />);
    for (const word of HERO.headline) {
      expect(screen.getByText(word)).toBeInTheDocument();
    }
  });

  it("renders the subheadline", () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText(HERO.subheadline)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    renderWithTheme(<Hero />);
    expect(
      screen.getByRole("button", { name: HERO.ctaPrimary.label })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: HERO.ctaSecondary.label })
    ).toBeInTheDocument();
  });

  it("highlights 'Future' and 'Milliseconds.' with text-gradient", () => {
    renderWithTheme(<Hero />);
    const future = screen.getByText("Future");
    const ms = screen.getByText("Milliseconds.");
    expect(future.className).toContain("text-gradient");
    expect(ms.className).toContain("text-gradient");
  });

  it("renders resume download link", () => {
    renderWithTheme(<Hero />);
    const link = screen.getByRole("link", { name: /resume/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", HERO.resumeUrl);
    expect(link).toHaveAttribute("download");
  });
});
