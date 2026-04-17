"use client";

import { supabase } from '../lib/supabase';
import React, { useState } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("office recovery"); // Defaultna vrednost

  const goals = [
    { id: "menopause", label: "Menopause", icon: "🌸" },
    { id: "office recovery", label: "Office Recovery", icon: "💻" },
    { id: "injury rehab", label: "Injury Rehab", icon: "🩹" }
  ];

  // LOGIN FUNCTION
  const handleLogin = async () => {
    const email = prompt("Enter your email to sign in:");
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: 'https://formfix-pro-v2.github.io/app/' },
    });
    if (error) alert("Error: " + error.message);
    else alert("Check your inbox for the magic link!");
  };

  // UPDATED AI GENERATOR
  const generatePlan = () => {
    setLoading(true);
    
    // Simuliramo različite odgovore na osnovu izabrane kategorije
    setTimeout(() => {
      let response = "";
      if (selectedGoal === "menopause") {
        response = "AI Plan: Focus on resistance training for bone density and cooling breathwork for symptom management.";
      } else if (selectedGoal === "office recovery") {
        response = "AI Plan: 15-minute routine focusing on thoracic mobility and hip flexor releases to reverse 'desk posture'.";
      } else {
        response = "AI Plan: Low-impact isometric holds and gradual eccentric loading for safe joint rehabilitation.";
      }
      
      setAiResponse(response);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 mb-4 font-bold">FormFix Pro v2</div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
            Fitness Designed For You
          </h1>
          
          <p className="mt-6 text-zinc-400 text-xl">Select your focus area:</p>
          
          {/* CATEGORY SELECTOR */}
          <div className="mt-4 flex flex-wrap gap-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedGoal === goal.id 
                  ? "border-fuchsia-500 bg-fuchsia-500/20 text-white" 
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                {goal.icon} {goal.label}
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:row gap-4">
            <button onClick={handleLogin} className="px-8 py-4 rounded-2xl bg-fuchsia-600 font-bold hover:scale-105 transition-all">
              Get Started Free
            </button>
          </div>
        </div>

        {/* AI DASHBOARD */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-25"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-400 text-sm font-mono uppercase tracking-widest flex justify-between">
                <span>Target: {selectedGoal}</span>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-800 p-8 min-h-[160px] flex items-center justify-center">
                <p className="text-zinc-300 text-center leading-relaxed">
                  {loading ? "AI is crafting your specific plan..." : aiResponse || "Choose a category and click generate."}
                </p>
              </div>

              <button 
                onClick={generatePlan}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition-all active:scale-95"
              >
                {loading ? "PROCESSING..." : `GENERATE ${selectedGoal.toUpperCase()} PLAN`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
