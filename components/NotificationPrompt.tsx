"use client";

import { useEffect, useState } from "react";

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;
    if (localStorage.getItem("notifDismissed")) return;

    // Show after 60 seconds on site
    const timer = setTimeout(() => setShow(true), 60000);
    return () => clearTimeout(timer);
  }, []);

  async function requestPermission() {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      new Notification("Veronica Method 🌸", {
        body: "You'll get gentle reminders for your daily sessions.",
        icon: "/icon.svg",
      });
    }
    setShow(false);
    localStorage.setItem("notifDismissed", "true");
  }

  function dismiss() {
    setShow(false);
    localStorage.setItem("notifDismissed", "true");
  }

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-xs">
      <div className="soft-card p-4 shadow-xl border border-[#d8a7b5]/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🔔</span>
          <div className="flex-1">
            <p className="text-sm text-[#4a3f44] font-medium mb-1">
              Stay on track
            </p>
            <p className="text-xs text-[#7b6870] mb-3">
              Get a gentle reminder when it&apos;s time for your daily session.
            </p>
            <div className="flex gap-2">
              <button onClick={requestPermission} className="btn-primary px-3 py-1.5 text-xs">
                Enable
              </button>
              <button onClick={dismiss} className="text-xs text-[#b98fa1] hover:text-[#8f5d6f]">
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
