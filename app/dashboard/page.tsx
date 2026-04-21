"use client";

import { useEffect, useState } from "react";
import { getUser, getProgress, isPremium } from "@/lib/storage";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const [premium, setPremiumState] = useState(false);

  useEffect(() => {
    setEmail(getUser());
    setProgress(getProgress());
    setPremiumState(isPremium());
  }, []);

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-2">
          Dashboard
        </h1>

        <p className="text-zinc-400 mb-12">{email}</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">
              Progress
            </h2>

            <p>{progress}% completed</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">
              Membership
            </h2>

            <p>{premium ? "Premium" : "Free"}</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">
              Today
            </h2>

            <p>Mobility Reset Session</p>
          </div>
        </div>
      </div>
    </main>
  );
}
