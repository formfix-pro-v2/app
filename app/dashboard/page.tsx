"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user") || "";
    setUser(saved);
  }, []);

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-3">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-12">{user}</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Today</h2>
            <p className="text-zinc-300">
              10 min posture correction session.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Progress</h2>
            <p className="text-zinc-300">
              Pain reduced 18% this week.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <Link
              href="/pricing"
              className="inline-block mt-3 px-6 py-3 rounded-2xl bg-blue-600"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
