"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name"));
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    if (!name || !email) return toast.error("সব তথ্য দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) return toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");
    router.push("/signin");
  }

  const social = (provider: "google" | "github") =>
    authClient.signIn.social({ provider, callbackURL: "/" });

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">সাইন আপ</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" placeholder="নাম" className="w-full rounded-lg border px-3 py-2" />
          <input name="email" type="email" placeholder="ইমেইল" className="w-full rounded-lg border px-3 py-2" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="w-full rounded-lg border px-3 py-2" />
          <button disabled={loading} className="w-full rounded-lg bg-green-700 py-2 text-white disabled:opacity-60">
            {loading ? "অপেক্ষা করুন..." : "রেজিস্টার"}
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button onClick={() => social("google")} className="w-full rounded-lg border py-2">Google দিয়ে সাইন আপ</button>
          <button onClick={() => social("github")} className="w-full rounded-lg border py-2">GitHub দিয়ে সাইন আপ</button>
        </div>
        <p className="mt-4 text-center text-sm">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-700 underline">সাইন ইন করুন</Link>
        </p>
      </div>
    </main>
  );
}