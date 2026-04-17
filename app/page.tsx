"use client";

import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [planResponse, setPlanResponse] = useState<React.ReactNode>("");
  const [selectedGoal, setSelectedGoal] = useState("office recovery");
  const [selectedSubGoal, setSelectedSubGoal] = useState("");

  const categories: Record<string, { label: string, icon: string, subGoals: { id: string, label: string }[] }> = {
    "menopause": {
      label: "Menopause",
      icon: "🌸",
      subGoals: [
        { id: "bone-density", label: "Bone Density" },
        { id: "hot-flashes", label: "Hot Flashes" },
        { id: "pelvic-health", label: "Pelvic Floor & Core" }, // Novo: Pelvic Floor
        { id: "mood-sleep", label: "Mood & Sleep" }
      ]
    },
    "office recovery": {
      label: "Office Recovery",
      icon: "💻",
      subGoals: [
        { id: "sciatica-relief", label: "Sciatica Relief" }, // Novo: Uklješteni živac
        { id: "neck-shoulders", label: "Neck & Shoulders" },
        { id: "lower-back", label: "Lower Back Relief" },
        { id: "wrist-care", label: "Wrist & Forearm" }
      ]
    },
    "injury rehab": {
      label: "Injury Rehab",
      icon: "🩹",
      subGoals: [
        { id: "knee-stability", label: "Knee Stability" },
        { id: "shoulder-mobility", label: "Shoulder Mobility" },
        { id: "ankle-strength", label: "Ankle Strength" },
        { id: "core-stability", label: "Core Stability" }
      ]
    }
  };

  useEffect(() => {
    setSelectedSubGoal(categories[selectedGoal].subGoals[0].id);
  }, [selectedGoal]);

  const fitnessDatabase: Record<string, string[][]> = {
    // --- NOVE SUBKATEGORIJE ---
    "pelvic-health": [[
      "PELVIC FLOOR & CORE STABILITY", "WARM-UP: Diaphragmatic breathing (3 min).",
      "1. Pelvic Tilts (3x20) - [https://www.youtube.com/results?search_query=pelvic+tilts+form]",
      "2. Glute Bridges (Slow) (3x15) - [https://www.youtube.com/results?search_query=slow+glute+bridge]",
      "3. Dead Bug (3x12) - [https://www.youtube.com/results?search_query=dead+bug+exercise]",
      "4. Bird-Dog (3x10) - [https://www.youtube.com/results?search_query=bird+dog+exercise]",
      "5. Adductor Squeezes (3x15) - [https://www.youtube.com/results?search_query=adductor+squeezes+with+ball]",
      "6. Modified Plank (3x30s) - [https://www.youtube.com/results?search_query=knee+plank+form]",
      "7. Cat-Cow (3x12) - [https://www.youtube.com/results?search_query=cat+cow+stretch]",
      "8. Child's Pose (2 min) - [https://www.youtube.com/results?search_query=childs+pose+stretch]",
      "9. Deep Squat Breathe (1 min) - [https://www.youtube.com/results?search_query=deep+squat+breathing]",
      "10. Wall Sit (Focus on Core) (3x30s) - [https://www.youtube.com/results?search_query=wall+sit+exercise]",
      "ADVICE: Avoid holding your breath during exercises; exhale on the effort."
    ]],
    "sciatica-relief": [[
      "SCIATICA & NERVE DECOMPRESSION", "WARM-UP: Gentle hip circles.",
      "1. Pigeon Stretch (2 min/side) - [https://www.youtube.com/results?search_query=pigeon+stretch+sciatica]",
      "2. Nerve Flossing (3x15) - [https://www.youtube.com/results?search_query=sciatic+nerve+flossing]",
      "3. Figure 4 Stretch (2 min/side) - [https://www.youtube.com/results?search_query=figure+4+stretch]",
      "4. Cobra Pose (Low) (3x10) - [https://www.youtube.com/results?search_query=low+cobra+stretch]",
      "5. Kneeling Hip Flexor Stretch (1 min/side) - [https://www.youtube.com/results?search_query=hip+flexor+stretch]",
      "6. Bird-Dog (3x12) - [https://www.youtube.com/results?search_query=bird+dog+exercise]",
      "7. Glute Bridge (3x15) - [https://www.youtube.com/results?search_query=glute+bridge+form]",
      "8. Cat-Cow (3x15) - [https://www.youtube.com/results?search_query=cat+cow+stretch]",
      "9. Standing Hamstring Stretch (1 min/side) - [https://www.youtube.com/results?search_query=standing+hamstring+stretch]",
      "10. Child's Pose (3 min) - [https://www.youtube.com/results?search_query=childs+pose]",
      "ADVICE: If a movement increases 'electric' pain down the leg, stop immediately."
    ]],
    
    // --- OSTALE KATEGORIJE (Skraćeno radi preglednosti, koristi prethodne podatke) ---
    "bone-density": [[ "BONE DENSITY PLAN", "WARM-UP: Brisk walk.", "1. Weighted Squats... [https://www.youtube.com/results?search_query=weighted+squat]" ]],
    "neck-shoulders": [[ "NECK & SHOULDER RESET", "WARM-UP: Shoulder rolls.", "1. Chin Tucks... [https://www.youtube.com/results?search_query=chin+tucks]" ]],
    "knee-stability": [[ "KNEE STABILITY", "WARM-UP: Ankle pumps.", "1. Quad Sets... [https://www.youtube.com/results?search_query=quad+sets]" ]]
  };

  const generatePlan = () => {
    setLoading(true);
    setPlanResponse("");

    setTimeout(() => {
      const categoryPlans = fitnessDatabase[selectedSubGoal] || fitnessDatabase["bone-density"];
      const randomPlan = categoryPlans[Math.floor(Math.random() * categoryPlans.length)];
      
      const formattedResponse = (
        <div className="text-left space-y-2">
          {randomPlan.map((line, index) => {
            const linkMatch = line.match(/\[(.*?)\]/);
            if (linkMatch) {
              const textBeforeLink = line.split(" - [")[0];
              return (
                <div key={index} className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-sm">{textBeforeLink}</span>
                  <a href={linkMatch[1]} target="_blank" rel="noopener noreferrer" className="text-[10px] text-fuchsia-400 font-bold border border-fuchsia-400 px-2 py-1 rounded hover:bg-fuchsia-400 hover:text-black transition-all">
                    PLAY 🎬
                  </a>
                </div>
              );
            }
            return <p key={index} className={index === 0 ? "font-bold text-fuchsia-400 mb-4 text-center border-b border-fuchsia-400/20 pb-2 uppercase tracking-tight" : "text-sm text-zinc-300"}>{line}</p>;
          })}
        </div>
      );

      setPlanResponse(formattedResponse);
      setLoading(false);
    }, 1200);
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
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 1: Focus Area</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(categories).map(([id, cat]) => (
                  <button key={id} onClick={() => setSelectedGoal(id)} className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2 ${selectedGoal === id ? "border-fuchsia-500 bg-fuchsia-500/10 text-white shadow-[0_0_20px_rgba(217,70,239,0.2)]" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 2: Specific Goal</p>
              <div className="flex flex-wrap gap-2">
                {categories[selectedGoal].subGoals.map((sub) => (
                  <button key={sub.id} onClick={() => setSelectedSubGoal(sub.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedSubGoal === sub.id ? "bg-white text-black" : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"}`}>
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em] flex justify-between items-center">
                <span>Program Generator</span>
                <div className="flex items-center gap-2">
                    <span className="text-green-500 text-[9px]">ONLINE</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-900 p-6 min-h-[380px] overflow-y-auto max-h-[480px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="animate-spin h-10 w-10 border-2 border-fuchsia-500 border-t-transparent rounded-full"></div>
                    <span className="text-[10px] font-mono text-fuchsia-400 animate-pulse uppercase tracking-[0.2em]">Building your routine...</span>
                  </div>
                ) : planResponse || (
                  <div className="text-center py-24 px-4">
                    <p className="text-zinc-600 italic text-sm">Define your goals and click below to view your specialized training plan.</p>
                  </div>
                )}
              </div>

              <button onClick={generatePlan} disabled={loading} className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-fuchsia-50 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter text-lg shadow-xl">
                {loading ? "PROCESSING..." : "GENERATE CUSTOM PLAN"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
