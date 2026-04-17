"use client";

import { supabase } from '../lib/supabase';
import React, { useState } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<React.ReactNode>("");
  const [selectedGoal, setSelectedGoal] = useState("office recovery");

  const goals = [
    { id: "menopause", label: "Menopause", icon: "🌸" },
    { id: "office recovery", label: "Office Recovery", icon: "💻" },
    { id: "injury rehab", label: "Injury Rehab", icon: "🩹" }
  ];

  // Professional English Fitness Database with YouTube Demo Links
  const fitnessDatabase: Record<string, string[][]> = {
    menopause: [
      [
        "BONE DENSITY & STRENGTH FOCUS",
        "WARM-UP: 5 min brisk walking.",
        "1. Goblet Squats (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=goblet+squat+form)",
        "2. Push-ups (Knee variation) (3x10) - [Watch Demo](https://www.youtube.com/results?search_query=knee+push+up+form)",
        "3. Dumbbell Deadlift (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=dumbbell+deadlift+form)",
        "4. Overhead Press (3x10) - [Watch Demo](https://www.youtube.com/results?search_query=overhead+press+form)",
        "5. Plank (3x45s) - [Watch Demo](https://www.youtube.com/results?search_query=proper+plank+form)",
        "6. Glute Bridge (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=glute+bridge+form)",
        "7. Bent-over Rows (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=dumbbell+bent+over+row+form)",
        "8. Bird-Dog (3x10 per side) - [Watch Demo](https://www.youtube.com/results?search_query=bird+dog+exercise+form)",
        "9. Walking Lunges (3x10 per leg) - [Watch Demo](https://www.youtube.com/results?search_query=walking+lunges+form)",
        "10. Side Plank (2x30s per side) - [Watch Demo](https://www.youtube.com/results?search_query=side+plank+form)",
        "ADVICE: Focus on protein and calcium intake post-workout."
      ]
    ],
    "office recovery": [
      [
        "THE POSTURE RESET (Thoracic Mobility)",
        "WARM-UP: Neck and shoulder rolls.",
        "1. Cat-Cow Stretch (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=cat+cow+stretch)",
        "2. Thoracic Rotations (3x10 per side) - [Watch Demo](https://www.youtube.com/results?search_query=thoracic+rotation)",
        "3. Wall Chest Stretch (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=wall+chest+stretch)",
        "4. Hip Flexor Lunge (3x45s) - [Watch Demo](https://www.youtube.com/results?search_query=hip+flexor+lunge+stretch)",
        "5. Scapular Pull-ups (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=scapular+pull+ups)",
        "6. Face Pulls (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=face+pulls+form)",
        "7. Glute Bridges (3x20) - [Watch Demo](https://www.youtube.com/results?search_query=glute+bridge+exercise)",
        "8. Dead Bug (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=dead+bug+exercise)",
        "9. Chin Tucks (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=chin+tuck+exercise)",
        "10. Child’s Pose (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=childs+pose+stretch)",
        "ADVICE: Stand up and walk for 2 mins every 45 mins of sitting."
      ]
    ],
    "injury rehab": [
      [
        "KNEE & ANKLE STABILIZATION",
        "WARM-UP: Gentle ankle circles.",
        "1. Ankle Pumps (3x25) - [Watch Demo](https://www.youtube.com/results?search_query=ankle+pumps+exercise)",
        "2. Quad Sets (3x10s holds) - [Watch Demo](https://www.youtube.com/results?search_query=quad+sets+exercise)",
        "3. Straight Leg Raises (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=straight+leg+raise+exercise)",
        "4. Terminal Knee Extension (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=terminal+knee+extension)",
        "5. Clamshells (3x15 per side) - [Watch Demo](https://www.youtube.com/results?search_query=clamshell+exercise+form)",
        "6. Glute Bridges (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=glute+bridge+rehab)",
        "7. Heel Slides (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=heel+slides+exercise)",
        "8. Wall Calf Raises (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=wall+calf+raises)",
        "9. Single Leg Balance (3x30s) - [Watch Demo](https://www.youtube.com/results?search_query=single+leg+balance+exercise)",
        "10. Gentle Hamstring Stretch (1 min) - [Watch Demo](https://www.youtube.com/results?search_query=gentle+hamstring+stretch)",
        "ADVICE: If pain exceeds 3/10, stop and rest immediately."
      ]
    ]
  };

  const generatePlan = () => {
    setLoading(true);
    setAiResponse("");

    setTimeout(() => {
      const categoryPlans = fitnessDatabase[selectedGoal];
      const randomPlan = categoryPlans[Math.floor(Math.random() * categoryPlans.length)];
      
      const formattedResponse = (
        <div className="text-left space-y-2">
          {randomPlan.map((line, index) => {
            const linkMatch = line.match(/\[Watch Demo\]\((.*?)\)/);
            if (linkMatch) {
              const textBeforeLink = line.split(" - [")[0];
              return (
                <div key={index} className="flex justify-between items-center border-b border-zinc-900 pb-1">
                  <span>{textBeforeLink}</span>
                  <a 
                    href={linkMatch[1]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-fuchsia-400 hover:underline font-bold"
                  >
                    VIDEO VIDEO 🎥
                  </a>
                </div>
              );
            }
            return <p key={index} className={index === 0 ? "font-bold text-fuchsia-400 mb-4 text-center" : ""}>{line}</p>;
          })}
        </div>
      );

      setAiResponse(formattedResponse);
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
          
          <p className="mt-6 text-zinc-400 text-xl italic">Select your focus area:</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedGoal === goal.id 
                  ? "border-fuchsia-500 bg-fuchsia-500/20 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]" 
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                {goal.icon} {goal.label}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <button className="px-8 py-4 rounded-2xl bg-fuchsia-600 font-bold hover:scale-105 transition-all shadow-lg shadow-fuchsia-500/20">
              Get Started Free
            </button>
          </div>
        </div>

        {/* AI INTERFACE */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-25"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest flex justify-between items-center">
                <span>AI ANALYSIS SYSTEM</span>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-900 p-6 min-h-[300px] flex items-start justify-center overflow-y-auto max-h-[400px]">
                <div className="text-zinc-300 w-full">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="animate-spin h-8 w-8 border-4 border-fuchsia-500 border-t-transparent rounded-full"></div>
                      <span className="text-xs font-mono animate-pulse">GENERATING CUSTOM PLAN...</span>
                    </div>
                  ) : aiResponse || (
                    <p className="text-center italic text-zinc-600 py-20">Choose a focus area and generate your professional plan.</p>
                  )}
                </div>
              </div>

              <button 
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-fuchsia-50 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter"
              >
                {loading ? "Constructing..." : `Generate ${selectedGoal} Plan`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
