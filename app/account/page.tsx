"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [premium, setPremium] = useState(false);
  const [plan, setPlan] = useState("free");
  const [day, setDay] = useState(1);

  useEffect(() => {
    setPremium(localStorage.getItem("premium") === "true");
    setPlan(localStorage.getItem("plan") || "free");
    setDay(Number(localStorage.getItem("day") || "1"));
  }, []);

  function cancelMembership() {
    localStorage.removeItem("premium");
    localStorage.removeItem("plan");
    window.location.reload();
  }

  const currentPlan = premium
    ? plan === "elite"
      ? "Elite"
      : "Glow"
    : "Free";

  const totalDays = premium
    ? plan === "elite"
      ? 90
      : 30
    : 7;

  const progress = Math.min(
    Math.round((day / totalDays) * 100),
    100
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="soft-card p-8 md:p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Account Center
        </p>

        <h1 className="text-5xl md:text-6xl mb-4">
          Membership & Progress
        </h1>

        <p className="text-[#7b6870] text-lg">
          Manage your plan, monitor progress and continue
          your transformation journey.
        </p>
      </section>

      {/* STATUS */}
      <section className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Current Plan
          </div>

          <div className="text-4xl">
            {currentPlan}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Current Day
          </div>

          <div className="text-4xl">
            {day}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Completion
          </div>

          <div className="text-4xl">
            {progress}%
          </div>
        </div>
      </section>

      {/* PROGRESS BAR */}
      <section className="soft-card p-8 mb-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl">
            Program Progress
          </h2>

          <span className="text-[#7b6870]">
            Day {day} / {totalDays}
          </span>
        </div>

        <div className="h-4 bg-white rounded-full overflow-hidden border border-[#f0e3e8]">
          <div
            className="h-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* PREMIUM FEATURES */}
      {premium ? (
        <section className="soft-card p-8 mb-8">
          <h2 className="text-4xl mb-6">
            Premium Benefits Active ✨
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {(plan === "elite"
              ? [
                  "90-Day Full Transformation",
                  "Monthly Reassessments",
                  "VIP Workouts",
                  "Priority Updates",
                  "Advanced Symptom Protocols",
                  "Elite Guided Sessions",
                ]
              : [
                  "30-Day Glow Program",
                  "Premium Guided Sessions",
                  "Weight + Sleep Support",
                  "Smart Daily Plans",
                ]
            ).map((item) => (
              <div
                key={item}
                className="p-4 rounded-2xl bg-white border border-[#f0e3e8]"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="soft-card p-8 mb-8">
          <h2 className="text-4xl mb-4">
            Upgrade Your Journey
          </h2>

          <p className="text-[#7b6870] text-lg mb-8">
            Unlock premium programs for sleep, belly tone,
            mobility, feminine confidence and deeper results.
          </p>

          <Link
            href="/pricing"
            className="btn-primary"
          >
            View Premium Plans
          </Link>
        </section>
      )}

      {/* ACTIONS */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link
          href="/dashboard"
          className="soft-card p-6 text-center"
        >
          <div className="text-2xl mb-2">
            Dashboard
          </div>
          <p className="text-[#7b6870]">
            Continue your plan
          </p>
        </Link>

        <Link
          href="/session"
          className="soft-card p-6 text-center"
        >
          <div className="text-2xl mb-2">
            Guided Session
          </div>
          <p className="text-[#7b6870]">
            Start today’s workout
          </p>
        </Link>

        <div className="soft-card p-6 text-center">
          <div className="text-2xl mb-4">
            Membership
          </div>

          {premium ? (
            <button
              onClick={cancelMembership}
              className="btn-outline"
            >
              Cancel Plan
            </button>
          ) : (
            <Link
              href="/pricing"
              className="btn-outline"
            >
              Upgrade
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
