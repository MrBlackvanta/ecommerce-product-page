import { product } from "@/data";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import CartMenu from "./cart-menu";
import CartProvider, { useCart } from "./cart-provider";

function AddSneakers({ quantity }: { quantity: number }) {
  const { add } = useCart();

  return (
    <button type="button" onClick={() => add(product.id, quantity)}>
      Add sneakers
    </button>
  );
}

async function renderCartMenu(quantity = 0) {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <CartMenu />
      <a href="/elsewhere">Elsewhere</a>
      <AddSneakers quantity={quantity} />
    </CartProvider>,
  );

  if (quantity > 0) {
    await user.click(screen.getByRole("button", { name: "Add sneakers" }));
  }

  return {
    user,
    trigger: screen.getByRole("button", { name: /^Cart/ }),
    panel: screen.getByRole("region", { name: "Cart" }),
  };
}

describe("CartMenu", () => {
  it("opens and closes from the cart button", async () => {
    const { user, trigger } = await renderCartMenu();

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it.each([
    [1, "Cart, 1 item"],
    [3, "Cart, 3 items"],
  ])("names %i in the cart on the button", async (quantity, name) => {
    const { trigger } = await renderCartMenu(quantity);

    expect(trigger).toHaveAccessibleName(name);
  });

  it("says the cart is empty and offers no checkout", async () => {
    const { user, trigger, panel } = await renderCartMenu();

    await user.click(trigger);

    expect(panel).toHaveTextContent("Your cart is empty.");
    expect(
      screen.queryByRole("button", { name: "Checkout" }),
    ).not.toBeInTheDocument();
  });

  it("lists the line with its unit price, quantity and total", async () => {
    const { user, trigger } = await renderCartMenu(3);

    await user.click(trigger);
    const line = screen.getByRole("listitem");

    expect(line).toHaveTextContent(product.name);
    expect(line).toHaveTextContent("times 3");
    expect(line).toHaveTextContent("Total: $375.00");
    expect(screen.getByRole("button", { name: "Checkout" })).toBeVisible();
  });

  it("removes the line, stays open and moves focus to the panel", async () => {
    const { user, trigger, panel } = await renderCartMenu(3);

    await user.click(trigger);
    await user.click(
      screen.getByRole("button", { name: `Remove ${product.name}` }),
    );

    expect(panel).toHaveTextContent("Your cart is empty.");
    expect(panel).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAccessibleName("Cart");
  });

  it("closes on Escape and hands focus back to the button", async () => {
    const { user, trigger } = await renderCartMenu(3);

    await user.click(trigger);
    await user.tab();
    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("closes when pressing anywhere outside it", async () => {
    const { user, trigger, panel } = await renderCartMenu();

    await user.click(trigger);
    await user.click(panel);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("stays open while focus moves through it and closes once it leaves", async () => {
    const { user, trigger } = await renderCartMenu(3);

    await user.click(trigger);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Checkout" })).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.tab();
    expect(screen.getByRole("link", { name: "Elsewhere" })).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
