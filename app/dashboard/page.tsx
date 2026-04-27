"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getTodayProgram } from "@/lib/programs";
import {
  calculateNutrition,
  getMealPlan,
} from "@/lib/nutrition";

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
      {/* 1. TODAY PROGRAM SECTION */}
      <section className="soft-card p-10 mb-8 bg-[#fffcfd] border border-[#f0e3e8] relative overflow-hidden">
        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-3 font-semibold">
            Today's Focus • Day {day}
          </p>

          <h1 className="text-5xl mb-3 text-[#4a3f44] tracking-tight">
            {program.title}
          </h1>

          <p className="text-[#7b6870] text-lg italic mb-6">
            "{program.theme}"
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-[#b98fa1]">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#f0e3e8] shadow-sm">
              <span className="text-xl">⏱</span>
              <span className="font-medium">{program.exercises.length * 2}:00 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#f0e3e8] shadow-sm">
              <span className="text-xl">🔥</span>
              <span className="font-medium">{program.exercises.length} Exercises</span>
            </div>
          </div>

          <Link href="/session" className="btn-primary px-10 py-4 text-lg inline-block shadow-lg hover:scale-105 transition-transform">
            Start Full Session
          </Link>
        </div>
        <div className="absolute top-[-20px] right-[-20px] opacity-5 text-[200px] pointer-events-none">
          🧘‍♀️
        </div>
      </section>

      {/* 2. DAILY NUTRITION & BUDGET SECTION */}
      <section className="soft-card p-10 mb-8 border border-[#f0e3e8]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-1 font-semibold">
              Personalized Nutrition
            </p>
            <h2 className="text-3xl text-[#4a3f44]">Healthy Eating On A Budget</h2>
          </div>
          
          {/* BUDGET HIGHLIGHT CARD */}
          <div className="bg-[#fdf2f5] border border-[#f8d7e1] p-5 rounded-3xl text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-[#b98fa1] mb-1 font-bold">Today's Meal Cost</p>
            <p className="text-3xl font-semibold text-[#4a3f44]">Under €{nutrition.dailyBudget}</p>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Calories", value: nutrition.calories, unit: "kcal" },
            { label: "Protein", value: nutrition.protein, unit: "g" },
            { label: "Fiber", value: nutrition.fiber, unit: "g" },
            { label: "Water", value: nutrition.water, unit: "L" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">{stat.label}</div>
              <div className="text-3xl font-light text-[#4a3f44]">
                {stat.value}<span className="text-sm ml-1 opacity-60">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {meals.map((meal, i) => (
            <div
              key={meal.title + i}
              className={`p-7 rounded-[34px] bg-white border transition-all ${
                i > 0 && plan === "free" ? "opacity-50 grayscale blur-[1px] pointer-events-none border-[#f0e3e8]" : "border-[#f0e3e8] hover:shadow-md"
              }`}
            >
              <div className="flex justify-between gap-3 mb-3">
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#fdf2f5] text-[#b98fa1] font-bold uppercase tracking-widest">
                  {i === 0 ? "Breakfast" : i === 1 ? "Lunch" : i === 2 ? "Dinner" : "Snack"}
                </span>
                <span className="text-sm font-semibold text-[#4a3f44]">
                  €{meal.price.toFixed(2)}
                </span>
              </div>

              <h3 className="text-2xl text-[#4a3f44] mb-1 font-medium">{meal.title}</h3>
              <p className="text-[#7b6870] mb-4 text-sm italic">{meal.subtitle}</p>

              <div className="flex gap-4 text-[11px] text-[#b98fa1] font-bold uppercase tracking-tighter mb-5">
                <span>⏱ {meal.prep}</span>
                <span>🔥 {meal.kcal} kcal</span>
                <span>💪 {meal.protein}g protein</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#4a3f44] mb-2 tracking-widest">Ingredients</h4>
                  <ul className="grid grid-cols-1 gap-1 text-[#6f5a62] text-sm">
                    {meal.ingredients.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#b98fa1]"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-[#4a3f44] mb-2 tracking-widest">Hormone Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {meal.benefits.map((benefit) => (
                      <span key={benefit} className="text-[11px] bg-[#fffcfd] border border-[#f0e3e8] px-2 py-1 rounded-lg text-[#7b6870]">
                        ✨ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {plan === "free" && (
          <div className="mt-8 text-center p-10 rounded-[40px] bg-[#fdf2f5] border border-dashed border-[#d9a8b8]">
            <h3 className="text-xl text-[#4a3f44] font-semibold mb-2">Unlock Your Full Budget Menu</h3>
            <p className="text-[#7b6870] mb-6 max-w-md mx-auto">
              Get 28 days of hormone-balancing meals for under <span className="font-bold text-[#4a3f44]">€{nutrition.weeklyBudget} per week</span>. 
              Includes grocery lists and prep guides.
            </p>
            <Link href="/pricing" className="btn-primary px-8 py-3 inline-block">
              Upgrade to Premium Budget Plan
            </Link>
          </div>
        )}
      </section>

      {/* 3. EXERCISES LIST SECTION */}
      <section className="soft-card p-10 border border-[#f0e3e8]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl text-[#4a3f44]">Today's Routine</h2>
          <span className="text-[#b98fa1] text-sm font-medium tracking-widest uppercase">
            {program.exercises.length} Movements
          </span>
        </div>
        
        <div className="grid gap-4">
          {program.exercises.map((item, i) => (
            <div
              key={item.name + i}
              className="p-5 rounded-2xl bg-white border border-[#f0e3e8] flex justify-between items-center group hover:border-[#b98fa1] transition-all"
            >
              <div className="flex items-center gap-5">
                <span className="w-10 h-10 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#b98fa1] font-bold group-hover:bg-[#b98fa1] group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <div>
                  <div className="text-lg text-[#4a3f44] font-medium leading-none mb-1">{item.name}</div>
                  <div className="text-[10px] text-[#b98fa1] uppercase tracking-[0.2em]">{item.reps}</div>
                </div>
              </div>
              <div className="text-[#7b6870] font-light text-sm italic">2:00 min</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
