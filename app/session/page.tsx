"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPlan } from "@/lib/programs";

type QuizData = {
  symptoms?: string[];
  time?: string;
};

export default function SessionPage() {
  const [day, setDay] = useState(1);
  const [quiz, setQuiz] = useState<QuizData>({});
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const savedDay = Number(localStorage.getItem("day") || "1");
    setDay(savedDay);

    const raw = localStorage.getItem("quizData");
    if (raw) {
      try {
        setQuiz(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const plan = useMemo(() => {
    return getPlan(
      day,
      quiz.symptoms || [],
      quiz.time || "10 min"
    );
  }, [day, quiz]);

  const current = plan.exercises[index];

  useEffect(() => {
    if (!started || finished) return;

    if (secondsLeft <= 0) {
      if (index < plan.exercises.length - 1) {
        setIndex((v) => v + 1);
        setSecondsLeft(120);
      } else {
        setFinished(true);
      }
      return;
    }

    const t = setTimeout(() => {
      setSecondsLeft((v) => v - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [started, secondsLeft, index, finished, plan]);

  function startSession() {
    setStarted(true);
  }

  function pauseSession() {
    setStarted(false);
  }

  function resumeSession() {
    setStarted(true);
  }

  function skipNext() {
    if (index < plan.exercises.length - 1) {
      setIndex(index + 1);
      setSecondsLeft(120);
    } else {
      setFinished(true);
    }
  }

  function completeDay() {
    const next = day + 1;
    localStorage.setItem("day", String(next));
    window.location.href = "/app/dashboard";
  }

  function format(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  const totalExercises = plan.exercises.length;
  const progress =
    ((index + (120 - secondsLeft) / 120) /
      totalExercises) *
    100;

  const totalRemaining =
    (totalExercises - index - 1) * 120 + secondsLeft;

  if (finished) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="soft-card p-12 text-center">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
            Session Completed
          </p>

          <h1 className="text-6xl mb-4">
            Beautiful Work ✨
          </h1>

          <p className="text-[#7b6870] text-lg mb-8">
            You completed Day {day}. Small consistent
            sessions create real hormonal change.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="soft-card p-5">
              {totalExercises} Exercises
            </div>
            <div className="soft-card p-5">
              {totalExercises * 2} Minutes
            </div>
            <div className="soft-card p-5">
              Streak +1
            </div>
          </div>

          <button
            onClick={completeDay}
            className="btn-primary"
          >
            Unlock Next Day
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* TOP BAR */}
      <section className="soft-card p-6 mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div>
            <p className="text-[#b98fa1] uppercase text-sm tracking-[0.2em]">
              Guided Session
            </p>

            <h1 className="text-4xl">
              {plan.title}
            </h1>
          </div>

          <div className="text-right">
            <div className="text-sm text-[#7b6870]">
              Remaining
            </div>
            <div className="text-3xl font-semibold">
              {format(totalRemaining)}
            </div>
          </div>
        </div>

        <div className="mt-5 h-3 bg-white rounded-full overflow-hidden border border-[#f0e3e8]">
          <div
            className="h-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </section>

      {/* CURRENT CARD */}
      <section className="soft-card p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-4">
          Exercise {index + 1} of {totalExercises}
        </p>

        <div className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-[#f9eef2] mb-8">
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <h2 className="text-5xl mb-4">
          {current.name}
        </h2>

        <p className="text-[#7b6870] mb-2">
          <strong>Start:</strong> {current.start}
        </p>

        <p className="text-[#7b6870] mb-5">
          <strong>Finish:</strong> {current.end}
        </p>

        <p className="text-[#7b6870] mb-8">
          {current.why}
        </p>

        <div className="text-7xl mb-8 font-semibold">
          {format(secondsLeft)}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {!started ? (
            <button
              onClick={startSession}
              className="btn-primary"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseSession}
              className="btn-outline"
            >
              Pause
            </button>
          )}

          {!started && secondsLeft < 120 && (
            <button
              onClick={resumeSession}
              className="btn-primary"
            >
              Resume
            </button>
          )}

          <button
            onClick={skipNext}
            className="btn-outline"
          >
            Skip
          </button>

          <Link
            href="/dashboard"
            className="btn-outline"
          >
            Exit
          </Link>
        </div>
      </section>
    </main>
  );
}
