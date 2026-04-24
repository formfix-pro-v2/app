"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Plan = "free" | "glow" | "elite";

export default function AccountPage() {
  const [plan, setPlan] =
    useState<Plan>("free");

  const [purchaseDate, setPurchaseDate] =
    useState("");

  const [day, setDay] = useState("1");

  useEffect(() => {
    const savedPlan =
      (localStorage.getItem(
        "plan"
      ) as Plan) || "free";

    const premium =
      localStorage.getItem(
        "premium"
      ) === "true";

    const savedDay =
      localStorage.getItem("day") ||
      "1";

    const savedDate =
      localStorage.getItem(
        "purchaseDate"
      ) || "";

    setPlan(
      premium ? savedPlan : "free"
    );

    setDay(savedDay);
    setPurchaseDate(savedDate);
  }, []);

  const details = useMemo(() => {
    if (plan === "elite") {
      return {
        title: "Elite Member ✨",
        desc:
          "Full premium transformation access.",
        color:
          "bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1] text-white",
      };
    }

    if (plan === "glow") {
      return {
        title: "Glow Member ✨",
        desc:
          "30-day premium wellness access.",
        color:
          "bg-[#fff1f5] text-[#8f5d6f]",
      };
    }

    return {
      title: "Free Account",
      desc:
        "Upgrade anytime to unlock premium features.",
      color:
        "bg-white text-[#7b6870]",
    };
  }, [plan]);

  function logout() {
    localStorage.removeItem("premium");
    localStorage.removeItem("plan");
    localStorage.removeItem("purchaseDate");

    location.reload();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="soft-card p-10 mb-8">
        <div
          className={`inline-block px-5 py-3 rounded-full mb-6 ${details.color}`}
        >
          {details.title}
        </div>

        <h1 className="text-5xl mb-4">
          My Account
        </h1>

        <p className="text-[#7b6870] text-lg">
          {details.desc}
        </p>
      </section>

      {/* INFO */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Current Plan
          </div>

          <div className="text-3xl capitalize">
            {plan}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Current Day
          </div>

          <div className="text-3xl">
            {day}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Joined
          </div>

          <div className="text-lg break-all">
            {purchaseDate
              ? new Date(
                  purchaseDate
                ).toLocaleDateString()
              : "—"}
          </div>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="soft-card p-8 mb-8">
        <h2 className="text-4xl mb-6">
          Manage Membership
        </h2>

        <div className="flex flex-wrap gap-4">
          {plan === "free" && (
            <Link
              href="/pricing"
              className="btn-primary"
            >
              Upgrade Now
            </Link>
          )}

          {plan === "glow" && (
            <Link
              href="/plans/elite"
              className="btn-primary"
            >
              Upgrade to Elite
            </Link>
          )}

          <Link
            href="/dashboard"
            className="btn-outline"
          >
            Open Dashboard
          </Link>

          <button
            onClick={logout}
            className="btn-outline"
          >
            Reset Account
          </button>
        </div>
      </section>

      {/* PREMIUM PERKS */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          "Smart personalized plans",
          "Daily premium sessions",
          "Long-term transformation tracking",
        ].map((item) => (
          <div
            key={item}
            className="soft-card p-6 text-center"
          >
            ✨ {item}
          </div>
        ))}
      </section>
    </main>
  );
}
