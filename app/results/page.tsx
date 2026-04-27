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

  const meals = useMemo(() => {
    return getMealPlan(nutrition.calories);
  }, [nutrition.calories]);

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
          Based on your profile, we've optimized a plan to support your metabolism 
          and manage {data.symptoms?.length ? data.symptoms[0].toLowerCase() : "hormonal balance"} effectively.
        </p>
      </section>

      {/* 2. NUTRITION & BUDGET PREVIEW */}
      <section className="soft-card p-10 mb-8 border border-[#f0e3e8]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl text-[#4a3f44] mb-2">Nutrition Summary</h2>
            <p className="text-[#b98fa1] font-medium italic">Targeting: {data.goal === 'fat_loss' ? 'Healthy Fat Loss' : 'Body Toning'}</p>
          </div>
          
          <div className="bg-[#fdf2f5] p-6 rounded-[30px] border border-[#f8d7e1] text-center min-w-[200px]">
            <p className="text-[10px] uppercase tracking-widest text-[#b98fa1] font-bold mb-1">Weekly Grocery Budget</p>
            <p className="text-4xl font-semibold text-[#4a3f44]">€{nutrition.weeklyBudget}</p>
            <p className="text-xs text-[#7b6870] mt-1">Hormone-safe ingredients only</p>
          </div>
        </div>

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

        {/* 3. FREE SAMPLE MEAL */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#4a3f44] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">Free Sample</span>
            <h3 className="text-2xl text-[#4a3f44]">Your Day 1 Breakfast</h3>
          </div>

          {meals.length > 0 && (
            <div className="p-8 rounded-[40px] bg-white border border-[#f0e3e8] shadow-sm">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-3xl text-[#4a3f44] mb-2">{meals[0].title}</h4>
                  <p className="text-[#7b6870] italic mb-6">"{meals[0].subtitle}"</p>
                  
                  <div className="flex gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-[10px] text-[#b98fa1] uppercase font-bold tracking-widest mb-1">Prep</p>
                      <p className="text-[#4a3f44] font-medium">{meals[0].prep}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[#b98fa1] uppercase font-bold tracking-widest mb-1">Cost</p>
                      <p className="text-[#4a3f44] font-medium">€{meals[0].price.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[#b98fa1] uppercase font-bold tracking-widest mb-1">Protein</p>
                      <p className="text-[#4a3f44] font-medium">{meals[0].protein}g</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-[#4a3f44] tracking-widest mb-3">Ingredients</p>
                    {meals[0].ingredients.map((ing) => (
                      <div key={ing} className="flex items-center gap-3 text-[#6f5a62] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d6a7b1]" />
                        {ing}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#fffcfd] p-6 rounded-[30px] border border-[#f0e3e8]">
                  <p className="text-xs font-bold uppercase text-[#4a3f44] tracking-widest mb-4">Method</p>
                  <ol className="space-y-4">
                    {meals[0].steps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-sm text-[#6f5a62]">
                        <span className="font-bold text-[#d6a7b1]">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. LOCKED CONTENT PLACEHOLDERS */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {["Lunch", "Dinner", "Snack"].map((label) => (
            <div key={label} className="p-8 rounded-[30px] border border-dashed border-[#d6a7b1] bg-[#fffcfd] text-center group cursor-not-allowed">
              <span className="block text-2xl mb-2 grayscale">🔒</span>
              <p className="text-sm font-bold uppercase tracking-widest text-[#b98fa1]">{label}</p>
              <p className="text-[10px] text-[#7b6870] mt-1 italic">Included in Premium</p>
            </div>
          ))}
        </div>

        {/* 5. CTA SECTION */}
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
