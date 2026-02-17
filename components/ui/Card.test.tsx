import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies glass class by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild!.className).toContain("glass");
  });

  it("omits glass class when glass=false", () => {
    const { container } = render(<Card glass={false}>Content</Card>);
    expect(container.firstElementChild!.className).not.toContain("glass");
  });

  it("adds hover scale when hoverable", () => {
    const { container } = render(<Card hoverable>Content</Card>);
    expect(container.firstElementChild!.className).toContain("hover:scale-[1.03]");
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="mt-4">Content</Card>);
    expect(container.firstElementChild!.className).toContain("mt-4");
  });
});
