"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type QuizData = {
  symptoms?: string[];
  time?: string;
  age?: string;
};

export default function ResultsPage() {
  const [data, setData] = useState<QuizData>({
    symptoms: [],
    time: "10 min",
    age: "40+",
  });

  useEffect(() => {
    const raw = localStorage.getItem("quizData");

    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const result = useMemo(() => {
    const symptoms = data.symptoms || [];

    let title = "Balanced Glow Reset";
    let subtitle =
      "Designed to improve energy, posture and confidence.";

    let focus = [
      "Daily guided movement",
      "Gentle metabolism support",
      "Stress relief flows",
      "Better body confidence",
    ];

    if (
      symptoms.includes("Hot flashes") ||
      symptoms.includes("Poor sleep")
    ) {
      title = "Sleep & Cooling Recovery";
      subtitle =
        "Focused on evening calm, better sleep and heat regulation.";

      focus = [
        "Cooling evening sessions",
        "Nervous system reset",
        "Sleep support habits",
        "Stress reduction",
      ];
    }

    if (symptoms.includes("Weight gain")) {
      title = "Metabolism Sculpt Plan";
      subtitle =
        "Targets waistline, energy and body composition.";

      focus = [
        "Waist toning sessions",
        "Strength flows",
        "Daily calorie burn support",
        "Confidence rebuilding",
      ];
    }

    if (symptoms.includes("Joint pain")) {
      title = "Joint Ease Mobility";
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
          {result.subtitle}
        </p>
      </section>

      {/* PROFILE */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Age Group
          </div>

          <div className="text-3xl">
            {data.age || "40+"}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Daily Time
          </div>

          <div className="text-3xl">
            {data.time || "10 min"}
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">
            Symptoms
          </div>

          <div className="text-3xl">
            {(data.symptoms || []).length}
          </div>
        </div>
      </section>

      {/* FOCUS */}
      <section className="soft-card p-8 mb-8">
        <h2 className="text-4xl mb-6">
          Your Main Focus Areas
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {result.focus.map((item) => (
            <div
              key={item}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8]"
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </section>

      {/* SYMPTOMS */}
      {(data.symptoms || []).length > 0 && (
        <section className="soft-card p-8 mb-8">
          <h2 className="text-4xl mb-6">
            Based On Your Symptoms
          </h2>

          <div className="flex flex-wrap gap-3">
            {(data.symptoms || []).map((item) => (
              <span
                key={item}
                className="px-4 py-3 rounded-full bg-[#fff3f6] border border-[#ead8de]"
              >
                {item}
              </span>
            ))}
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
      <section className="grid md:grid-cols-3 gap-6">
        {[
          "Sleep Reset Protocols",
          "Belly Tone After 40",
          "Confidence & Glow Routines",
        ].map((item) => (
          <div
            key={item}
            className="soft-card p-6 text-center"
          >
            ✨ {item}
          </div>
        ))}
      </section>
    </main>
  );
}
