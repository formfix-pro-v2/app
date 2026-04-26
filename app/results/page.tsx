"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateNutrition,
  getMealPlan,
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
  const [data, setData] =
    useState<QuizData>({
      symptoms: [],
      time: "10 min",
      age: "48",
      height: "168",
      weight: "72",
      activity: "1.375",
      goal: "tone",
    });

  useEffect(() => {
    const raw =
      localStorage.getItem(
        "quizData"
      );

    if (raw) {
      try {
        setData(
          JSON.parse(raw)
        );
      } catch {}
    }
  }, []);

  const nutrition =
    useMemo(() => {
      return calculateNutrition({
        age:
          Number(data.age) || 48,
        height:
          Number(data.height) || 168,
        weight:
          Number(data.weight) || 72,
        activity:
          Number(data.activity) ||
          1.375,
        goal:
          (data.goal as
            | "fat_loss"
            | "maintain"
            | "tone"
            | "energy") ||
          "tone",
        symptoms:
          data.symptoms || [],
      });
    }, [data]);

  const meals =
    useMemo(() => {
      return getMealPlan(
        data.symptoms || []
      );
    }, [data]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 mb-8 text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Your Personalized Result
        </p>

        <h1 className="text-5xl mb-4">
          Balanced Glow Reset
        </h1>

        <p className="text-[#7b6870] text-xl">
          Your custom movement +
          nutrition system is ready.
        </p>
      </section>

      <section className="soft-card p-10 mb-8">
        <h2 className="text-4xl mb-6">
          Nutrition Blueprint
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            [
              "Calories",
              nutrition.calories,
            ],
            [
              "Protein",
              `${nutrition.protein}g`,
            ],
            [
              "Fiber",
              `${nutrition.fiber}g`,
            ],
            [
              "Water",
              `${nutrition.water}L`,
            ],
          ].map(([a, b]) => (
            <div
              key={String(a)}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8] text-center"
            >
              <div className="text-sm text-[#7b6870]">
                {a}
              </div>

              <div className="text-3xl">
                {b}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#f0e3e8] mb-6">
          <h3 className="text-3xl mb-3">
            {meals[0].title}
          </h3>

          <p className="text-[#7b6870] mb-4">
            {meals[0].subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl mb-3">
                Ingredients
              </h4>

              <ul className="space-y-2">
                {meals[0].ingredients.map(
                  (item) => (
                    <li key={item}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl mb-3">
                Method
              </h4>

              <ol className="space-y-2">
                {meals[0].steps.map(
                  (
                    step,
                    i
                  ) => (
                    <li key={step}>
                      {i + 1}. {step}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            "Lunch 🔒",
            "Dinner 🔒",
            "Snack 🔒",
          ].map((item) => (
            <div
              key={item}
              className="p-6 rounded-3xl border border-dashed border-[#e8c8d3] text-center"
            >
              {item}
            </div>
          ))}
        </div>

        <Link
          href="/pricing"
          className="btn-primary"
        >
          Unlock Full Meal System
        </Link>
      </section>
    </main>
  );
}
