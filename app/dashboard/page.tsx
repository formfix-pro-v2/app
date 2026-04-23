"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { plans } from "@/lib/programs";

export default function DashboardPage() {
  const [day, setDay] = useState(1);

  useEffect(() => {
    setDay(Number(localStorage.getItem("menoDay") || "1"));
  }, []);

  const plan = plans[(day - 1) % plans.length];

  function completeDay() {
    const next = day + 1;
    localStorage.setItem("menoDay", String(next));
    setDay(next);
  }

  return (
    <main className="min-h-screen bg-[#160d14] text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-light mb-2">
          {plan.title}
        </h1>

        <p className="text-pink-200/70 mb-10 text-xl">
          {plan.theme}
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {plan.exercises.map((ex) => (
            <div
              key={ex.name}
              className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
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

                <p className="text-pink-100/70 mb-5">
                  {ex.why}
                </p>

                <div className="space-y-3 text-sm text-pink-100/75">
                  <div>
                    <span className="text-pink-300">Start:</span>{" "}
                    {ex.start}
                  </div>

                  <div>
                    <span className="text-pink-300">End:</span>{" "}
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

        <button
          onClick={completeDay}
          className="mt-10 w-full p-5 rounded-full bg-pink-300 text-[#2a1620] font-semibold text-lg"
        >
          Complete Today
        </button>

      </div>
    </main>
  );
}
