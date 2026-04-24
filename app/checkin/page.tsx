"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckinPage() {
  const router = useRouter();

  const [sleep, setSleep] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [time, setTime] = useState("20 min");
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const options = [
    "Hot flashes",
    "Poor sleep",
    "Joint pain",
    "Bloating",
    "Low mood",
    "Low energy",
  ];

  function toggle(item: string) {
    setSymptoms((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  }

  function saveCheckin() {
    const payload = {
      sleep,
      energy,
      stress,
      time,
      symptoms,
      date: new Date().toISOString(),
    };

    localStorage.setItem(
      "dailyCheckin",
      JSON.stringify(payload)
    );

    router.push("/dashboard");
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <section className="soft-card p-8">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Daily Check-In
        </p>

        <h1 className="text-5xl mb-8">
          How Are You Feeling Today?
        </h1>

        {/* Sleep */}
        <div className="mb-8">
          <p className="mb-3">Sleep Quality</p>
          <input
            type="range"
            min="1"
            max="10"
            value={sleep}
            onChange={(e) =>
              setSleep(Number(e.target.value))
            }
            className="w-full"
          />
          <p className="text-[#7b6870] mt-2">
            {sleep}/10
          </p>
        </div>

        {/* Energy */}
        <div className="mb-8">
          <p className="mb-3">Energy Level</p>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) =>
              setEnergy(Number(e.target.value))
            }
            className="w-full"
          />
          <p className="text-[#7b6870] mt-2">
            {energy}/10
          </p>
        </div>

        {/* Stress */}
        <div className="mb-8">
          <p className="mb-3">Stress Level</p>
          <input
            type="range"
            min="1"
            max="10"
            value={stress}
            onChange={(e) =>
              setStress(Number(e.target.value))
            }
            className="w-full"
          />
          <p className="text-[#7b6870] mt-2">
            {stress}/10
          </p>
        </div>

        {/* Time */}
        <div className="mb-8">
          <p className="mb-3">Today's Time Available</p>

          <div className="grid md:grid-cols-3 gap-4">
            {["10 min", "20 min", "30+ min"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setTime(item)}
                  className={`p-4 rounded-2xl border ${
                    time === item
                      ? "bg-[#fff1f5] border-[#d6a7b1]"
                      : "bg-white border-[#f0e3e8]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* Symptoms */}
        <div className="mb-10">
          <p className="mb-3">Symptoms Today</p>

          <div className="grid md:grid-cols-2 gap-4">
            {options.map((item) => {
              const active =
                symptoms.includes(item);

              return (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className={`p-4 rounded-2xl border text-left ${
                    active
                      ? "bg-[#fff1f5] border-[#d6a7b1]"
                      : "bg-white border-[#f0e3e8]"
                  }`}
                >
                  {active ? "✓ " : ""}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={saveCheckin}
          className="btn-primary w-full"
        >
          Save & Update My Plan
        </button>
      </section>
    </main>
  );
}
