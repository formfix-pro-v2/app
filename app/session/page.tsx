"use client";

import { useEffect, useMemo, useState } from "react";
import { getTodayProgram } from "@/lib/programs";

type Exercise = {
  name: string;
  duration?: number;
  image?: string;
};

export default function SessionPage() {
  const [day, setDay] = useState(1);

  const [running, setRunning] =
    useState(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [secondsLeft, setSecondsLeft] =
    useState(120);

  useEffect(() => {
    const saved =
      Number(
        localStorage.getItem("day")
      ) || 1;

    setDay(saved);
  }, []);

  const session = useMemo(() => {
    return getTodayProgram(day);
  }, [day]);

  const exercises =
    (session.exercises ||
      []) as Exercise[];

  const totalSeconds =
    exercises.length * 120;

  const totalMinutes = Math.floor(
    totalSeconds / 60
  );

  const active =
    exercises[currentIndex];

  /* PLAY WHOLE SESSION */
  function startSession() {
    if (!exercises.length) return;

    setRunning(true);
    setCurrentIndex(0);
    setSecondsLeft(120);
  }

  function pauseSession() {
    setRunning(false);
  }

  function resetSession() {
    setRunning(false);
    setCurrentIndex(0);
    setSecondsLeft(120);
  }

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        /* next exercise */
        if (
          currentIndex <
          exercises.length - 1
        ) {
          setCurrentIndex(
            (i) => i + 1
          );
          return 120;
        }

        /* finished */
        setRunning(false);
        return 0;
      });
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    running,
    currentIndex,
    exercises.length,
  ]);

  function format(
    seconds: number
  ) {
    const m = Math.floor(
      seconds / 60
    );
    const s = seconds % 60;

    return `${m}:${String(s).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="soft-card p-10 mb-8 text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Guided Session
        </p>

        <h1 className="text-5xl mb-4">
          Confidence Feminine Reset - Day{" "}
          {day}
        </h1>

        {/* BIG PLAY BUTTON */}
        <div className="my-8">
          {!running ? (
            <button
              onClick={
                startSession
              }
              className="w-28 h-28 rounded-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1] text-white text-4xl shadow-[0_20px_40px_rgba(185,143,161,0.30)] hover:scale-105 transition"
            >
              ▶
            </button>
          ) : (
            <button
              onClick={
                pauseSession
              }
              className="w-28 h-28 rounded-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1] text-white text-4xl shadow-[0_20px_40px_rgba(185,143,161,0.30)]"
            >
              ❚❚
            </button>
          )}
        </div>

        <div className="text-6xl mb-3">
          {totalMinutes}:00
        </div>

        <p className="text-[#7b6870]">
          Full guided premium
          session
        </p>

        {running && (
          <div className="mt-8 p-6 rounded-3xl bg-[#fff4f7]">
            <p className="text-sm text-[#7b6870] mb-2">
              Current Exercise
            </p>

            <h2 className="text-3xl mb-4">
              {active?.name}
            </h2>

            <div className="text-5xl">
              {format(
                secondsLeft
              )}
            </div>
          </div>
        )}

        {!running && (
          <button
            onClick={
              resetSession
            }
            className="btn-outline mt-6"
          >
            Reset Session
          </button>
        )}
      </section>

      {/* EXERCISES */}
      <section className="grid md:grid-cols-2 gap-6">
        {exercises.map(
          (exercise, index) => (
            <div
              key={
                exercise.name +
                index
              }
              className={`soft-card p-6 ${
                index ===
                currentIndex
                  ? "ring-2 ring-[#d6a7b1]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fff1f5] flex items-center justify-center text-[#8f5d6f]">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-2xl">
                    {
                      exercise.name
                    }
                  </h3>

                  <p className="text-[#7b6870]">
                    2 minutes
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}
