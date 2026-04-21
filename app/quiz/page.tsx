"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");

  function next() {
    if (step < 3) setStep(step + 1);
    else router.push(`/results?goal=${goal}`);
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-8">
        <p className="text-zinc-400 mb-4">Step {step}/3</p>

        {step === 1 && (
          <>
            <h1 className="text-4xl font-black mb-6">Your Main Goal?</h1>
            <div className="grid gap-3">
              {["Lose Weight", "Boost Energy", "Fix Posture"].map((item) => (
                <button
                  key={item}
                  onClick={() => setGoal(item)}
                  className="p-4 rounded-2xl border border-white/10 hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-4xl font-black mb-6">How Active Are You?</h1>
            <div className="grid gap-3">
              {["Beginner", "Moderate", "Advanced"].map((item) => (
                <button
                  key={item}
                  className="p-4 rounded-2xl border border-white/10 hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-4xl font-black mb-6">Ready For Results?</h1>
            <p className="text-zinc-300 mb-6">
              We built a custom plan based on your answers.
            </p>
          </>
        )}

        <div className="mt-8">
          <PrimaryButton onClick={next} className="w-full">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
