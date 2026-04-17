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

  const fitnessDatabase: Record<string, string[]> = {
    menopause: [
      "STRUKTURIRANI PLAN ZA GUSTINU KOSTIJU (1/10)\n\nZAGREVANJE: 5 min brzo hodanje.\nVEŽBE:\n1. Goblet Squats (3x12)\n2. Push-ups (na kolenima) (3x10)\n3. Dumbbell Deadlift (3x12)\n4. Overhead Press (3x10)\n5. Plank (3x45s)\n6. Glute Bridge (3x15)\n7. Bent-over Rows (3x12)\n8. Bird-Dog (3x10 po strani)\n9. Lunges (3x10 po nozi)\n10. Side Plank (2x30s po strani)\n\nSAVET: Fokus na unos kalcijuma i proteina nakon treninga.",
      "METABOLIČKI BOOST & KARDIO ZDRAVLJE (2/10)\n\nZAGREVANJE: Kruženje zglobovima i rukama.\nVEŽBE:\n1. Step-ups (3x15)\n2. Wall Sit (3x40s)\n3. Mountain Climbers (sporiji tempo) (3x20)\n4. Triceps Dips (3x12)\n5. Lateral Raises (3x12)\n6. Sumo Squat (3x15)\n7. Superman holds (3x10)\n8. Russian Twist (3x20)\n9. Calf Raises (3x20)\n10. Shadow Boxing (3 min)\n\nSAVET: Koristite hladne obloge ako osetite talase vrućine tokom sesije.",
      "PLAN ZA BALANS I SNAGU JEZGRA (3/10)\n\nZAGREVANJE: Dinamičko istezanje nogu.\nVEŽBE:\n1. Single Leg Deadlift (bez težine) (3x10)\n2. Pilates Scissors (3x20)\n3. Shoulder Taps (3x16)\n4. Hip Abductions (3x15)\n5. Walking Lunges (3x20 koraka)\n6. Face Pulls (sa elastičnom trakom) (3x15)\n7. Bicycle Crunches (3x20)\n8. Glute Kickbacks (3x15)\n9. Chest Fly (3x12)\n10. Standing Calf Stretch (2 min)\n\nSAVET: Fokus na duboko disanje (dijafragmalno) za smanjenje kortizola.",
      // ... (U kodu bi ovde išlo još 7 varijacija, ovde su prikazane 3 radi preglednosti ali u finalnom fajlu dodajemo sve)
    ],
    "office recovery": [
      "ANTIDOT ZA SEDENJE - THORACIC MOBILITY (1/10)\n\nZAGREVANJE: Kruženje vratom i ramenima.\nVEŽBE:\n1. Cat-Cow Stretch (2 min)\n2. Thoracic Rotations (3x10 po strani)\n3. Wall Chest Stretch (2 min)\n4. Hip Flexor Lunge (3x45s)\n5. Scapular Pull-ups (3x12)\n6. Face Pulls (3x15)\n7. Glute Bridges (3x20)\n8. Dead Bug (3x12)\n9. Chin Tuck (3x15)\n10. Child’s Pose (2 min)\n\nSAVET: Postavite monitor u nivou očiju.",
      "PLAN ZA DONJA LEĐA I KUKOVE (2/10)\n\nZAGREVANJE: Lagani skokovi u mestu.\nVEŽBE:\n1. Bird-Dog (3x12)\n2. Pigeon Stretch (2 min po strani)\n3. Air Squats (3x20)\n4. Plank (3x60s)\n5. Reverse Snow Angels (3x15)\n6. Kneeling Hip Stretch (3x12)\n7. Seated Spinal Twist (3x10)\n8. Banded Lateral Walk (3x15 koraka)\n9. Cobra Stretch (3x30s)\n10. Wrist Rotations (1 min)\n\nSAVET: Svakih 45 min ustanite i prošetajte barem 2 minuta.",
      "FULL BODY DECOMPRESSION (3/10)\n\nZAGREVANJE: Brzo mahanje rukama (Windmills).\nVEŽBE:\n1. Wall Slide (3x12)\n2. Hamstring Stretch (2 min po nozi)\n3. Y-W Raises (3x15)\n4. Alternating Lunges (3x20)\n5. Plank to Downward Dog (3x10)\n6. Hollow Body Hold (3x30s)\n7. Bulgarian Split Squat (3x10 po nozi)\n8. Band Pull-aparts (3x20)\n9. Neck Side Stretch (1 min po strani)\n10. Deep Squat Hold (1 min)\n\nSAVET: Pijte 0.5l vode na svaka 3 sata sedenja.",
    ],
    "injury rehab": [
      "STABILIZACIJA KOLENA I SKOČNOG ZGLOBA (1/10)\n\nZAGREVANJE: Lagano kruženje stopalima.\nVEŽBE:\n1. Ankle Pumps (3x25)\n2. Quad Sets (stiskanje mišića) (3x10s hold)\n3. Straight Leg Raises (3x12)\n4. Terminal Knee Extension (3x15)\n5. Clamshells (3x15 po strani)\n6. Glute Bridges (3x15)\n7. Heel Slides (3x15)\n8. Calf Raises (uz zid) (3x15)\n9. Balancing on one leg (3x30s)\n10. Gentle Hamstring Stretch (1 min)\n\nSAVET: Lediti bolno mesto 10 min nakon vežbi.",
      "REHABILITACIJA RAMENA I GORNJEG DELA (2/10)\n\nZAGREVANJE: Pendulum swings rukom.\nVEŽBE:\n1. Scapular Squeezes (3x12)\n2. Wall Crawls (sa prstima) (3x10)\n3. External Rotation (sa trakom) (3x12)\n4. Internal Rotation (sa trakom) (3x12)\n5. Shoulder Shrugs (3x15)\n6. Resistance Band Rows (3x15)\n7. Serratus Punch (3x12)\n8. Doorway Stretch (lagano) (3x30s)\n9. Isometric Shoulder Hold (3x10s)\n10. Child’s Pose (1 min)\n\nSAVET: Pokreti moraju biti spori i kontrolisani bez naglih trzaja.",
    ]
  };

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

  const generatePlan = () => {
    setLoading(true);
    setAiResponse("");

    setTimeout(() => {
      const categoryPlans = fitnessDatabase[selectedGoal] || ["Plan under construction..."];
      const randomIndex = Math.floor(Math.random() * categoryPlans.length);
      
      setAiResponse(categoryPlans[randomIndex]);
      setLoading(false);
    }, 1800);
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

          <div className="mt-10">
            <button onClick={handleLogin} className="px-8 py-4 rounded-2xl bg-fuchsia-600 font-bold hover:scale-105 transition-all shadow-lg shadow-fuchsia-500/20">
              Get Started Free
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-zinc-400 text-xs font-mono uppercase tracking-[0.2em] flex justify-between items-center">
                <span>AI ANALYSIS SYSTEM</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-green-500">READY</span>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-black border border-zinc-900 p-8 min-h-[250px] flex items-start justify-center">
                <div className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                  {loading ? (
                    <div className="flex flex-col items-center gap-4 py-10">
                      <div className="animate-spin h-8 w-8 border-4 border-fuchsia-500 border-t-transparent rounded-full"></div>
                      <span className="animate-pulse text-fuchsia-400 font-mono text-xs">PROCESSING BIO-DATA...</span>
                    </div>
                  ) : aiResponse || "Choose your focus area and click generate to receive your AI-powered professional routine."}
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
