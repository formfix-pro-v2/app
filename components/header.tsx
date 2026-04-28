"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getMembership } from "@/lib/subscription";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { User } from "@supabase/supabase-js";

type Plan = "free" | "glow" | "elite";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan>("free");
  const [premium, setPremium] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Check local membership status
    const membership = getMembership();
    if (membership.status === "active") {
      setPremium(true);
      setPlan(membership.plan as Plan);
    }

    return () => subscription.unsubscribe();
  }, []);

  const badgeText =
    plan === "elite" ? "Elite Member ✨" : plan === "glow" ? "Glow Member ✨" : null;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-4 mt-4 rounded-[30px] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_20px_60px_rgba(145,105,120,0.12)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-6">
          {/* BRAND */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f8d8df] via-[#e7bcc8] to-[#d5a6b1] flex items-center justify-center shadow-md">
              <span className="text-white text-lg">✦</span>
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

          {/* NAV - Desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              ["Dashboard", "/dashboard"],
              ["Assessment", "/quiz"],
              ["Progress", "/progress"],
              ["Shopping", "/shopping"],
              ["Plans", "/pricing"],
              ["Account", "/account"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="px-5 py-3 rounded-2xl text-sm font-medium text-[#6f5a62] hover:bg-white hover:shadow-md transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {user ? (
              premium && badgeText ? (
                <Link
                  href="/account"
                  className="hidden sm:inline-flex px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d8a7b4] via-[#c995a6] to-[#b78b9a] text-white text-sm font-semibold shadow-[0_15px_35px_rgba(185,143,161,0.30)] hover:scale-[1.03] transition"
                >
                  {badgeText}
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hidden sm:inline-flex px-6 py-3 rounded-2xl bg-[#fdf2f5] text-[#8f5d6f] text-sm font-medium hover:bg-[#f8e4ea] transition"
                >
                  My Account
                </Link>
              )
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-6 py-3 rounded-2xl bg-gradient-to-r from-[#f1d4dc] via-[#ddb5c2] to-[#c897a6] text-white text-sm font-semibold shadow-[0_15px_35px_rgba(185,143,161,0.28)] hover:scale-[1.03] transition"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-[#fdf2f5] transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-[#6f5a62]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden px-6 pb-6 border-t border-[#f0e3e8]/50">
            <nav className="flex flex-col gap-2 pt-4">
              {[
                ["Dashboard", "/dashboard"],
                ["Assessment", "/quiz"],
                ["Progress", "/progress"],
                ["Shopping", "/shopping"],
                ["Plans", "/pricing"],
                ["Account", "/account"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-3 rounded-2xl text-sm font-medium text-[#6f5a62] hover:bg-white hover:shadow-md transition-all"
                >
                  {label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-center mt-2"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
