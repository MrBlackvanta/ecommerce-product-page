import { MinusIcon, PlusIcon } from "@/components/icons";
import { MAX_QUANTITY } from "@/lib";

const step =
  "flex h-14 items-center rounded-card px-4.5 text-accent-strong focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink not-aria-disabled:hover:text-accent-hover aria-disabled:cursor-not-allowed aria-disabled:opacity-50 motion-safe:transition-[color] md:px-7 lg:px-3.5";

type QuantityStepperProps = {
  value: number;
  onChange: (update: (current: number) => number) => void;
};

export default function QuantityStepper({
  value,
  onChange,
}: QuantityStepperProps) {
  const atMin = value <= 0;
  const atMax = value >= MAX_QUANTITY;

  return (
    <fieldset className="flex items-center justify-between rounded-card bg-surface md:flex-1 lg:w-39.25 lg:flex-none">
      <legend className="sr-only">Quantity</legend>
      <button
        type="button"
        aria-label="Decrease quantity"
        aria-disabled={atMin || undefined}
        onClick={() => onChange((current) => Math.max(current - 1, 0))}
        className={step}
      >
        <MinusIcon />
      </button>
      <span aria-live="polite" className="text-body font-bold">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        aria-disabled={atMax || undefined}
        onClick={() =>
          onChange((current) => Math.min(current + 1, MAX_QUANTITY))
        }
        className={step}
      >
        <PlusIcon />
      </button>
    </fieldset>
  );
}
