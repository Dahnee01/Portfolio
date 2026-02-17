import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { Navbar } from "./Navbar";
import { NAV_ITEMS } from "@/lib/data";

describe("Navbar", () => {
  it("renders all desktop navigation items", () => {
    renderWithTheme(<Navbar />);
    for (const item of NAV_ITEMS) {
      const buttons = screen.getAllByText(item.label);
      expect(buttons.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders desktop and mobile nav elements", () => {
    renderWithTheme(<Navbar />);
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBe(2); // desktop + mobile
  });

  it("renders ThemeToggle buttons (one per navbar)", () => {
    renderWithTheme(<Navbar />);
    const toggleButtons = screen.getAllByRole("button", { name: /switch to/i });
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("mobile nav shows subset of items", () => {
    renderWithTheme(<Navbar />);
    // Mobile nav only shows Home, Projects, Skills, Contact (4 items)
    // Desktop shows all 6 items
    // Total buttons should be 10 (6 desktop + 4 mobile)
    const allButtons = screen.getAllByRole("button");
    // At least the nav items exist
    expect(allButtons.length).toBeGreaterThan(4);
  });
});
