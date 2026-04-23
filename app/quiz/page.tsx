"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Multi = string[];

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [stage, setStage] = useState("");
  const [symptoms, setSymptoms] = useState<Multi>([]);
  const [priority, setPriority] = useState("");
  const [fitness, setFitness] = useState("");
  const [time, setTime] = useState("");

  const total = 6;
  const progress = Math.round((step / total) * 100);

  function toggle(arr: Multi, value: string, setter: (v: Multi) => void) {
    if (arr.includes(value)) {
      setter(arr.filter((x) => x !== value));
    } else {
      setter([...arr, value]);
    }
  }

  function next() {
    if (step < total) setStep(step + 1);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function finish() {
    const data = {
      age,
      stage,
      symptoms,
      priority,
      fitness,
      time,
    };

    localStorage.setItem("quizData", JSON.stringify(data));
    localStorage.setItem("day", "1");
    router.push("/results");
  }

  const chip =
    "px-5 py-4 rounded-2xl border border-[#ead8de] bg-white hover:bg-[#fff7fa] transition cursor-pointer";

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* TOP */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Free Assessment
        </p>

        <h1 className="text-5xl md:text-6xl mb-5">
          Build Your Personalized
          <br />
          Menopause Plan
        </h1>

        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#f1e4e8]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1]"
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
                  onClick={() => setAge(item)}
                  className={`${chip} ${
                    age === item ? "border-[#d6a7b1] bg-[#fff3f6]" : ""
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
            <h2 className="text-3xl mb-6">Where Are You Now?</h2>

            <div className="grid gap-4">
              {[
                "Perimenopause",
                "Menopause",
                "Post-menopause",
                "Not sure",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setStage(item)}
                  className={`${chip} ${
                    stage === item ? "border-[#d6a7b1] bg-[#fff3f6]" : ""
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
            <h2 className="text-3xl mb-3">Current Symptoms</h2>
            <p className="text-[#7b6870] mb-6">Choose all that apply.</p>

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
                  onClick={() => toggle(symptoms, item, setSymptoms)}
                  className={`${chip} ${
                    symptoms.includes(item)
                      ? "border-[#d6a7b1] bg-[#fff3f6]"
                      : ""
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
            <h2 className="text-3xl mb-6">Main Priority</h2>

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
                  onClick={() => setPriority(item)}
                  className={`${chip} ${
                    priority === item
                      ? "border-[#d6a7b1] bg-[#fff3f6]"
                      : ""
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
            <h2 className="text-3xl mb-6">Fitness Level</h2>

            <div className="grid gap-4">
              {["Beginner", "Intermediate", "Active"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFitness(item)}
                  className={`${chip} ${
                    fitness === item
                      ? "border-[#d6a7b1] bg-[#fff3f6]"
                      : ""
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
            <h2 className="text-3xl mb-6">Daily Time Available</h2>

            <div className="grid gap-4">
              {["10 min", "20 min", "30+ min"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTime(item)}
                  className={`${chip} ${
                    time === item ? "border-[#d6a7b1] bg-[#fff3f6]" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {/* NAV */}
        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button onClick={back} className="btn-outline">
              Back
            </button>
          )}

          {step < total ? (
            <button onClick={next} className="btn-primary ml-auto">
              Continue
            </button>
          ) : (
            <button onClick={finish} className="btn-primary ml-auto">
              Create My Plan
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
