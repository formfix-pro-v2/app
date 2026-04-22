"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UserType = "menopause" | "office" | "incontinence";

type Answers = {
  age: string;
  work: string;
  symptom: string;
  issue: string;
  urgency: string;
};

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState<Answers>({
    age: "",
    work: "",
    symptom: "",
    issue: "",
    urgency: "",
  });

  function update(key: keyof Answers, value: string) {
    setAnswers({ ...answers, [key]: value });
  }

  function next() {
    if (step < 5) setStep(step + 1);
    else finish();
  }

  function finish() {
    let type: UserType = "office";

    if (
      answers.age === "45+" ||
      answers.symptom === "hot flashes" ||
      answers.issue === "sleep"
    ) {
      type = "menopause";
    }

    if (
      answers.symptom === "leakage" ||
      answers.issue === "pelvic"
    ) {
      type = "incontinence";
    }

    localStorage.setItem("userType", type);
    localStorage.setItem("quizDone", "true");

    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-orange-300 font-semibold mb-4">
          Step {step} / 5
        </p>

        <div className="w-full h-3 rounded-full bg-white/10 mb-10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
            style={{ width: `${step * 20}%` }}
          />
        </div>

        {step === 1 && (
          <Question
            title="Your age range?"
            options={["18-29", "30-44", "45+", "60+"]}
            onPick={(v) => update("age", v)}
            next={next}
          />
        )}

        {step === 2 && (
          <Question
            title="Your daily lifestyle?"
            options={[
              "desk worker",
              "active job",
              "busy parent",
              "retired",
            ]}
            onPick={(v) => update("work", v)}
            next={next}
          />
        )}

        {step === 3 && (
          <Question
            title="Main symptom?"
            options={[
              "neck pain",
              "back pain",
              "hot flashes",
              "leakage",
            ]}
            onPick={(v) => update("symptom", v)}
            next={next}
          />
        )}

        {step === 4 && (
          <Question
            title="What bothers you most?"
            options={[
              "sleep",
              "posture",
              "pelvic",
              "low energy",
            ]}
            onPick={(v) => update("issue", v)}
            next={next}
          />
        )}

        {step === 5 && (
          <Question
            title="How urgent is it?"
            options={[
              "just exploring",
              "moderate",
              "serious issue",
              "need change now",
            ]}
            onPick={(v) => update("urgency", v)}
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
  onPick,
  next,
}: {
  title: string;
  options: string[];
  onPick: (value: string) => void;
  next: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
      <h1 className="text-4xl font-black mb-8">{title}</h1>

      <div className="space-y-4">
        {options.map((item) => (
          <button
            key={item}
            onClick={() => {
              onPick(item);
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
