import { Product } from "@/types/product";
import { taka, pct } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  const items = [...products, ...products];
  return (
    <div className="overflow-hidden border-b bg-green-900 py-2 text-sm text-white">
      <div className="marquee flex w-max gap-8 whitespace-nowrap">
        {items.map((p, i) => (
          <span key={i}>
            {p.emoji} {p.name} {taka(p.price)}/{p.unit.replace("প্রতি ", "")}{" "}
            <span className={p.change > 0 ? "text-green-300" : p.change < 0 ? "text-red-300" : ""}>
              {pct(p.change)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}