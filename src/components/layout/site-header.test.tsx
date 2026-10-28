import { CartProvider } from "@/components/cart";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import SiteHeader from "./site-header";

describe("SiteHeader", () => {
  it("links the logo home under the store's name", () => {
    render(<SiteHeader />, { wrapper: CartProvider });

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "sneakers, home" }),
    ).toHaveAttribute("href", "/");
  });

  it("offers the menu, the cart and the account", () => {
    render(<SiteHeader />, { wrapper: CartProvider });

    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cart" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Your account" }),
    ).toBeInTheDocument();
  });
});
