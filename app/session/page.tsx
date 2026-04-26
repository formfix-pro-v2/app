"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getTodayProgram } from "@/lib/programs";

type Exercise = {
  name: string;
  image: string;
  start: string;
  end: string;
  why: string;
  reps: string;
  seconds: number;
};

export default function SessionPage() {
  const [day, setDay] = useState(1);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  
  // Postavljamo inicijalno vreme na osnovu vežbe ili fallback na 120
  const [timeLeft, setTimeLeft] = useState(120);
  const TOTAL_TIME = 120; 

  useEffect(() => {
    const savedDay = localStorage.getItem("day");
    if (savedDay) {
      setDay(Number(savedDay));
    }
  }, []);

  const program = useMemo(() => {
    return getTodayProgram(day);
  }, [day]);

  const current = program.exercises[index];

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextExercise();
          return TOTAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, index, finished]);

  function startSession() {
    setStarted(true);
  }

  function nextExercise() {
    if (index < program.exercises.length - 1) {
      setIndex((prev) => prev + 1);
      setTimeLeft(TOTAL_TIME);
    } else {
      setFinished(true);
      setStarted(false);
      localStorage.setItem("day", String(day + 1));
    }
  }

  function skip() {
    nextExercise();
  }

  function format(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // Računamo širinu progres bara
  const progressWidth = (timeLeft / TOTAL_TIME) * 100;

  if (finished) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <section className="soft-card p-12 text-center">
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-5xl mb-4">Session Complete</h1>
          <p className="text-xl text-[#7b6870] mb-8">
            Amazing work today. Your next day is unlocked.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Return Dashboard
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* Header sekcija sa tajmerom i progres barom */}
      <section className="soft-card overflow-hidden text-center mb-8">
        <div className="p-10">
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
            Live Session
          </p>
          <h1 className="text-5xl mb-3">{program.title}</h1>
          <p className="text-[#7b6870] mb-8">
            Exercise {index + 1} of {program.exercises.length}
          </p>

          {!started ? (
            <button
              onClick={startSession}
              className="w-40 h-40 rounded-full bg-[#d9a8b8] text-white text-5xl mx-auto shadow-xl hover:scale-105 transition flex items-center justify-center"
            >
              ▶
            </button>
          ) : (
            <div className="text-7xl font-extralight text-[#4a3f44] tracking-tight">
              {format(timeLeft)}
            </div>
          )}
        </div>

        {/* PROGRESS BAR LINIJA */}
        {started && (
          <div className="w-full h-2 bg-[#f0e3e8]">
            <div 
              className="h-full bg-[#d9a8b8] transition-all duration-1000 ease-linear"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        )}
      </section>

      {/* Aktivna vežba */}
      <section className="soft-card p-8 mb-8">
        <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 border border-[#f0e3e8] bg-white">
          <img
            src={current.image}
            alt={current.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex justify-between items-end mb-6">
          <h2 className="text-5xl">{current.name}</h2>
          <span className="text-[#b98fa1] text-xl font-medium">{current.reps}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-5 text-[#6f5a62] mb-6">
          <div className="p-6 rounded-3xl bg-white border border-[#f0e3e8]">
            <span className="block text-xs uppercase tracking-widest text-[#b98fa1] mb-2">Start Position</span>
            <p className="text-lg leading-relaxed">{current.start}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#f0e3e8]">
            <span className="block text-xs uppercase tracking-widest text-[#b98fa1] mb-2">Finish Position</span>
            <p className="text-lg leading-relaxed">{current.end}</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#fff4f7] mb-8 text-[#7b6870] border border-[#f8e1e7]">
          <span className="mr-2">✨</span> {current.why}
        </div>

        <div className="flex gap-4">
          <button onClick={skip} className="btn-outline flex-1">
            Skip
          </button>
          <button onClick={nextExercise} className="btn-primary flex-[2]">
            Next Exercise
          </button>
        </div>
      </section>

      {/* Lista sledećih vežbi */}
      <section className="soft-card p-8">
        <h3 className="text-3xl mb-5 text-[#4a3f44]">Up Next</h3>
        <div className="grid gap-3">
          {program.exercises.slice(index + 1).map((item, i) => (
            <div
              key={item.name + i}
              className="p-5 rounded-3xl bg-white border border-[#f0e3e8] flex justify-between items-center hover:border-[#d9a8b8] transition-colors"
            >
              <span className="text-lg">
                <span className="text-[#b98fa1] font-medium mr-3">{index + i + 2}.</span>
                {item.name}
              </span>
              <span className="text-sm px-4 py-1 rounded-full bg-[#fff4f7] text-[#b98fa1] border border-[#f8e1e7]">
                {item.reps}
              </span>
            </div>
          ))}
          {program.exercises.slice(index + 1).length === 0 && (
            <p className="text-[#b98fa1] italic">No more exercises. You are almost done!</p>
          )}
        </div>
      </section>
    </main>
  );
}
