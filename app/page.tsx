"use client";

import React, { useState, useEffect } from 'react';

// --- DATA TYPES ---
type Exercise = { name: string; img: string; desc: string };
type Plan = { category: string; title: string; description: string; exercises: Exercise[] };

// --- COMPLETE DATABASE (9 SUB-CATEGORIES) ---
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
      { name: "Bridge Marching", img: "/exercises/bridge-march.jpg", desc: "In bridge position, lift one knee then the other." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "On your side, lift top knee while keeping feet together." },
      { name: "Knee Fall-Outs", img: "/exercises/knee-fallout.jpg", desc: "Lying on back, slowly drop one knee to the side." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "On your stomach, lift chest and legs simultaneously." },
      { name: "Plank on Knees", img: "/exercises/plank.jpg", desc: "Hold a straight line from head to knees, engage core." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Rest hips on heels and stretch arms forward." }
    ]
  },
  "bone-density": {
    category: "MENOPAUSE",
    title: "Bone Density & Strength",
    description: "Weight-bearing protocol to support skeletal health.",
    exercises: [
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Hold a squat against the wall to load the femur." },
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Rise on toes to strengthen lower leg bones." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Controlled stepping for hip bone loading." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Drive through heels to engage the posterior chain." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Total body tension for structural integrity." },
      { name: "Bird-Dog", img: "/exercises/bird-dog.jpg", desc: "Maintain balance and spinal bone alignment." },
      { name: "Superman", img: "/exercises/superman.jpg", desc: "Strengthen the spine's supporting muscles." },
      { name: "Dead Bug", img: "/exercises/dead-bug.jpg", desc: "Core bracing to protect the vertebrae." },
      { name: "Clamshells", img: "/exercises/clamshells.jpg", desc: "Hip joint health and bone support." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Passive recovery for the spine." }
    ]
  },
  "hormonal-balance": {
    category: "MENOPAUSE",
    title: "Stress Relief & Flow",
    description: "Mobility to balance cortisol and improve circulation.",
    exercises: [
      { name: "Cat-Cow", img: "/exercises/cat-cow.jpg", desc: "Rhythmic spinal movement to soothe the nervous system." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Deep breathing focus for stress reduction." },
      { name: "Pigeon Stretch", img: "/exercises/pigeon-stretch.jpg", desc: "Release hip tension where cortisol 'hides'." },
      { name: "Spinal Twist", img: "/exercises/spinal-twist.jpg", desc: "Improve digestive and hormonal flow." },
      { name: "Figure 4 Stretch", img: "/exercises/figure-4.jpg", desc: "Piriformis release for lower body ease." },
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

  // --- REHAB ---
  "knee-stability": {
    category: "INJURY REHAB",
    title: "Knee Stability",
    description: "Joint protection and quad strengthening.",
    exercises: [
      { name: "Knee Extension", img: "/exercises/knee-stability.jpg", desc: "Straighten knee fully to engage the VMO muscle." },
      { name: "Leg Raise", img: "/exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads without joint pressure." },
      { name: "Wall Sit", img: "/exercises/wall-sit.jpg", desc: "Build isometric endurance in the knee joint." },
      { name: "Calf Raises", img: "/exercises/ankle-strength.jpg", desc: "Support the knee by strengthening the ankle." },
      { name: "Side Clamshells", img: "/exercises/clamshells.jpg", desc: "Hip strength is vital for knee tracking." },
      { name: "Glute Bridge", img: "/exercises/glute-bridge.jpg", desc: "Strong glutes reduce the load on your knees." },
      { name: "Step-Ups", img: "/exercises/step-ups.jpg", desc: "Functional controlled stepping." },
      { name: "Plank", img: "/exercises/plank.jpg", desc: "Core stability for leg alignment." },
      { name: "Quad Stretch", img: "/exercises/quad-stretch.jpg", desc: "Gently release the front of the thigh." },
      { name: "Child's Pose", img: "/exercises/childs-pose.jpg", desc: "Rest the lower chain." }
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

  const categories = ["MENOPAUSE", "OFFICE RECOVERY", "INJURY REHAB"];

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
                        <p className="font-bold text-sm uppercase">{plan.title}</p>
                      </button>
                    ))}
                </div>
              </div>
            ))}
            
            <button 
              onClick={generatePlan} 
              className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-fuchsia-400 transition-colors uppercase tracking-tighter shadow-xl shadow-fuchsia-500/10"
            >
              Generate 10-Step Plan
            </button>
          </div>
        </div>

        {/* RIGHT: DISPLAY */}
