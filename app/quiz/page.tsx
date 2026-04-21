"use client";
import React, { useState } from "react";
import PrimaryButton from "../Components/primaryButton";

export default function QuizPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Quiz Step {step}</h1>
      <div className="flex gap-4">
        {step < 3 ? (
          <PrimaryButton text="Next" onClick={() => setStep(step + 1)} />
        ) : (
          <PrimaryButton text="Finish" onClick={() => alert("Quiz Done!")} />
        )}
      </div>
    </div>
  );
}
