"use client";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";
import { Product } from "@/types/product";

const EMPTY_PRODUCTS: Product[] = [];

export default function CategoryView({slug}: { slug: string }) {
  
  const [result, setResult] = useState<{ slug: string; products: Product[] } | null>(null);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let ignore = false;
    getProducts(slug)
      .then((p) => !ignore && setResult({ slug, products: p }))
      .catch(() => !ignore && setResult({ slug, products: [] }));
    return () => { ignore = true; };
  }, [slug]);

  const loading = result?.slug !== slug;
  const products = result && result.slug === slug ? result.products : EMPTY_PRODUCTS;

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "desc") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [products, sort]);

  const cat = categories.find((c) => c.slug === slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">
          {cat?.icon} {cat?.label ?? slug}
        </h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 text-sm"
        >
          <option value="default">সাজান: ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-6xl">😕</p>
          <p className="mt-4 text-lg">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি (৪০৪)</p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 text-white">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </main>
  );
}