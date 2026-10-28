"use client";

import { CartIcon } from "@/components/icons";
import { useEffect, useId, useRef, useState } from "react";
import CartPanel from "./cart-panel";
import { useCart } from "./cart-provider";

function cartLabel(count: number) {
  if (count === 0) return "Cart";
  return `Cart, ${count} ${count === 1 ? "item" : "items"}`;
}

export default function CartMenu() {
  const { lines } = useCart();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const count = lines.reduce((total, line) => total + line.quantity, 0);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menu.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menu.current?.contains(document.activeElement)) {
        trigger.current?.focus();
      }
      setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeOnFocusLeaving = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next && !event.currentTarget.contains(next)) setOpen(false);
  };

  return (
    <div ref={menu} onBlur={closeOnFocusLeaving} className="flex">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={cartLabel(count)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative -m-2 flex p-2 text-muted v-focus hover:text-ink aria-expanded:text-ink motion-safe:transition-[color]"
      >
        <CartIcon />
        {count > 0 && (
          <span
            aria-hidden="true"
            style={{ "--count": count } as React.CSSProperties}
            className="absolute top-1 left-4.25 min-w-4.75 v-count rounded-full bg-accent px-1.5 text-center text-badge/3.25 text-ink md:top-0.5"
          />
        )}
      </button>

      <CartPanel id={panelId} open={open} />
    </div>
  );
}
