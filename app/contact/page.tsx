"use client";

import { useState } from "react";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-3xl bg-white/5 border border-white/10 p-8">
        {!done ? (
          <>
            <h1 className="text-4xl font-black mb-6">Join Waitlist</h1>

            <input
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 mb-4"
            />

            <button
              onClick={() => setDone(true)}
              className="w-full px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-orange-500"
            >
              Submit
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">You're In ✨</h2>
            <p className="text-zinc-300">
              We’ll contact you when premium access opens.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
