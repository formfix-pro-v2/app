"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type QuizData = {
  age?: string;
  stage?: string;
  symptoms?: string[];
  priority?: string;
  fitness?: string;
  time?: string;
};

export default function ResultsPage() {
  const [data, setData] = useState<QuizData>({});

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const program = useMemo(() => {
    const symptoms = data.symptoms || [];

    if (
      data.priority === "Sleep better" ||
      symptoms.includes("Poor sleep") ||
      symptoms.includes("Hot flashes")
    ) {
      return {
        title: "Sleep + Hot Flash Reset",
        subtitle:
          "A calming evening routine designed to reduce overheating, improve sleep quality and restore energy.",
        duration: "10–20 min daily",
        includes: [
          "Cooling nervous-system routines",
          "Evening stretch flows",
          "Breathing for deeper sleep",
          "Low-stress hormone support habits",
        ],
      };
    }

    if (
      data.priority === "Lose belly fat" ||
      symptoms.includes("Weight gain")
    ) {
      return {
        title: "Metabolism + Belly Tone",
        subtitle:
          "Gentle strength and movement plan to support lean shape, confidence and energy after 40.",
        duration: "15–25 min daily",
        includes: [
          "Low-impact toning sessions",
          "Walking + calorie burn structure",
          "Core activation",
          "Consistency tracker",
        ],
      };
    }

    if (
      data.priority === "Move without pain" ||
      symptoms.includes("Joint pain")
    ) {
      return {
        title: "Joint Ease + Mobility",
        subtitle:
          "Mobility-based sessions created to reduce stiffness and help you move freely again.",
        duration: "10–15 min daily",
        includes: [
          "Hip and knee relief flows",
          "Shoulder mobility",
          "Spinal decompression",
          "Recovery movement days",
        ],
      };
    }

    return {
      title: "Confidence + Feminine Energy",
      subtitle:
        "Posture, tone and emotional reset plan to help you feel radiant and strong again.",
      duration: "10–20 min daily",
      includes: [
        "Posture elegance routines",
        "Mood-lifting movement",
        "Confidence habits",
        "Strength + grace training",
      ],
    };
  }, [data]);

  const score = useMemo(() => {
    let total = 72;

    if (data.fitness === "Beginner") total = 78;
    if (data.fitness === "Intermediate") total = 84;
    if (data.fitness === "Active") total = 91;

    if ((data.symptoms || []).length >= 4) total -= 6;

    return Math.max(68, Math.min(96, total));
  }, [data]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* HERO */}
      <section className="soft-card p-8 md:p-12 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Your Personalized Results
        </p>

        <h1 className="text-5xl md:text-6xl mb-4">
          We Built Your Plan
        </h1>

        <p className="text-[#7b6870] text-lg max-w-3xl leading-relaxed">
          Based on your answers, your current body priorities,
          symptom profile and available time, we matched you
          with the most effective starting program.
        </p>
      </section>

      {/* SCORE + PROFILE */}
      <section className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="soft-card p-8 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-4">
            Wellness Score
          </div>

          <div className="text-7xl font-semibold mb-3">
            {score}
          </div>

          <div className="text-[#7b6870]">
            Strong potential for fast progress
          </div>
        </div>

        <div className="soft-card p-8 lg:col-span-2">
          <h2 className="text-3xl mb-5">
            Your Current Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-[#7b6870]">
            <div>
              <span className="font-semibold text-[#3a2b2f]">
                Age:
              </span>{" "}
              {data.age || "-"}
            </div>

            <div>
              <span className="font-semibold text-[#3a2b2f]">
                Stage:
              </span>{" "}
              {data.stage || "-"}
            </div>

            <div>
              <span className="font-semibold text-[#3a2b2f]">
                Fitness:
              </span>{" "}
              {data.fitness || "-"}
            </div>

            <div>
              <span className="font-semibold text-[#3a2b2f]">
                Daily Time:
              </span>{" "}
              {data.time || "-"}
            </div>
          </div>

          {!!data.symptoms?.length && (
            <div className="mt-6">
              <div className="font-semibold mb-3">
                Symptoms:
              </div>

              <div className="flex flex-wrap gap-3">
                {data.symptoms.map((item, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-full bg-[#fff3f6] border border-[#ead8de]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RECOMMENDED PROGRAM */}
      <section className="soft-card p-8 md:p-10 mb-8">
        <p className="uppercase tracking-[0.2em] text-sm text-[#b98fa1] mb-4">
          Recommended Program
        </p>

        <h2 className="text-5xl mb-4">
          {program.title}
        </h2>

        <p className="text-[#7b6870] text-lg leading-relaxed mb-6 max-w-3xl">
          {program.subtitle}
        </p>

        <div className="inline-block px-5 py-3 rounded-full bg-[#fff3f6] border border-[#ead8de] mb-8">
          {program.duration}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {program.includes.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8]"
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="soft-card p-8">
          <h3 className="text-4xl mb-4">
            Start Free Today
          </h3>

          <p className="text-[#7b6870] mb-8">
            Begin your guided dashboard with daily sessions,
            exercise timers and progress tracking.
          </p>

          <Link href="/dashboard" className="btn-primary">
            Open My Dashboard
          </Link>
        </div>

        <div className="soft-card p-8">
          <h3 className="text-4xl mb-4">
            Unlock Premium
          </h3>

          <p className="text-[#7b6870] mb-8">
            Full 90-day transformation programs, advanced
            routines, premium plans and deeper results.
          </p>

          <Link href="/pricing" className="btn-outline">
            View Premium Plans
          </Link>
        </div>
      </section>
    </main>
  );
}
