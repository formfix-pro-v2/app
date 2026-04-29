"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getTodayProgram, isRestDay } from "@/lib/programs";
import { calculateNutrition, getDayMealPlan } from "@/lib/nutrition";
import UpsellBanner from "@/components/UpsellBanner";
import PrintButton from "@/components/PrintButton";
import { useTranslation } from "@/lib/i18n/useTranslation";

type QuizData = {
  symptoms?: string[];
  severity?: Record<string, number>;
  age?: string;
  height?: string;
  weight?: string;
  activity?: string;
  goal?: string;
  time?: string;
  sleep?: number;
};

const PHASE_COLORS = {
  foundation: "bg-blue-50 text-blue-600 border-blue-100",
  build: "bg-amber-50 text-amber-600 border-amber-100",
  strengthen: "bg-rose-50 text-rose-600 border-rose-100",
  master: "bg-purple-50 text-purple-600 border-purple-100",
};

const CATEGORY_LABELS: Record<string, string> = {
  warmup: "Warm-Up",
  cooldown: "Cool-Down",
  core: "Core",
  lower: "Lower Body",
  upper: "Upper Body",
  mobility: "Mobility",
  balance: "Balance",
  breathing: "Breathing",
  pelvic: "Pelvic Floor",
  posture: "Posture",
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const [day, setDay] = useState(1);
  const [plan, setPlan] = useState("free");
  const [data, setData] = useState<QuizData>({});

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
      activity: (data.activity as "sedentary" | "light" | "moderate" | "active") || "light",
      goal: (data.goal as "fat_loss" | "maintain" | "tone" | "energy") || "tone",
      symptoms: data.symptoms || [],
    });
  }, [data]);

  const mealPlan = useMemo(() => {
    return getDayMealPlan(day, nutrition.calories, data.symptoms || [], data.goal || "tone");
  }, [nutrition, day, data.symptoms, data.goal]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-6 bg-transparent">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4a3f44]">{t("Your Dashboard")}</h1>
        <div className="flex gap-3">
          <Link
            href="/checkin"
            className="btn-outline px-5 py-2 text-xs uppercase tracking-widest"
          >
            {t("Daily Check-In")}
          </Link>
          <Link
            href="/"
            className="btn-outline px-5 py-2 text-xs uppercase tracking-widest"
          >
            {t("Home")}
          </Link>
        </div>
      </div>

      {/* UPSELL */}
      <UpsellBanner />

      {/* TODAY PROGRAM */}
      <section className="soft-card p-8 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="uppercase tracking-[0.25em] text-[10px] text-[#d8a7b5] font-bold">
              Today&apos;s Focus • Day {day}
            </p>
            <span
              className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border ${PHASE_COLORS[program.phase]}`}
            >
              {program.phase}
            </span>
          </div>

          <h2 className="text-4xl mb-2 text-[#4a3f44] tracking-tight italic">
            {program.title}
          </h2>

          <p className="text-[#7b6870] text-base italic mb-4">
            &ldquo;{program.theme}&rdquo;
          </p>

          <p className="text-[#7b6870] text-sm mb-6 max-w-2xl">
            {program.description}
          </p>

          {/* Focus areas */}
          <div className="flex flex-wrap gap-2 mb-6">
            {program.focusAreas.map((area) => (
              <span
                key={area}
                className="text-[10px] px-3 py-1 rounded-full bg-[#fdf2f5] text-[#b98fa1] font-medium uppercase tracking-widest border border-[#f0e3e8]"
              >
                {CATEGORY_LABELS[area] || area}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl border border-[#f0e3e8]">
              <span className="text-lg">⏱</span>
              <span className="font-medium text-[#4a3f44] text-sm">
                ~{program.totalMinutes} min
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl border border-[#f0e3e8]">
              <span className="text-lg">✨</span>
              <span className="font-medium text-[#4a3f44] text-sm">
                {program.exercises.length} Exercises
              </span>
            </div>
            {data.symptoms && data.symptoms.length > 0 && (
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl border border-[#f0e3e8]">
                <span className="text-lg">🎯</span>
                <span className="font-medium text-[#4a3f44] text-sm">
                  Targeting: {data.symptoms.slice(0, 2).join(", ")}
                </span>
              </div>
            )}
          </div>

          <Link
            href={isRestDay(day) ? "/rest-day" : "/session"}
            className="btn-primary px-10 py-4 text-sm uppercase tracking-widest shadow-xl"
          >
            {isRestDay(day) ? t("Start Rest Day") : t("Start Full Session")}
          </Link>
        </div>
      </section>

      {/* NUTRITION */}
      <section className="soft-card p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-[10px] text-[#d8a7b5] mb-1 font-bold">
              {t("Personalized Nutrition")}
            </p>
            <h2 className="text-3xl text-[#4a3f44] font-light">
              Healthy Eating <span className="italic">On A Budget</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PrintButton targetId="printable-meals" label={t("Print Meals")} />
            <div className="bg-[#fdf2f5]/80 border border-[#f8d7e1] p-4 rounded-3xl text-center shadow-sm backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-widest text-[#d8a7b5] mb-1 font-bold">
                {t("Today's Meal Cost")}
              </p>
              <p className="text-2xl font-semibold text-[#4a3f44]">
                €{mealPlan.totalPrice.toFixed(2)}
              </p>
              <p className="text-[9px] text-[#b98fa1] mt-1">{mealPlan.focus}</p>
            </div>
          </div>
        </div>

        {/* Printable meal content (hidden wrapper for print) */}
        <div id="printable-meals">
          <h2 style={{ display: "none" }}>Day {day} Meal Plan — {mealPlan.focus}</h2>

        {/* Macros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Calories", value: nutrition.calories, unit: "kcal" },
            { label: "Protein", value: nutrition.protein, unit: "g" },
            { label: "Fiber", value: nutrition.fiber, unit: "g" },
            { label: "Water", value: nutrition.water, unit: "L" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-white/40 border border-[#f0e3e8] text-center"
            >
              <div className="text-[9px] uppercase tracking-widest text-[#d8a7b5] mb-1 font-bold">
                {stat.label}
              </div>
              <div className="text-2xl font-light text-[#4a3f44]">
                {stat.value}
                <span className="text-xs ml-1 opacity-60">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Meals */}
        <div className="grid md:grid-cols-2 gap-4">
          {mealPlan.meals.map(({ slot, meal }, i) => {
            const isFree = plan === "free";
            // Free plan: Day 1 = all 4 meals, Day 2-7 = only breakfast, Day 8+ = locked
            const freeDayLimit = 7;
            const isFreeTrial = isFree && day <= freeDayLimit;
            const isFreeExpired = isFree && day > freeDayLimit;
            const isLocked = isFreeExpired || (isFree && day > 1 && slot !== "breakfast");
            const slotLabels: Record<string, string> = {
              breakfast: "Breakfast",
              lunch: "Lunch",
              dinner: "Dinner",
              snack: "Snack",
            };

            return (
              <div
                key={meal.title + i}
                className={`p-6 rounded-[30px] bg-white/40 border transition-all ${
                  isLocked
                    ? "opacity-40 grayscale blur-[1px] pointer-events-none border-[#f0e3e8]"
                    : "border-[#f0e3e8] hover:shadow-md"
                }`}
              >
                <div className="flex justify-between gap-3 mb-3">
                  <span className="text-[9px] px-3 py-1 rounded-full bg-[#fdf2f5] text-[#d8a7b5] font-bold uppercase tracking-widest">
                    {slotLabels[slot]}
                  </span>
                  <span className="text-sm font-semibold text-[#4a3f44]">
                    €{meal.price.toFixed(2)}
                  </span>
                </div>

                <h3 className="text-xl text-[#4a3f44] mb-1 font-medium">
                  {meal.title}
                </h3>
                <p className="text-[#7b6870] mb-4 text-xs italic">
                  {meal.subtitle}
                </p>

                <div className="flex gap-3 text-[10px] text-[#d8a7b5] font-bold uppercase tracking-tight mb-4">
                  <span>⏱ {meal.prep}</span>
                  <span>🔥 {meal.kcal} kcal</span>
                  <span>💪 {meal.protein}g protein</span>
                </div>

                {/* Ingredients with amounts */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold uppercase text-[#4a3f44] mb-2 tracking-widest opacity-70">
                    Ingredients
                  </h4>
                  <ul className="grid grid-cols-1 gap-1 text-[#6f5a62] text-xs">
                    {meal.ingredients.map((item, idx) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d8a7b5]" />
                        <span className="font-medium">{meal.amounts?.[idx]}</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation steps */}
                {!isLocked && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-[#4a3f44] mb-2 tracking-widest opacity-70">
                      How to Make
                    </h4>
                    <ol className="space-y-1 text-[#6f5a62] text-xs">
                      {meal.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-[#d8a7b5] font-bold shrink-0">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Benefits */}
                {!isLocked && meal.benefits.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {meal.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-[#fdf2f5] text-[#b98fa1] border border-[#f0e3e8]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {plan === "free" && (
          <div className="mt-8 text-center p-8 rounded-[34px] bg-[#fdf2f5]/60 border border-dashed border-[#d8a7b5]/40 backdrop-blur-sm">
            {day <= 7 ? (
              <>
                <h3 className="text-lg text-[#4a3f44] font-semibold mb-1">
                  Free Trial: Day {day} of 7
                </h3>
                <p className="text-sm text-[#7b6870] mb-4">
                  {day === 1
                    ? "Today you get all 4 meals with full recipes. From tomorrow, only breakfast is free."
                    : `${8 - day} days left in your free trial. Upgrade to unlock all meals.`}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg text-[#4a3f44] font-semibold mb-1">
                  Your Free Trial Has Ended
                </h3>
                <p className="text-sm text-[#7b6870] mb-4">
                  Upgrade to continue with full meal plans and exercises.
                </p>
              </>
            )}
            <Link
              href="/pricing"
              className="btn-primary px-8 py-3 text-sm inline-block"
            >
              Upgrade to Premium Plan
            </Link>
          </div>
        )}
        </div>{/* close printable-meals */}
      </section>

      {/* EXERCISES LIST */}
      <section className="soft-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-[#4a3f44] italic">{t("Today's Routine")}</h2>
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
                  <div className="text-base text-[#4a3f44] font-medium leading-none mb-1">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#d8a7b5] uppercase tracking-[0.2em] font-bold">
                      {item.reps}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#fdf2f5] text-[#b98fa1] border border-[#f0e3e8]">
                      {CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[#7b6870] font-light text-xs italic opacity-60">
                {Math.floor(item.seconds / 60)}:{String(item.seconds % 60).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
