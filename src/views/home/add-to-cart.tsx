"use client";

import { useCart } from "@/components/cart";
import { CartIcon } from "@/components/icons";
import { useState } from "react";
import QuantityStepper from "./quantity-stepper";

type AddToCartProps = {
  productId: string;
  productName: string;
};

export default function AddToCart({ productId, productName }: AddToCartProps) {
  const { lines, add } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [adds, setAdds] = useState(0);
  const inCart = lines.find((line) => line.id === productId)?.quantity ?? 0;

  const addToCart = () => {
    add(productId, quantity);
    setAdds((count) => count + 1);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 md:mt-6 md:flex-row md:gap-2 lg:mt-8 lg:gap-4">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <button
        type="button"
        disabled={quantity === 0}
        onClick={addToCart}
        className="flex h-14 items-center justify-center gap-4 rounded-card bg-accent text-body font-bold shadow-cta v-focus enabled:hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-[background-color] md:flex-1"
      >
        <CartIcon className="h-4 w-auto" />
        Add to cart
      </button>
      <output className="sr-only">
        {adds > 0 && (
          <span key={adds}>
            {productName}: {inCart} in your cart.
          </span>
        )}
      </output>
    </div>
  );
}
