"use client";

import { useEffect, useState } from "react";

export default function StreakFreeze() {
  const [show, setShow] = useState(false);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    // Check if user missed yesterday
    try {
      const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
      if (history.length < 2) return;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const hasYesterday = history.some(
        (e: { date: string }) => e.date.startsWith(yesterdayStr)
      );

      const lastFreeze = localStorage.getItem("lastStreakFreeze");
      const thisWeek = getWeekNumber(new Date());
      const frozenThisWeek = lastFreeze === String(thisWeek);

      if (!hasYesterday && !frozenThisWeek) {
        setShow(true);
      }
    } catch { /* ignore */ }
  }, []);

  function freezeStreak() {
    const thisWeek = getWeekNumber(new Date());
    localStorage.setItem("lastStreakFreeze", String(thisWeek));

    // Add a fake entry for yesterday to preserve streak
    try {
      const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      history.push({
        sleep: 0, energy: 0, stress: 0,
        symptoms: [],
        date: yesterday.toISOString(),
        streakFreeze: true,
      });
      localStorage.setItem("checkinHistory", JSON.stringify(history.slice(-90)));
    } catch { /* ignore */ }

    setFrozen(true);
    setTimeout(() => setShow(false), 2000);
  }

  if (!show) return null;

  return (
    <div className="soft-card p-5 mb-4 border border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <span className="text-2xl">{frozen ? "✅" : "❄️"}</span>
        </div>
        <div className="flex-1">
          {frozen ? (
            <p className="text-sm text-green-600 font-medium">
              ✨ Streak frozen! Your {localStorage.getItem("streak") || "0"}-day streak is safe.
            </p>
          ) : (
            <>
              <p className="text-sm text-[#4a3f44] font-medium">
                You missed yesterday — use a Streak Freeze?
              </p>
              <p className="text-xs text-[#7b6870] mt-0.5">
                1 free freeze per week. Keeps your streak alive without losing progress.
              </p>
            </>
          )}
        </div>
        {!frozen && (
          <button onClick={freezeStreak} className="btn-primary px-5 py-2.5 text-xs shrink-0 shadow-lg">
            ❄️ Freeze It
          </button>
        )}
      </div>
    </div>
  );
}

function getWeekNumber(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - start.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}
