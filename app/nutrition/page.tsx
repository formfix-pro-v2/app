"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateNutrition,
  getMealPlan,
} from "@/lib/nutrition";

type Meal = ReturnType<
  typeof getMealPlan
>[number];

export default function NutritionPage() {
  const [openMeal, setOpenMeal] =
    useState<string | null>(
      "b1"
    );

  const [premium, setPremium] =
    useState(true);

  /* demo profile – kasnije povuci iz kviza */
  const profile = {
    age: 48,
    height: 168,
    weight: 72,
    goal: "tone" as const,
    symptoms: [
      "Poor sleep",
      "Bloating",
    ],
  };

  const plan = useMemo(
    () =>
      calculateNutrition(
        profile
      ),
    []
  );

  const meals = useMemo(
    () =>
      getMealPlan(
        profile.symptoms
      ),
    []
  );

  function toggleMeal(
    id: string
  ) {
    setOpenMeal((prev) =>
      prev === id
        ? null
        : id
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="soft-card p-10 mb-10">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Adaptive Nutrition System
        </p>

        <h1 className="text-6xl mb-5">
          Your Personalized Meal Plan
        </h1>

        <p className="text-[#7b6870] text-xl max-w-3xl">
          Designed for your age,
          body metrics, goals and
          menopause symptoms.
        </p>
      </section>

      {/* TARGETS */}
      <section className="grid md:grid-cols-6 gap-4 mb-10">
        {[
          [
            "Calories",
            `${plan.calories}`,
          ],
          [
            "Protein",
            `${plan.protein}g`,
          ],
          [
            "Carbs",
            `${plan.carbs}g`,
          ],
          [
            "Fats",
            `${plan.fats}g`,
          ],
          [
            "Fiber",
            `${plan.fiber}g`,
          ],
          [
            "Water",
            `${plan.water}L`,
          ],
        ].map(
          ([label, val]) => (
            <div
              key={label}
              className="soft-card p-5 text-center"
            >
              <div className="text-sm text-[#7b6870] mb-2">
                {label}
              </div>

              <div className="text-3xl">
                {val}
              </div>
            </div>
          )
        )}
      </section>

      {/* MEALS */}
      <section className="space-y-6 mb-12">
        {meals.map(
          (
            meal,
            index
          ) => {
            const locked =
              !premium &&
              index > 0;

            return (
              <div
                key={meal.key}
                className="soft-card p-6"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="uppercase text-xs tracking-[0.25em] text-[#b98fa1] mb-2">
                      {
                        meal.type
                      }
                    </p>

                    <h2 className="text-4xl mb-2">
                      {
                        meal.title
                      }
                    </h2>

                    <p className="text-[#7b6870]">
                      {
                        meal.subtitle
                      }
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl">
                      {
                        meal.kcal
                      }{" "}
                      kcal
                    </div>

                    <div className="text-[#7b6870]">
                      {
                        meal.protein
                      }
                      g protein
                    </div>

                    <div className="text-[#7b6870]">
                      Prep{" "}
                      {
                        meal.prep
                      }
                    </div>
                  </div>
                </div>

                {/* BENEFITS */}
                <div className="mt-5 p-4 rounded-2xl bg-[#fff4f7] text-[#7a646d]">
                  ✨ {
                    meal.benefits
                  }
                </div>

                {/* LOCKED */}
                {locked ? (
                  <div className="mt-6 p-6 rounded-3xl border border-dashed border-[#e8c8d3] text-center">
                    <p className="text-xl mb-4">
                      Premium meal details
                      locked 🔒
                    </p>

                    <Link
                      href="/pricing"
                      className="btn-primary"
                    >
                      Unlock Full Nutrition
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* TOGGLE */}
                    <button
                      onClick={() =>
                        toggleMeal(
                          meal.key
                        )
                      }
                      className="btn-outline mt-6"
                    >
                      {openMeal ===
                      meal.key
                        ? "Hide Recipe"
                        : "View Recipe"}
                    </button>

                    {/* DETAILS */}
                    {openMeal ===
                      meal.key && (
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="p-5 rounded-3xl bg-white border border-[#f0e3e8]">
                          <h3 className="text-2xl mb-4">
                            Ingredients
                          </h3>

                          <ul className="space-y-2 text-[#6f5a62]">
                            {meal.ingredients.map(
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

                        <div className="p-5 rounded-3xl bg-white border border-[#f0e3e8]">
                          <h3 className="text-2xl mb-4">
                            Method
                          </h3>

                          <ol className="space-y-2 text-[#6f5a62]">
                            {meal.steps.map(
                              (
                                step,
                                i
                              ) => (
                                <li
                                  key={
                                    step
                                  }
                                >
                                  {i + 1}
                                  .{" "}
                                  {
                                    step
                                  }
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          }
        )}
      </section>

      {/* CTA */}
      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-4">
          Want 30 / 90 Rotating Days?
        </h2>

        <p className="text-[#7b6870] text-lg mb-8">
          Unlock adaptive premium
          menus, symptom-based meals,
          shopping lists and weekly
          adjustments.
        </p>

        <Link
          href="/pricing"
          className="btn-primary"
        >
          Upgrade Now
        </Link>
      </section>
    </main>
  );
}
