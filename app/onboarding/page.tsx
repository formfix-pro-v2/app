"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full p-10 rounded-3xl bg-white/5 border border-white/10 text-center">
        <h1 className="text-5xl font-black mb-6">
          Your Plan Is Ready
        </h1>

        <p className="text-zinc-300 mb-10 text-xl">
          We created your personalized recovery roadmap.
        </p>

        <button
          onClick={() => router.push("/pricing")}
          className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold text-lg"
        >
          Unlock Program
        </button>
      </div>
    </main>
  );
}
