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
      } catch (e) {
        console.error("Error parsing quiz data", e);
      }
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
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* TODAY PLAN - Fokus na trening */}
      <section className="soft-card p-10 mb-8 bg-[#fffcfd] border border-[#f0e3e8]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-3 font-semibold">
              Today Program • Day {day}
            </p>
            <h1 className="text-5xl mb-3 text-[#4a3f44]">{program.title}</h1>
            <p className="text-[#7b6870] mb-5 text-lg italic">{program.theme}</p>
            <div className="flex items-center gap-4 text-2xl text-[#b98fa1] mb-8">
              <span className="flex items-center gap-2">
                ⏱ {program.exercises.length * 2}:00 min
              </span>
              <span className="text-[#f0e3e8]">|</span>
              <span>🔥 {program.exercises.length} Exercises</span>
            </div>
            <Link href="/session" className="btn-primary px-10 py-4 text-lg">
              Start Full Session
            </Link>
          </div>
          <div className="hidden md:block w-48 h-48 rounded-full bg-[#fff4f7] border-8 border-white shadow-inner flex items-center justify-center text-5xl">
            🧘‍♀️
          </div>
        </div>
      </section>

      {/* NUTRITION - Vizuelno sređeno prema tvojoj slici */}
      <section className="soft-card p-10 mb-8 border border-[#f0e3e8]">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-6 font-semibold">
          Daily Nutrition
        </p>

        {/* Macros Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Calories", value: nutrition.calories, unit: "" },
            { label: "Protein", value: nutrition.protein, unit: "g" },
            { label: "Fiber", value: nutrition.fiber, unit: "g" },
            { label: "Water", value: nutrition.water, unit: "L" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center shadow-sm"
            >
              <div className="text-xs uppercase tracking-widest text-[#b98fa1] mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-light text-[#4a3f44]">
                {stat.value}
                <span className="text-lg ml-1 text-[#b98fa1]">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Meal (Breakfast) */}
        <div className="p-8 rounded-[40px] bg-white border border-[#f0e3e8] mb-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl text-[#4a3f44] mb-1">
                {meals[0]?.title || "Balanced Breakfast"}
              </h3>
              <p className="text-[#7b6870]">{meals[0]?.subtitle}</p>
            </div>
            <span className="bg-[#fff4f7] text-[#b98fa1] px-4 py-1 rounded-full text-sm border border-[#f8e1e7]">
              Breakfast
            </span>
          </div>
          <div className="text-[#b98fa1] font-medium">
            {meals[0]?.kcal} kcal • {meals[0]?.protein}g protein
          </div>
        </div>

        {/* Other Meals (Logic for Free/Premium) */}
        <div className="grid md:grid-cols-3 gap-4">
          {plan === "free" ? (
            ["Lunch", "Dinner", "Snack"].map((label) => (
              <div
                key={label}
                className="p-6 rounded-3xl border-2 border-dashed border-[#f0e3e8] text-[#b98fa1] text-center bg-[#fafafa]"
              >
                {label} 🔒
              </div>
            ))
          ) : (
            [meals[1], meals[2], meals[3]].map((meal, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center shadow-sm hover:border-[#d9a8b8] transition-colors"
              >
                <div className="text-xs uppercase text-[#b98fa1] mb-1">
                  {i === 0 ? "Lunch" : i === 1 ? "Dinner" : "Snack"}
                </div>
                <div className="text-[#4a3f44] font-medium">{meal?.title}</div>
              </div>
            ))
          )}
        </div>

        {plan === "free" && (
          <div className="mt-8 text-center p-8 rounded-3xl bg-[#fff4f7] border border-dashed border-[#d9a8b8]">
            <p className="text-[#7b6870] mb-4">
              Get the full meal plan and 50+ recipes tailored to your hormones.
            </p>
            <Link href="/pricing" className="btn-primary inline-block">
              Unlock Full Meal Plan
            </Link>
          </div>
        )}
      </section>

      {/* EXERCISES LIST */}
      <section className="soft-card p-10 border border-[#f0e3e8]">
        <h2 className="text-3xl mb-8 text-[#4a3f44]">Today's Exercises</h2>
        <div className="grid gap-4">
          {program.exercises.map((item, i) => (
            <div
              key={item.name + i}
              className="p-5 rounded-2xl bg-white border border-[#f0e3e8] flex justify-between items-center group hover:bg-[#fffcfd] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#f0e3e8] flex items-center justify-center text-sm text-[#b98fa1] font-bold">
                  {i + 1}
                </span>
                <span className="text-lg text-[#4a3f44] font-medium">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[#b98fa1]">{item.reps}</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#7b6870]">2 min</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
