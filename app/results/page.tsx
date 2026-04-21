"use client";

import { useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";

export default function ResultsPage() {
  const params = useSearchParams();
  const goal = params.get("goal") || "Transformation";

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-6">Your Custom Plan</h1>

        <p className="text-xl text-zinc-300 mb-10">
          Focus: <span className="text-orange-300 font-bold">{goal}</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
            🔥 15 min daily workouts
          </div>
          <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
            ⚡ Energy reset nutrition tips
          </div>
          <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
            📈 Weekly progress tracking
          </div>
        </div>

        <PrimaryButton href="/pricing">
          Unlock Full Program
        </PrimaryButton>
      </div>
    </main>
  );
}
