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
      activity: "1.375",
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

    if (savedDay) {
      setDay(
        Number(
          savedDay
        )
      );
    }

    if (savedPlan) {
      setPlan(
        savedPlan
      );
    }

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
          Number(
            data.activity
          ) || 1.375,
        goal:
          (data.goal as any) ||
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
          []
      );
    }, [data]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-3">
          Today Program
        </p>

        <h1 className="text-5xl mb-3">
          {program.title}
        </h1>

        <p className="text-[#7b6870] mb-5">
          {program.theme}
        </p>

        <div className="text-3xl mb-8">
          {program.exercises.length * 2}:00
        </div>

        <Link
          href="/session"
          className="btn-primary"
        >
          Start Full Session
        </Link>
      </section>

      <section className="soft-card p-8 mb-8">
        <h2 className="text-4xl mb-6">
          Today's Exercises
        </h2>

        <div className="grid gap-3">
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
                className="p-5 rounded-3xl bg-white border border-[#f0e3e8] flex justify-between"
              >
                <span>
                  {i + 1}.{" "}
                  {
                    item.name
                  }
                </span>

                <span>
                  2 min
                </span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="soft-card p-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-3">
          Daily Nutrition
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                a,
                b,
              ]
            ) => (
              <div
                key={
                  String(
                    a
                  )
                }
                className="p-4 rounded-3xl bg-white border border-[#f0e3e8] text-center"
              >
                <div className="text-sm text-[#7b6870]">
                  {a}
                </div>

                <div className="text-2xl">
                  {b}
                </div>
              </div>
            )
          )}
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#f0e3e8] mb-4">
          <div className="text-xl mb-2">
            {
              meals[0]
                .title
            }
          </div>

          <div className="text-[#7b6870]">
            {
              meals[0]
                .subtitle
            }
          </div>
        </div>

        {plan ===
        "free" ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Lunch 🔒",
              "Dinner 🔒",
              "Snack 🔒",
            ].map(
              (
                item
              ) => (
                <div
                  key={
                    item
                  }
                  className="p-5 rounded-3xl border border-dashed border-[#e8c8d3] text-center"
                >
                  {
                    item
                  }
                </div>
              )
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              meals[1]
                ?.title,
              meals[2]
                ?.title,
              meals[3]
                ?.title,
            ].map(
              (
                item
              ) => (
                <div
                  key={
                    item
                  }
                  className="p-5 rounded-3xl bg-white border border-[#f0e3e8] text-center"
                >
                  {
                    item
                  }
                </div>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}
