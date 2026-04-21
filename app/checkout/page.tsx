"use client";

import { useRouter } from "next/navigation";
import { setPremium } from "@/lib/storage";

export default function CheckoutPage() {
  const router = useRouter();

  function buy() {
    setPremium(true);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full p-8 rounded-3xl bg-white/5 border border-white/10">
        <h1 className="text-4xl font-black mb-6">
          Upgrade to Premium
        </h1>

        <p className="text-zinc-300 mb-8">
          Unlock all recovery programs and advanced coaching.
        </p>

        <button
          onClick={buy}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
        >
          Pay Now
        </button>
      </div>
    </main>
  );
}
