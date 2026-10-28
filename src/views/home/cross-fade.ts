import { flushSync } from "react-dom";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function crossFade(update: () => void) {
  if (
    !("startViewTransition" in document) ||
    window.matchMedia(REDUCED_MOTION).matches
  ) {
    update();
    return;
  }

  document.startViewTransition(() => flushSync(update));
}
