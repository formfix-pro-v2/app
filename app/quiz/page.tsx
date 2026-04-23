"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const symptoms = [
  "Hot flashes",
  "Weight gain",
  "Poor sleep",
  "Joint pain",
  "Dry eyes",
  "Brain fog",
  "Low energy",
  "Mood swings",
  "Low libido",
];

export default function QuizPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [severity, setSeverity] = useState("Moderate");
  const [age, setAge] = useState("45-54");

  function toggle(item: string) {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
  }

  function submit() {
    localStorage.setItem("menoSymptoms", JSON.stringify(selected));
    localStorage.setItem("menoSeverity", severity);
    localStorage.setItem("menoAge", age);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#160d14] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-pink-200/70 mb-4">
          Personalized Menopause Assessment
        </p>

        <h1 className="text-5xl font-light mb-10">
          Tell us how you feel
        </h1>

        {/* AGE */}
        <section className="mb-10">
          <h2 className="text-2xl mb-4">Age Range</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {["35-44", "45-54", "55+"].map((item) => (
              <button
                key={item}
                onClick={() => setAge(item)}
                className={`p-4 rounded-2xl border ${
                  age === item
                    ? "bg-pink-300 text-[#2a1620]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* SYMPTOMS */}
        <section className="mb-10">
          <h2 className="text-2xl mb-4">
            Select all symptoms that apply
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {symptoms.map((item) => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`p-4 rounded-2xl text-left border ${
                  selected.includes(item)
                    ? "bg-pink-300 text-[#2a1620]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* SEVERITY */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">
            How intense are symptoms?
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {["Mild", "Moderate", "Severe"].map((item) => (
              <button
                key={item}
                onClick={() => setSeverity(item)}
                className={`p-4 rounded-2xl ${
                  severity === item
                    ? "bg-pink-300 text-[#2a1620]"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={submit}
          className="w-full p-5 rounded-full bg-pink-300 text-[#2a1620] font-semibold text-lg"
        >
          Create My Personal Plan
        </button>
      </div>
    </main>
  );
}
