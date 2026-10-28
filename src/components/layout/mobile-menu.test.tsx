import { setMediaMatch } from "@/test/media";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import MobileMenu from "./mobile-menu";

const DESKTOP = "(min-width: 64rem)";

async function openMenu() {
  const user = userEvent.setup();
  render(<MobileMenu />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  const panel = screen.getByRole("dialog", { name: "Menu" });

  await user.click(toggle);
  await waitFor(() => expect(panel).toHaveFocus());

  return { user, toggle, panel, backdrop: panel.parentElement as HTMLElement };
}

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("starts closed and out of reach", () => {
    render(<MobileMenu />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    const panel = screen.getByRole("dialog", { name: "Menu" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", panel.id);
    expect(panel.parentElement).toHaveAttribute("inert");
  });

  it("opens as a modal holding the five store sections", async () => {
    const { toggle, panel } = await openMenu();

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("aria-modal", "true");
    expect(panel.parentElement).not.toHaveAttribute("inert");
    expect(within(panel).getAllByRole("link")).toHaveLength(5);
  });

  it("holds the page still behind it and releases it on close", async () => {
    const { user, toggle } = await openMenu();

    expect(document.body.style.position).toBe("fixed");

    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.position).toBe("");
    expect(toggle).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const { user, toggle } = await openMenu();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the scrim beside the panel is clicked", async () => {
    const { user, toggle, backdrop } = await openMenu();

    await user.click(backdrop);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("stays open when the panel itself is clicked", async () => {
    const { user, toggle, panel } = await openMenu();

    await user.click(panel);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("closes once a section link is followed", async () => {
    const { user, toggle } = await openMenu();

    await user.click(screen.getByRole("link", { name: "About" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps Tab cycling inside the panel in both directions", async () => {
    const { user, panel } = await openMenu();
    const close = within(panel).getByRole("button", { name: "Close menu" });
    const contact = within(panel).getByRole("link", { name: "Contact" });

    await user.tab({ shift: true });
    expect(contact).toHaveFocus();

    await user.tab();
    expect(close).toHaveFocus();

    await user.tab({ shift: true });
    expect(contact).toHaveFocus();
  });

  it("closes when the viewport grows into the desktop header", async () => {
    const { toggle } = await openMenu();

    setMediaMatch(DESKTOP, true);

    await waitFor(() =>
      expect(toggle).toHaveAttribute("aria-expanded", "false"),
    );
    expect(document.body.style.position).toBe("");
  });
});
