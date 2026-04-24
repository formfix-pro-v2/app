"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [premium, setPremium] = useState(false);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    setPremium(localStorage.getItem("premium") === "true");
    setPlan(localStorage.getItem("plan") || "free");
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#f0e3e8]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight text-[#7f5665]"
        >
          GlowReset
        </Link>

        {/* CENTER */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#7b6870]">
          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/quiz">
            Assessment
          </Link>

          <Link href="/pricing">
            Plans
          </Link>

          <Link href="/account">
            Account
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {premium ? (
            <div className="px-4 py-2 rounded-full bg-[#fff1f5] border border-[#ead8de] text-sm text-[#8f5d6f]">
              {plan === "elite"
                ? "Elite Member ✨"
                : "Glow Member ✨"}
            </div>
          ) : (
            <Link
              href="/pricing"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1] text-white text-sm"
            >
              Upgrade
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
