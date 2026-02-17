import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });
}
