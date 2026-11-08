import { pct } from "@/lib/format";

export default function ChangeBadge({ change }: { change: number }) {
  const color =
    change > 0 ? "bg-green-100 text-green-700"
      : change < 0 ? "bg-red-100 text-red-600"
        : "bg-gray-100 text-gray-600";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      {pct(change)}
    </span>
  );
}