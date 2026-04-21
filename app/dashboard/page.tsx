"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [premium, setPremium] = useState(false);
  const [day, setDay] = useState(1);

  useEffect(() => {
    setPremium(localStorage.getItem("premium") === "true");

    const savedDay = Number(localStorage.getItem("day") || "1");
    setDay(savedDay);
  }, []);

  function completeDay() {
    const next = day + 1;
    localStorage.setItem("day", String(next));
    setDay(next);
  }

  const workout = [
    "Cat-Cow Stretch – 60 sec",
    "Wall Posture Hold – 60 sec",
    "Glute Bridge – 15 reps",
    "Bird Dog – 10 reps each side",
    "Chest Opener Stretch – 45 sec"
  ];

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-14">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black mb-2">
          Your Recovery Program
        </h1>

        <p className="text-zinc-400 mb-10">
          Day {day} of {premium ? "90" : "7"}
        </p>

        {/* TODAY */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Today’s Session
          </h2>

          <div className="space-y-4">
            {workout.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-black/20 border border-white/5"
              >
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={completeDay}
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
          >
            Mark Complete
          </button>
        </section>

        {/* WEEK PLAN */}
        <section className="grid md:grid-cols-2 gap-8 mb-8">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-5">
              This Week
            </h2>

            <div className="space-y-3 text-zinc-300">
              <div>Mon – Posture Reset</div>
              <div>Tue – Core Stability</div>
              <div>Wed – Mobility Flow</div>
              <div>Thu – Recovery Walk</div>
              <div>Fri – Back Strength</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-5">
              Your Progress
            </h2>

            <div className="text-5xl font-black mb-3">
              {Math.min(day * 8, 100)}%
            </div>

            <p className="text-zinc-400">
              Consistency score increasing.
            </p>
          </div>

        </section>

        {/* PREMIUM CTA */}
        {!premium && (
          <section className="rounded-3xl p-8 bg-blue-500/10 border border-blue-400/30">
            <h2 className="text-3xl font-bold mb-4">
              Unlock Full 90-Day Transformation
            </h2>

            <p className="text-zinc-300 mb-6">
              Advanced fat loss + posture rebuild + premium coaching system.
            </p>

            <Link
              href="/pricing"
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
            >
              Upgrade Now
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}
