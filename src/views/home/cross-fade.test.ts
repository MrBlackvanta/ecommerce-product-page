import { installMatchMedia } from "@/test/media";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { crossFade } from "./cross-fade";

function supportViewTransitions() {
  const startViewTransition = vi.fn((update: () => void) => {
    update();
    return {} as ViewTransition;
  });
  Object.defineProperty(document, "startViewTransition", {
    value: startViewTransition,
    configurable: true,
  });
  return startViewTransition;
}

describe("crossFade", () => {
  afterEach(() => {
    Reflect.deleteProperty(document, "startViewTransition");
  });

  it("swaps straight away where view transitions are missing", () => {
    const update = vi.fn();

    crossFade(update);

    expect(update).toHaveBeenCalledOnce();
  });

  it("runs the swap inside a view transition", () => {
    const startViewTransition = supportViewTransitions();
    const update = vi.fn();

    crossFade(update);

    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledOnce();
  });

  it("skips the transition when reduced motion is asked for", () => {
    installMatchMedia(["(prefers-reduced-motion: reduce)"]);
    const startViewTransition = supportViewTransitions();
    const update = vi.fn();

    crossFade(update);

    expect(startViewTransition).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalledOnce();
  });
});
