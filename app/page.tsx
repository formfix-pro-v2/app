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
        { id: "mood-sleep", label: "Mood & Sleep" },
        { id: "joint-fluidity", label: "Joint Fluidity" }
      ]
    },
    "office recovery": {
      label: "Office Recovery",
      icon: "💻",
      subGoals: [
        { id: "neck-shoulders", label: "Neck & Shoulders" },
        { id: "lower-back", label: "Lower Back Relief" },
        { id: "posture-reset", label: "Posture Reset" },
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
    // --- MENOPAUSE ---
    "bone-density": [[
      "BONE STRENGTHENING PROGRAM", "WARM-UP: 5 min brisk walk.",
      "1. Goblet Squats (3x12) - [https://www.youtube.com/results?search_query=goblet+squat+form]",
      "2. Dumbbell Deadlifts (3x10) - [https://www.youtube.com/results?search_query=dumbbell+deadlift+form]",
      "3. Overhead Press (3x10) - [https://www.youtube.com/results?search_query=overhead+press+form]",
      "4. Step-Ups (3x12 per leg) - [https://www.youtube.com/results?search_query=step+up+exercise]",
      "5. Push-Ups (3x10) - [https://www.youtube.com/results?search_query=push+up+form]",
      "6. Renegade Rows (3x12) - [https://www.youtube.com/results?search_query=renegade+row+form]",
      "7. Lunges (3x10 per leg) - [https://www.youtube.com/results?search_query=lunges+form]",
      "8. Farmer's Walk (3x45s) - [https://www.youtube.com/results?search_query=farmers+walk+exercise]",
      "9. Bird-Dog (3x12) - [https://www.youtube.com/results?search_query=bird+dog+form]",
      "10. Plank (3x60s) - [https://www.youtube.com/results?search_query=plank+form]",
      "ADVICE: Focus on heavy, controlled resistance to stimulate bone growth."
    ]],
    "hot-flashes": [[
      "COOLING FLOW ROUTINE", "WARM-UP: Deep belly breathing.",
      "1. Seated Cat-Cow (3x12) - [https://www.youtube.com/results?search_query=seated+cat+cow]",
      "2. Wall Slides (3x10) - [https://www.youtube.com/results?search_query=wall+slides+exercise]",
      "3. Child's Pose (2 min) - [https://www.youtube.com/results?search_query=childs+pose+stretch]",
      "4. Legs Up Wall (5 min) - [https://www.youtube.com/results?search_query=legs+up+wall+pose]",
      "5. Gentle Knee to Chest (3x15) - [https://www.youtube.com/results?search_query=knee+to+chest+stretch]",
      "6. Pelvic Tilts (3x20) - [https://www.youtube.com/results?search_query=pelvic+tilts]",
      "7. Side Lying Clams (3x15) - [https://www.youtube.com/results?search_query=clamshell+exercise]",
      "8. Supine Twist (2 min) - [https://www.youtube.com/results?search_query=supine+spinal+twist]",
      "9. Bridge Pose (3x12) - [https://www.youtube.com/results?search_query=glute+bridge+form]",
      "10. Savasana (5 min) - [https://www.youtube.com/results?search_query=savasana+breathing]",
      "ADVICE: Avoid high-intensity cardio during peak flash periods."
    ]],
    "mood-sleep": [[
      "RESTORATIVE EVENING FLOW", "WARM-UP: Gentle neck rolls.",
      "1. Forward Fold (2 min) - [https://www.youtube.com/results?search_query=standing+forward+fold]",
      "2. Puppy Pose (90s) - [https://www.youtube.com/results?search_query=puppy+pose+yoga]",
      "3. Butterfly Stretch (2 min) - [https://www.youtube.com/results?search_query=butterfly+stretch]",
      "4. Sphinx Pose (1 min) - [https://www.youtube.com/results?search_query=sphinx+pose]",
      "5. Pigeon Stretch (2 min/side) - [https://www.youtube.com/results?search_query=pigeon+stretch]",
      "6. Happy Baby (1 min) - [https://www.youtube.com/results?search_query=happy+baby+pose]",
      "7. Thread the Needle (1 min/side) - [https://www.youtube.com/results?search_query=thread+the+needle+stretch]",
      "8. Reclined Cobbler (2 min) - [https://www.youtube.com/results?search_query=reclined+bound+angle+pose]",
      "9. Box Breathing (3 min) - [https://www.youtube.com/results?search_query=box+breathing+technique]",
      "10. Meditation (5 min) - [https://www.youtube.com/results?search_query=guided+meditation+for+sleep]",
      "ADVICE: Lower room temperature and avoid screens after this flow."
    ]],
    "joint-fluidity": [[
      "JOINT MOBILITY MATRIX", "WARM-UP: Full body shake-out.",
      "1. Ankle Circles (20/direction) - [https://www.youtube.com/results?search_query=ankle+circles]",
      "2. Controlled Hip Rotations (10/side) - [https://www.youtube.com/results?search_query=standing+hip+controlled+articular+rotations]",
      "3. Spinal Circles (15) - [https://www.youtube.com/results?search_query=seated+spinal+circles]",
      "4. Shoulder CARs (10/side) - [https://www.youtube.com/results?search_query=shoulder+cars+exercise]",
      "5. Wrist Rotations (1 min) - [https://www.youtube.com/results?search_query=wrist+mobility+exercises]",
      "6. Knee Hinges (3x15) - [https://www.youtube.com/results?search_query=knee+mobility+exercises]",
      "7. Scapular Swings (3x12) - [https://www.youtube.com/results?search_query=scapular+shrugs]",
      "8. Toe Yoga (2 min) - [https://www.youtube.com/results?search_query=toe+yoga+exercises]",
      "9. Thoracic Windmills (10/side) - [https://www.youtube.com/results?search_query=thoracic+windmills]",
      "10. Deep Squat Hold (1 min) - [https://www.youtube.com/results?search_query=deep+squat+mobility+hold]",
      "ADVICE: Move slowly through the full range of motion."
    ]],

    // --- OFFICE RECOVERY ---
    "neck-shoulders": [[
      "TECH-NECK CORRECTION", "WARM-UP: Chin tucks.",
      "1. Wall Angels (3x12) - [https://www.youtube.com/results?search_query=wall+angels+exercise]",
      "2. Scapular Squeezes (3x15) - [https://www.youtube.com/results?search_query=scapular+squeezes]",
      "3. Doorway Stretch (3x45s) - [https://www.youtube.com/results?search_query=doorway+chest+stretch]",
      "4. Upper Trap Stretch (1 min/side) - [https://www.youtube.com/results?search_query=upper+trap+stretch]",
      "5. Band Pull-Aparts (3x20) - [https://www.youtube.com/results?search_query=band+pull+aparts]",
      "6. Face Pulls (3x15) - [https://www.youtube.com/results?search_query=face+pulls+form]",
      "7. Y-W-T Raises (3x10) - [https://www.youtube.com/results?search_query=ywt+raises]",
      "8. Levator Scapulae Stretch (1 min/side) - [https://www.youtube.com/results?search_query=levator+scapulae+stretch]",
      "9. Thoracic Extensions (3x12) - [https://www.youtube.com/results?search_query=thoracic+extension+foam+roller]",
      "10. Neck Rotations (1 min) - [https://www.youtube.com/results?search_query=controlled+neck+rotations]",
      "ADVICE: Ensure your monitor is at eye level."
    ]],
    "lower-back": [[
      "LUMBAR RELIEF & CORE", "WARM-UP: Pelvic tilts.",
      "1. Bird-Dog (3x12) - [https://www.youtube.com/results?search_query=bird+dog+exercise]",
      "2. Dead Bug (3x12) - [https://www.youtube.com/results?search_query=dead+bug+exercise]",
      "3. Glute Bridges (3x20) - [https://www.youtube.com/results?search_query=glute+bridge+form]",
      "4. Cat-Cow (3x15) - [https://www.youtube.com/results?search_query=cat+cow+stretch]",
      "5. Hip Flexor Stretch (1 min/side) - [https://www.youtube.com/results?search_query=hip+flexor+stretch]",
      "6. Pigeon Pose (2 min/side) - [https://www.youtube.com/results?search_query=pigeon+stretch]",
      "7. Child's Pose (2 min) - [https://www.youtube.com/results?search_query=childs+pose]",
      "8. Superman Holds (3x10) - [https://www.youtube.com/results?search_query=superman+exercise]",
      "9. Side Plank (3x30s) - [https://www.youtube.com/results?search_query=side+plank+form]",
      "10. Hamstring Stretch (1 min/side) - [https://www.youtube.com/results?search_query=hamstring+stretch]",
      "ADVICE: Stand up and walk for 2 minutes every hour."
    ]],
    "posture-reset": [[
      "FULL BODY ALIGNMENT", "WARM-UP: Jumping jacks.",
      "1. Wall Sit (3x45s) - [https://www.youtube.com/results?search_query=wall+sit+form]",
      "2. Prone Cobras (3x12) - [https://www.youtube.com/results?search_query=prone+cobra+exercise]",
      "3. Plank (3x60s) - [https://www.youtube.com/results?search_query=plank+form]",
      "4. Air Squats (3x20) - [https://www.youtube.com/results?search_query=air+squat+form]",
      "5. Reverse Snow Angels (3x15) - [https://www.youtube.com/results?search_query=reverse+snow+angels]",
      "6. Lunges (3x12) - [https://www.youtube.com/results?search_query=lunges+form]",
      "7. Calf Raises (3x20) - [https://www.youtube.com/results?search_query=calf+raises+form]",
      "8. Shoulder Taps (3x20) - [https://www.youtube.com/results?search_query=plank+shoulder+taps]",
      "9. Thoracic Rotations (3x10/side) - [https://www.youtube.com/results?search_query=thoracic+rotation+stretch]",
      "10. Deep Breathing (2 min) - [https://www.youtube.com/results?search_query=diaphragmatic+breathing]",
      "ADVICE: Focus on keeping the spine long throughout the day."
    ]],
    "wrist-care": [[
      "WRIST & FOREARM HEALTH", "WARM-UP: Finger pulses.",
      "1. Wrist Flexor Stretch (1 min/side) - [https://www.youtube.com/results?search_query=wrist+flexor+stretch]",
      "2. Wrist Extensor Stretch (1 min/side) - [https://www.youtube.com/results?search_query=wrist+extensor+stretch]",
      "3. Nerve Glides (3x10) - [https://www.youtube.com/results?search_query=median+nerve+glides]",
      "4. Prayer Stretch (1 min) - [https://www.youtube.com/results?search_query=prayer+stretch+wrists]",
      "5. Reverse Prayer Stretch (1 min) - [https://www.youtube.com/results?search_query=reverse+prayer+stretch]",
      "6. Wrist Circles (2 min) - [https://www.youtube.com/results?search_query=wrist+circles]",
      "7. Squeeze Ball (3x20) - [https://www.youtube.com/results?search_query=grip+strength+exercises]",
      "8. Thumb Extensions (3x15) - [https://www.youtube.com/results?search_query=thumb+exercises+for+pain]",
      "9. Pronation/Supination (3x15) - [https://www.youtube.com/results?search_query=forearm+pronation+supination]",
      "10. Fist Clench & Release (2 min) - [https://www.youtube.com/results?search_query=hand+tendon+glides]",
      "ADVICE: Use an ergonomic mouse or vertical grip."
    ]],

    // --- INJURY REHAB ---
    "knee-stability": [[
      "KNEE REHAB & STRENGTH", "WARM-UP: Ankle pumps.",
      "1. Quad Sets (3x10s) - [https://www.youtube.com/results?search_query=quad+sets]",
      "2. Straight Leg Raises (3x12) - [https://www.youtube.com/results?search_query=straight+leg+raise]",
      "3. Terminal Knee Extensions (3x15) - [https://www.youtube.com/results?search_query=terminal+knee+extension]",
      "4. Clamshells (3x15) - [https://www.youtube.com/results?search_query=clamshell+exercise]",
      "5. Glute Bridges (3x15) - [https://www.youtube.com/results?search_query=glute+bridge+form]",
      "6. Heel Slides (3x15) - [https://www.youtube.com/results?search_query=heel+slides]",
      "7. Side Lying Abduction (3x12) - [https://www.youtube.com/results?search_query=side+lying+leg+lift]",
      "8. Step-ups (Low) (3x10) - [https://www.youtube.com/results?search_query=low+box+step+up]",
      "9. Wall Calf Raises (3x15) - [https://www.youtube.com/results?search_query=calf+raises+form]",
      "10. Hamstring Curls (3x15) - [https://www.youtube.com/results?search_query=standing+hamstring+curl]",
      "ADVICE: Avoid jumping or high-impact until cleared by a doctor."
    ]],
    "shoulder-mobility": [[
      "ROTATOR CUFF RECOVERY", "WARM-UP: Pendulum swings.",
      "1. External Rotation (3x15) - [https://www.youtube.com/results?search_query=shoulder+external+rotation+with+band]",
      "2. Internal Rotation (3x15) - [https://www.youtube.com/results?search_query=shoulder+internal+rotation+with+band]",
      "3. Scapular Squeezes (3x15) - [https://www.youtube.com/results?search_query=scapular+squeezes]",
      "4. Wall Crawls (3x10) - [https://www.youtube.com/results?search_query=shoulder+wall+walks]",
      "5. Doorway Stretch (2x30s) - [https://www.youtube.com/results?search_query=doorway+shoulder+stretch]",
      "6. Resistance Band Rows (3x12) - [https://www.youtube.com/results?search_query=band+rows+exercise]",
      "7. Serratus Punch (3x12) - [https://www.youtube.com/results?search_query=serratus+punch]",
      "8. Shoulder Extension (3x12) - [https://www.youtube.com/results?search_query=shoulder+extension+with+band]",
      "9. Isometric Holds (3x10s) - [https://www.youtube.com/results?search_query=shoulder+isometrics]",
      "10. Child's Pose (2 min) - [https://www.youtube.com/results?search_query=childs+pose]",
      "ADVICE: Keep movements within a pain-free range."
    ]],
    "ankle-strength": [[
      "ANKLE STABILITY & POWER", "WARM-UP: Ankle circles.",
      "1. Towel Curls (3x15) - [https://www.youtube.com/results?search_query=towel+toe+curls]",
      "2. Ankle Eversion (3x15) - [https://www.youtube.com/results?search_query=ankle+eversion+with+band]",
      "3. Ankle Inversion (3x15) - [https://www.youtube.com/results?search_query=ankle+inversion+with+band]",
      "4. Calf Raises (3x20) - [https://www.youtube.com/results?search_query=calf+raises+form]",
      "5. Heel Walks (3x30s) - [https://www.youtube.com/results?search_query=heel+walks]",
      "6. Toe Walks (3x30s) - [https://www.youtube.com/results?search_query=toe+walks]",
      "7. Single Leg Balance (3x60s) - [https://www.youtube.com/results?search_query=single+leg+balance]",
      "8. Alphabet Tracing (2/side) - [https://www.youtube.com/results?search_query=ankle+alphabet+exercise]",
      "9. Resistance Dorsiflexion (3x15) - [https://www.youtube.com/results?search_query=ankle+dorsiflexion+with+band]",
      "10. Star Excursion (3 reps) - [https://www.youtube.com/results?search_query=star+excursion+balance+test]",
      "ADVICE: Perform on a flat, stable surface first."
    ]],
    "core-stability": [[
      "DEEP CORE STRENGTH", "WARM-UP: Pelvic tilts.",
      "1. Dead Bug (3x12) - [https://www.youtube.com/results?search_query=dead+bug+exercise]",
      "2. Bird-Dog (3x12) - [https://www.youtube.com/results?search_query=bird+dog+exercise]",
      "3. Plank (3x45s) - [https://www.youtube.com/results?search_query=plank+form]",
      "4. Hollow Body Hold (3x20s) - [https://www.youtube.com/results?search_query=hollow+body+hold]",
      "5. Glute Bridge (3x20) - [https://www.youtube.com/results?search_query=glute+bridge+form]",
      "6. Side Plank (3x30s/side) - [https://www.youtube.com/results?search_query=side+plank+form]",
      "7. Bear Crawl Holds (3x30s) - [https://www.youtube.com/results?search_query=bear+crawl+isometrics]",
      "8. Russian Twists (3x20) - [https://www.youtube.com/results?search_query=russian+twist+form]",
      "9. Leg Raises (Lower focus) (3x12) - [https://www.youtube.com/results?search_query=lying+leg+raises]",
      "10. Cat-Cow (3x10) - [https://www.youtube.com/results?search_query=cat+cow+stretch]",
      "ADVICE: Breathe out as you engage your core."
    ]]
  };

  const generatePlan = () => {
    setLoading(true);
    setPlanResponse("");

    setTimeout(() => {
      const categoryPlans = fitnessDatabase[selectedSubGoal] || fitnessDatabase[Object.keys(fitnessDatabase)[0]];
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
            {/* STEP 1 */}
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 1: Focus Area</p>
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

            {/* STEP 2 */}
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Step 2: Specific Goal</p>
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

        {/* INTERFACE WINDOW */}
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
                    <p className="text-zinc-600 italic text-sm">Define your goals and click below to view your specialized training plan with video guides.</p>
                  </div>
                )}
              </div>

              <button 
                onClick={generatePlan}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-fuchsia-50 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter text-lg shadow-xl"
              >
                {loading ? "PROCESSING..." : "GENERATE CUSTOM PLAN"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
