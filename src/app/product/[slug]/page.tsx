import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { taka } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";



export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const { slug } = await params;
  const products = await getProducts(slug);
  const p = products[0];
  if (!p) notFound();

  const stats = [
    { label: "সর্বনিম্ন দাম", value: p.min },
    { label: "সর্বোচ্চ দাম", value: p.max },
    { label: "গড় দাম", value: p.avg },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-6xl">{p.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold">{p.name}</h1>
            <p className="text-gray-500">{p.description}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">{p.category}</span>
          <span className="rounded-full bg-gray-100 px-3 py-1">{p.unit}</span>
          <ChangeBadge change={p.change} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-green-700">{taka(s.value)}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {p.markets.length === 0 ? (
            <p className="p-4 text-gray-500">বাজারভিত্তিক তথ্য নেই</p>
          ) : (
            p.markets.map((m) => (
              <div key={m.name} className="flex justify-between border-b p-4 last:border-0">
                <span>{m.name}</span>
                <span className="font-semibold">{taka(m.price)}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}