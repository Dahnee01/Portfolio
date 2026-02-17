import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders title with semantic text class", () => {
    render(<SectionHeading title="Skills" />);
    const heading = screen.getByText("Skills", { exact: false });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("text-text-primary");
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Skills" subtitle="My tools" />);
    const subtitle = screen.getByText("My tools");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.className).toContain("text-text-secondary");
  });

  it("omits subtitle paragraph when not provided", () => {
    const { container } = render(<SectionHeading title="Skills" />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("appends a gradient dot after the title", () => {
    render(<SectionHeading title="Test" />);
    const dot = screen.getByText(".");
    expect(dot.className).toContain("text-gradient");
  });

  it("defaults to center alignment", () => {
    const { container } = render(<SectionHeading title="Centered" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toContain("text-center");
  });

  it("supports left alignment", () => {
    const { container } = render(<SectionHeading title="Left" align="left" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).not.toContain("text-center");
  });
});
