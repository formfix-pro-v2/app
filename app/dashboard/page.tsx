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
    /* Promenjeno na bg-transparent da bi se videle ruže iz globals.css */
    <main className="max-w-6xl mx-auto px-6 py-6 bg-transparent">
      
      {/* HEADER SA BACK DUGMETOM */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4a3f44]">Your Dashboard</h1>
        <Link href="/" className="btn-outline px-5 py-2 text-xs uppercase tracking-widest">
          Back to Home
        </Link>
      </div>

      {/* 1. TODAY PROGRAM SECTION - Koristi soft-card za providnost */}
      <section className="soft-card p-8 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-[10px] text-[#d8a7b5] mb-2 font-bold">
            Today's Focus • Day {day}
          </p>

          <h2 className="text-4xl mb-2 text-[#4a3f44] tracking-tight italic">
            {program.title}
          </h2>

          <p className="text-[#7b6870] text-base italic mb-6">
            "{program.theme}"
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl border border-[#f0e3e8]">
              <span className="text-lg">⏱</span>
              <span className="font-medium text-[#4a3f44] text-sm">{program.exercises.length * 2}:00 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl border border-[#f0e3e8]">
              <span className="text-lg">✨</span>
              <span className="font-medium text-[#4a3f44] text-sm">{program.exercises.length} Exercises</span>
            </div>
          </div>

          <Link href="/session" className="btn-primary px-10 py-4 text-sm uppercase tracking-widest shadow-xl">
            Start Full Session
          </Link>
        </div>
        <div className="absolute top-[-20px] right-[-20px] opacity-[0.03] text-[200px] pointer-events-none">
          🧘‍♀️
        </div>
      </section>

      {/* 2. DAILY NUTRITION SECTION */}
      <section className="soft-card p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-[10px] text-[#d8a7b5] mb-1 font-bold">
              Personalized Nutrition
            </p>
            <h2 className="text-3xl text-[#4a3f44] font-light">Healthy Eating <span className="italic">On A Budget</span></h2>
          </div>
          
          <div className="bg-[#fdf2f5]/80 border border-[#f8d7e1] p-4 rounded-3xl text-center shadow-sm backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-widest text-[#d8a7b5] mb-1 font-bold">Today's Meal Cost</p>
            <p className="text-2xl font-semibold text-[#4a3f44]">Under €{nutrition.dailyBudget}</p>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Calories", value: nutrition.calories, unit: "kcal" },
            { label: "Protein", value: nutrition.protein, unit: "g" },
            { label: "Fiber", value: nutrition.fiber, unit: "g" },
            { label: "Water", value: nutrition.water, unit: "L" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/40 border border-[#f0e3e8] text-center">
              <div className="text-[9px] uppercase tracking-widest text-[#d8a7b5] mb-1 font-bold">{stat.label}</div>
              <div className="text-2xl font-light text-[#4a3f44]">
                {stat.value}<span className="text-xs ml-1 opacity-60">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {meals.map((meal, i) => (
            <div
              key={meal.title + i}
              className={`p-6 rounded-[30px] bg-white/40 border transition-all ${
                i > 0 && plan === "free" ? "opacity-40 grayscale blur-[1px] pointer-events-none border-[#f0e3e8]" : "border-[#f0e3e8] hover:shadow-md"
              }`}
            >
              <div className="flex justify-between gap-3 mb-3">
                <span className="text-[9px] px-3 py-1 rounded-full bg-[#fdf2f5] text-[#d8a7b5] font-bold uppercase tracking-widest">
                  {i === 0 ? "Breakfast" : i === 1 ? "Lunch" : i === 2 ? "Dinner" : "Snack"}
                </span>
                <span className="text-sm font-semibold text-[#4a3f44]">
                  €{meal.price.toFixed(2)}
                </span>
              </div>

              <h3 className="text-xl text-[#4a3f44] mb-1 font-medium">{meal.title}</h3>
              <p className="text-[#7b6870] mb-4 text-xs italic">{meal.subtitle}</p>

              <div className="flex gap-3 text-[10px] text-[#d8a7b5] font-bold uppercase tracking-tight mb-5">
                <span>⏱ {meal.prep}</span>
                <span>🔥 {meal.kcal} kcal</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-[#4a3f44] mb-2 tracking-widest opacity-70">Ingredients</h4>
                  <ul className="grid grid-cols-1 gap-1 text-[#6f5a62] text-xs">
                    {meal.ingredients.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d8a7b5]"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {plan === "free" && (
          <div className="mt-8 text-center p-8 rounded-[34px] bg-[#fdf2f5]/60 border border-dashed border-[#d8a7b5]/40 backdrop-blur-sm">
            <h3 className="text-lg text-[#4a3f44] font-semibold mb-2">Unlock Your Full Budget Menu</h3>
            <Link href="/pricing" className="btn-primary px-8 py-3 text-sm inline-block">
              Upgrade to Premium Plan
            </Link>
          </div>
        )}
      </section>

      {/* 3. EXERCISES LIST SECTION */}
      <section className="soft-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-[#4a3f44] italic">Today's Routine</h2>
          <span className="text-[#d8a7b5] text-[10px] font-bold tracking-widest uppercase">
            {program.exercises.length} Movements
          </span>
        </div>
        
        <div className="grid gap-3">
          {program.exercises.map((item, i) => (
            <div
              key={item.name + i}
              className="p-4 rounded-xl bg-white/40 border border-[#f0e3e8] flex justify-between items-center group hover:border-[#d8a7b5] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#d8a7b5] text-xs font-bold group-hover:bg-[#d8a7b5] group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <div>
                  <div className="text-base text-[#4a3f44] font-medium leading-none mb-1">{item.name}</div>
                  <div className="text-[9px] text-[#d8a7b5] uppercase tracking-[0.2em] font-bold">{item.reps}</div>
                </div>
              </div>
              <div className="text-[#7b6870] font-light text-xs italic opacity-60">2:00 min</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
