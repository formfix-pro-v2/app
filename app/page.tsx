"use client";

import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<React.ReactNode>("");
  const [selectedGoal, setSelectedGoal] = useState("office recovery");
  const [selectedSubGoal, setSelectedSubGoal] = useState("");

  const categories: Record<string, { label: string, icon: string, subGoals: { id: string, label: string }[] }> = {
    "menopause": {
      label: "Menopause",
      icon: "🌸",
      subGoals: [
        { id: "hot-flashes", label: "Hot Flashes / Cooling" },
        { id: "bone-density", label: "Bone Density" },
        { id: "mood-sleep", label: "Mood & Sleep" }
      ]
    },
    "office recovery": {
      label: "Office Recovery",
      icon: "💻",
      subGoals: [
        { id: "lower-back", label: "Lower Back Relief" },
        { id: "neck-shoulders", label: "Neck & Shoulders" },
        { id: "posture-reset", label: "Full Posture Reset" }
      ]
    },
    "injury rehab": {
      label: "Injury Rehab",
      icon: "🩹",
      subGoals: [
        { id: "knee-stability", label: "Knee Stability" },
        { id: "shoulder-mobility", label: "Shoulder Mobility" },
        { id: "lower-body-rehab", label: "Lower Body Rehab" }
      ]
    }
  };

  // Auto-select first sub-goal when category changes
  useEffect(() => {
    setSelectedSubGoal(categories[selectedGoal].subGoals[0].id);
  }, [selectedGoal]);

  const fitnessDatabase: Record<string, string[][]> = {
    "hot-flashes": [
      [
        "COOLING & REGULATION FLOW",
        "WARM-UP: 5 min slow rhythmic breathing.",
        "1. Seated Cat-Cow (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=seated+cat+cow)",
        "2. Wall Slides (3x10) - [Watch Demo](https://www.youtube.com/results?search_query=wall+slides+exercise)",
        "3. Gentle Knee-to-Chest (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=knee+to+chest+stretch)",
        "4. Supine Spinal Twist (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=supine+spinal+twist)",
        "5. Child’s Pose (Cooling) (3 min) - [Watch Demo](https://www.youtube.com/results?search_query=childs+pose+stretch)",
        "6. Legs Up The Wall (5 min) - [Watch Demo](https://www.youtube.com/results?search_query=legs+up+the+wall+pose)",
        "7. Modified Bird-Dog (3x8) - [Watch Demo](https://www.youtube.com/results?search_query=bird+dog+exercise)",
        "8. Seated Forward Fold (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=seated+forward+fold)",
        "9. Pelvic Tilts (3x20) - [Watch Demo](https://www.youtube.com/results?search_query=pelvic+tilts)",
        "10. Savasana (5 min) - [Watch Demo](https://www.youtube.com/results?search_query=savasana+yoga)",
        "ADVICE: Keep a fan nearby and wear breathable layers."
      ]
    ],
    "bone-density": [
      [
        "RESISTANCE & IMPACT TRAINING",
        "WARM-UP: 5 min dynamic leg swings.",
        "1. Weighted Goblet Squats (4x10) - [Watch Demo](https://www.youtube.com/results?search_query=goblet+squat+form)",
        "2. Dumbbell Deadlifts (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=dumbbell+deadlift+form)",
        "3. Step-Ups (3x12 per leg) - [Watch Demo](https://www.youtube.com/results?search_query=step+up+exercise)",
        "4. Standing Overhead Press (3x10) - [Watch Demo](https://www.youtube.com/results?search_query=overhead+press+form)",
        "5. Renegade Rows (3x10 per arm) - [Watch Demo](https://www.youtube.com/results?search_query=renegade+rows+form)",
        "6. Farmer's Walk (3x45s) - [Watch Demo](https://www.youtube.com/results?search_query=farmers+walk+exercise)",
        "7. Glute Bridge with Weight (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=glute+bridge+form)",
        "8. Box Jumps (Low impact) (3x8) - [Watch Demo](https://www.youtube.com/results?search_query=low+impact+box+jumps)",
        "9. Calf Raises (3x20) - [Watch Demo](https://www.youtube.com/results?search_query=calf+raises+form)",
        "10. Plank Taps (3x16) - [Watch Demo](https://www.youtube.com/results?search_query=plank+shoulder+taps)",
        "ADVICE: Focus on heavy, controlled movements to stimulate bone growth."
      ]
    ],
    "lower-back": [
      [
        "LUMBAR DECOMPRESSION",
        "WARM-UP: Hip circles and hula-hoops.",
        "1. Cat-Cow Stretch (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=cat+cow+stretch)",
        "2. Bird-Dog (3x12) - [Watch Demo](https://www.youtube.com/results?search_query=bird+dog+exercise)",
        "3. Dead Bug (3x10) - [Watch Demo](https://www.youtube.com/results?search_query=dead+bug+exercise)",
        "4. Glute Bridges (3x15) - [Watch Demo](https://www.youtube.com/results?search_query=glute+bridge+form)",
        "5. Hip Flexor Stretch (2 min per side) - [Watch Demo](https://www.youtube.com/results?search_query=hip+flexor+stretch)",
        "6. Cobra Pose (3x30s) - [Watch Demo](https://www.youtube.com/results?search_query=cobra+stretch)",
        "7. Side Plank (Modified) (2x30s) - [Watch Demo](https://www.youtube.com/results?search_query=side+plank+knee)",
        "8. Child's Pose (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=childs+pose)",
        "9. Pelvic Tilts (3x20) - [Watch Demo](https://www.youtube.com/results?search_query=pelvic+tilts)",
        "10. Hamstring Stretch (2 min) - [Watch Demo](https://www.youtube.com/results?search_query=hamstring+stretch)",
        "ADVICE: Strengthen your core to protect your spine."
      ]
    ]
    // Add remaining sub-goals here similarly...
  };

  const generatePlan = () => {
    setLoading(true);
    setAiResponse("");

    setTimeout(() => {
      // Find the specific sub-goal plan or default to first category plan if not found
      const categoryPlans = fitnessDatabase[selectedSubGoal] || fitnessDatabase[Object.keys(fitnessDatabase)[0]];
      const randomPlan = categoryPlans[Math.floor(Math.random() * categoryPlans.length)];
      
      const formattedResponse = (
        <div className="text-left space-y-2">
          {randomPlan.map((line, index) => {
            const linkMatch = line.match(/\[Watch Demo\]\((.*?)\)/);
            if (linkMatch) {
              const textBeforeLink = line.split(" - [")[0];
              return (
                <div key={index} className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-sm">{textBeforeLink}</span>
                  <a href={linkMatch[1]} target="_blank" rel="noopener noreferrer" className="text-[10px] text-fuchsia-400 font-bold border border-fuchsia-400 px-2 py-1 rounded hover:bg-fuchsia-400 hover:text-black transition-all">
                    VIDEO 🎥
                  </a>
                </div>
              );
            }
            return <p key={index} className={index === 0 ? "font-bold text-fuchsia-400 mb-4 text-center border-b border-fuchsia-400/20 pb-2" : "text-sm"}>{line}</p>;
          })}
        </div>
      );

      setAiResponse(formattedResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-12">
        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-500 mb-6 font-bold">FormFix Pro v2</div>
          <h1 className="text-6xl md:text-8xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text mb-8">
            Tailored For You.
          </h1>
          
          <div className="space-y-8">
            {/* MAIN CATEGORY SELECTOR */}
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 1: Choose Category</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(categories).map(([id, cat]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedGoal(id)}
                    className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2 ${
                      selectedGoal === id 
                      ? "border-fuchsia-500 bg-fuchsia-500/10 text-white shadow-[0_0_20px_rgba(217,70,239,0.2)]" 
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                    }`}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SUB-GOAL SELECTOR */}
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 2: Narrow Your Focus</p>
              <div className="flex flex-wrap gap-2">
                {categories[selectedGoal].subGoals.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubGoal(sub.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSubGoal === sub.id 
                      ? "bg-white text-black" 
                      : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI INTERFACE WINDOW */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em] flex justify-between items-center">
                <span>AI Generator Active</span>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-900 p-6 min-h-[350px] overflow-y-auto max-h-[450px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="animate-spin h-10 w-10 border-2 border-fuchsia-500 border-t-transparent rounded-full"></div>
                    <span className="text-[10px] font-mono text-fuchsia-400 animate-pulse uppercase tracking-[0.2em]">Designing your routine...</span>
                  </div>
                ) : aiResponse || (
                  <div className="text-center py-24">
                    <p className="text-zinc-600 italic text-sm">Select your focus areas above and generate your specialized routine.</p>
                  </div>
                )}
              </div>

              <button 
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-fuchsia-50 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter text-lg"
              >
                {loading ? "GENERATING..." : "GENERATE MY CUSTOM PLAN"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
