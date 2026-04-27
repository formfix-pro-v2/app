"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getTodayProgram } from "@/lib/programs";
import { calculateNutrition, getMealPlan } from "@/lib/nutrition";

type QuizData = {
  symptoms?: string[];
  age?: string;
  height?: string;
  weight?: string;
  activity?: string;
  goal?: string;
};

export default function DashboardPage() {
  const [day, setDay] = useState(1);
  const [plan, setPlan] = useState("free");

  const [data, setData] = useState<QuizData>({
    symptoms: [],
    age: "48",
    height: "168",
    weight: "72",
    activity: "light",
    goal: "tone",
  });

  useEffect(() => {
    const savedDay = localStorage.getItem("day");
    const savedPlan = localStorage.getItem("plan");
    const raw = localStorage.getItem("quizData");

    if (savedDay) setDay(Number(savedDay));
    if (savedPlan) setPlan(savedPlan);

    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const program = useMemo(() => {
    return getTodayProgram(day);
  }, [day]);

  const nutrition = useMemo(() => {
    return calculateNutrition({
      age: Number(data.age) || 48,
      height: Number(data.height) || 168,
      weight: Number(data.weight) || 72,
      activity: (data.activity as any) || "light",
      goal: (data.goal as any) || "tone",
      symptoms: data.symptoms || [],
    });
  }, [data]);

  const meals = useMemo(() => {
    return getMealPlan(nutrition.calories);
  }, [nutrition]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-14 space-y-8">

      {/* HERO */}
      <section className="soft-card p-10 md:p-14 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-72 h-72 bg-[#fbe9ef] rounded-full blur-3xl opacity-60" />

        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-[#b98fa1] mb-4">
              Today Program • Day {day}
            </p>

            <h1 className="text-5xl md:text-6xl text-[#3d2b32] mb-4 leading-tight">
              {program.title}
            </h1>

            <p className="text-[#7b6870] text-lg mb-8 italic">
              {program.theme}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 rounded-full bg-white border border-[#f0e3e8]">
                ⏱ {program.exercises.length * 2} min
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-[#f0e3e8]">
                🔥 {program.exercises.length} Exercises
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-[#f0e3e8]">
                ✨ {plan.toUpperCase()}
              </span>
            </div>

            <Link href="/session" className="btn-primary text-lg px-10 py-4">
              Start Full Session
            </Link>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-[#fff4f7] to-white shadow-[0_25px_60px_rgba(185,143,161,0.18)] flex items-center justify-center text-7xl">
              🧘‍♀️
            </div>
          </div>
        </div>
      </section>

      {/* NUTRITION */}
      <section className="soft-card p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-[#b98fa1] mb-3">
              Daily Nutrition
            </p>

            <h2 className="text-4xl text-[#3d2b32]">
              Personalized Fuel Plan
            </h2>
          </div>

          <span className="hidden md:block px-4 py-2 rounded-full bg-[#fff4f7] text-[#b98fa1]">
            Hormone Balanced
          </span>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ["Calories", nutrition.calories],
            ["Protein", `${nutrition.protein}g`],
            ["Fiber", `${nutrition.fiber}g`],
            ["Water", `${nutrition.water}L`],
          ].map(([label, val]) => (
            <div
              key={String(label)}
              className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center shadow-sm"
            >
              <div className="text-xs tracking-widest uppercase text-[#b98fa1] mb-2">
                {label}
              </div>

              <div className="text-3xl text-[#3d2b32]">
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* first meal */}
        <div className="p-8 rounded-[34px] bg-white border border-[#f0e3e8] mb-6">
          <div className="flex justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl text-[#3d2b32] mb-2">
                {meals[0]?.title}
              </h3>

              <p className="text-[#7b6870] mb-4">
                {meals[0]?.subtitle}
              </p>

              <div className="text-[#b98fa1] font-medium">
                {meals[0]?.kcal} kcal • {meals[0]?.protein}g protein
              </div>
            </div>

            <span className="px-4 py-2 h-fit rounded-full bg-[#fff4f7] text-[#b98fa1]">
              Breakfast
            </span>
          </div>
        </div>

        {/* other meals */}
        <div className="grid md:grid-cols-3 gap-4">
          {plan === "free" ? (
            ["Lunch 🔒", "Dinner 🔒", "Snack 🔒"].map((item) => (
              <div
                key={item}
                className="p-6 rounded-3xl border-2 border-dashed border-[#f0e3e8] text-center bg-[#fffdfd]"
              >
                {item}
              </div>
            ))
          ) : (
            [meals[1], meals[2], meals[3]].map((meal, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center"
              >
                <div className="text-xs uppercase tracking-widest text-[#b98fa1] mb-2">
                  {i === 0 ? "Lunch" : i === 1 ? "Dinner" : "Snack"}
                </div>

                <div className="text-[#3d2b32] font-medium">
                  {meal?.title}
                </div>
              </div>
            ))
          )}
        </div>

        {plan === "free" && (
          <div className="mt-8 p-8 rounded-3xl bg-[#fff4f7] border border-[#f0d7e0] text-center">
            <p className="text-[#7b6870] mb-4">
              Unlock full meal plans, recipes and premium hormone nutrition.
            </p>

            <Link href="/pricing" className="btn-primary">
              Upgrade Membership ✨
            </Link>
          </div>
        )}
      </section>

      {/* EXERCISES */}
      <section className="soft-card p-10">
        <h2 className="text-4xl text-[#3d2b32] mb-8">
          Today's Exercises
        </h2>

        <div className="grid gap-4">
          {program.exercises.map((item, i) => (
            <div
              key={item.name + i}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8] flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-[#fff4f7] flex items-center justify-center text-[#b98fa1] font-semibold">
                  {i + 1}
                </span>

                <span className="text-lg text-[#3d2b32]">
                  {item.name}
                </span>
              </div>

              <span className="text-[#7b6870]">
                {item.reps}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
