import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";

function Section({ id, title, sub, items }: { id?: string; title: string; sub?: string; items: Product[] }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      {sub && <p className="mb-4 text-gray-500">{sub}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export default async function Home() {
  const products = await getProducts();
  const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <main>
      <Ticker products={products} />
      <Hero />
      <Section title="আজ দাম বেড়েছে ▲" items={risers} />
      <Section title="আজ দাম কমেছে ▼" items={fallers} />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        sub="বাজারের সব পণ্যের আজকের দাম"
        items={products}
      />
    </main>
  );
}