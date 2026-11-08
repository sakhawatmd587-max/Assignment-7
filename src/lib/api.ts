import { Product, Market } from "@/types/product";

const BASE = process.env.NEXT_PUBLIC_API_URL;



function normalize(p: any): Product {
  const markets = p.markets ?? [];

  const prices: number[] = markets
    .map((m: any) => Number(m.price))
    .filter((price: number) => !Number.isNaN(price));

  const price = Number(p.today ?? p.price ?? 0);

  return {
    id: String(p.id ?? p._id ?? p.slug),

    slug: String(p.slug ?? p.id ?? p._id),

    name: p.nameBn ?? p.name ?? p.title ?? "",

    emoji: p.categoryIcon ?? p.emoji ?? p.icon ?? "🛒",

    unit: p.unit ?? "প্রতি কেজি",

    category: p.categoryNameBn ?? p.category ?? "",

    price,

    change: Number(
      p.change?.pct ??
      p.changePercent ??
      p.change ??
      0
    ),

    description: p.description ?? p.summary ?? "",

    min: Number(
      p.min ??
      (prices.length
        ? Math.min(...prices)
        : price)
    ),

    max: Number(
      p.max ??
      (prices.length
        ? Math.max(...prices)
        : price)
    ),

    avg: Number(
      p.avg ??
      (prices.length
        ? Math.round(
          prices.reduce((a, b) => a + b, 0) /
          prices.length
        )
        : price)
    ),

    markets: markets.map((m: any) => ({
      name: m.name ?? m.bazar ?? m.marketName ?? "",
      price: Number(m.price ?? m.today ?? 0),
    })),
  };
}

export async function getProducts(
  category?: string
): Promise<Product[]> {
  const url = category
    ? `${BASE}/products?category=${category}`
    : `${BASE}/products`;

  const res = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error("ডাটা আনা যায়নি");
  }

  const json = await res.json();

  // console.log("API Response:", json);

  const list = Array.isArray(json)
    ? json
    : json.data ?? json.products ?? [];

  console.log(
    "FIRST PRODUCT:",
    JSON.stringify(list[0], null, 2)
  );
  return list.map(normalize);
}

