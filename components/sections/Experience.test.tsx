import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { Experience } from "./Experience";
import { EXPERIENCES } from "@/lib/data";

describe("Experience", () => {
  it("renders with section id='experience'", () => {
    const { container } = renderWithTheme(<Experience />);
    expect(container.querySelector("#experience")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    renderWithTheme(<Experience />);
    expect(screen.getByText("Experience", { exact: false })).toBeInTheDocument();
  });

  it("renders all experience roles", () => {
    renderWithTheme(<Experience />);
    for (const exp of EXPERIENCES) {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
    }
  });

  it("renders company names with accent-text class", () => {
    renderWithTheme(<Experience />);
    for (const exp of EXPERIENCES) {
      const company = screen.getByText(exp.company);
      expect(company).toBeInTheDocument();
      expect(company.className).toContain("text-accent-text");
    }
  });

  it("renders technology tags", () => {
    renderWithTheme(<Experience />);
    // Check first experience's technologies
    for (const tech of EXPERIENCES[0].technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders period information", () => {
    renderWithTheme(<Experience />);
    for (const exp of EXPERIENCES) {
      expect(screen.getByText(exp.period)).toBeInTheDocument();
    }
  });
});
