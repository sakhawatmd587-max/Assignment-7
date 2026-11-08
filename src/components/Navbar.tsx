"use client";
import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
 
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(today);
  }, []);

  const logout = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
  <Suspense fallback={<div>Loading...</div>}>
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/">
            <div className="text-xl font-bold text-green-700">🧺 বাজার দর</div>
            <div className="text-xs text-gray-500" suppressHydrationWarning>
              {date}
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            ) : session ? (
              <>
                <span className="text-sm">{session.user.name}</span>
                <button onClick={logout} className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white">
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="rounded-lg border border-green-700 px-3 py-1.5 text-sm text-green-700">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="rounded-lg bg-green-700 px-3 py-1.5 text-sm text-white">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
          <Link
            href="/"
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm ${pathname === "/" ? "bg-green-700 text-white" : "bg-gray-100"
              }`}
          >
            সব
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm ${pathname === `/category/${c.slug}` ? "bg-green-700 text-white" : "bg-gray-100"
                }`}
            >
              {c.icon} {c.label}
            </Link>
          ))}
        </nav>
      </header>
    </Suspense>
   
  )
  
}