"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type QuizData = {
  age: string;
  time: string;
  symptoms: string[];
  severity: Record<string, number>;
  goal: string;
  confidence: number;
  sleep: number;
};

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState<QuizData>({
    age: "",
    time: "",
    symptoms: [],
    severity: {},
    goal: "",
    confidence: 5,
    sleep: 5,
  });

  const totalSteps = 6;

  const ageOptions = [
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55+",
  ];

  const timeOptions = [
    "10 min",
    "20 min",
    "30+ min",
  ];

  const goals = [
    "Lose belly fat",
    "Sleep better",
    "Reduce hot flashes",
    "Feel feminine again",
    "More energy",
    "Less pain & stiffness",
  ];

  const symptomOptions = [
    "Hot flashes",
    "Poor sleep",
    "Weight gain",
    "Low energy",
    "Joint pain",
    "Low confidence",
    "Stress",
    "Bloating",
    "Back pain",
    "Mood swings",
    "Dry skin",
    "Pelvic floor weakness",
  ];

  function next() {
    if (step === 1 && !form.age) return;
    if (step === 2 && !form.time) return;
    if (step === 3 && form.symptoms.length === 0) return;
    if (step === 4 && !form.goal) return;

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    localStorage.setItem(
      "quizData",
      JSON.stringify(form)
    );

    router.push("/results");
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function toggleSymptom(item: string) {
    if (form.symptoms.includes(item)) {
      const next = form.symptoms.filter(
        (x) => x !== item
      );

      const sev = { ...form.severity };
      delete sev[item];

      setForm({
        ...form,
        symptoms: next,
        severity: sev,
      });
    } else {
      setForm({
        ...form,
        symptoms: [...form.symptoms, item],
        severity: {
          ...form.severity,
          [item]: 3,
        },
      });
    }
  }

  function setSeverity(
    symptom: string,
    value: number
  ) {
    setForm({
      ...form,
      severity: {
        ...form.severity,
        [symptom]: value,
      },
    });
  }

  const progress = useMemo(
    () => (step / totalSteps) * 100,
    [step]
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      {/* HEADER */}
      <section className="soft-card p-8 mb-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Premium Assessment
        </p>

        <h1 className="text-5xl mb-5">
          Build Your Personalized Plan
        </h1>

        <div className="h-3 bg-white rounded-full overflow-hidden border border-[#f0e3e8]">
          <div
            className="h-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="text-[#7b6870] mt-4">
          Step {step} of {totalSteps}
        </p>
      </section>

      {/* STEP 1 */}
      {step === 1 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            What is your age range?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {ageOptions.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setForm({
                    ...form,
                    age: item,
                  })
                }
                className={`p-5 rounded-3xl border text-left ${
                  form.age === item
                    ? "bg-[#fff1f5] border-[#d6a7b1]"
                    : "bg-white border-[#f0e3e8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            How much time per day?
          </h2>

          <div className="grid gap-4">
            {timeOptions.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setForm({
                    ...form,
                    time: item,
                  })
                }
                className={`p-5 rounded-3xl border text-left ${
                  form.time === item
                    ? "bg-[#fff1f5] border-[#d6a7b1]"
                    : "bg-white border-[#f0e3e8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            Which symptoms affect you?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {symptomOptions.map((item) => {
              const active =
                form.symptoms.includes(item);

              return (
                <button
                  key={item}
                  onClick={() =>
                    toggleSymptom(item)
                  }
                  className={`p-5 rounded-3xl border text-left ${
                    active
                      ? "bg-[#fff1f5] border-[#d6a7b1]"
                      : "bg-white border-[#f0e3e8]"
                  }`}
                >
                  {active ? "✓ " : ""}
                  {item}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            What is your main goal?
          </h2>

          <div className="grid gap-4">
            {goals.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setForm({
                    ...form,
                    goal: item,
                  })
                }
                className={`p-5 rounded-3xl border text-left ${
                  form.goal === item
                    ? "bg-[#fff1f5] border-[#d6a7b1]"
                    : "bg-white border-[#f0e3e8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-6">
            Rate symptom intensity
          </h2>

          <div className="space-y-6">
            {form.symptoms.map((item) => (
              <div key={item}>
                <div className="mb-2">
                  {item}
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  value={
                    form.severity[item] || 3
                  }
                  onChange={(e) =>
                    setSeverity(
                      item,
                      Number(e.target.value)
                    )
                  }
                  className="w-full"
                />

                <div className="text-sm text-[#7b6870] mt-1">
                  Level:{" "}
                  {form.severity[item] || 3}/5
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-8">
            Lifestyle Snapshot
          </h2>

          <div className="mb-8">
            <p className="mb-3">
              Confidence level
            </p>

            <input
              type="range"
              min="1"
              max="10"
              value={form.confidence}
              onChange={(e) =>
                setForm({
                  ...form,
                  confidence: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full"
            />

            <p className="text-[#7b6870] mt-2">
              {form.confidence}/10
            </p>
          </div>

          <div>
            <p className="mb-3">
              Sleep quality
            </p>

            <input
              type="range"
              min="1"
              max="10"
              value={form.sleep}
              onChange={(e) =>
                setForm({
                  ...form,
                  sleep: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full"
            />

            <p className="text-[#7b6870] mt-2">
              {form.sleep}/10
            </p>
          </div>
        </section>
      )}

      {/* NAV */}
      <section className="flex justify-between mt-8">
        <button
          onClick={back}
          className="btn-outline"
        >
          Back
        </button>

        <button
          onClick={next}
          className="btn-primary"
        >
          {step === totalSteps
            ? "See My Results"
            : "Continue"}
        </button>
      </section>
    </main>
  );
}
