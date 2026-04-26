"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateNutrition,
  getMealPlan,
  type Activity,
  type Goal,
} from "@/lib/nutrition";

type QuizData = {
  symptoms?: string[];
  time?: string;
  age?: string;
  height?: string;
  weight?: string;
  activity?: string;
  goal?: string;
};

// Mapiranje vrednosti da odgovaraju tvojim tipovima iz lib/nutrition.ts
const mapActivity = (val: string | undefined): Activity => {
  const num = Number(val);
  if (num <= 1.2) return "sedentary";
  if (num <= 1.35) return "light"; // Usklađeno sa tvojim multiplier-om 1.35
  if (num <= 1.5) return "moderate";
  return "active"; // Fallback na najviši podržani tip u tvom lib-u
};

export default function ResultsPage() {
  const [data, setData] = useState<QuizData>({
    symptoms: [],
    time: "10 min",
    age: "48",
    height: "168",
    weight: "72",
    activity: "1.35",
    goal: "tone",
  });

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch (err) {
        console.error("Error loading quiz data", err);
      }
    }
  }, []);

  const nutrition = useMemo(() => {
    return calculateNutrition({
      age: Number(data.age) || 48,
      height: Number(data.height) || 168,
      weight: Number(data.weight) || 72,
      activity: mapActivity(data.activity),
      goal: (data.goal as Goal) || "tone",
      symptoms: data.symptoms || [],
    });
  }, [data]);

  const meals = useMemo(() => {
    // getMealPlan prima BROJ (kalorije), što sada ispravno šaljemo
    return getMealPlan(nutrition.calories);
  }, [nutrition.calories]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 mb-8 text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Your Personalized Result
        </p>
        <h1 className="text-5xl mb-4">Balanced Glow Reset</h1>
        <p className="text-[#7b6870] text-xl">
          Your custom movement + nutrition system is ready.
        </p>
      </section>

      <section className="soft-card p-10 mb-8">
        <h2 className="text-4xl mb-6">Nutrition Blueprint</h2>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            ["Calories", nutrition.calories],
            ["Protein", `${nutrition.protein}g`],
            ["Fiber", `${nutrition.fiber}g`],
            ["Water", `${nutrition.water}L`],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8] text-center"
            >
              <div className="text-sm text-[#7b6870]">{label}</div>
              <div className="text-3xl">{value}</div>
            </div>
          ))}
        </div>

        {meals.length > 0 && (
          <div className="p-6 rounded-3xl bg-white border border-[#f0e3e8] mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-3xl mb-1">{meals[0].title}</h3>
                <p className="text-[#7b6870]">{meals[0].subtitle}</p>
              </div>
              <div className="text-right">
                <span className="block text-sm text-[#b98fa1] uppercase">Prep Time</span>
                <span className="text-xl">{meals[0].prep}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-xl mb-3 font-semibold">Ingredients</h4>
                <ul className="space-y-2">
                  {meals[0].ingredients.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8c8d3]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-3 font-semibold">Method</h4>
                <ol className="space-y-3">
                  {meals[0].steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-bold text-[#b98fa1]">{i + 1}.</span>
                      <span className="text-[#7b6870]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {["Lunch 🔒", "Dinner 🔒", "Snack 🔒"].map((item) => (
            <div
              key={item}
              className="p-6 rounded-3xl border border-dashed border-[#e8c8d3] text-center text-[#b98fa1]"
            >
              {item}
            </div>
          ))}
        </div>

        <Link href="/pricing" className="btn-primary">
          Unlock Full Meal System
        </Link>
      </section>
    </main>
  );
}
