"use client";

import {
  Suspense,
  useMemo,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getPlan,
} from "@/lib/checkout";

import {
  startMembership,
} from "@/lib/subscription";

function CheckoutContent() {
  const params =
    useSearchParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const rawPlan =
    params.get("plan");

  const data = useMemo(
    () =>
      getPlan(rawPlan),
    [rawPlan]
  );

  function completePurchase() {
    setLoading(true);

    setTimeout(() => {
      startMembership(
        data.id
      );

      router.push(
        "/checkout/success"
      );
    }, 1200);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <section className="soft-card p-8">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
            Secure Checkout
          </p>

          <h1 className="text-5xl mb-4">
            {data.name} Membership
          </h1>

          <p className="text-[#7b6870] text-lg mb-8">
            {data.description}
          </p>

          <div className="text-6xl mb-2">
            €{data.price}
          </div>

          <p className="text-[#7b6870] mb-8">
            {
              data.monthlyEquivalent
            }
          </p>

          <div className="space-y-4">
            {data.features.map(
              (item) => (
                <div
                  key={item}
                  className="p-4 rounded-2xl bg-white border border-[#f0e3e8]"
                >
                  ✓ {item}
                </div>
              )
            )}
          </div>
        </section>

        {/* RIGHT */}
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            Payment Details
          </h2>

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

          <button
            onClick={
              completePurchase
            }
            disabled={loading}
            className="btn-primary w-full mt-8 disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : `Complete Purchase €${data.price}`}
          </button>

          <p className="text-sm text-[#7b6870] mt-4 text-center">
            30-Day Happiness Guarantee
          </p>

          <div className="mt-8 p-5 rounded-3xl bg-[#fff4f7]">
            ⭐⭐⭐⭐⭐ “I finally feel in control again.”
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
