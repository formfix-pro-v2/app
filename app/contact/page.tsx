"use client";

import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    const old = JSON.parse(localStorage.getItem("leads") || "[]");
    old.push(email);
    localStorage.setItem("leads", JSON.stringify(old));
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full p-8 rounded-3xl bg-white/5 border border-white/10">
        {!done ? (
          <>
            <h1 className="text-4xl font-black mb-6">
              Join Waitlist
            </h1>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 mb-4"
            />

            <button
              onClick={submit}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500"
            >
              Join
            </button>
          </>
        ) : (
          <h2 className="text-3xl font-black">
            You're on the list 🎉
          </h2>
        )}
      </div>
    </main>
  );
}
