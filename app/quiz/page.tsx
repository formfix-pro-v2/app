"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    title: "What is your biggest issue?",
    options: ["Back Pain", "Neck Pain", "Poor Posture", "Stiffness"],
  },
  {
    title: "How often do you feel discomfort?",
    options: ["Daily", "Weekly", "Sometimes", "Rarely"],
  },
  {
    title: "How much time can you train?",
    options: ["5 min", "10 min", "20 min", "30+ min"],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  function choose(answer: string) {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/results");
    }
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white/5 p-8 rounded-3xl border border-white/10">
        <p className="text-zinc-400 mb-4">
          Step {step + 1} / {questions.length}
        </p>

        <h1 className="text-4xl font-black mb-8">
          {questions[step].title}
        </h1>

        <div className="grid gap-4">
          {questions[step].options.map((item) => (
            <button
              key={item}
              onClick={() => choose(item)}
              className="p-5 rounded-2xl border border-white/10 hover:bg-white/5"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
