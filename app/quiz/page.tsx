"use client";
import React, { useState } from "react";
import PrimaryButton from "../../../components/PrimaryButton";

export default function QuizPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Kviz - Korak {step}</h1>
      <div className="flex gap-4">
        {step < 3 ? (
          <PrimaryButton text="Sledeće" onClick={() => setStep(step + 1)} />
        ) : (
          <PrimaryButton text="Završi" onClick={() => alert("Kviz završen!")} />
        )}
      </div>
    </div>
  );
}
