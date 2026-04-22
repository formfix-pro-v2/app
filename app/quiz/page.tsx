"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Answers = {
  age: string;
  goal: string;
  symptom: string;
  lifestyle: string;
};

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState<Answers>({
    age: "",
    goal: "",
    symptom: "",
    lifestyle: "",
  });

  function update(key: keyof Answers, value: string) {
    setAnswers({ ...answers, [key]: value });
  }

  function next() {
    if (step < 4) setStep(step + 1);
    else finishQuiz();
  }

  function finishQuiz() {
    let type = "office";

    if (
      answers.goal === "menopause" ||
      answers.symptom === "hot flashes"
    ) {
      type = "menopause";
    }

    if (
      answers.goal === "pelvic" ||
      answers.symptom === "leakage"
    ) {
      type = "incontinence";
    }

    localStorage.setItem("userType", type);
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black mb-4">
          Free AI Assessment
        </h1>

        <p className="text-zinc-400 mb-10">
          Personalized plan in under 60 seconds.
        </p>

        {step === 1 && (
          <Question
            title="Your Age Range"
            options={["25-39", "40-49", "50-59", "60+"]}
            onSelect={(v) => update("age", v)}
            next={next}
          />
        )}

        {step === 2 && (
          <Question
            title="Main Goal"
            options={[
              "better posture",
              "less pain",
              "menopause",
              "pelvic",
            ]}
            onSelect={(v) => update("goal", v)}
            next={next}
          />
        )}

        {step === 3 && (
          <Question
            title="Main Symptom"
            options={[
              "neck pain",
              "back pain",
              "hot flashes",
              "leakage",
            ]}
            onSelect={(v) => update("symptom", v)}
            next={next}
          />
        )}

        {step === 4 && (
          <Question
            title="Daily Lifestyle"
            options={[
              "desk worker",
              "active",
              "busy parent",
              "retired",
            ]}
            onSelect={(v) => update("lifestyle", v)}
            next={next}
          />
        )}
      </div>
    </main>
  );
}

function Question({
  title,
  options,
  onSelect,
  next,
}: {
  title: string;
  options: string[];
  onSelect: (v: string) => void;
  next: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white/5 p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <div className="space-y-4">
        {options.map((item) => (
          <button
            key={item}
            onClick={() => {
              onSelect(item);
              next();
            }}
            className="w-full text-left p-5 rounded-2xl bg-black/30 hover:bg-black/50 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
