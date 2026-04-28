"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check if already dismissed or submitted
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("emailCaptured");
    if (stored && !submitted) {
      return null;
    }
  }

  if (dismissed) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;

    // Save locally
    localStorage.setItem("emailCaptured", email);

    // Save to leads list
    try {
      const leads = JSON.parse(localStorage.getItem("leads") || "[]");
      leads.push({ email, source: "popup", date: new Date().toISOString() });
      localStorage.setItem("leads", JSON.stringify(leads));
    } catch { /* ignore */ }

    // Try API
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 max-w-sm">
        <div className="soft-card p-6 shadow-2xl border border-[#d8a7b5]/30">
          <div className="text-center">
            <div className="text-3xl mb-2">🌸</div>
            <p className="text-[#4a3f44] font-medium">Thank you!</p>
            <p className="text-sm text-[#7b6870]">Check your inbox for your free 3-day plan.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="soft-card p-6 shadow-2xl border border-[#d8a7b5]/30 relative">
        <button
          onClick={() => {
            setDismissed(true);
            localStorage.setItem("emailCaptured", "dismissed");
          }}
          className="absolute top-3 right-3 text-[#b98fa1] hover:text-[#8f5d6f] text-lg"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-2xl mb-2">✨</div>
        <h3 className="text-lg text-[#4a3f44] font-medium mb-1">
          Free 3-Day Starter Plan
        </h3>
        <p className="text-xs text-[#7b6870] mb-4">
          Get a personalized meal plan + exercise routine delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 p-3 rounded-xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] text-sm"
            required
          />
          <button type="submit" className="btn-primary px-4 py-3 text-sm shrink-0">
            Get It
          </button>
        </form>
      </div>
    </div>
  );
}
