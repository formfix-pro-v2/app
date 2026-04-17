"use client";

import React, { useState, useEffect } from 'react';

// --- TIPOVI ---
type Exercise = { name: string; img: string; desc: string; duration: number };
type Plan = { category: string; title: string; description: string; exercises: Exercise[] };

// --- PUNA BAZA PODATAKA (SVAKI PROGRAM IMA 10 VEŽBI) ---
const fitnessDatabase: Record<string, Plan> = {
  "pelvic-health": {
    category: "MENOPAUSE",
    title: "Pelvic Floor & Core",
    description: "Deep core engagement for stability and bladder control.",
    exercises: [
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Tilt your pelvis back and press lower back into the floor.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Lift hips toward the ceiling, squeeze glutes at the top.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Lower opposite arm and leg while keeping back flat.", duration: 45 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Extend opposite arm and leg, maintain a neutral spine.", duration: 45 },
      { name: "Clamshells", img: "exercises/clamshells.jpg", desc: "On your side, lift top knee while keeping feet together.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "On your stomach, lift chest and legs simultaneously.", duration: 45 },
      { name: "Knee Fall-Outs", img: "exercises/knee-fallout.jpg", desc: "Lying on back, slowly drop one knee to the side.", duration: 45 },
      { name: "Plank on Knees", img: "exercises/plank.jpg", desc: "Hold a straight line from head to knees, engage core.", duration: 60 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "In bridge position, lift one knee then the other.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Rest hips on heels and stretch arms forward.", duration: 60 }
    ]
  },
  "bone-density": {
    category: "MENOPAUSE",
    title: "Bone Density & Strength",
    description: "Weight-bearing exercises to support skeletal health.",
    exercises: [
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Hold a squat against the wall to load the femur.", duration: 45 },
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Rise on toes to strengthen lower leg bones.", duration: 45 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Controlled stepping for hip bone loading.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Drive through heels to engage posterior chain.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Total body tension for structural integrity.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Balance on all fours, extending opposite limbs.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Strengthen the spine's supporting muscles.", duration: 45 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core bracing to protect the vertebrae.", duration: 45 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic load on hips and spine.", duration: 45 }
    ]
  },
  "hormonal-balance": {
    category: "MENOPAUSE",
    title: "Stress Relief & Flow",
    description: "Mobility and breathing to balance cortisol levels.",
    exercises: [
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Move with your breath to mobilize the spine.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Deep breathing focus for stress reduction.", duration: 90 },
      { name: "Pigeon Stretch", img: "exercises/pigeon-stretch.jpg", desc: "Release hip tension.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Improve digestive and hormonal flow.", duration: 60 },
      { name: "Knees-to-Chest", img: "exercises/knees-to-chest.jpg", desc: "Lower back decompression.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Foundational pelvic circulation.", duration: 45 },
      { name: "Nerve Flossing", img: "exercises/nerve-flossing.jpg", desc: "Release neural tension.", duration: 60 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Gentle leg release.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Mindful core control.", duration: 45 },
      { name: "Knee Fall-Outs", img: "exercises/knee-fallout.jpg", desc: "Gentle hip mobility.", duration: 45 }
    ]
  },
  "sciatica-relief": {
    category: "OFFICE RECOVERY",
    title: "Sciatica & Nerve Relief",
    description: "Decompression and nerve gliding for leg pain.",
    exercises: [
      { name: "Nerve Flossing", img: "exercises/nerve-flossing.jpg", desc: "Seated, glide the sciatic nerve.", duration: 60 },
      { name: "Pigeon Stretch", img: "exercises/pigeon-stretch.jpg", desc: "Lower torso over front leg to open hips.", duration: 60 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Mobilize the spine to reduce disc pressure.", duration: 60 },
      { name: "Cobra Pose", img: "exercises/cobra.jpg", desc: "Gently arch to decompress lower discs.", duration: 60 },
      { name: "Knees-to-Chest", img: "exercises/knees-to-chest.jpg", desc: "Hug knees to decompress lower back.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Gentle rotation to release lumbar tension.", duration: 60 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Relieve tension along the nerve path.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Subtle SI joint mobilization.", duration: 45 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core stability without back strain.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Final spinal relaxation.", duration: 90 }
    ]
  },
  "neck-shoulder": {
    category: "OFFICE RECOVERY",
    title: "Neck & Shoulder Fix",
    description: "Correct tech-neck and open the thoracic spine.",
    exercises: [
      { name: "Wall Slides", img: "exercises/shoulder-mobility.jpg", desc: "Slide arms up wall to open the chest.", duration: 60 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Focus on upper back movement.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Stabilize scapula and core.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Strengthen upper back extensors.", duration: 45 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Shoulder girdle stability.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Open chest and rotate mid-back.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Stretch upper lats and shoulders.", duration: 90 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core control to prevent slouching.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Static posture alignment.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Foundational posture check.", duration: 45 }
    ]
  },
  "lower-back-fix": {
    category: "OFFICE RECOVERY",
    title: "Lower Back Stability",
    description: "Strengthen the deep stabilizers of the spine.",
    exercises: [
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Core and back balance.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Deep abdominal bracing.", duration: 60 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Strengthen glutes to support the spine.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Total core stability.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Gentle spinal mobilization.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Back muscle engagement.", duration: 45 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Spinal flexibility.", duration: 60 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic stability training.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Passive recovery.", duration: 90 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Release posterior tension.", duration: 60 }
    ]
  },
  "knee-stability": {
    category: "INJURY REHAB",
    title: "Knee Stability",
    description: "Joint protection and quad strengthening.",
    exercises: [
      { name: "Knee Extension", img: "exercises/knee-stability.jpg", desc: "Straighten knee fully to engage the muscle.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Build isometric endurance.", duration: 60 },
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Strengthen the ankle for knee support.", duration: 45 },
      { name: "Clamshells", img: "exercises/clamshells.jpg", desc: "Hip strength for knee tracking.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Reduce knee load using glutes.", duration: 60 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Functional controlled stepping.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Core stability for alignment.", duration: 60 },
      { name: "Quad Stretch", img: "exercises/quad-stretch.jpg", desc: "Release front thigh pressure.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Rest the lower chain.", duration: 60 }
    ]
  },
  "shoulder-rehab": {
    category: "INJURY REHAB",
    title: "Shoulder Mobility",
    description: "Rebuilding range of motion and scapular strength.",
    exercises: [
      { name: "Wall Slides", img: "exercises/shoulder-mobility.jpg", desc: "Controlled movement for joint health.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Stability for the shoulder blades.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Building load tolerance.", duration: 60 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Back shoulder engagement.", duration: 45 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Mobilize the thoracic spine.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Improve upper body rotation.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Gentle shoulder stretch.", duration: 90 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Maintain torso stability.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Total posture hold.", duration: 45 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Base alignment.", duration: 45 }
    ]
  },
  "ankle-foot": {
    category: "INJURY REHAB",
    title: "Ankle & Foot",
    description: "Building stability from the ground up.",
    exercises: [
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Build power in the lower leg.", duration: 60 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Controlled ankle loading.", duration: 60 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Static strength for tendons.", duration: 60 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Build the whole lower chain.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Balance work and stability.", duration: 45 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Core-foot connection.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Global coordination.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Posterior chain engagement.", duration: 45 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic balance training.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Final relaxation.", duration: 60 }
    ]
  }
};

export default function FormFixPro() {
  const [selectedKey, setSelectedKey] = useState("pelvic-health");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [exerciseSeconds, setExerciseSeconds] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const imgPrefix = "/app/";

  const startWorkout = () => {
    const plan = fitnessDatabase[selectedKey];
    const total = plan.exercises.reduce((acc, ex) => acc + ex.duration, 0);
    setActivePlan(plan);
    setCurrentIdx(0);
    setExerciseSeconds(plan.exercises[0].duration);
    setTotalSeconds(total);
    setIsPaused(false);
  };

  useEffect(() => {
    let interval: any;
    if (!isPaused && activePlan) {
      interval = setInterval(() => {
        setTotalSeconds(prev => (prev > 0 ? prev - 1 : 0));
        setExerciseSeconds(prev => {
          if (prev > 1) return prev - 1;
          if (currentIdx < activePlan.exercises.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            return activePlan.exercises[nextIdx].duration;
          } else {
            setIsPaused(true);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, activePlan, currentIdx]);

  const goToNext = () => {
    if (!activePlan || currentIdx >= activePlan.exercises.length - 1) return;
    const nextIdx = currentIdx + 1;
    setTotalSeconds(prev => prev - exerciseSeconds + activePlan.exercises[nextIdx].duration);
    setCurrentIdx(nextIdx);
    setExerciseSeconds(activePlan.exercises[nextIdx].duration);
  };

  const goToPrev = () => {
    if (!activePlan || currentIdx <= 0) return;
    const prevIdx = currentIdx - 1;
    setTotalSeconds(prev => prev - exerciseSeconds + activePlan.exercises[prevIdx].duration);
    setCurrentIdx(prevIdx);
    setExerciseSeconds(activePlan.exercises[prevIdx].duration);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const categories = ["MENOPAUSE", "OFFICE RECOVERY", "INJURY REHAB"];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 font-sans selection:bg-fuchsia-500">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 py-6">
        {/* LEVA STRANA: MENI */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl backdrop-blur-md">
            <h1 className="text-3xl font-black bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent mb-6 uppercase tracking-tighter italic">FormFix Premium</h1>
            <div className="space-y-6 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
              {categories.map(cat => (
                <div key={cat} className="space-y-2">
                  <p className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">{cat}</p>
                  <div className="grid gap-2">
                    {Object.entries(fitnessDatabase)
                      .filter(([_, p]) => p.category === cat)
                      .map(([key, p]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedKey(key)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedKey === key ? "border-fuchsia-600 bg-fuchsia-600/10 shadow-[0_0_15px_rgba(192,38,211,0.2)]" : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700"}`}
                        >
                          <p className="font-bold text-xs uppercase tracking-tight">{p.title}</p>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={startWorkout}
              className="w-full mt-6 py-5 bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase text-xs tracking-widest shadow-lg shadow-fuchsia-500/20"
            >
              Start Selected Protocol
            </button>
          </div>
        </div>

        {/* DESNA STRANA: PLAYER */}
        <div className="lg:col-span-8">
          {activePlan ? (
            <div className="bg-zinc-900/20 border border-zinc-800 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
              <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-black/40">
                <div>
                  <p className="text-zinc-500 text-[10px] font-mono uppercase">Remaining Session</p>
                  <p className="text-2xl font-black text-white">{formatTime(totalSeconds)}</p>
                </div>
                <div className="text-right">
                  <p className="text-fuchsia-500 text-[10px] font-mono uppercase">Current Exercise</p>
                  <p className="text-6xl font-black text-fuchsia-500 tabular-nums drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                    {formatTime(exerciseSeconds)}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="relative aspect-square bg-zinc-950 rounded-3xl border border-zinc-800 flex items-center justify-center p-4 overflow-hidden group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-25 transition"></div>
                    <img 
                      src={`${imgPrefix}${activePlan.exercises[currentIdx].img}`}
                      className="relative max-w-full max-h-full object-contain"
                      alt={activePlan.exercises[currentIdx].name}
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/500?text=FormFix+Exercise"; }}
                    />
                  </div>

                  <div className="space-y-6">
                    <span className="px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full text-fuchsia-500 text-[10px] font-bold uppercase tracking-widest">
                      Exercise {currentIdx + 1}/{activePlan.exercises.length}
                    </span>
                    <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter">{activePlan.exercises[currentIdx].name}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed italic">{activePlan.exercises[currentIdx].desc}</p>
                    
                    <div className="flex gap-4 pt-4">
                      <button onClick={goToPrev} className="flex-1 py-4 rounded-2xl border border-zinc-700 bg-zinc-900/50 font-bold text-[10px] hover:bg-zinc-800 transition-all uppercase tracking-widest">Back</button>
                      <button onClick={() => setIsPaused(!isPaused)} className={`flex-[2] py-4 rounded-2xl font-black text-[10px] transition-all uppercase tracking-widest ${isPaused ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20" : "bg-white text-black"}`}>
                        {isPaused ? "Resume" : "Pause"}
                      </button>
                      <button onClick={goToNext} className="flex-1 py-4 rounded-2xl border border-zinc-700 bg-zinc-900/50 font-bold text-[10px] hover:bg-zinc-800 transition-all uppercase tracking-widest">Next</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-2 bg-zinc-800 w-full">
                <div 
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-orange-500 transition-all duration-700"
                  style={{ width: `${((currentIdx + 1) / activePlan.exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[550px] border-2 border-dashed border-zinc-800 rounded-[3rem] flex items-center justify-center p-12 text-center">
              <div className="max-w-xs space-y-4">
                <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-zinc-400 font-bold uppercase tracking-widest">Select Protocol</h3>
                <p className="text-zinc-600 italic text-sm font-mono leading-relaxed">Choose a specialized routine from the sidebar to initialize the premium playback system.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
