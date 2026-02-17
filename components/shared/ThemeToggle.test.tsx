import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent, act } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders a toggle button", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to/i });
    expect(button).toBeInTheDocument();
  });

  it("has accessible aria-label indicating current mode", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button.getAttribute("aria-label")).toMatch(
      /switch to (light|dark) mode/i
    );
  });

  it("switches theme on click", async () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("toggles back to dark on second click", async () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to/i });

    await act(async () => {
      fireEvent.click(button);
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await act(async () => {
      fireEvent.click(button);
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
