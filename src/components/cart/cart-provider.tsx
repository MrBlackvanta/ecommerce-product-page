"use client";

import { type CartLine, cartReducer } from "@/lib";
import { createContext, type ReactNode, use, useReducer } from "react";

const CartContext = createContext<{
  lines: CartLine[];
  add: (id: string, quantity: number) => void;
  remove: (id: string) => void;
} | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext
      value={{
        lines,
        add: (id, quantity) => dispatch({ type: "add", id, quantity }),
        remove: (id) => dispatch({ type: "remove", id }),
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const cart = use(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within CartProvider");
  }

  return cart;
}
