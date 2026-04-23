"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans } from "@/lib/programs";

export default function DashboardPage() {
  const [day, setDay] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const savedDay = Number(localStorage.getItem("day") || "1");
    setDay(savedDay);
    setPremium(localStorage.getItem("premium") === "true");
  }, []);

  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft <= 0) {
      setSecondsLeft(null);
      setRunningIndex(null);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((s) => (s ? s - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const currentPlan = useMemo(() => {
    return plans[(day - 1) % plans.length];
  }, [day]);

  function startTimer(index: number, sec: number) {
    setRunningIndex(index);
    setSecondsLeft(sec);
  }

  function nextDay() {
    const next = day + 1;
    localStorage.setItem("day", String(next));
    setDay(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = Math.min(Math.round((day / 30) * 100), 100);

  const format = (num: number) => {
    const m = Math.floor(num / 60);
    const s = num % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* HERO */}
      <section className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="soft-card p-8 lg:col-span-2">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
            Today&apos;s Program
          </p>

          <h1 className="text-5xl md:text-6xl mb-4">
            {currentPlan.title}
          </h1>

          <h2 className="text-3xl mb-4">
            {currentPlan.theme}
          </h2>

          <p className="text-[#7b6870] text-lg leading-relaxed">
            {currentPlan.description}
          </p>

          <div className="mt-8">
            <div className="w-full h-3 rounded-full bg-white border border-[#f0e3e8] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-[#7b6870]">
              30-Day Journey Progress: {progress}%
            </p>
          </div>
        </div>

        <div className="soft-card p-8">
          <h3 className="text-3xl mb-5">Your Focus</h3>

          <div className="space-y-3 text-[#7b6870]">
            <div>✓ Better sleep</div>
            <div>✓ Hormone calm</div>
            <div>✓ Lean strength</div>
            <div>✓ Elegant posture</div>
            <div>✓ Daily energy</div>
          </div>

          {!premium && (
            <Link
              href="/pricing"
              className="btn-primary inline-block mt-8"
            >
              Unlock Premium
            </Link>
          )}
        </div>
      </section>

      {/* EXERCISES */}
      <section>
        <h2 className="text-5xl mb-8">Today&apos;s Exercises</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {currentPlan.exercises.map((exercise, index) => (
            <div key={index} className="soft-card p-6">
              {/* BIGGER IMAGE AREA */}
              <div className="relative w-full h-[320px] rounded-3xl overflow-hidden mb-6 bg-[#f8eef1]">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-contain p-3"
                />
              </div>

              <h3 className="text-3xl mb-3">{exercise.name}</h3>

              <p className="text-[#7b6870] mb-4">
                {exercise.why}
              </p>

              <div className="space-y-2 text-sm text-[#7b6870] mb-5">
                <div>
                  <span className="font-semibold text-[#3a2b2f]">
                    Start:
                  </span>{" "}
                  {exercise.start}
                </div>

                <div>
                  <span className="font-semibold text-[#3a2b2f]">
                    Finish:
                  </span>{" "}
                  {exercise.end}
                </div>

                <div>
                  <span className="font-semibold text-[#3a2b2f]">
                    Dose:
                  </span>{" "}
                  {exercise.reps}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() =>
                    startTimer(index, exercise.seconds)
                  }
                  className="btn-primary"
                >
                  Start Timer
                </button>

                {runningIndex === index &&
                  secondsLeft !== null && (
                    <div className="px-5 py-3 rounded-full bg-[#fff3f6] border border-[#ead8de] font-semibold">
                      {format(secondsLeft)}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEXT DAY */}
      <section className="mt-12">
        <div className="soft-card p-10 text-center">
          <h3 className="text-4xl mb-4">
            Complete Today & Continue
          </h3>

          <p className="text-[#7b6870] text-lg mb-8">
            Small consistent steps create real hormonal,
            physical and emotional change.
          </p>

          <button onClick={nextDay} className="btn-primary">
            Mark Day Complete
          </button>
        </div>
      </section>
    </main>
  );
}
