"use client";

import React, { useState, useEffect } from 'react';

// --- DATA TYPES ---
type Exercise = { name: string; img: string; desc: string };
type Plan = { title: string; description: string; exercises: Exercise[] };

// --- DATABASE (10 EXERCISES PER CATEGORY) ---
const fitnessDatabase: Record<string, Plan> = {
  "pelvic-health": {
    title: "PELVIC FLOOR & CORE STABILITY",
    description: "Deep core engagement protocol for stability and bladder control.",
    exercises: [
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Tilt your pelvis back and press lower back into the floor." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Lift hips toward the ceiling, squeeze glutes at the top." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Lower opposite arm and leg while keeping back flat." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Extend opposite arm and leg, maintain a neutral spine." },
      { name: "Bridge Marching", img: "/exercises/bridge-march.jpg", desc: "In bridge position, lift one knee then the other." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "On your side, lift top knee while keeping feet together." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "On your stomach, lift chest and legs simultaneously." },
      { name: "Knee Fall-Outs", img: "/exercises/knee-fallout.jpg", desc: "Lying on back, slowly drop one knee to the side." },
      { name: "Plank on Knees", img: "/exercises/plank.jpg", desc: "Hold a straight line from head to knees, engage core." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Rest hips on heels and stretch arms forward." }
    ]
  },
  "sciatica-relief": {
    title: "SCIATICA & NERVE RELIEF",
    description: "Decompression and nerve gliding to eliminate shooting leg pain.",
    exercises: [
      { name: "Nerve Flossing", img: "/exercises/nerve-flossing.jpg", desc: "Seated, extend leg and flex foot to glide the nerve." },
      { name: "Pigeon Stretch", img: "/exercises/pigeon-stretch.jpg", desc: "Lower your torso over a folded front leg to open hips." },
      { name: "Figure 4 Stretch", img: "/exercises/figure-4.jpg", desc: "Cross ankle over knee and pull the bottom leg in." },
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Arch and round your back to mobilize the spine." },
      { name: "Cobra Pose", img: "/exercises/cobra.jpg", desc: "Press chest up while keeping hips on the floor." },
      { name: "Knees-to-Chest", img: "/exercises/knees-to-chest.jpg", desc: "Hug knees to chest to decompress lower back." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Lying down, drop knees to one side, look to the other." },
      { name: "Hamstring Stretch", img: "/exercises/hamstring-stretch.jpg", desc: "Keep leg straight and pull gently toward you." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Subtle pelvic rotation to loosen the SI joint." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Final relaxation to release all spinal tension." }
    ]
  },
  "knee-stability": {
    title: "KNEE REHAB & STRENGTH",
    description: "Focusing on joint stability and quadriceps engagement.",
    exercises: [
      { name: "Knee Extension", img: "/exercises/knee-stability.jpg", desc: "Straighten knee against a towel roll or resistance." },
      { name: "Straight Leg Raise", img: "/exercises/leg-raise.jpg", desc: "Keep leg locked and lift to the height of other knee." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Strong glutes reduce the load on your knees." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Lean against wall, slide down slightly, and hold." },
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Rise on toes to strengthen the lower leg chain." },
      { name: "Side Clamshells", img: "/exercises/clamshells.jpg", desc: "Hip strength is vital for proper knee tracking." },
      { name: "Isometric Quads", img: "/exercises/quad-set.jpg", desc: "Squeeze thigh muscle hard and hold for 5 seconds." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Slow, controlled step onto a low, stable surface." },
      { name: "Plank Stability", img: "/exercises/plank.jpg", desc: "Core strength prevents knee-collapsing movements." },
      { name: "Quad Stretch", img: "/exercises/quad-stretch.jpg", desc: "Gently pull heel to glute to release the thigh." }
    ]
  }
};

export default function FormFixPro() {
  const [loading, setLoading] = useState(false);
  const [selectedSubGoal, setSelectedSubGoal] = useState("pelvic-health");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
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
      setActivePlan(fitnessDatabase[selectedSubGoal]);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 py-10">
        
        {/* LEFT: SELECTION */}
        <div className="space-y-8">
          <header>
            <p className="text-fuchsia-500 font-bold tracking-widest text-xs mb-2 uppercase">FormFix Pro v2</p>
            <h1 className="text-6xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Tailored Training.
            </h1>
          </header>

          <div className="space-y-4">
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Select Your Goal</p>
            <div className="grid grid-cols-1 gap-3">
              {Object.keys(fitnessDatabase).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedSubGoal(key)}
                  className={`p-4 rounded-2xl border text-left transition-all ${selectedSubGoal === key ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"}`}
                >
                  <p className="font-bold text-sm uppercase">{key.replace("-", " ")}</p>
                </button>
              ))}
            </div>
            <button 
              onClick={generatePlan} 
              className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-fuchsia-400 transition-colors uppercase tracking-tighter"
            >
              Generate 10-Step Plan
            </button>
          </div>
        </div>

        {/* RIGHT: DISPLAY */}
        <div className="relative">
          <div className="sticky top-10 bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {/* TIMER HEADER */}
            <div className="p-6 bg-zinc-900/50 border-b border-zinc-900 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">Workout Time</p>
                <p className="text-3xl font-black">{formatTime(seconds)}</p>
              </div>
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={`px-6 py-2 rounded-xl font-bold text-xs ${timerActive ? "bg-red-500/20 text-red-500 border border-red-500/50" : "bg-green-500/20 text-green-500 border border-green-500/50"}`}
              >
                {timerActive ? "PAUSE" : "START"}
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin h-8 w-8 border-2 border-fuchsia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-xs font-mono text-zinc-500 animate-pulse">OPTIMIZING ROUTINE...</p>
                </div>
              ) : activePlan ? (
                <div className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-xl font-black text-fuchsia-400 mb-2 uppercase">{activePlan.title}</h2>
                    <p className="text-xs text-zinc-500 italic">{activePlan.description}</p>
                  </div>
                  {activePlan.exercises.map((ex, i) => (
                    <div key={i} className="space-y-4 group">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-fuchsia-500">0{i+1}</span>
                        <h3 className="font-bold text-sm tracking-wide uppercase">{ex.name}</h3>
                      </div>
                      <img src={ex.img} alt={ex.name} className="w-full rounded-2xl border border-zinc-800 grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <p className="text-xs text-zinc-400 leading-relaxed">{ex.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-700">
                  <p className="text-sm italic">Select a category to begin your session.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
