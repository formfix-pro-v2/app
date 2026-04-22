"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Exercise = {
  name: string;
  reps: string;
  start: string;
  end: string;
  tip: string;
};

export default function DashboardPage() {
  const [premium, setPremium] = useState(false);
  const [day, setDay] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    setPremium(localStorage.getItem("premium") === "true");

    const savedDay = Number(localStorage.getItem("day") || "1");
    const savedCompleted = Number(localStorage.getItem("completed") || "0");
    const savedStreak = Number(localStorage.getItem("streak") || "1");

    setDay(savedDay);
    setCompleted(savedCompleted);
    setStreak(savedStreak);
  }, []);

  const totalDays = premium ? 90 : 7;
  const week = Math.ceil(day / 7);

  function completeDay() {
    let nextDay = day + 1;
    let nextCompleted = completed + 1;
    let nextStreak = streak + 1;

    if (nextDay > totalDays) {
      nextDay = 1;
    }

    localStorage.setItem("day", String(nextDay));
    localStorage.setItem("completed", String(nextCompleted));
    localStorage.setItem("streak", String(nextStreak));

    setDay(nextDay);
    setCompleted(nextCompleted);
    setStreak(nextStreak);
  }

  const progress = Math.round((day / totalDays) * 100);

  const workout: Exercise[] = [
    {
      name: "Cat-Cow Stretch",
      reps: "45 sec",
      start: "Start on hands and knees.",
      end: "Round spine, then arch slowly.",
      tip: "Move with breathing.",
    },
    {
      name: "Wall Posture Hold",
      reps: "60 sec",
      start: "Stand with back against wall.",
      end: "Head, shoulders and hips touching wall.",
      tip: "Keep chin tucked.",
    },
    {
      name: "Glute Bridge",
      reps: "15 reps",
      start: "Lie on back, knees bent.",
      end: "Lift hips, squeeze glutes.",
      tip: "Do not overarch back.",
    },
    {
      name: "Bird Dog",
      reps: "10 each side",
      start: "Hands and knees position.",
      end: "Extend opposite arm and leg.",
      tip: "Keep hips stable.",
    },
    {
      name: "Chest Opener Stretch",
      reps: "45 sec",
      start: "Stand tall, hands behind back.",
      end: "Lift chest and open shoulders.",
      tip: "Relax neck.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-14">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between gap-6 items-center mb-10">
          <div>
            <h1 className="text-5xl font-black">
              Your Recovery Program
            </h1>

            <p className="text-zinc-400 mt-2">
              {premium ? "Premium Transformation Plan" : "Free Starter Plan"}
            </p>
          </div>

          {!premium && (
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
            >
              Upgrade
            </Link>
          )}
        </div>

        {/* STATS */}
        <section className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 mb-2">Current Day</p>
            <p className="text-4xl font-black">
              {day}/{totalDays}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 mb-2">Week</p>
            <p className="text-4xl font-black">{week}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 mb-2">Sessions Done</p>
            <p className="text-4xl font-black">{completed}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 mb-2">Streak</p>
            <p className="text-4xl font-black">{streak}🔥</p>
          </div>
        </section>

        {/* PROGRESS */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-bold">Program Progress</h2>
            <span className="text-zinc-300">{progress}%</span>
          </div>

          <div className="h-4 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-orange-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-4 text-zinc-400">
            Finish all days to automatically restart stronger cycle.
          </p>
        </section>

        {/* TODAY SESSION */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-10">
          <h2 className="text-3xl font-bold mb-8">
            Today’s Session
          </h2>

          <div className="space-y-6">
            {workout.map((exercise, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-black/20 border border-white/5"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold">
                    {exercise.name}
                  </h3>

                  <span className="text-orange-300 font-semibold">
                    {exercise.reps}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-sm text-zinc-400 mb-2">
                      Start Position
                    </p>
                    <p>{exercise.start}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-sm text-zinc-400 mb-2">
                      End Position
                    </p>
                    <p>{exercise.end}</p>
                  </div>
                </div>

                <p className="text-zinc-300">
                  💡 {exercise.tip}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={completeDay}
            className="mt-8 w-full p-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:scale-[1.01] transition"
          >
            Complete Today’s Session
          </button>
        </section>

        {/* WEEK PLAN */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-5">
              This Week Plan
            </h2>

            <div className="space-y-3 text-zinc-300">
              <div>Mon – Posture Reset</div>
              <div>Tue – Core Stability</div>
              <div>Wed – Mobility Flow</div>
              <div>Thu – Recovery Walk</div>
              <div>Fri – Back Strength</div>
              <div>Sat – Stretch Reset</div>
              <div>Sun – Light Recovery</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-5">
              What Happens Next?
            </h2>

            <p className="text-zinc-300 leading-relaxed">
              Complete daily sessions to improve posture, reduce stiffness,
              and unlock stronger future cycles automatically.
            </p>
          </div>
        </section>

        {/* PREMIUM CTA */}
        {!premium && (
          <section className="rounded-3xl p-8 bg-blue-500/10 border border-blue-400/30">
            <h2 className="text-3xl font-bold mb-4">
              Unlock Full 90-Day Transformation
            </h2>

            <p className="text-zinc-300 mb-6">
              Advanced fat loss, posture rebuild and premium coaching system.
            </p>

            <Link
              href="/pricing"
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
            >
              Upgrade Now
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
