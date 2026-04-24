"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QuizData = {
  age: string;
  stage: string;
  symptoms: string[];
  priority: string;
  fitness: string;
  time: string;
};

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [data, setData] = useState<QuizData>({
    age: "",
    stage: "",
    symptoms: [],
    priority: "",
    fitness: "",
    time: "",
  });

  const total = 6;
  const progress = Math.round((step / total) * 100);

  function selectSingle(key: keyof QuizData, value: string) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function toggleSymptom(value: string) {
    setData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(value)
        ? prev.symptoms.filter((x) => x !== value)
        : [...prev.symptoms, value],
    }));
  }

  function canContinue() {
    if (step === 1) return data.age !== "";
    if (step === 2) return data.stage !== "";
    if (step === 3) return data.symptoms.length > 0;
    if (step === 4) return data.priority !== "";
    if (step === 5) return data.fitness !== "";
    if (step === 6) return data.time !== "";
    return false;
  }

  function next() {
    if (!canContinue()) return;
    if (step < total) setStep(step + 1);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function finish() {
    if (!canContinue()) return;

    localStorage.setItem("quizData", JSON.stringify(data));
    localStorage.setItem("day", "1");

    router.push("/results");
  }

  const chip =
    "w-full text-left px-5 py-4 rounded-2xl border transition duration-200";

  const normal =
    "border-[#ead8de] bg-white hover:bg-[#fff7fa]";

  const active =
    "border-[#c9869a] bg-[#ffe7ef] ring-2 ring-[#f3c5d3] text-[#4a3139]";

  const disabledBtn =
    "opacity-50 cursor-not-allowed";

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Free Assessment
        </p>

        <h1 className="text-5xl md:text-6xl mb-6">
          Build Your Personalized Plan
        </h1>

        <div className="w-full h-3 rounded-full bg-white border border-[#f0e3e8] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-[#7b6870]">
          Step {step} of {total}
        </p>
      </div>

      {/* CARD */}
      <section className="soft-card p-8 md:p-10">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-3xl mb-6">Your Age Range</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {["40-45", "46-50", "51-55", "56+"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectSingle("age", item)}
                  className={`${chip} ${
                    data.age === item ? active : normal
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-3xl mb-6">
              Menopause Stage
            </h2>

            <div className="grid gap-4">
              {[
                "Perimenopause",
                "Menopause",
                "Post-menopause",
                "Not sure",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectSingle("stage", item)}
                  className={`${chip} ${
                    data.stage === item ? active : normal
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-3xl mb-3">
              Current Symptoms
            </h2>

            <p className="text-[#7b6870] mb-6">
              Choose one or more.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Hot flashes",
                "Poor sleep",
                "Weight gain",
                "Low energy",
                "Mood swings",
                "Joint pain",
                "Brain fog",
                "Low confidence",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleSymptom(item)}
                  className={`${chip} ${
                    data.symptoms.includes(item)
                      ? active
                      : normal
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-3xl mb-6">
              Main Priority
            </h2>

            <div className="grid gap-4">
              {[
                "Sleep better",
                "Lose belly fat",
                "Reduce hot flashes",
                "Move without pain",
                "Feel feminine again",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    selectSingle("priority", item)
                  }
                  className={`${chip} ${
                    data.priority === item
                      ? active
                      : normal
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h2 className="text-3xl mb-6">
              Fitness Level
            </h2>

            <div className="grid gap-4">
              {[
                "Beginner",
                "Intermediate",
                "Active",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    selectSingle("fitness", item)
                  }
                  className={`${chip} ${
                    data.fitness === item
                      ? active
                      : normal
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <h2 className="text-3xl mb-6">
              Daily Time Available
            </h2>

            <div className="grid gap-4">
              {["10 min", "20 min", "30+ min"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      selectSingle("time", item)
                    }
                    className={`${chip} ${
                      data.time === item
                        ? active
                        : normal
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </>
        )}

        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="btn-outline"
            >
              Back
            </button>
          )}

          {step < total ? (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue()}
              className={`btn-primary ml-auto ${
                !canContinue() ? disabledBtn : ""
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              disabled={!canContinue()}
              className={`btn-primary ml-auto ${
                !canContinue() ? disabledBtn : ""
              }`}
            >
              Create My Plan
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
