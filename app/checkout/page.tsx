"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react"; // Dodaj Suspense ovde
import { useRouter } from "next/navigation";

// 1. Napravi novu komponentu za sadržaj čekauda
function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();

  const plan = params.get("plan") || "glow";

  const data = useMemo(() => {
    if (plan === "elite") {
      return {
        name: "Elite",
        price: "€79",
        days: "90 Days",
        desc: "Full premium transformation with advanced systems.",
      };
    }

    return {
      name: "Glow",
      price: "€29",
      days: "30 Days",
      desc: "Elegant reset for sleep, confidence and comfort.",
    };
  }, [plan]);

  function fakePurchase() {
    localStorage.setItem("premium", "true");
    localStorage.setItem("plan", plan);
    localStorage.setItem("day", "1");

    router.push("/dashboard");
  }

  // Sav tvoj HTML ide ovde
  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <section className="soft-card p-8">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
            Secure Checkout
          </p>
          <h1 className="text-5xl mb-4">{data.name} Membership</h1>
          <p className="text-[#7b6870] text-lg mb-8">{data.desc}</p>
          <div className="text-6xl mb-8">{data.price}</div>
          <div className="space-y-4">
            {[
              data.days + " Access",
              "Daily guided sessions",
              "Premium dashboard",
              "Instant access today",
              "Mobile friendly",
            ].map((item) => (
              <div
                key={item}
                className="p-4 rounded-2xl bg-white border border-[#f0e3e8]"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">Payment Details</h2>
          <div className="space-y-5">
            <input
              placeholder="Full Name"
              className="w-full p-4 rounded-2xl border border-[#ead8de] bg-white"
            />
            <input
              placeholder="Email"
              className="w-full p-4 rounded-2xl border border-[#ead8de] bg-white"
            />
            <input
              placeholder="Card Number"
              className="w-full p-4 rounded-2xl border border-[#ead8de] bg-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM/YY"
                className="w-full p-4 rounded-2xl border border-[#ead8de] bg-white"
              />
              <input
                placeholder="CVC"
                className="w-full p-4 rounded-2xl border border-[#ead8de] bg-white"
              />
            </div>
          </div>
          <button onClick={fakePurchase} className="btn-primary w-full mt-8">
            Complete Purchase {data.price}
          </button>
          <p className="text-sm text-[#7b6870] mt-4 text-center">
            30-Day Happiness Guarantee
          </p>
          <div className="mt-8 p-5 rounded-3xl bg-[#fff4f7]">
            ⭐⭐⭐⭐⭐ “I feel like myself again.”
          </div>
        </section>
      </div>
    </main>
  );
}

// 2. Glavna eksportovana funkcija koja samo umotava sadržaj u Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
