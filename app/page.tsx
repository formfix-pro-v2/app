"use client";

import { supabase } from '../lib/supabase';
import React, { useState } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // LOGIN FUNCTION (Magic Link)
  const handleLogin = async () => {
    const email = prompt("Enter your email to sign in:");
    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://formfix-pro-v2.github.io/app/',
      },
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Check your inbox! We've sent you a magic login link.");
    }
  };

  // AI GENERATOR FUNCTION (Simulation)
  const generatePlan = () => {
    setLoading(true);
    // Simulating AI processing time
    setTimeout(() => {
      setAiResponse("AI Plan Generated: Focus on hip mobility and 15-min morning office stretches to improve posture.");
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
        <div className="text-center md:text-left">
          <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 mb-4 font-bold">
            FormFix Pro v2
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
            AI Fitness That Actually Fits You
          </h1>

          <p className="mt-6 text-zinc-400 text-xl max-w-lg mx-auto md:mx-0">
            Personalized recovery and strength plans for menopause, office recovery, and injury rehab.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={handleLogin}
              className="px-8 py-4 rounded-2xl bg-fuchsia-600 font-bold hover:scale-105 hover:bg-fuchsia-500 transition-all active:scale-95 shadow-lg shadow-fuchsia-500/20"
            >
              Get Started Free
            </button>
            <button className="px-8 py-4 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition-colors font-bold">
              Watch Demo
            </button>
          </div>
        </div>

        {/* AI PREVIEW CARD */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-mono uppercase tracking-widest">AI Generator Status</span>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-800 p-8 min-h-[160px] flex items-center justify-center">
                <p className="text-zinc-300 text-center leading-relaxed font-medium">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-fuchsia-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      AI is crafting your plan...
                    </span>
                  ) : aiResponse || "Click below to generate your personalized health insight."}
                </p>
              </div>

              <button 
                onClick={generatePlan}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition-all active:scale-[0.98] tracking-tight text-lg"
              >
                {loading ? "PROCESSING..." : "GENERATE MY AI PLAN"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
            { label: "Active Users", val: "12k+" },
            { label: "AI Plans", val: "85k+" },
            { label: "Success Rate", val: "94%" },
            { label: "Support", val: "24/7" }
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 text-center">
            <div className="text-2xl font-black text-white">{stat.val}</div>
            <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto py-20 border-t border-zinc-900 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm">
        <div className="flex items-center gap-2 font-bold text-zinc-300">
           <div className="w-6 h-6 bg-fuchsia-600 rounded-lg"></div> FormFix Pro
        </div>
        <p>© 2026 FormFix Pro Intelligence. Built for longevity.</p>
        <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </main>
  );
}
