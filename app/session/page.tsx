"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getTodayProgram } from "@/lib/programs";

type Exercise = {
  name: string;
  image: string;
  start: string;
  end: string;
  why: string;
  reps: string;
  seconds: number;
};

export default function SessionPage() {
  const [day, setDay] =
    useState(1);

  const [started, setStarted] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const [index, setIndex] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(120);

  useEffect(() => {
    const savedDay =
      localStorage.getItem(
        "day"
      );

    if (savedDay) {
      setDay(
        Number(
          savedDay
        )
      );
    }
  }, []);

  const program =
    useMemo(() => {
      return getTodayProgram(
        day
      );
    }, [day]);

  const current =
    program.exercises[
      index
    ];

  useEffect(() => {
    if (
      !started ||
      finished
    )
      return;

    const timer =
      setInterval(() => {
        setTimeLeft(
          (
            prev
          ) => {
            if (
              prev <= 1
            ) {
              nextExercise();
              return 120;
            }

            return prev - 1;
          }
        );
      }, 1000);

    return () =>
      clearInterval(
        timer
      );
  }, [
    started,
    index,
    finished,
  ]);

  function startSession() {
    setStarted(true);
  }

  function nextExercise() {
    if (
      index <
      program.exercises
        .length -
        1
    ) {
      setIndex(
        (
          prev
        ) =>
          prev +
          1
      );
      setTimeLeft(
        120
      );
    } else {
      setFinished(
        true
      );
      setStarted(
        false
      );

      localStorage.setItem(
        "day",
        String(
          day + 1
        )
      );
    }
  }

  function skip() {
    nextExercise();
  }

  function format(
    sec: number
  ) {
    const m =
      Math.floor(
        sec / 60
      );
    const s =
      sec % 60;

    return `${m}:${String(
      s
    ).padStart(
      2,
      "0"
    )}`;
  }

  if (
    finished
  ) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <section className="soft-card p-12 text-center">
          <div className="text-7xl mb-6">
            ✅
          </div>

          <h1 className="text-5xl mb-4">
            Session Complete
          </h1>

          <p className="text-xl text-[#7b6870] mb-8">
            Amazing work today.
            Your next day is unlocked.
          </p>

          <Link
            href="/dashboard"
            className="btn-primary"
          >
            Return Dashboard
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 text-center mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Live Session
        </p>

        <h1 className="text-5xl mb-3">
          {program.title}
        </h1>

        <p className="text-[#7b6870] mb-8">
          Exercise{" "}
          {index + 1} of{" "}
          {
            program
              .exercises
              .length
          }
        </p>

        {!started ? (
          <button
            onClick={
              startSession
            }
            className="w-40 h-40 rounded-full bg-[#d9a8b8] text-white text-5xl mx-auto shadow-xl hover:scale-105 transition"
          >
            ▶
          </button>
        ) : (
          <div className="text-6xl">
            {format(
              timeLeft
            )}
          </div>
        )}
      </section>

      <section className="soft-card p-8 mb-8">
        <img
          src={
            current.image
          }
          alt={
            current.name
          }
           className="w-full h-[300px] object-cover object-center scale-125 rounded-3xl mb-6"
        />

        <h2 className="text-5xl mb-4">
          {
            current.name
          }
        </h2>

        <div className="grid md:grid-cols-2 gap-5 text-[#6f5a62] mb-6">
          <div className="p-5 rounded-3xl bg-white border border-[#f0e3e8]">
            <strong>
              Start:
            </strong>{" "}
            {
              current.start
            }
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#f0e3e8]">
            <strong>
              Finish:
            </strong>{" "}
            {
              current.end
            }
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#fff4f7] mb-6">
          ✨ {
            current.why
          }
        </div>

        <div className="flex gap-4">
          <button
            onClick={
              skip
            }
            className="btn-outline"
          >
            Skip
          </button>

          <button
            onClick={
              nextExercise
            }
            className="btn-primary"
          >
            Next Exercise
          </button>
        </div>
      </section>

      <section className="soft-card p-8">
        <h3 className="text-3xl mb-5">
          Up Next
        </h3>

        <div className="grid gap-3">
          {program.exercises
            .slice(
              index +
                1
            )
            .map(
              (
                item,
                i
              ) => (
                <div
                  key={
                    item.name +
                    i
                  }
                  className="p-4 rounded-3xl bg-white border border-[#f0e3e8]"
                >
                  {index +
                    i +
                    2}
                  .{" "}
                  {
                    item.name
                  }
                </div>
              )
            )}
        </div>
      </section>
    </main>
  );
}
