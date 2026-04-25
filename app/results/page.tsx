app/results/page.tsx
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
  foodStyle?: string;
};

export default function ResultsPage() {
  const [data, setData] =
    useState<QuizData>({
      symptoms: [],
      time: "10 min",
      age: "48",
      height: "168",
      weight: "72",
      activity: "light",
      goal: "tone",
      foodStyle: "balanced",
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

  const result = useMemo(() => {
    const symptoms =
      data.symptoms || [];

    let title =
      "Balanced Glow Reset";

    let subtitle =
      "Designed to improve energy, posture and confidence.";

    let focus = [
      "Daily guided movement",
      "Gentle metabolism support",
      "Stress relief flows",
      "Better body confidence",
    ];

    if (
      symptoms.includes(
        "Hot flashes"
      ) ||
      symptoms.includes(
        "Poor sleep"
      )
    ) {
      title =
        "Sleep & Cooling Recovery";

      subtitle =
        "Focused on evening calm, better sleep and heat regulation.";

      focus = [
        "Cooling evening sessions",
        "Nervous system reset",
        "Sleep support habits",
        "Stress reduction",
      ];
    }

    if (
      symptoms.includes(
        "Weight gain"
      )
    ) {
      title =
        "Metabolism Sculpt Plan";

      subtitle =
        "Targets waistline, energy and body composition.";

      focus = [
        "Waist toning sessions",
        "Strength flows",
        "Daily calorie burn support",
        "Confidence rebuilding",
      ];
    }

    return {
      title,
      subtitle,
      focus,
    };
  }, [data]);

  const nutrition =
    useMemo(() => {
      return calculateNutrition({
        age:
          Number(
            data.age
          ) || 48,
        height:
          Number(
            data.height
          ) || 168,
        weight:
          Number(
            data.weight
          ) || 72,
        activity:
          data.activity ||
          "light",
        goal:
          (data.goal as
            | "fat_loss"
            | "maintain"
            | "tone"
            | "energy") ||
          "tone",
        symptoms:
          data.symptoms ||
          [],
      });
    }, [data]);

  const meals =
    useMemo(() => {
      return getMealPlan(
        data.symptoms ||
          [],
        data.foodStyle ||
          "balanced"
      );
    }, [data]);

  const breakfast =
    meals[0];

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 text-center mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Your Personalized Result
        </p>

        <h1 className="text-5xl md:text-6xl mb-5">
          {result.title}
        </h1>

        <p className="text-[#7b6870] text-xl max-w-3xl mx-auto leading-relaxed">
          {
            result.subtitle
          }
        </p>
      </section>

      <section className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          [
            "Age",
            data.age,
          ],
          [
            "Weight",
            `${data.weight} kg`,
          ],
          [
            "Height",
            `${data.height} cm`,
          ],
          [
            "Activity",
            data.activity,
          ],
        ].map(
          ([a, b]) => (
            <div
              key={
                String(a)
              }
              className="soft-card p-6"
            >
              <div className="text-sm text-[#7b6870] mb-2">
                {a}
              </div>

              <div className="text-3xl">
                {b}
              </div>
            </div>
          )
        )}
      </section>

      <section className="soft-card p-8 mb-8">
        <h2 className="text-4xl mb-6">
          Your Main Focus Areas
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {result.focus.map(
            (
              item
            ) => (
              <div
                key={
                  item
                }
                className="p-5 rounded-3xl bg-white border border-[#f0e3e8]"
              >
                ✓ {item}
              </div>
            )
          )}
        </div>
      </section>

      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Nutrition Blueprint
        </p>

        <h2 className="text-5xl mb-6">
          Precision Calories & Meals
        </h2>

        <p className="text-[#7b6870] mb-8">
          Calculated using your
          age, weight, height,
          activity level and goal.
        </p>

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
          ].map(
            (
              [
                label,
                val,
              ]
            ) => (
              <div
                key={
                  String(
                    label
                  )
                }
                className="p-5 rounded-3xl bg-white border border-[#f0e3e8] text-center"
              >
                <div className="text-sm text-[#7b6870] mb-2">
                  {
                    label
                  }
                </div>

                <div className="text-3xl">
                  {val}
                </div>
              </div>
            )
          )}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#f0e3e8] mb-6">
          <p className="uppercase text-xs tracking-[0.25em] text-[#b98fa1] mb-2">
            Free Meal Preview
          </p>

          <h3 className="text-3xl mb-3">
            {
              breakfast.title
            }
          </h3>

          <p className="text-[#7b6870] mb-4">
            {
              breakfast.subtitle
            }
          </p>

          <div className="grid md:grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-[#fff4f7]">
              {
                breakfast.kcal
              } kcal
            </div>

            <div className="p-3 rounded-2xl bg-[#fff4f7]">
              {
                breakfast.protein
              }g protein
            </div>

            <div className="p-3 rounded-2xl bg-[#fff4f7]">
              Prep {
                breakfast.prep
              }
            </div>
          </div>

          <ul className="space-y-2 text-[#6f5a62]">
            {breakfast.ingredients.map(
              (
                item
              ) => (
                <li
                  key={
                    item
                  }
                >
                  • {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            "Lunch Plan 🔒",
            "Dinner Plan 🔒",
            "Snack Plan 🔒",
          ].map(
            (
              item
            ) => (
              <div
                key={
                  item
                }
                className="p-6 rounded-3xl border border-dashed border-[#e8c8d3] text-center"
              >
                {item}
              </div>
            )
          )}
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
