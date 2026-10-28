import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import NavLinks from "./nav-links";

describe("NavLinks", () => {
  it("lists the five store sections in design order", () => {
    render(<NavLinks variant="header" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual([
      "Collections",
      "Men",
      "Women",
      "About",
      "Contact",
    ]);
  });

  it("reports a followed link so the menu can close", async () => {
    const onNavigate = vi.fn();
    render(<NavLinks variant="menu" onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole("link", { name: "Women" }));

    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
