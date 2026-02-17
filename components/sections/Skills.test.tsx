import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { Skills } from "./Skills";
import { SKILLS } from "@/lib/data";

describe("Skills", () => {
  it("renders with section id='skills'", () => {
    const { container } = renderWithTheme(<Skills />);
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    renderWithTheme(<Skills />);
    expect(
      screen.getByText("Skills & Tools", { exact: false })
    ).toBeInTheDocument();
  });

  it("renders all skill category names", () => {
    renderWithTheme(<Skills />);
    for (const category of SKILLS) {
      expect(screen.getByText(category.category)).toBeInTheDocument();
    }
  });

  it("renders skill count per category", () => {
    renderWithTheme(<Skills />);
    // All categories may have the same count, so use getAllByText
    const countText = `${SKILLS[0].skills.length} skills`;
    const counts = screen.getAllByText(countText);
    expect(counts.length).toBe(SKILLS.length);
  });

  it("renders skill tooltips with names", () => {
    renderWithTheme(<Skills />);
    // Each skill has a tooltip with its name
    for (const category of SKILLS) {
      for (const skill of category.skills) {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
      }
    }
  });
});
