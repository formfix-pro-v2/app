"use client";
import React, { useState } from "react";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";

const QUESTIONS = [
  {
    id: 1,
    question: "Koji je vaš glavni fitnes cilj?",
    options: ["Izgradnja mišića", "Gubitak kilograma", "Povećanje snage", "Zdravlje zglobova"],
  },
  {
    id: 2,
    question: "Koliko često trenirate nedeljno?",
    options: ["1-2 puta", "3-4 puta", "5+ puta", "Početnik sam"],
  },
  {
    id: 3,
    question: "Koju vežbu želite prvo da popravite?",
    options: ["Čučanj", "Mrtvo dizanje", "Bench Press", "Trzaj i nabačaj"],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Analiza završena!</h1>
        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 mb-10 w-full max-w-md">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="mb-4 text-left border-b border-gray-900 pb-2">
              <p className="text-xs text-gray-500 uppercase">{q.question}</p>
              <p className="text-blue-400 font-medium">{answers[i]}</p>
            </div>
          ))}
        </div>
        <Link href="/">
          <PrimaryButton text="Nazad na početnu" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="w-full max-w-xl">
        <div className="w-full bg-gray-900 h-1.5 rounded-full mb-12">
          <div 
            className="bg-blue-600 h-full transition-all duration-500" 
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Korak {step + 1} od {QUESTIONS.length}</p>
        <h2 className="text-3xl font-bold mb-10">{QUESTIONS[step].question}</h2>
        <div className="grid grid-cols-1 gap-4">
          {QUESTIONS[step].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="w-full text-left p-6 rounded-xl border border-gray-800 bg-[#0f0f0f] hover:border-blue-500 hover:bg-[#151515] transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
