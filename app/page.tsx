"use client";

import React, { useState, useEffect, useMemo } from 'react';

// Tipovi za bolju stabilnost koda
type SubGoal = { id: string, label: string };
type Category = { label: string, icon: string, subGoals: SubGoal[] };

const categories: Record<string, Category> = {
  "menopause": {
    label: "Menopause",
    icon: "🌸",
    subGoals: [
      { id: "bone-density", label: "Bone Density" },
      { id: "hot-flashes", label: "Hot Flashes" },
      { id: "pelvic-health", label: "Pelvic Floor & Core" },
      { id: "mood-sleep", label: "Mood & Sleep" }
    ]
  },
  "office recovery": {
    label: "Office Recovery",
    icon: "💻",
    subGoals: [
      { id: "sciatica-relief", label: "Sciatica Relief" },
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

const fitnessDatabase: Record<string, string[][]> = {
  "pelvic-health": [["PELVIC FLOOR & CORE STABILITY", "WARM-UP: Diaphragmatic breathing.", "1. Pelvic Tilts - [https://www.youtube.com/results?search_query=pelvic+tilts]", "2. Glute Bridge - [https://www.youtube.com/results?search_query=glute+bridge]", "3. Dead Bug - [https://www.youtube.com/results?search_query=dead+bug+exercise]", "4. Bird-Dog - [https://www.youtube.com/results?search_query=bird+dog+exercise]", "5. Child's Pose - [https://www.youtube.com/results?search_query=childs+pose]", "ADVICE: Consistent light practice beats heavy rare sessions."]],
  "sciatica-relief": [["SCIATICA & NERVE RELIEF", "WARM-UP: Gentle hip circles.", "1. Pigeon Stretch - [https://www.youtube.com/results?search_query=pigeon+stretch]", "2. Nerve Flossing - [https://www.youtube.com/results?search_query=sciatic+nerve+flossing]", "3. Cat-Cow - [https://www.youtube.com/results?search_query=cat+cow+stretch]", "4. Figure 4 Stretch - [https://www.youtube.com/results?search_query=figure+4+stretch]", "5. Child's Pose - [https://www.youtube.com/results?search_query=childs+pose]", "ADVICE: Stop if you feel sharp electric pain."]]
};

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("office recovery");
  const [selectedSubGoal, setSelectedSubGoal] = useState("sciatica-relief");
  const [activePlan, setActivePlan] = useState<string[] | null>(null);
  
  // Tajmer state
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Menjanje subgoal-a kada se promeni kategorija
  useEffect(() => {
    const firstSub = categories[selectedGoal].subGoals[0].id;
    setSelectedSubGoal(firstSub);
  }, [selectedGoal]);

  // Štoperica logika
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const generatePlan = () => {
    setLoading(true);
    setActivePlan(null);
    setSeconds(0);
    setTimerActive(false);

    setTimeout(() => {
      const categoryPlans = fitnessDatabase[selectedSubGoal] || fitnessDatabase["pelvic-health"];
      const randomPlan = categoryPlans[Math.floor(Math.random() * categoryPlans.length)];
      setActivePlan(randomPlan);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-12">
        {/* LEVA STRANA: Odabir */}
        <div className="space-y-12">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-500 mb-6 font-bold">FormFix Pro v2</div>
            <h1 className="text-6xl md:text-7xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
              Tailored For You.
            </h1>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 1: Focus Area</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(categories).map(([id, cat]) => (
                  <button key={id} onClick={() => setSelectedGoal(id)} className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2 ${selectedGoal === id ? "border-fuchsia-500 bg-fuchsia-500/10 text-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
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

        {/* DESNA STRANA: Prikaz plana i Tajmera */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-20"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Header sa tajmerom u vrhu kartice */}
              <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-mono">Current Session</p>
                  <p className="text-2xl font-black text-white">{formatTime(seconds)}</p>
                </div>
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${timerActive ? "bg-red-500/20 text-red-500 border border-red-500/50" : "bg-green-500/20 text-green-500 border border-green-500/50"}`}
                >
                  {timerActive ? "PAUSE" : "START WORKOUT"}
                </button>
              </div>

              {/* Display polje */}
              <div className="rounded-2xl bg-black border border-zinc-900 p-6 min-h-[380px] overflow-y-auto max-h-[480px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="animate-spin h-10 w-10 border-2 border-fuchsia-500 border-t-transparent rounded-full"></div>
                    <span className="text-[10px] font-mono text-fuchsia-400 animate-pulse uppercase">Building routine...</span>
                  </div>
                ) : activePlan ? (
                  <div className="space-y-3">
                    {activePlan.map((line, index) => {
                      const linkMatch = line.match(/\[(.*?)\]/);
                      if (linkMatch) {
                        const textBeforeLink = line.split(" - [")[0];
                        return (
                          <div key={index} className="flex justify-between items-center border-b border-zinc-900 pb-2 group/line">
                            <span className="text-sm text-zinc-300">{textBeforeLink}</span>
                            <a 
                              href={linkMatch[1]} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              onClick={() => setTimerActive(true)}
                              className="text-[10px] text-fuchsia-400 font-bold border border-fuchsia-400/30 px-2 py-1 rounded hover:bg-fuchsia-400 hover:text-black transition-all"
                            >
                              PLAY 🎬
                            </a>
                          </div>
                        );
                      }
                      return (
                        <p key={index} className={index === 0 ? "font-bold text-fuchsia-400 mb-4 text-center border-b border-fuchsia-400/20 pb-2 uppercase tracking-tight" : "text-sm text-zinc-400"}>
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-24 px-4">
                    <p className="text-zinc-600 italic text-sm">Select your goal and hit generate.</p>
                  </div>
                )}
              </div>

              <button onClick={generatePlan} disabled={loading} className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-fuchsia-50 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter text-lg">
                {loading ? "PROCESSING..." : "GENERATE CUSTOM PLAN"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
