import { CartProvider } from "@/components/cart";
import { MAX_QUANTITY } from "@/lib";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import AddToCart from "./add-to-cart";

function renderAddToCart() {
  render(
    <CartProvider>
      <AddToCart productId="sneakers" productName="Fall Sneakers" />
    </CartProvider>,
  );

  return {
    user: userEvent.setup(),
    minus: screen.getByRole("button", { name: "Decrease quantity" }),
    plus: screen.getByRole("button", { name: "Increase quantity" }),
    add: screen.getByRole("button", { name: "Add to cart" }),
    quantity: screen.getByRole("group", { name: "Quantity" }),
    status: screen.getByRole("status"),
  };
}

describe("AddToCart", () => {
  it("starts at zero with nothing to add", () => {
    const { minus, add, quantity } = renderAddToCart();

    expect(quantity).toHaveTextContent("0");
    expect(minus).toHaveAttribute("aria-disabled", "true");
    expect(add).toBeDisabled();
  });

  it("keeps the decrease button focusable at zero and ignores it", async () => {
    const { user, minus, quantity } = renderAddToCart();

    await user.click(minus);

    expect(minus).toHaveFocus();
    expect(quantity).toHaveTextContent("0");
  });

  it("counts every click when they land in the same tick", () => {
    const { plus, minus, quantity } = renderAddToCart();

    act(() => {
      plus.click();
      plus.click();
      plus.click();
      plus.click();
      minus.click();
    });

    expect(quantity).toHaveTextContent("3");
  });

  it("adds the chosen quantity, keeps it, and announces the cart", async () => {
    const { user, plus, add, quantity, status } = renderAddToCart();

    await user.click(plus);
    await user.click(plus);
    await user.click(plus);
    await user.click(add);

    expect(quantity).toHaveTextContent("3");
    expect(status).toHaveTextContent("Fall Sneakers: 3 in your cart.");

    await user.click(add);

    expect(status).toHaveTextContent("Fall Sneakers: 6 in your cart.");
  });

  it("disables adding again once the quantity is back to zero", async () => {
    const { user, plus, minus, add } = renderAddToCart();

    await user.click(plus);
    expect(add).toBeEnabled();

    await user.click(minus);
    expect(add).toBeDisabled();
    expect(minus).toHaveAttribute("aria-disabled", "true");
  });

  it("stops increasing at the maximum", () => {
    const { plus, quantity } = renderAddToCart();

    act(() => {
      for (let click = 0; click <= MAX_QUANTITY; click++) plus.click();
    });

    expect(quantity).toHaveTextContent(String(MAX_QUANTITY));
    expect(plus).toHaveAttribute("aria-disabled", "true");
  });
});
