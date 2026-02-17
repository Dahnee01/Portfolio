import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GlowingBorder } from "./GlowingBorder";

describe("GlowingBorder", () => {
  it("renders children", () => {
    render(<GlowingBorder><p>Card content</p></GlowingBorder>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("inner container uses bg-background", () => {
    const { container } = render(<GlowingBorder>Content</GlowingBorder>);
    const inner = container.querySelector(".bg-background");
    expect(inner).toBeInTheDocument();
  });

  it("applies custom className and innerClassName", () => {
    const { container } = render(
      <GlowingBorder className="mt-4" innerClassName="p-8">
        Content
      </GlowingBorder>
    );
    expect(container.firstElementChild!.className).toContain("mt-4");
    expect(container.querySelector(".p-8")).toBeInTheDocument();
  });

  it("shows gradient on mouse enter and hides on mouse leave", () => {
    const { container } = render(<GlowingBorder>Content</GlowingBorder>);
    const outer = container.firstElementChild!;

    // Before hover: uses glass-border
    expect(outer.getAttribute("style")).toContain("var(--glass-border)");

    // Simulate mouse enter
    fireEvent.mouseEnter(outer);
    fireEvent.mouseMove(outer, { clientX: 100, clientY: 100 });
    expect(outer.getAttribute("style")).toContain("radial-gradient");

    // Simulate mouse leave
    fireEvent.mouseLeave(outer);
    expect(outer.getAttribute("style")).toContain("var(--glass-border)");
  });
});
