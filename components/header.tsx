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
    <header className="sticky top-0 z-50">
      <div className="mx-4 mt-4 rounded-[30px] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_20px_60px_rgba(145,105,120,0.12)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-6">
          
          {/* BRAND */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f8d8df] via-[#e7bcc8] to-[#d5a6b1] flex items-center justify-center shadow-md">
              <span className="text-white text-lg">
                ✦
              </span>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-semibold leading-none tracking-tight text-[#7f5665]">
                Velora
              </div>

              <div className="text-[10px] uppercase tracking-[0.35em] text-[#b38d98] mt-1">
                Wellness Maison
              </div>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-2">
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
                  className="px-5 py-3 rounded-2xl text-sm font-medium text-[#6f5a62] hover:bg-white hover:shadow-md transition-all duration-200"
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
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d8a7b4] via-[#c995a6] to-[#b78b9a] text-white text-sm font-semibold shadow-[0_15px_35px_rgba(185,143,161,0.30)] hover:scale-[1.03] transition"
              >
                {badgeText}
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#f1d4dc] via-[#ddb5c2] to-[#c897a6] text-white text-sm font-semibold shadow-[0_15px_35px_rgba(185,143,161,0.28)] hover:scale-[1.03] transition"
              >
                Upgrade ✨
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
