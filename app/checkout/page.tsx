"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  function complete() {
    localStorage.setItem("premium", "true");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-3xl bg-white/5 border border-white/10 p-8">
        <h1 className="text-4xl font-black mb-6">
          Secure Checkout
        </h1>

        <div className="space-y-4 mb-8">
          <input
            placeholder="Cardholder Name"
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <input
            placeholder="Card Number"
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="MM/YY"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
            />

            <input
              placeholder="CVC"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
            />
          </div>
        </div>

        <button
          onClick={complete}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
        >
          Complete Purchase
        </button>
      </div>
    </main>
  );
}
