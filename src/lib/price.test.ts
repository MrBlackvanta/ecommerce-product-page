import { describe, expect, it } from "vite-plus/test";
import { discountPercent, formatPrice } from "./price";

describe("formatPrice", () => {
  it.each([
    [125, "$125.00"],
    [375, "$375.00"],
    [0, "$0.00"],
    [12375, "$12,375.00"],
    [19.5, "$19.50"],
  ])("formats %d as %s", (amount, expected) => {
    expect(formatPrice(amount)).toBe(expected);
  });
});

describe("discountPercent", () => {
  it.each([
    [125, 250, 50],
    [75, 100, 25],
    [200, 300, 33],
    [100, 100, 0],
  ])("%d down from %d is %d%% off", (price, originalPrice, expected) => {
    expect(discountPercent(price, originalPrice)).toBe(expected);
  });
});
