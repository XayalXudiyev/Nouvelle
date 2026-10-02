export function formatPrice(n: number) {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");
  return `${s} ₼`;
}

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}
