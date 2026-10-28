import { describe, expect, it, vi } from "vite-plus/test";
import { holdPageBehind } from "./hold-page-behind";

describe("holdPageBehind", () => {
  it("pins the page where the reader left it, then returns them there", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(240);
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { style } = document.body;

    const release = holdPageBehind();

    expect(style.position).toBe("fixed");
    expect(style.top).toBe("-240px");

    release();

    expect(style.position).toBe("");
    expect(style.top).toBe("");
    expect(scrollTo).toHaveBeenCalledWith({ top: 240, behavior: "instant" });
  });
});
