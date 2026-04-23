"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Exercise = {
  name: string;
  why: string;
  start: string;
  end: string;
  reps: string;
};

export default function DashboardPage() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("Moderate");
  const [day, setDay] = useState(1);

  useEffect(() => {
    const savedSymptoms = localStorage.getItem("menoSymptoms");
    const savedSeverity = localStorage.getItem("menoSeverity");
    const savedDay = Number(localStorage.getItem("menoDay") || "1");

    if (savedSymptoms) setSymptoms(JSON.parse(savedSymptoms));
    if (savedSeverity) setSeverity(savedSeverity);
    setDay(savedDay);
  }, []);

  const progress = Math.min(day * 3, 100);

  const focus = useMemo(() => {
    if (symptoms.includes("Poor sleep")) return "Sleep Recovery";
    if (symptoms.includes("Joint pain")) return "Joint Comfort";
    if (symptoms.includes("Weight gain")) return "Metabolism Support";
    if (symptoms.includes("Low energy")) return "Energy Reset";
    if (symptoms.includes("Hot flashes")) return "Cooling Balance";
    return "Hormone Wellness";
  }, [symptoms]);

  const exercises: Exercise[] = [
    {
      name: "Wall Posture Reset",
      why: "Improve posture and open chest tension.",
      start: "Stand with back 10 cm from wall, feet hip width.",
      end: "Head, shoulders and hips gently touching wall.",
      reps: "3 x 30 sec",
    },
    {
      name: "Glute Bridge",
      why: "Support hips, lower back and metabolism.",
      start: "Lie on back, knees bent, feet flat.",
      end: "Lift hips until knees-hips-shoulders align.",
      reps: "3 x 12 reps",
    },
    {
      name: "Cat-Cow Flow",
      why: "Reduce stiffness and improve spinal mobility.",
      start: "Hands and knees neutral spine.",
      end: "Alternate rounded back and open chest arch.",
      reps: "60 sec",
    },
    {
      name: "Breathing Calm Reset",
      why: "Helps stress, sleep and hot flash management.",
      start: "Sit tall, one hand on belly.",
      end: "Slow inhale 4 sec / exhale 6 sec.",
      reps: "3 min",
    },
    {
      name: "Supported Squat",
      why: "Strength, circulation and body tone.",
      start: "Hold chair lightly, feet shoulder width.",
      end: "Sit back halfway then rise tall.",
      reps: "3 x 10 reps",
    },
  ];

  function completeDay() {
    const next = day + 1;
    setDay(next);
    localStorage.setItem("menoDay", String(next));
  }

  return (
    <main className="min-h-screen bg-[#160d14] text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* top */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">
            <p className="text-pink-200/70 mb-2">Day {day}</p>

            <h1 className="text-5xl font-light mb-4">
              {focus}
            </h1>

            <p className="text-pink-100/75 text-lg">
              Gentle structured support based on your selected symptoms.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <p className="text-pink-200/70 mb-3">Progress</p>

            <div className="text-5xl font-light mb-4">
              {progress}%
            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-pink-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-pink-100/70">
              Consistency builds results.
            </p>
          </div>
        </div>

        {/* symptoms */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-8">
          <h2 className="text-3xl font-light mb-6">
            Your Selected Symptoms
          </h2>

          <div className="flex flex-wrap gap-3">
            {symptoms.length === 0 ? (
              <div className="text-pink-100/60">
                General menopause wellness plan active.
              </div>
            ) : (
              symptoms.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 rounded-full bg-pink-300 text-[#2a1620] font-medium"
                >
                  {item}
                </div>
              ))
            )}
          </div>

          <p className="mt-5 text-pink-100/70">
            Intensity: {severity}
          </p>
        </section>

        {/* workout cards */}
        <section className="mb-8">
          <h2 className="text-4xl font-light mb-6">
            Today’s Routine
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {exercises.map((ex) => (
              <div
                key={ex.name}
                className="rounded-3xl bg-white/5 border border-white/10 p-7"
              >
                <h3 className="text-2xl font-medium mb-3">
                  {ex.name}
                </h3>

                <p className="text-pink-100/75 mb-5">
                  {ex.why}
                </p>

                <div className="space-y-3 text-sm text-pink-100/75">
                  <div>
                    <span className="text-pink-200">Start:</span>{" "}
                    {ex.start}
                  </div>

                  <div>
                    <span className="text-pink-200">Finish:</span>{" "}
                    {ex.end}
                  </div>

                  <div>
                    <span className="text-pink-200">Dose:</span>{" "}
                    {ex.reps}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* actions */}
        <section className="grid md:grid-cols-2 gap-6">
          <button
            onClick={completeDay}
            className="p-5 rounded-full bg-pink-300 text-[#2a1620] font-semibold text-lg"
          >
            Complete Today
          </button>

          <Link
            href="/pricing"
            className="p-5 rounded-full border border-white/10 text-center hover:bg-white/5 transition"
          >
            Unlock Premium Nutrition + Coaching
          </Link>
        </section>
      </div>
    </main>
  );
}
