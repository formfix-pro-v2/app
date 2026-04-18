
"use client";

import { useState } from "react";
import { generatePlans } from "@/lib/engine";
import { QuizAnswers } from "@/lib/types";

export default function QuizPage() {
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: "40-49",
    goal: "fat_loss",
    area: "belly",
    time: "10",
    level: "beginner",
  });

  const [results, setResults] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Get Your Personalized Plan
        </h1>

        <div className="space-y-4">

          <select
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setAnswers({ ...answers, age: e.target.value as any })
            }
          >
            <option value="30-39">30-39</option>
            <option value="40-49">40-49</option>
            <option value="50+">50+</option>
          </select>

          <select
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setAnswers({ ...answers, goal: e.target.value as any })
            }
          >
            <option value="fat_loss">Lose Belly Fat</option>
            <option value="energy">More Energy</option>
            <option value="pain_relief">Pain Relief</option>
            <option value="core">Core Recovery</option>
            <option value="posture">Better Posture</option>
          </select>

          <select
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setAnswers({ ...answers, area: e.target.value as any })
            }
          >
            <option value="belly">Belly</option>
            <option value="back">Back</option>
            <option value="hips">Hips</option>
            <option value="pelvic">Pelvic Floor</option>
            <option value="stress">Stress</option>
          </select>

          <select
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setAnswers({ ...answers, time: e.target.value as any })
            }
          >
            <option value="7">7 min</option>
            <option value="10">10 min</option>
            <option value="20">20 min</option>
          </select>

          <button
            onClick={() => setResults(generatePlans(answers))}
            className="w-full bg-pink-600 text-white p-4 rounded-2xl font-bold"
          >
            Generate Plan
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-8 bg-pink-100 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Your Custom Plan</h2>

            <ul className="space-y-2">
              {results.map((plan) => (
                <li key={plan}>✓ {plan}</li>
              ))}
            </ul>

            <button className="mt-6 w-full bg-black text-white p-4 rounded-2xl">
              Unlock Premium
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
