export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

export const taka = (n: number) => `${toBn(n)} টাকা`;

export const pct = (c: number) =>
  `${c > 0 ? "▲" : c < 0 ? "▼" : "–"}${toBn(Math.abs(c).toFixed(1))}%`;