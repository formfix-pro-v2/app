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
  goal?: string;
};

export default function ResultsPage() {
  const [data, setData] =
    useState<QuizData>({
      symptoms: [],
      time: "10 min",
      age: "40+",
      height: "168",
      weight: "72",
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

  /* ORIGINAL RESULTS LOGIC */
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

    if (
      symptoms.includes(
        "Joint pain"
      )
    ) {
      title =
        "Joint Ease Mobility";

      subtitle =
        "Gentle movement for stiffness and pain relief.";

      focus = [
        "Hip & knee mobility",
        "Spine comfort",
        "Low impact sessions",
        "Daily flexibility",
      ];
    }

    return {
      title,
      subtitle,
      focus,
    };
  }, [data]);

  /* NEW NUTRITION ENGINE */
  const nutrition =
    useMemo(() => {
      return calculateNutrition(
        {
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
        }
      );
    }, [data]);

  const meals =
    useMemo(() => {
      return getMealPlan(
        data.symptoms ||
          []
      );
    }, [data]);

  const breakfast =
    meals[0];

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
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

      {/* PROFILE */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Age Group
          </div>

          <div className="text-3xl">
            {data.age ||
              "40+"}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Daily Time
          </div>

          <div className="text-3xl">
            {data.time ||
              "10 min"}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Symptoms
          </div>

          <div className="text-3xl">
            {
              (
                data.symptoms ||
                []
              ).length
            }
          </div>
        </div>
      </section>

      {/* FOCUS */}
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

      {/* SYMPTOMS */}
      {(data.symptoms ||
        [])
        .length >
        0 && (
        <section className="soft-card p-8 mb-8">
          <h2 className="text-4xl mb-6">
            Based On Your Symptoms
          </h2>

          <div className="flex flex-wrap gap-3">
            {(
              data.symptoms ||
              []
            ).map(
              (
                item
              ) => (
                <span
                  key={
                    item
                  }
                  className="px-4 py-3 rounded-full bg-[#fff3f6] border border-[#ead8de]"
                >
                  {
                    item
                  }
                </span>
              )
            )}
          </div>
        </section>
      )}

      {/* RECOMMENDATION */}
      <section className="soft-card p-10 mb-8">
        <h2 className="text-5xl mb-5">
          Recommended Next Step
        </h2>

        <p className="text-[#7b6870] text-lg leading-relaxed mb-8">
          Start your personalized dashboard now and receive
          a daily guided plan built around your goals and
          symptoms.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="btn-primary"
          >
            Start Free Dashboard
          </Link>

          <Link
            href="/pricing"
            className="btn-outline"
          >
            Unlock Premium
          </Link>
        </div>
      </section>

      {/* PREMIUM TEASE */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          "Sleep Reset Protocols",
          "Belly Tone After 40",
          "Confidence & Glow Routines",
        ].map(
          (
            item
          ) => (
            <div
              key={
                item
              }
              className="soft-card p-6 text-center"
            >
              ✨ {item}
            </div>
          )
        )}
      </section>

      {/* NEW NUTRITION PREVIEW */}
      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Nutrition Blueprint
        </p>

        <h2 className="text-5xl mb-6">
          Your Personalized Calories & Meals
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
          ].map(
            (
              [
                label,
                val,
              ]
            ) => (
              <div
                key={
                  label
                }
                className="p-5 rounded-3xl bg-white border border-[#f0e3e8] text-center"
              >
                <div className="text-sm text-[#7b6870] mb-2">
                  {
                    label
                  }
                </div>

                <div className="text-3xl">
                  {
                    val
                  }
                </div>
              </div>
            )
          )}
        </div>

        {/* FREE BREAKFAST */}
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
              }{" "}
              kcal
            </div>

            <div className="p-3 rounded-2xl bg-[#fff4f7]">
              {
                breakfast.protein
              }
              g protein
            </div>

            <div className="p-3 rounded-2xl bg-[#fff4f7]">
              Prep{" "}
              {
                breakfast.prep
              }
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xl mb-3">
                Ingredients
              </h4>

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
                      •{" "}
                      {
                        item
                      }
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl mb-3">
                Method
              </h4>

              <ol className="space-y-2 text-[#6f5a62]">
                {breakfast.steps.map(
                  (
                    step,
                    i
                  ) => (
                    <li
                      key={
                        step
                      }
                    >
                      {i + 1}.{" "}
                      {
                        step
                      }
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>

        {/* LOCKED */}
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
                {
                  item
                }
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
