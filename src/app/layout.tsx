import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 text-gray-900">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>

        {children}

        <Footer />

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}