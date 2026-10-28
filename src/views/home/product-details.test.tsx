import { CartProvider } from "@/components/cart";
import { product } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import ProductDetails from "./product-details";

describe("ProductDetails", () => {
  it("names the product as the page heading", () => {
    render(<ProductDetails />, { wrapper: CartProvider });

    expect(
      screen.getByRole("heading", { level: 1, name: product.name }),
    ).toBeInTheDocument();
  });

  it("reads the prices in words, not just figures", () => {
    const { container } = render(<ProductDetails />, {
      wrapper: CartProvider,
    });

    expect(container).toHaveTextContent("Price: $125.00");
    expect(container).toHaveTextContent("50% off");
    expect(container).toHaveTextContent("Original price: $250.00");
  });
});
