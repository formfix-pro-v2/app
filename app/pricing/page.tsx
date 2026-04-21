"use client";

import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      desc: "Basic mobility plans + dashboard",
      cta: "Start Now",
    },
    {
      name: "Pro",
      price: "$19",
      desc: "AI plans + posture recovery + tracking",
      cta: "Most Popular",
      featured: true,
    },
    {
      name: "Elite",
      price: "$39",
      desc: "Everything + private coaching roadmap",
      cta: "Go Elite",
    },
  ];

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-6">
          Choose Your Recovery Plan
        </h1>

        <p className="text-center text-zinc-400 mb-16">
          Cancel anytime. Upgrade anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 border ${
                plan.featured
                  ? "border-blue-400 bg-blue-500/10 scale-105"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">{plan.name}</h2>

              <p className="text-5xl font-black mb-6">{plan.price}</p>

              <p className="text-zinc-300 mb-8">{plan.desc}</p>

              <Link
                href="/checkout"
                className="block text-center p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
