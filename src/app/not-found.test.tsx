import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("names the problem as the only heading", () => {
    render(<NotFound />);

    expect(screen.getAllByRole("heading")).toEqual([
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ]);
  });

  it("offers exactly one way out, a real link back to the product", () => {
    render(<NotFound />);

    const link = screen.getByRole("link");
    expect(link).toHaveAccessibleName("Back to the sneakers");
    expect(link).toHaveAttribute("href", "/");
  });

  it("carries its own title and drops the home canonical", () => {
    expect(metadata.title).toBe("sneakers | Page not found");
    expect(metadata.alternates).toEqual({ canonical: null });
  });
});
