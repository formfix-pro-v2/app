"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    setPremium(localStorage.getItem("premium") === "true");
  }, []);

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-12">
          Your Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">Today</h2>
            <p>10 min posture recovery session.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">Progress</h2>
            <p>Mobility improved 22%.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">Status</h2>

            {premium ? (
              <p className="text-green-400 font-bold">
                Premium Active
              </p>
            ) : (
              <p className="text-zinc-400">
                Free Plan
              </p>
            )}
          </div>
        </div>

        {premium && (
          <div className="mt-12 p-8 rounded-3xl bg-blue-500/10 border border-blue-400/30">
            <h2 className="text-3xl font-bold mb-4">
              Premium Programs Unlocked
            </h2>

            <p>Advanced posture rebuild + pain reset systems.</p>
          </div>
        )}
      </div>
    </main>
  );
}
