"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UserType = "menopause" | "office" | "incontinence";

export default function ResultsPage() {
  const [type, setType] = useState<UserType>("office");

  useEffect(() => {
    const saved = localStorage.getItem("userType") as UserType | null;
    if (saved) setType(saved);
  }, []);

  const config = {
    menopause: {
      title: "Menopause Relief Program",
      subtitle:
        "Your answers suggest hormone-related symptoms that respond well to movement, recovery and lifestyle support.",
      bullets: [
        "Reduce hot flashes",
        "Improve dry eyes support habits",
        "Ease joint stiffness",
        "Restore energy",
        "Manage belly fat",
      ],
    },
    office: {
      title: "Office Worker Recovery",
      subtitle:
        "Your answers suggest posture strain, sedentary stress and mobility issues.",
      bullets: [
        "Fix neck pain",
        "Improve posture",
        "Reduce lower back pain",
        "Open tight hips",
        "Lower eye strain",
      ],
    },
    incontinence: {
      title: "Pelvic Confidence Program",
      subtitle:
        "Your answers suggest pelvic floor weakness or urgency patterns.",
      bullets: [
        "Improve bladder control",
        "Strengthen pelvic floor",
        "Reduce urgency",
        "Support postpartum recovery",
        "Increase confidence",
      ],
    },
  }[type];

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-300 font-semibold mb-4">
          Assessment Complete
        </p>

        <h1 className="text-5xl font-black mb-6">{config.title}</h1>

        <p className="text-xl text-zinc-300 mb-10">{config.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {config.bullets.map((item) => (
            <div
              key={item}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              ✅ {item}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-white/10 font-semibold"
          >
            Continue Free
          </Link>

          <Link
            href="/pricing"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
          >
            Unlock Full Plan
          </Link>
        </div>
      </div>
    </main>
  );
}
