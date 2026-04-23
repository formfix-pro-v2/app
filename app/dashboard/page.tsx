"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans } from "@/lib/programs";

export default function DashboardPage() {
  const [day, setDay] = useState(1);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedDay = Number(localStorage.getItem("menoDay") || "1");
    const savedStreak = Number(localStorage.getItem("menoStreak") || "0");

    setDay(savedDay);
    setStreak(savedStreak);
  }, []);

  const index = (day - 1) % plans.length;
  const plan = plans[index];

  const progress = Math.min(Math.round((day / 30) * 100), 100);

  function completeDay() {
    const nextDay = day + 1;
    const nextStreak = streak + 1;

    localStorage.setItem("menoDay", String(nextDay));
    localStorage.setItem("menoStreak", String(nextStreak));

    setDay(nextDay);
    setStreak(nextStreak);
  }

  return (
    <main className="min-h-screen bg-[#160d14] text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">
            <p className="text-pink-200/70 mb-2">
              {plan.title}
            </p>

            <h1 className="text-5xl font-light mb-4">
              {plan.theme}
            </h1>

            <p className="text-pink-100/75 text-lg">
              A gentle daily structure created for women in menopause.
              Follow consistently for best results.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <p className="text-pink-200/70 mb-3">Your Progress</p>

            <div className="text-5xl font-light mb-4">
              {progress}%
            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-pink-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-pink-100/70">
              🔥 {streak} day streak
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-8">
          <h2 className="text-3xl font-light mb-5">
            Why today matters
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-pink-400/10 p-5">
              Better hormone resilience
            </div>

            <div className="rounded-2xl bg-pink-400/10 p-5">
              Improved posture & mobility
            </div>

            <div className="rounded-2xl bg-pink-400/10 p-5">
              More calm daily energy
            </div>
          </div>
        </section>

        {/* EXERCISES */}
        <section className="mb-8">
          <h2 className="text-4xl font-light mb-6">
            Today’s Routine
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {plan.exercises.map((ex) => (
              <div
                key={ex.name}
                className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={ex.image}
                    alt={ex.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-medium mb-3">
                    {ex.name}
                  </h3>

                  <p className="text-pink-100/75 mb-5">
                    {ex.why}
                  </p>

                  <div className="space-y-3 text-sm text-pink-100/75">
                    <div>
                      <span className="text-pink-200">
                        Start:
                      </span>{" "}
                      {ex.start}
                    </div>

                    <div>
                      <span className="text-pink-200">
                        Finish:
                      </span>{" "}
                      {ex.end}
                    </div>

                    <div>
                      <span className="text-pink-200">
                        Dose:
                      </span>{" "}
                      {ex.reps}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIONS */}
        <section className="grid md:grid-cols-2 gap-6">
          <button
            onClick={completeDay}
            className="p-5 rounded-full bg-pink-300 text-[#2a1620] font-semibold text-lg hover:scale-[1.02] transition"
          >
            Complete Today
          </button>

          <Link
            href="/pricing"
            className="p-5 rounded-full border border-white/10 text-center hover:bg-white/5 transition"
          >
            Unlock Nutrition + Premium Coaching
          </Link>
        </section>
      </div>
    </main>
  );
}
