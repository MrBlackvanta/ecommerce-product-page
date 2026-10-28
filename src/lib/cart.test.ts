import { describe, expect, it } from "vite-plus/test";
import {
  type CartAction,
  type CartLine,
  cartReducer,
  MAX_QUANTITY,
} from "./cart";

const sneakers = "sneakers";
const boots = "boots";

describe("cartReducer", () => {
  it.each<[string, CartLine[], CartAction, CartLine[]]>([
    [
      "adds a new line",
      [],
      { type: "add", id: sneakers, quantity: 3 },
      [{ id: sneakers, quantity: 3 }],
    ],
    [
      "tops up a line already in the cart",
      [{ id: sneakers, quantity: 3 }],
      { type: "add", id: sneakers, quantity: 2 },
      [{ id: sneakers, quantity: 5 }],
    ],
    [
      "leaves other lines alone",
      [
        { id: boots, quantity: 1 },
        { id: sneakers, quantity: 1 },
      ],
      { type: "add", id: sneakers, quantity: 1 },
      [
        { id: boots, quantity: 1 },
        { id: sneakers, quantity: 2 },
      ],
    ],
    [
      "caps a line at the maximum",
      [{ id: sneakers, quantity: MAX_QUANTITY - 1 }],
      { type: "add", id: sneakers, quantity: 5 },
      [{ id: sneakers, quantity: MAX_QUANTITY }],
    ],
    [
      "caps a new line at the maximum",
      [],
      { type: "add", id: sneakers, quantity: MAX_QUANTITY + 1 },
      [{ id: sneakers, quantity: MAX_QUANTITY }],
    ],
    [
      "removes a line",
      [
        { id: boots, quantity: 1 },
        { id: sneakers, quantity: 3 },
      ],
      { type: "remove", id: sneakers },
      [{ id: boots, quantity: 1 }],
    ],
  ])("%s", (_, lines, action, expected) => {
    expect(cartReducer(lines, action)).toEqual(expected);
  });

  it.each([0, -2])("returns the same cart when adding %i", (quantity) => {
    const lines = [{ id: sneakers, quantity: 3 }];

    expect(cartReducer(lines, { type: "add", id: sneakers, quantity })).toBe(
      lines,
    );
  });
});
