"use client";

import { supabase } from '../lib/supabase';
import React, { useState } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("office recovery");

  const goals = [
    { id: "menopause", label: "Menopause", icon: "🌸" },
    { id: "office recovery", label: "Office Recovery", icon: "💻" },
    { id: "injury rehab", label: "Injury Rehab", icon: "🩹" }
  ];

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

  // PRAVI POZIV KA OPENAI
  const generatePlan = async () => {
    setLoading(true);
    setAiResponse("");

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: "You are an expert fitness coach specializing in longevity, menopause, and rehabilitation. Provide short, actionable 3-step plans." 
            },
            { 
              role: "user", 
              content: `Create a quick 3-step workout plan for someone focusing on: ${selectedGoal}.` 
            }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        setAiResponse(data.choices[0].message.content);
      } else {
        throw new Error("API Limit reached or invalid key");
      }
    } catch (error) {
      console.error(error);
      setAiResponse("Sorry, I couldn't connect to the AI brain. Check your OpenAI credits or GitHub Secrets.");
    } finally {
      setLoading(false);
    }
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

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-25"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-400 text-sm font-mono uppercase tracking-widest flex justify-between">
                <span>Target: {selectedGoal}</span>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-800 p-8 min-h-[160px] flex items-center justify-center">
                <div className="text-zinc-300 text-center leading-relaxed whitespace-pre-wrap">
                  {loading ? (
                    <div className="animate-pulse">Thinking... 🧠</div>
                  ) : aiResponse || "Choose a category and click generate."}
                </div>
              </div>

              <button 
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "GENERATING..." : `GENERATE ${selectedGoal.toUpperCase()} PLAN`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
