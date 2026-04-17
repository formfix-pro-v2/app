"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- TIPOVI ---
type Exercise = { name: string; img: string; desc: string; duration: number };
type Plan = { category: string; title: string; description: string; exercises: Exercise[] };

// --- BAZA (Proširena sa trajanjem vežbi) ---
const fitnessDatabase: Record<string, Plan> = {
  "pelvic-health": {
    category: "MENOPAUSE",
    title: "Pelvic Floor & Core",
    description: "Deep core engagement for stability and bladder control.",
    exercises: [
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Tilt your pelvis back and press lower back into the floor.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Lift hips toward the ceiling, squeeze glutes at the top.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Lower opposite arm and leg while keeping back flat.", duration: 45 }
    ]
  },
  "sciatica-relief": {
    category: "OFFICE RECOVERY",
    title: "Sciatica & Nerve Relief",
    description: "Decompression and nerve gliding.",
    exercises: [
      { name: "Nerve Flossing", img: "exercises/nerve-flossing.jpg", desc: "Seated, glide the sciatic nerve.", duration: 60 },
      { name: "Pigeon Stretch", img: "exercises/pigeon-stretch.jpg", desc: "Lower torso over front leg to open hips.", duration: 90 }
    ]
  }
};

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("pelvic-health");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  
  // Tajmeri
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [exerciseSeconds, setExerciseSeconds] = useState(0);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  // Prefix za GitHub Pages (ako ti je repo "app")
  const imgPrefix = "/app/"; 

  // Globalni tajmer (Total Time)
  useEffect(() => {
    let interval: any;
    if (!isPaused) {
      interval = setInterval(() => setTotalSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Tajmer za pojedinačnu vežbu (Countdown)
  useEffect(() => {
    let interval: any;
    if (!isPaused && activePlan && exerciseSeconds > 0) {
      interval = setInterval(() => {
        setExerciseSeconds(s => s - 1);
      }, 1000);
    } else if (exerciseSeconds === 0 && !isPaused && activePlan) {
      // Automatski prelazak na sledeću vežbu
      if (currentExerciseIdx < activePlan.exercises.length - 1) {
        const nextIdx = currentExerciseIdx + 1;
        setCurrentExerciseIdx(nextIdx);
        setExerciseSeconds(activePlan.exercises[nextIdx].duration);
      } else {
        setIsPaused(true); // Kraj treninga
      }
    }
    return () => clearInterval(interval);
  }, [isPaused, exerciseSeconds, currentExerciseIdx, activePlan]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const startWorkout = () => {
    setLoading(true);
    setTimeout(() => {
      const plan = fitnessDatabase[selectedKey];
      setActivePlan(plan);
      setCurrentExerciseIdx(0);
      setExerciseSeconds(plan.exercises[0].duration);
      setTotalSeconds(0);
      setIsPaused(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 font-sans selection:bg-fuchsia-500">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* LEVO: Kontrole (4 kolone) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-3xl backdrop-blur-md">
            <h1 className="text-4xl font-black italic tracking-tighter bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent mb-2">
              FORMFIX PRO
            </h1>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-8">Premium Rehab System</p>
            
            <div className="space-y-4">
              {Object.entries(fitnessDatabase).map(([key, plan]) => (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left group ${
                    selectedKey === key 
                    ? "border-fuchsia-500 bg-fuchsia-500/10 shadow-[0_0_20px_rgba(217,70,239,0.2)]" 
                    : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                  }`}
                >
                  <p className={`text-[10px] font-bold ${selectedKey === key ? "text-fuchsia-400" : "text-zinc-500"}`}>{plan.category}</p>
                  <p className="font-bold text-white group-hover:text-fuchsia-300 transition-colors">{plan.title}</p>
                </button>
              ))}
              
              <button 
                onClick={startWorkout}
                className="w-full py-5 bg-gradient-to-r from-fuchsia-600 to-orange-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-fuchsia-500/20"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>

        {/* DESNO: Player (8 kolona) */}
        <div className="lg:col-span-8">
          {activePlan ? (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
              {/* Header sa tajmerima */}
              <div className="p-8 border-b border-zinc-800 flex justify-between items-end bg-black/40">
                <div>
                  <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Total Session Time</p>
                  <p className="text-3xl font-black text-white">{formatTime(totalSeconds)}</p>
                </div>
                <div className="text-right">
                  <p className="text-fuchsia-500 text-[10px] font-mono uppercase tracking-widest">Exercise Countdown</p>
                  <p className="text-6xl font-black text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    {formatTime(exerciseSeconds)}
                  </p>
                </div>
              </div>

              {/* Display Vežbe */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <img 
                      src={`${imgPrefix}${activePlan.exercises[currentExerciseIdx].img}`}
                      alt="exercise"
                      className="relative rounded-2xl w-full aspect-square object-cover border border-zinc-700"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/500?text=FormFix+Motion"; }}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-full">
                      <p className="text-fuchsia-500 text-[10px] font-bold uppercase italic">Exercise {currentExerciseIdx + 1} of {activePlan.exercises.length}</p>
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">{activePlan.exercises[currentExerciseIdx].name}</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">{activePlan.exercises[currentExerciseIdx].desc}</p>
                    
                    <button 
                      onClick={() => setIsPaused(!isPaused)}
                      className={`px-8 py-4 rounded-xl font-black text-xs tracking-widest transition-all ${
                        isPaused ? "bg-green-500 text-black hover:bg-green-400" : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                      }`}
                    >
                      {isPaused ? "RESUME WORKOUT" : "PAUSE SESSION"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar na dnu */}
              <div className="h-2 bg-zinc-800 w-full">
                <div 
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-orange-500 transition-all duration-1000"
                  style={{ width: `${((currentExerciseIdx + 1) / activePlan.exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-600 p-12 text-center">
              <div className="w-20 h-20 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-6">
                <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-widest">System Ready</h3>
              <p className="max-w-xs text-sm mt-2 font-mono">Select your target recovery zone to initialize the training protocol.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
