import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input, Textarea } from "./Input";

describe("Input", () => {
  it("renders with a label", () => {
    render(<Input label="Name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label moves to top position on focus", () => {
    render(<Input label="Email" />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Email");

    expect(label.className).toContain("top-4");

    fireEvent.focus(input);
    expect(label.className).toContain("top-2");
    expect(label.className).toContain("text-accent-text");
  });

  it("label stays at top when input has value after blur", () => {
    render(<Input label="Email" />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.blur(input);

    const label = screen.getByText("Email");
    expect(label.className).toContain("top-2");
  });

  it("applies glow classes on focus when glow=true (default)", () => {
    render(<Input label="Name" />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(input.className).toContain("border-accent/50");
  });

  it("forwards onFocus/onBlur/onChange callbacks", () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onChange = vi.fn();

    render(<Input label="Name" onFocus={onFocus} onBlur={onBlur} onChange={onChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});

describe("Textarea", () => {
  it("renders with a label", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label moves to top position on focus", () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    const label = screen.getByText("Message");

    fireEvent.focus(textarea);
    expect(label.className).toContain("top-2");
    expect(label.className).toContain("text-accent-text");
  });

  it("has min-height and resize-none classes", () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("min-h-[120px]");
    expect(textarea.className).toContain("resize-none");
  });
});
