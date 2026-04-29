"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateNutrition,
  getDayMealPlan,
  type Activity,
  type Goal,
} from "@/lib/nutrition";
import PrintButton from "@/components/PrintButton";
import ShareButton from "@/components/ShareButton";

type QuizData = {
  symptoms?: string[];
  time?: string;
  age?: string;
  height?: string;
  weight?: string;
  activity?: string;
  goal?: string;
};

export default function ResultsPage() {
  const [data, setData] = useState<QuizData>({
    symptoms: [],
    time: "20 min",
    age: "48",
    height: "168",
    weight: "72",
    activity: "light",
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
      activity: (data.activity as Activity) || "light",
      goal: (data.goal as Goal) || "tone",
      symptoms: data.symptoms || [],
    });
  }, [data]);

  const mealPlan = useMemo(() => {
    return getDayMealPlan(1, nutrition.calories, data.symptoms || [], data.goal || "tone");
  }, [nutrition.calories, data.symptoms, data.goal]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* 1. HERO SUCCESS SECTION */}
      <section className="soft-card p-10 mb-8 text-center bg-gradient-to-b from-[#fffcfd] to-white border border-[#f0e3e8]">
        <div className="w-20 h-20 bg-[#fdf2f5] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ✨
        </div>
        <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
          Analysis Complete
        </p>
        <h1 className="text-5xl mb-4 text-[#4a3f44] tracking-tight">Your Hormone-Balance Blueprint</h1>
        <p className="text-[#7b6870] text-xl max-w-2xl mx-auto leading-relaxed">
          Based on your profile, we&apos;ve optimized a plan to support your metabolism 
          and manage {data.symptoms?.length ? data.symptoms[0].toLowerCase() : "hormonal balance"} effectively.
        </p>
        <div className="mt-6 flex justify-center">
          <ShareButton text="I just got my personalized menopause wellness plan from Veronica Method! 🌸" url="https://veronica-method.vercel.app/quiz" />
        </div>
      </section>

      {/* 2. NUTRITION & BUDGET PREVIEW */}
      <section className="soft-card p-10 mb-8 border border-[#f0e3e8]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl text-[#4a3f44] mb-2">Nutrition Summary</h2>
            <p className="text-[#b98fa1] font-medium italic">Targeting: {data.goal === 'fat_loss' ? 'Healthy Fat Loss' : 'Body Toning'}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <PrintButton targetId="printable-nutrition-summary" label="Print Summary" />
            <div className="bg-[#fdf2f5] p-6 rounded-[30px] border border-[#f8d7e1] text-center min-w-[200px]">
              <p className="text-[10px] uppercase tracking-widest text-[#b98fa1] font-bold mb-1">Weekly Grocery Budget</p>
              <p className="text-4xl font-semibold text-[#4a3f44]">€{nutrition.weeklyBudget}</p>
              <p className="text-xs text-[#7b6870] mt-1">Hormone-safe ingredients only</p>
            </div>
          </div>
        </div>

        <div id="printable-nutrition-summary">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Daily Calories", value: nutrition.calories, unit: "kcal" },
            { label: "Target Protein", value: nutrition.protein, unit: "g" },
            { label: "Daily Fiber", value: nutrition.fiber, unit: "g" },
            { label: "Hydration", value: nutrition.water, unit: "L" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-3xl bg-[#fffcfd] border border-[#f0e3e8] text-center">
              <div className="text-[10px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">{stat.label}</div>
              <div className="text-3xl text-[#4a3f44] font-light">
                {stat.value}<span className="text-sm ml-1 opacity-50">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. FREE DAY 1 COMPLETE MEAL PLAN */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#4a3f44] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">Free Preview</span>
              <h3 className="text-2xl text-[#4a3f44]">Your Complete Day 1 Meal Plan</h3>
            </div>
            <PrintButton targetId="printable-day1-meals" label="Print Meals" />
          </div>

          <div id="printable-day1-meals">

          <div className="grid md:grid-cols-2 gap-4">
            {mealPlan.meals.map(({ slot, meal }) => {
              const slotLabels: Record<string, string> = {
                breakfast: "Breakfast",
                lunch: "Lunch",
                dinner: "Dinner",
                snack: "Snack",
              };

              return (
                <div key={slot} className="p-6 rounded-[30px] bg-white border border-[#f0e3e8] shadow-sm">
                  <div className="flex justify-between gap-3 mb-3">
                    <span className="text-[9px] px-3 py-1 rounded-full bg-[#fdf2f5] text-[#d8a7b5] font-bold uppercase tracking-widest">
                      {slotLabels[slot]}
                    </span>
                    <span className="text-sm font-semibold text-[#4a3f44]">€{meal.price.toFixed(2)}</span>
                  </div>

                  <h4 className="text-xl text-[#4a3f44] mb-1 font-medium">{meal.title}</h4>
                  <p className="text-[#7b6870] text-xs italic mb-3">&ldquo;{meal.subtitle}&rdquo;</p>

                  <div className="flex gap-4 text-[10px] text-[#d8a7b5] font-bold uppercase tracking-tight mb-4">
                    <span>⏱ {meal.prep}</span>
                    <span>🔥 {meal.kcal} kcal</span>
                    <span>💪 {meal.protein}g protein</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase text-[#4a3f44] mb-2 tracking-widest opacity-70">Ingredients</p>
                    <ul className="space-y-1 text-xs text-[#6f5a62]">
                      {meal.ingredients.map((ing, idx) => (
                        <li key={ing} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#d8a7b5]" />
                          <span className="font-medium">{meal.amounts?.[idx]}</span> {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#4a3f44] mb-2 tracking-widest opacity-70">How to Make</p>
                    <ol className="space-y-1 text-xs text-[#6f5a62]">
                      {meal.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-[#d8a7b5] font-bold shrink-0">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {meal.benefits.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {meal.benefits.map((b) => (
                        <span key={b} className="text-[9px] px-2 py-0.5 rounded-full bg-[#fdf2f5] text-[#b98fa1] border border-[#f0e3e8]">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-6 rounded-2xl bg-[#fdf2f5] border border-[#f0e3e8] text-center">
            <p className="text-sm text-[#4a3f44] font-medium">
              Total Day 1: {mealPlan.totalKcal} kcal · {mealPlan.totalProtein}g protein · €{mealPlan.totalPrice.toFixed(2)}
            </p>
            <p className="text-xs text-[#7b6870] mt-1">
              Day 2-7 free trial includes breakfast only. Premium unlocks all meals every day.
            </p>
          </div>
          </div>{/* close printable-day1-meals */}
        </div>

        {/* 4. CTA SECTION */}
        </div>{/* close printable-nutrition-summary */}
        <div className="text-center">
          <Link href="/pricing" className="btn-primary px-12 py-5 text-xl inline-block shadow-xl hover:scale-105 transition-transform mb-4">
            Get My Full 28-Day Plan
          </Link>
          <p className="text-sm text-[#7b6870]">
            Join 1,000+ women balancing hormones on a budget.
          </p>
        </div>
      </section>

      {/* DASHBOARD LINK (Silent bypass for users who already paid or just want to explore) */}
      <div className="text-center">
        <Link href="/dashboard" className="text-[#b98fa1] text-sm hover:underline font-medium uppercase tracking-widest">
          Go to my free dashboard →
        </Link>
      </div>
    </main>
  );
}
