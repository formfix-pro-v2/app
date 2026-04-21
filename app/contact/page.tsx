"use client";

import { useState } from "react";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  function submit() {
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full p-8 rounded-3xl bg-white/5 border border-white/10">
        {!done ? (
          <>
            <h1 className="text-4xl font-black mb-6">
              Join Premium Waitlist
            </h1>

            <input
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 mb-4"
            />

            <button
              onClick={submit}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500"
            >
              Join Now
            </button>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-black mb-4">
              You're In 🎉
            </h2>

            <p className="text-zinc-300">
              We’ll notify you about launch discounts.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
