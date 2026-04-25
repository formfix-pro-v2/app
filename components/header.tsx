"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMembership } from "@/lib/subscription";

type Plan = "free" | "glow" | "elite";

export default function Header() {
  const [plan, setPlan] =
    useState<Plan>("free");

  const [premium, setPremium] =
    useState(false);

  useEffect(() => {
    const membership =
      getMembership();

    if (
      membership.status ===
      "active"
    ) {
      setPremium(true);
      setPlan(
        membership.plan as Plan
      );
    } else {
      setPremium(false);
      setPlan("free");
    }
  }, []);

  const badgeText =
    plan === "elite"
      ? "Elite Member ✨"
      : "Glow Member ✨";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-[#f1dce3] shadow-[0_10px_30px_rgba(214,167,177,0.12)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* BRAND */}
        <Link
          href="/"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-[#7f5665]"
        >
          Velora
        </Link>

        {/* NAV */}
        <nav className="hidden lg:flex items-center gap-3">
          {[
            ["Dashboard", "/dashboard"],
            ["Assessment", "/quiz"],
            ["Plans", "/pricing"],
            ["Account", "/account"],
          ].map(
            ([label, href]) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 rounded-2xl text-sm text-[#6f5a62] hover:bg-[#fff1f5] transition"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {premium ? (
            <Link
              href="/account"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d6a7b1] via-[#c997a8] to-[#b98fa1] text-white text-sm font-medium shadow-[0_10px_25px_rgba(185,143,161,0.25)] hover:scale-[1.02] transition"
            >
              {badgeText}
            </Link>
          ) : (
            <Link
              href="/pricing"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d6a7b1] to-[#b98fa1] text-white text-sm font-medium shadow-[0_10px_25px_rgba(185,143,161,0.22)] hover:scale-[1.02] transition"
            >
              Upgrade ✨
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
