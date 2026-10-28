import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { useCart } from "./cart-provider";

function Consumer() {
  useCart();
  return null;
}

describe("useCart", () => {
  it("fails loudly outside a CartProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Consumer />)).toThrow(
      "useCart must be used within CartProvider",
    );
  });
});
