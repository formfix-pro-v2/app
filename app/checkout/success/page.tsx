"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [plan, setPlan] = useState("Glow");
  const [name, setName] = useState("");

  useEffect(() => {
    // Uzimamo podatke iz kviza i checkout-a za lični pečat
    const savedPlan = localStorage.getItem("plan") || "glow";
    const quizData = localStorage.getItem("quizData");
    
    if (quizData) {
      const parsed = JSON.parse(quizData);
      // Ako si uvela polje za ime u kvizu ili checkout-u
      setName(parsed.name || ""); 
    }

    setPlan(savedPlan === "elite" ? "Elite" : "Glow");
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* 1. CONFIRMATION HEADER */}
      <section className="soft-card p-12 text-center mb-8 border-2 border-[#fdf2f5]">
        <div className="text-6xl mb-6 animate-bounce-short">🌸</div>

        <p className="uppercase tracking-[0.3em] text-xs text-[#b98fa1] mb-4 font-bold">
          Transaction Successful
        </p>

        <h1 className="text-6xl mb-5 text-[#4a3f44]">
          Welcome to the family{name ? `, ${name}` : ""}!
        </h1>

        <p className="text-[#7b6870] text-xl max-w-2xl mx-auto leading-relaxed">
          Your <strong>{plan} Plan</strong> is now fully active. We’ve unlocked your 
          complete hormone-balancing menu and daily movement guide.
        </p>
      </section>

      {/* 2. WHAT'S UNLOCKED (Visual feedback) */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Full Meal Plan", desc: "Breakfast, Lunch, Dinner & Snacks unlocked.", icon: "🥗" },
          { title: "Daily Training", desc: "Your 20-min guided sessions are ready.", icon: "🧘‍♀️" },
          { title: "Shopping List", desc: "Automated budget-friendly grocery list.", icon: "🛒" },
        ].map((item) => (
          <div key={item.title} className="soft-card p-8 text-center bg-white border border-[#f0e3e8]">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-[#4a3f44] mb-2">{item.title}</h3>
            <p className="text-sm text-[#7b6870]">{item.desc}</p>
            <div className="mt-4 text-[#d6a7b1] text-xs font-bold uppercase tracking-widest">Active Now</div>
          </div>
        ))}
      </div>

      {/* 3. NEXT STEPS / CTA */}
      <section className="soft-card p-12 text-center bg-gradient-to-b from-white to-[#fffcfd] border border-[#f0e3e8]">
        <h2 className="text-4xl mb-6 text-[#4a3f44]">Ready for your Day 1?</h2>

        <p className="text-[#7b6870] text-lg mb-10 max-w-md mx-auto">
          Your personalized dashboard is the heart of your transformation. 
          Everything you need is organized and ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="btn-primary px-12 py-4 shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
          >
            Enter My Dashboard
          </Link>

          <Link
            href="/session"
            className="btn-outline px-12 py-4 w-full sm:w-auto"
          >
            View Today's Workout
          </Link>
        </div>

        <p className="mt-10 text-xs text-[#b98fa1]">
          A confirmation email and your digital receipt have been sent to your inbox.
        </p>
      </section>
    </main>
  );
}
