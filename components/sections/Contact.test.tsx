import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/lib/test-utils";
import { Contact } from "./Contact";
import { SOCIALS, SITE } from "@/lib/data";

describe("Contact", () => {
  it("renders with section id='contact'", () => {
    const { container } = renderWithTheme(<Contact />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders the heading with gradient text", () => {
    renderWithTheme(<Contact />);
    const gradient = screen.getByText("Together");
    expect(gradient.className).toContain("text-gradient");
  });

  it("renders contact form inputs", () => {
    renderWithTheme(<Contact />);
    // "Email" also appears as a social platform name, so use getAllByRole
    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBe(3); // Name, Email, Message
  });

  it("renders send message button", () => {
    renderWithTheme(<Contact />);
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("renders all social platform links", () => {
    renderWithTheme(<Contact />);
    for (const social of SOCIALS) {
      // Some platform names (e.g., "Email") may match form labels too
      const matches = screen.getAllByText(social.platform);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("social links open in new tab", () => {
    renderWithTheme(<Contact />);
    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders footer with site name", () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText(SITE.name, { exact: false })).toBeInTheDocument();
  });

  it("renders copyright year", () => {
    renderWithTheme(<Contact />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(year))
    ).toBeInTheDocument();
  });
});
