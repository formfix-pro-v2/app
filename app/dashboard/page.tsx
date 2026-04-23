"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans } from "@/lib/programs";

export default function DashboardPage() {
  const [day, setDay] = useState(1);
  const [streak, setStreak] = useState(0);
  const [water, setWater] = useState(0);

  useEffect(() => {
    setDay(Number(localStorage.getItem("menoDay") || "1"));
    setStreak(Number(localStorage.getItem("menoStreak") || "0"));
    setWater(Number(localStorage.getItem("water") || "0"));
  }, []);

  const plan = plans[(day - 1) % plans.length];
  const progress = Math.min(Math.round((day / 30) * 100), 100);

  function completeDay() {
    const nextDay = day + 1;
    const nextStreak = streak + 1;

    localStorage.setItem("menoDay", String(nextDay));
    localStorage.setItem("menoStreak", String(nextStreak));

    setDay(nextDay);
    setStreak(nextStreak);
  }

  function addWater() {
    const next = water + 1;
    localStorage.setItem("water", String(next));
    setWater(next);
  }

  return (
    <main className="min-h-screen bg-[#160d14] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 rounded-[2rem] p-8 bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-pink-200/70 mb-2">
              {plan.title}
            </p>

            <h1 className="text-5xl md:text-6xl font-light mb-4 text-pink-50">
              {plan.theme}
            </h1>

            <p className="text-pink-100/70 text-lg max-w-2xl">
              Gentle daily movement and hormone-support wellness routines designed
              for women navigating menopause with grace.
            </p>

            <button
              onClick={completeDay}
              className="mt-8 px-8 py-4 rounded-full bg-pink-300 text-[#2a1620] font-semibold"
            >
              Complete Today
            </button>
          </div>

          <div className="rounded-[2rem] p-8 bg-white/5 border border-white/10">
            <p className="text-pink-200/70 mb-3">Progress</p>

            <div className="text-5xl font-light mb-4">
              {progress}%
            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-pink-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 text-pink-100/75">
              🔥 {streak} day streak
            </div>

            <div className="mt-2 text-pink-100/75">
              💧 {water}/8 glasses
            </div>

            <button
              onClick={addWater}
              className="mt-5 w-full p-3 rounded-full border border-white/10 hover:bg-white/5"
            >
              Add Water
            </button>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* EXERCISES */}
          <div className="lg:col-span-2 space-y-6">

            {plan.exercises.map((ex) => (
              <div
                key={ex.name}
                className="rounded-[2rem] overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={ex.image}
                    alt={ex.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-7">
                  <h2 className="text-3xl font-light mb-3">
                    {ex.name}
                  </h2>

                  <p className="text-pink-100/75 mb-6">
                    {ex.why}
                  </p>

                  <div className="space-y-3 text-sm text-pink-100/70">
                    <div>
                      <span className="text-pink-300">Start:</span>{" "}
                      {ex.start}
                    </div>

                    <div>
                      <span className="text-pink-300">Finish:</span>{" "}
                      {ex.end}
                    </div>

                    <div>
                      <span className="text-pink-300">Dose:</span>{" "}
                      {ex.reps}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            <div className="rounded-[2rem] p-8 bg-white/5 border border-white/10">
              <h3 className="text-2xl font-light mb-5">
                Today Tips
              </h3>

              <div className="space-y-4 text-pink-100/75">
                <div>✨ Protein with breakfast</div>
                <div>✨ 10 min walk after meals</div>
                <div>✨ Magnesium in evening</div>
                <div>✨ Screens off 1h before bed</div>
              </div>
            </div>

            <div className="rounded-[2rem] p-8 bg-white/5 border border-white/10">
              <h3 className="text-2xl font-light mb-5">
                Premium Upgrade
              </h3>

              <p className="text-pink-100/75 mb-6">
                Unlock meal plans, symptom coaching,
                weight loss protocols and advanced routines.
              </p>

              <Link
                href="/pricing"
                className="block text-center p-4 rounded-full bg-pink-300 text-[#2a1620] font-semibold"
              >
                Upgrade
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
