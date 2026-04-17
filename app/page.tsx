"use client";

import React, { useState } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // FUNKCIJA ZA LOGIN (Supabase priprema)
  const handleLogin = () => {
    alert("Preusmeravam na Supabase Login...");
    // Ovde će ići: supabase.auth.signInWithOAuth({ provider: 'google' })
  };

  // FUNKCIJA ZA AI GENERATOR (OpenAI priprema)
  const generatePlan = async () => {
    setLoading(true);
    // Simulacija poziva OpenAI API-ja
    setTimeout(() => {
      setAiResponse("Tvoj personalizovani plan je spreman: 3x nedeljno fokus na mobilnost kuka i ramena.");
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center py-12">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 mb-3">FormFix Pro v2</div>
          <h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
            AI Fitness That Actually Fits You
          </h1>
          <p className="mt-6 text-zinc-300 text-lg">Personalized plans for menopause, rehab and recovery.</p>
          
          <div className="mt-8 flex gap-4">
            <button onClick={handleLogin} className="px-6 py-3 rounded-2xl bg-fuchsia-600 font-bold hover:scale-105 transition-all">
              Start Free (Login)
            </button>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-900 p-4">
              <div className="text-zinc-400 text-sm">AI Response</div>
              <div className="text-sm mt-2 text-fuchsia-300">{loading ? "Generating..." : aiResponse || "Waiting for prompt..."}</div>
            </div>
            <button onClick={generatePlan} className="col-span-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 font-bold hover:opacity-90">
              {loading ? "Magic in progress..." : "Generate My AI Plan"}
            </button>
          </div>
        </div>
      </section>

      {/* PRICING (Samo dugme popravljeno) */}
      <section className="max-w-6xl mx-auto py-12 text-center">
         <h2 className="text-3xl font-bold mb-8">Ready to upgrade?</h2>
         <button onClick={() => alert("Otvaram Stripe Checkout...")} className="px-12 py-4 rounded-full bg-white text-black font-black hover:bg-zinc-200 transition-all">
           GET PRO ACCESS
         </button>
      </section>
    </main>
  );
}
