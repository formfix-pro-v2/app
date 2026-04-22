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

  const data = {
    menopause: {
      title: "Menopause Relief Program",
      text: "Your answers suggest hormone-related symptoms that can improve with movement, recovery and lifestyle changes.",
      list: [
        "Reduce hot flashes",
        "Support dry eyes",
        "Ease joint pain",
        "Improve sleep",
        "Increase energy",
      ],
    },
    office: {
      title: "Office Worker Recovery",
      text: "Your answers suggest posture strain and sedentary pain patterns.",
      list: [
        "Fix neck pain",
        "Reduce back pain",
        "Improve posture",
        "Open tight hips",
        "Reduce eye strain",
      ],
    },
    incontinence: {
      title: "Pelvic Confidence Program",
      text: "Your answers suggest pelvic floor weakness or urgency patterns.",
      list: [
        "Improve control",
        "Strengthen pelvic floor",
        "Reduce urgency",
        "Support postpartum recovery",
        "Boost confidence",
      ],
    },
  }[type];

  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-6">{data.title}</h1>
        <p className="text-zinc-300 text-xl mb-10">{data.text}</p>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {data.list.map((item) => (
            <div
              key={item}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              ✅ {item}
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-white/10"
          >
            Continue Free
          </Link>

          <Link
            href="/pricing"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </main>
  );
}
