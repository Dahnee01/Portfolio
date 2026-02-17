import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechIcon } from "./TechIcon";

describe("TechIcon", () => {
  it("renders an SVG for a known icon (react)", () => {
    const { container } = render(<TechIcon name="react" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders fallback with 2-letter abbreviation for unknown icon", () => {
    render(<TechIcon name="unknown-tech" />);
    expect(screen.getByText("UN")).toBeInTheDocument();
  });

  it("fallback uses surface background and semantic text", () => {
    const { container } = render(<TechIcon name="xyz" />);
    const fallback = container.firstElementChild!;
    expect(fallback.className).toContain("bg-surface");
    expect(fallback.className).toContain("text-text-secondary");
  });

  it("applies custom className to known icon", () => {
    const { container } = render(<TechIcon name="react" className="w-8 h-8" />);
    const svg = container.querySelector("svg");
    expect(svg!.className.baseVal).toContain("w-8");
  });

  it("renders different icons correctly", () => {
    const icons = ["nextjs", "typescript", "tailwind", "docker", "python"];
    for (const name of icons) {
      const { container, unmount } = render(<TechIcon name={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  });
});
