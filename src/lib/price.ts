const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(amount: number) {
  return usd.format(amount);
}

export function discountPercent(price: number, originalPrice: number) {
  return Math.round((1 - price / originalPrice) * 100);
}
