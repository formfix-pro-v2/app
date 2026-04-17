"use client";

import React, { useState, useEffect } from 'react';

// --- DEFINICIJA TIPOVA ---
type Exercise = { name: string; img: string; desc: string };
type Plan = { category: string; title: string; description: string; exercises: Exercise[] };

// --- BAZA PODATAKA (9 SUBKATEGORIJA) ---
const fitnessDatabase: Record<string, Plan> = {
  // --- MENOPAUSE ---
  "pelvic-health": {
    category: "MENOPAUSE",
    title: "Pelvic Floor & Core",
    description: "Deep core engagement for stability and bladder control.",
    exercises: [
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Tilt your pelvis back and press lower back into the floor." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Lift hips toward the ceiling, squeeze glutes at the top." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Lower opposite arm and leg while keeping back flat." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Extend opposite arm and leg, maintain a neutral spine." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "On your side, lift top knee while keeping feet together." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "On your stomach, lift chest and legs simultaneously." },
      { name: "Knee Fall-Outs", img: "/exercises/knee-fallout.jpg", desc: "Lying on back, slowly drop one knee to the side." },
      { name: "Plank on Knees", img: "/exercises/plank.jpg", desc: "Hold a straight line from head to knees, engage core." },
      { name: "Bridge Marching", img: "/exercises/bridge-march.jpg", desc: "In bridge position, lift one knee then the other." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Rest hips on heels and stretch arms forward." }
    ]
  },
  "bone-density": {
    category: "MENOPAUSE",
    title: "Bone Density & Strength",
    description: "Weight-bearing exercises to support skeletal health.",
    exercises: [
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Hold a squat against the wall to load the femur." },
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Rise on toes to strengthen lower leg bones." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Controlled stepping for hip bone loading." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Drive through heels to engage the posterior chain." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Total body tension for structural integrity." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Balance on all fours, extending opposite limbs." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Strengthen the spine's supporting muscles." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Core bracing to protect the vertebrae." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "Hip joint health and bone support." },
      { name: "Knee Fall-Outs", img: "/exercises/knee-fallout.jpg", desc: "Gently open hips for circulation." }
    ]
  },
  "hormonal-balance": {
    category: "MENOPAUSE",
    title: "Stress Relief & Flow",
    description: "Mobility and breathing to balance cortisol levels.",
    exercises: [
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Move with your breath to mobilize the spine." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Deep breathing focus for stress reduction." },
      { name: "Pigeon Stretch", img: "/exercises/pigeon-stretch.jpg", desc: "Release hip tension where cortisol 'hides'." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Improve digestive and hormonal flow." },
      { name: "Figure 4 Stretch", img: "/exercises/figure-4.jpg", desc: "Release the piriformis and glutes." },
      { name: "Knees-to-Chest", img: "/exercises/knees-to-chest.jpg", desc: "Lower back decompression." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Foundational pelvic circulation." },
      { name: "Nerve Flossing", img: "/exercises/nerve-flossing.jpg", desc: "Release neural tension." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Mindful core control." },
      { name: "Hamstring Stretch", img: "/exercises/hamstring-stretch.jpg", desc: "Gentle leg release." }
    ]
  },
  // --- OFFICE RECOVERY ---
  "sciatica-relief": {
    category: "OFFICE RECOVERY",
    title: "Sciatica & Nerve Relief",
    description: "Decompression and nerve gliding for leg pain.",
    exercises: [
      { name: "Nerve Flossing", img: "/exercises/nerve-flossing.jpg", desc: "Seated, glide the sciatic nerve." },
      { name: "Pigeon Stretch", img: "/exercises/pigeon-stretch.jpg", desc: "Lower torso over front leg to open hips." },
      { name: "Figure 4 Stretch", img: "/exercises/figure-4.jpg", desc: "Cross ankle over knee to decompress nerve." },
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Mobilize the spine to reduce disc pressure." },
      { name: "Cobra Pose", img: "/exercises/cobra.jpg", desc: "Gently arch to decompress lower discs." },
      { name: "Knees-to-Chest", img: "/exercises/knees-to-chest.jpg", desc: "Hug knees to decompress lower back." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Gentle rotation to release lumbar tension." },
      { name: "Hamstring Stretch", img: "/exercises/hamstring-stretch.jpg", desc: "Relieve tension along the nerve path." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Subtle SI joint mobilization." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Final spinal relaxation." }
    ]
  },
  "neck-shoulder": {
    category: "OFFICE RECOVERY",
    title: "Neck & Shoulder Fix",
    description: "Correct tech-neck and open the thoracic spine.",
    exercises: [
      { name: "Wall Slides", img: "/exercises/shoulder-mobility.jpg", desc: "Slide arms up wall to open the chest." },
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Focus on upper back (thoracic) movement." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Stabilize scapula and core." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Strengthen upper back extensors." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Shoulder girdle stability." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Open chest and rotate mid-back." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Stretch upper lats and shoulders." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Core control to prevent slouching." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Static posture alignment." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Foundational posture check." }
    ]
  },
  "lower-back-fix": {
    category: "OFFICE RECOVERY",
    title: "Lower Back Stability",
    description: "Strengthen the deep stabilizers of the spine.",
    exercises: [
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Core and back balance." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Deep abdominal bracing." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Strengthen glutes to support the spine." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Total core stability." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Gentle spinal mobilization." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Back muscle engagement." },
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Spinal flexibility." },
      { name: "Figure 4 Stretch", img: "/exercises/figure-4.jpg", desc: "Release hip tension." },
      { name: "Bridge Marching", img: "/exercises/bridge-march.jpg", desc: "Dynamic stability." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Passive recovery." }
    ]
  },
  // --- INJURY REHAB ---
  "knee-stability": {
    category: "INJURY REHAB",
    title: "Knee Stability",
    description: "Joint protection and quad strengthening.",
    exercises: [
      { name: "Knee Extension", img: "/exercises/knee-stability.jpg", desc: "Straighten knee fully to engage the muscle." },
      { name: "Leg Raise", img: "/exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Build isometric endurance." },
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Strengthen the ankle for knee support." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "Hip strength for knee tracking." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Reduce knee load using glutes." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Functional controlled stepping." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Core stability for alignment." },
      { name: "Quad Stretch", img: "/exercises/quad-stretch.jpg", desc: "Release front thigh pressure." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Rest the lower chain." }
    ]
  },
  "shoulder-rehab": {
    category: "INJURY REHAB",
    title: "Shoulder Mobility",
    description: "Rebuilding range of motion and scapular strength.",
    exercises: [
      { name: "Wall Slides", img: "/exercises/shoulder-mobility.jpg", desc: "Controlled movement for joint health." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Stability for the shoulder blades." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Building load tolerance." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Back shoulder engagement." },
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Mobilize the thoracic spine." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Improve upper body rotation." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Gentle shoulder stretch." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Maintain torso stability." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Total posture hold." },
      { name: "Pelvic Tilts", img: "/exercises/pelvic-tilts.jpg", desc: "Base alignment." }
    ]
  },
  "ankle-foot": {
    category: "INJURY REHAB",
    title: "Ankle & Foot",
    description: "Building stability from the ground up.",
    exercises: [
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Build power in the lower leg." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Controlled ankle loading." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Static strength for tendons." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Build the whole lower chain." },
      { name: "Knee Extension", img: "/exercises/knee-stability.jpg", desc: "Balance work for the ankle." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Core-foot connection." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Global coordination." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Posterior chain engagement." },
      { name: "Bridge Marching", img: "/exercises/bridge-march.jpg", desc: "Dynamic balance training." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Final relaxation." }
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
    }, 800);
  };

  const categories = ["MENOPAUSE", "OFFICE RECOVERY", "INJURY REHAB"];

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 py-10">
        
        {/* LEVA STRANA: SELEKCIJA */}
        <div className="space-y-8">
          <header>
            <p className="text-fuchsia-500 font-bold tracking-widest text-[10px] mb-2 uppercase">FormFix Pro v2</p>
            <h1 className="text-5xl font-black text-white leading-tight">Tailored Training.</h1>
          </header>

          <div className="space-y-6">
            {categories.map(cat => (
              <div key={cat} className="space-y-2">
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest ml-1">{cat}</p>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(fitnessDatabase)
                    .filter(([_, plan]) => plan.category === cat)
                    .map(([key, plan]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSubGoal(key)}
                        className={`p-4 rounded-2xl border text-left transition-all ${selectedSubGoal === key ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"}`}
                      >
                        <p className="font-bold text-xs uppercase text-white">{plan.title}</p>
                      </button>
                    ))}
                </div>
              </div>
            ))}
            
            <button 
              onClick={generatePlan} 
              className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-fuchsia-400 transition-colors uppercase text-sm"
            >
              Generate Plan
            </button>
          </div>
        </div>

        {/* DESNA STRANA: DISPLEJ */}
        <div className="relative">
          <div className="sticky top-10 bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {/* TAJMER */}
            <div className="p-6 bg-zinc-900/50 border-b border-zinc-900 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">Workout Time</p>
                <p className="text-2xl font-black">{formatTime(seconds)}</p>
              </div>
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${timerActive ? "bg-red-500/20 text-red-500 border border-red-500/50" : "bg-green-500/20 text-green-500 border border-green-500/50"}`}
              >
                {timerActive ? "PAUSE" : "START"}
              </button>
            </div>

            {/* LISTA VEŽBI */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin h-6 w-6 border-2 border-fuchsia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Building Routine...</p>
                </div>
              ) : activePlan ? (
                <div className="space-y-10">
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-fuchsia-500 uppercase">{activePlan.title}</h2>
                    <p className="text-[10px] text-zinc-500 italic mt-1">{activePlan.description}</p>
                  </div>
                  {activePlan.exercises.map((ex, i) => (
                    <div key={i} className="space-y-4 pb-8 border-b border-zinc-900 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-fuchsia-500">0{i+1}</span>
                        <h3 className="font-bold text-sm uppercase">{ex.name}</h3>
                      </div>
                      <img 
                        src={ex.img} 
                        alt={ex.name} 
                        className="w-full rounded-2xl border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x225/111/333?text=Slika+u+obradi...";
                        }}
                      />
                      <p className="text-xs text-zinc-400 leading-relaxed">{ex.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-700">
                  <p className="text-xs italic">Select a category to begin.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
