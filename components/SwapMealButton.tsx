"use client";

import { useState } from "react";
import { getDayMealPlan, type MealSlot } from "@/lib/nutrition";

export default function SwapMealButton({
  slot,
  day,
  calories,
  symptoms,
  goal,
  onSwap,
}: {
  slot: MealSlot;
  day: number;
  calories: number;
  symptoms: string[];
  goal: string;
  onSwap: (newMealTitle: string) => void;
}) {
  const [swapping, setSwapping] = useState(false);

  function handleSwap() {
    setSwapping(true);

    // Generate meal from a different "day" to get a different meal
    const altDay = day + 50 + Math.floor(Math.random() * 30);
    const altPlan = getDayMealPlan(altDay, calories, symptoms, goal);
    const altMeal = altPlan.meals.find((m) => m.slot === slot);

    if (altMeal) {
      onSwap(altMeal.meal.title);
    }

    setTimeout(() => setSwapping(false), 300);
  }

  return (
    <button
      onClick={handleSwap}
      disabled={swapping}
      className="text-[10px] text-[#b98fa1] hover:text-[#8f5d6f] transition-colors disabled:opacity-50 flex items-center gap-1"
      title="Get a different meal"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {swapping ? "..." : "Swap"}
    </button>
  );
}
