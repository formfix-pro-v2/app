"use client";

import { useEffect, useState } from "react";
import { getProgram, UserType } from "@/lib/programs";

export default function DashboardPage() {
  const [type, setType] = useState<UserType>("office");
  const [day, setDay] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("userType") as UserType | null;
    if (saved) setType(saved);

    const savedDay = Number(localStorage.getItem("day") || "1");
    setDay(savedDay);
  }, []);

  const program = getProgram(type);
  const current = program.days[(day - 1) % program.days.length];

  function completeDay() {
    const next = day + 1;
    localStorage.setItem("day", String(next));
    setDay(next);
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-3">
          {program.title}
        </h1>

        <p className="text-zinc-400 mb-10">{program.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {program.modules.map((item) => (
            <div
              key={item}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              {item}
            </div>
          ))}
        </div>

        <section className="rounded-3xl bg-white/5 border border-white/10 p-8">
          <p className="text-orange-300 font-semibold mb-3">
            Day {day}
          </p>

          <h2 className="text-3xl font-bold mb-3">
            {current.focus}
          </h2>

          <div className="space-y-3 mb-8">
            {current.tasks.map((task) => (
              <div
                key={task}
                className="p-4 rounded-2xl bg-black/20"
              >
                ✅ {task}
              </div>
            ))}
          </div>

          <button
            onClick={completeDay}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
          >
            Complete Day
          </button>
        </section>
      </div>
    </main>
  );
}
