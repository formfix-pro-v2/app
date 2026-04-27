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
  const [day, setDay] =
    useState(1);

  const [plan, setPlan] =
    useState("free");

  const [data, setData] =
    useState<QuizData>({
      symptoms: [],
      age: "48",
      height: "168",
      weight: "72",
      activity: "light",
      goal: "tone",
    });

  useEffect(() => {
    const savedDay =
      localStorage.getItem(
        "day"
      );

    const savedPlan =
      localStorage.getItem(
        "plan"
      );

    const raw =
      localStorage.getItem(
        "quizData"
      );

    if (savedDay)
      setDay(
        Number(
          savedDay
        )
      );

    if (savedPlan)
      setPlan(savedPlan);

    if (raw) {
      try {
        setData(
          JSON.parse(raw)
        );
      } catch {}
    }
  }, []);

  const program =
    useMemo(() => {
      return getTodayProgram(
        day
      );
    }, [day]);

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
          (data.activity as any) ||
          "light",
        goal:
          (data.goal as any) ||
          "tone",
        symptoms:
          data.symptoms || [],
      });
    }, [data]);

  const meals =
    useMemo(() => {
      return getMealPlan(
        nutrition.calories
      );
    }, [nutrition]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* TODAY PROGRAM */}
      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-3 font-semibold">
          Today Program • Day{" "}
          {day}
        </p>

        <h1 className="text-5xl mb-3 text-[#4a3f44]">
          {program.title}
        </h1>

        <p className="text-[#7b6870] text-lg italic mb-5">
          {program.theme}
        </p>

        <div className="flex flex-wrap gap-4 text-[#b98fa1] text-xl mb-8">
          <span>
            ⏱{" "}
            {program.exercises
              .length *
              2}
            :00 min
          </span>

          <span>
            •{" "}
            {
              program
                .exercises
                .length
            }{" "}
            Exercises
          </span>
        </div>

        <Link
          href="/session"
          className="btn-primary"
        >
          Start Full Session
        </Link>
      </section>

      {/* DAILY NUTRITION */}
      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-6 font-semibold">
          Daily Nutrition
        </p>

        {/* macros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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
            ([a, b]) => (
              <div
                key={String(
                  a
                )}
                className="p-6 rounded-3xl bg-white border border-[#f0e3e8] text-center"
              >
                <div className="text-xs uppercase tracking-widest text-[#b98fa1] mb-2">
                  {a}
                </div>

                <div className="text-3xl text-[#4a3f44]">
                  {b}
                </div>
              </div>
            )
          )}
        </div>

        {/* all meals visible */}
        <div className="grid md:grid-cols-2 gap-5">
          {meals.map(
            (
              meal,
              i
            ) => (
              <div
                key={
                  meal.title +
                  i
                }
                className="p-7 rounded-[34px] bg-white border border-[#f0e3e8]"
              >
                <div className="flex justify-between gap-3 mb-3">
                  <h3 className="text-2xl text-[#4a3f44]">
                    {
                      meal.title
                    }
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-[#fff4f7] border border-[#f7dfe7] text-[#b98fa1] h-fit">
                    {i === 0
                      ? "Breakfast"
                      : i === 1
                      ? "Lunch"
                      : i === 2
                      ? "Dinner"
                      : "Snack"}
                  </span>
                </div>

                <p className="text-[#7b6870] mb-4">
                  {
                    meal.subtitle
                  }
                </p>

                <div className="text-sm text-[#b98fa1] mb-5">
                  {
                    meal.kcal
                  }{" "}
                  kcal •{" "}
                  {
                    meal.protein
                  }
                  g protein • Prep{" "}
                  {
                    meal.prep
                  }
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    Ingredients
                  </h4>

                  <ul className="space-y-1 text-[#6f5a62] text-sm">
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

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    Preparation
                  </h4>

                  <ol className="space-y-1 text-[#6f5a62] text-sm">
                    {meal.steps.map(
                      (
                        step,
                        idx
                      ) => (
                        <li
                          key={
                            step
                          }
                        >
                          {idx + 1}
                          .{" "}
                          {
                            step
                          }
                        </li>
                      )
                    )}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Benefits
                  </h4>

                  <ul className="space-y-1 text-[#6f5a62] text-sm">
                    {meal.benefits.map(
                      (
                        item
                      ) => (
                        <li
                          key={
                            item
                          }
                        >
                          ✨{" "}
                          {
                            item
                          }
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>

        {plan ===
          "free" && (
          <div className="mt-8 text-center p-8 rounded-3xl bg-[#fff4f7] border border-dashed border-[#d9a8b8]">
            <p className="text-[#7b6870] mb-4">
              Upgrade for
              weekly rotating
              menus,
              shopping
              lists &
              premium
              hormone plans.
            </p>

            <Link
              href="/pricing"
              className="btn-primary inline-block"
            >
              Upgrade Plan
            </Link>
          </div>
        )}
      </section>

      {/* EXERCISES */}
      <section className="soft-card p-10">
        <h2 className="text-3xl mb-8 text-[#4a3f44]">
          Today's
          Exercises
        </h2>

        <div className="grid gap-4">
          {program.exercises.map(
            (
              item,
              i
            ) => (
              <div
                key={
                  item.name +
                  i
                }
                className="p-5 rounded-2xl bg-white border border-[#f0e3e8] flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#f0e3e8] flex items-center justify-center text-sm text-[#b98fa1] font-bold">
                    {i + 1}
                  </span>

                  <span className="text-lg text-[#4a3f44] font-medium">
                    {
                      item.name
                    }
                  </span>
                </div>

                <div className="text-[#7b6870]">
                  {
                    item.reps
                  }
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
