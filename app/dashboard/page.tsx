"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPlan } from "@/lib/programs";

type QuizData = {
  symptoms?: string[];
  time?: string;
};

export default function DashboardPage() {
  const [day, setDay] = useState(1);
  const [quiz, setQuiz] = useState<QuizData>({});
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const savedDay = Number(localStorage.getItem("day") || "1");
    setDay(savedDay);

    const raw = localStorage.getItem("quizData");
    if (raw) {
      try {
        setQuiz(JSON.parse(raw));
      } catch {}
    }

    setPremium(localStorage.getItem("premium") === "true");
  }, []);

  const plan = useMemo(() => {
    return getPlan(
      day,
      quiz.symptoms || [],
      quiz.time || "10 min"
    );
  }, [day, quiz]);

  const totalDays = premium ? 90 : 30;

  const completedPercent = Math.min(
    Math.round((day / totalDays) * 100),
    100
  );

  const totalMinutes = plan.exercises.length * 2;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 md:p-10 mb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
              Your Daily Program
            </p>

            <h1 className="text-5xl md:text-6xl mb-4">
              Day {day}
            </h1>

            <h2 className="text-3xl mb-4">
              {plan.title}
            </h2>

            <p className="text-[#7b6870] text-lg leading-relaxed mb-8">
              {plan.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/session"
                className="btn-primary"
              >
                Start Full Session
              </Link>

              <Link
                href="/pricing"
                className="btn-outline"
              >
                Upgrade Premium
              </Link>
            </div>
          </div>

          <div className="soft-card p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white">
                <div className="text-sm text-[#7b6870] mb-2">
                  Session Time
                </div>
                <div className="text-3xl font-semibold">
                  {totalMinutes} min
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white">
                <div className="text-sm text-[#7b6870] mb-2">
                  Exercises
                </div>
                <div className="text-3xl font-semibold">
                  {plan.exercises.length}
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white">
                <div className="text-sm text-[#7b6870] mb-2">
                  Program
                </div>
                <div className="text-xl font-semibold">
                  {premium ? "Premium" : "Free"}
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white">
                <div className="text-sm text-[#7b6870] mb-2">
                  Progress
                </div>
                <div className="text-3xl font-semibold">
                  {completedPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS */}
      <section className="soft-card p-8 mb-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-3xl">
            Transformation Progress
          </h3>

          <span className="text-[#7b6870]">
            Day {day} / {totalDays}
          </span>
        </div>

        <div className="h-4 bg-white rounded-full overflow-hidden border border-[#f0e3e8]">
          <div
            className="h-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
            style={{
              width: `${completedPercent}%`,
            }}
          />
        </div>
      </section>

      {/* EXERCISES */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-4xl">
            Today’s Exercises
          </h3>

          <Link
            href="/session"
            className="btn-outline"
          >
            Guided Mode
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plan.exercises.map((item, i) => (
            <div
              key={i}
              className="soft-card p-5"
            >
              <div className="relative w-full h-[260px] rounded-3xl overflow-hidden bg-[#f9eef2] mb-5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <p className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-2">
                Exercise {i + 1}
              </p>

              <h4 className="text-2xl mb-3">
                {item.name}
              </h4>

              <div className="space-y-2 text-[#7b6870] text-sm leading-relaxed mb-4">
                <p>
                  <strong>Start:</strong>{" "}
                  {item.start}
                </p>

                <p>
                  <strong>Finish:</strong>{" "}
                  {item.end}
                </p>

                <p>{item.why}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className="px-3 py-2 rounded-full bg-[#fff3f6] border border-[#ead8de] text-sm">
                  2 min
                </span>

                <Link
                  href="/session"
                  className="text-[#b98fa1] font-medium"
                >
                  Open →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM CTA */}
      {!premium && (
        <section className="soft-card p-8">
          <h3 className="text-4xl mb-4">
            Unlock Premium Transformation
          </h3>

          <p className="text-[#7b6870] text-lg mb-8 max-w-3xl">
            Get full 90-day menopause programs,
            advanced symptom plans, premium guided
            sessions and deeper body transformation.
          </p>

          <Link
            href="/pricing"
            className="btn-primary"
          >
            Upgrade Now
          </Link>
        </section>
      )}
    </main>
  );
}
