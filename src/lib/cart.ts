export const MAX_QUANTITY = 99;

export type CartLine = {
  id: string;
  quantity: number;
};

export type CartAction =
  | { type: "add"; id: string; quantity: number }
  | { type: "remove"; id: string };

export function cartReducer(lines: CartLine[], action: CartAction) {
  switch (action.type) {
    case "add":
      return addLine(lines, action.id, action.quantity);
    case "remove":
      return lines.filter((line) => line.id !== action.id);
  }
}

function addLine(lines: CartLine[], id: string, quantity: number) {
  if (quantity < 1) return lines;

  const current = lines.find((line) => line.id === id);
  if (!current) {
    return [...lines, { id, quantity: Math.min(quantity, MAX_QUANTITY) }];
  }

  return lines.map((line) =>
    line === current
      ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY) }
      : line,
  );
}
