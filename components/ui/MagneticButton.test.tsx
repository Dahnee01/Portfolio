import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MagneticButton } from "./MagneticButton";

describe("MagneticButton", () => {
  it("renders children", () => {
    render(<MagneticButton><button>Click me</button></MagneticButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies inline-block class", () => {
    const { container } = render(
      <MagneticButton>
        <span>Wrapped</span>
      </MagneticButton>
    );
    expect(container.firstElementChild!.className).toContain("inline-block");
  });

  it("merges custom className", () => {
    const { container } = render(
      <MagneticButton className="mt-4">
        <span>Styled</span>
      </MagneticButton>
    );
    expect(container.firstElementChild!.className).toContain("mt-4");
  });
});
