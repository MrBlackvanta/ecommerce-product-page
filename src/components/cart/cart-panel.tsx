import { DeleteIcon } from "@/components/icons";
import { findProduct } from "@/data";
import { formatPrice } from "@/lib";
import { useId, useRef } from "react";
import { useCart } from "./cart-provider";

type CartPanelProps = {
  id: string;
  open: boolean;
};

export default function CartPanel({ id, open }: CartPanelProps) {
  const { lines, remove } = useCart();
  const panel = useRef<HTMLElement>(null);
  const headingId = useId();

  const items = lines.flatMap((line) => {
    const product = findProduct(line.id);
    return product ? [{ ...line, product }] : [];
  });

  const removeLine = (lineId: string) => {
    panel.current?.focus();
    remove(lineId);
  };

  return (
    <section
      ref={panel}
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={`absolute inset-x-1.5 top-19 z-10 mx-auto flex min-h-64 max-w-90 flex-col rounded-card bg-white shadow-cart outline-none motion-safe:transition-[opacity,visibility] md:top-23.5 md:right-20 md:left-auto md:w-90 lg:right-[max(3rem,50%-39.4375rem)] ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <h2 id={headingId} className="p-6 text-body font-bold">
        Cart
      </h2>

      <div className="flex flex-1 flex-col border-t border-line p-6">
        {items.length === 0 ? (
          <p className="m-auto text-body font-bold text-muted">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul>
              {items.map(({ id: lineId, quantity, product }) => (
                <li key={lineId} className="flex items-center gap-4">
                  <img
                    src={product.thumbnail.src}
                    alt=""
                    width={50}
                    height={50}
                    className="size-12.5 rounded-sm"
                  />
                  <div className="min-w-0 flex-1 text-body text-muted">
                    <p>{product.name}</p>
                    <p className="flex flex-wrap gap-x-2">
                      <span>
                        {formatPrice(product.price)}{" "}
                        <span aria-hidden="true">x</span>
                        <span className="sr-only">times</span> {quantity}
                      </span>
                      <span className="font-bold text-ink">
                        <span className="sr-only">Total: </span>
                        {formatPrice(product.price * quantity)}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeLine(lineId)}
                    className="-m-2 flex p-2 text-faint v-focus hover:text-ink motion-safe:transition-[color]"
                  >
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-6 flex h-14 items-center justify-center rounded-card bg-accent text-body font-bold v-focus hover:bg-accent-hover motion-safe:transition-[background-color]"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </section>
  );
}
