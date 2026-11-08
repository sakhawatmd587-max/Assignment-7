import Link from "next/link";
import { Product } from "@/types/product";
import { taka } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="text-4xl">{p.emoji}</div>
      <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
      <p className="text-sm text-gray-500">{p.unit}</p>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-bold text-green-700">{taka(p.price)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}