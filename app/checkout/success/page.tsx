"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [plan, setPlan] = useState("Glow");

  useEffect(() => {
    const saved =
      localStorage.getItem("plan") || "glow";

    setPlan(
      saved === "elite"
        ? "Elite"
        : "Glow"
    );
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <section className="soft-card p-10 text-center mb-8">
        <div className="text-7xl mb-6">
          ✨
        </div>

        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Purchase Confirmed
        </p>

        <h1 className="text-6xl mb-5">
          Welcome to {plan}
        </h1>

        <p className="text-[#7b6870] text-xl max-w-2xl mx-auto leading-relaxed">
          Your premium membership is active.
          Today is the first step toward more
          comfort, confidence and feminine energy.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          "Your personalized dashboard is ready",
          "Daily guided sessions unlocked",
          "Progress tracking activated",
        ].map((item) => (
          <div
            key={item}
            className="soft-card p-6 text-center"
          >
            ✓ {item}
          </div>
        ))}
      </section>

      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-5">
          Start Day 1 Now
        </h2>

        <p className="text-[#7b6870] text-lg mb-8">
          We prepared your first premium session.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard"
            className="btn-primary"
          >
            Open Dashboard
          </Link>

          <Link
            href="/session"
            className="btn-outline"
          >
            Start Guided Session
          </Link>
        </div>
      </section>
    </main>
  );
}
