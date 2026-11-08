"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message ?? "লগইন ব্যর্থ হয়েছে");
    toast.success("সফলভাবে লগইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  const social = (provider: "google" | "github") =>
    authClient.signIn.social({ provider, callbackURL: "/" });

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">সাইন ইন</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="ইমেইল" className="w-full rounded-lg border px-3 py-2" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="w-full rounded-lg border px-3 py-2" />
          <button disabled={loading} className="w-full rounded-lg bg-green-700 py-2 text-white disabled:opacity-60">
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button onClick={() => social("google")} className="w-full rounded-lg border py-2">Google দিয়ে সাইন ইন</button>
          <button onClick={() => social("github")} className="w-full rounded-lg border py-2">GitHub দিয়ে সাইন ইন</button>
        </div>
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-700 underline">সাইন আপ করুন</Link>
        </p>
      </div>
    </main>
  );
}