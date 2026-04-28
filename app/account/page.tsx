"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  getMembership,
  clearMembership,
  cancelSubscription,
} from "@/lib/subscription";
import type { User } from "@supabase/supabase-js";

type State = {
  plan: "free" | "glow" | "elite";
  status: "active" | "expired" | "none";
  purchaseDate: string | null;
  expiryDate: string | null;
  daysRemaining: number;
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<State>({
    plan: "free",
    status: "none",
    purchaseDate: null,
    expiryDate: null,
    daysRemaining: 0,
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
    });

    setData(getMembership());
  }, []);

  const premium = data.status === "active";

  const badge =
    data.plan === "elite"
      ? "Elite Member ✨"
      : data.plan === "glow"
        ? "Glow Member ✨"
        : "Free Account";

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your membership?"
    );
    if (!confirmed) return;

    await cancelSubscription();
    setData(getMembership());
  }

  function handleReset() {
    const confirmed = window.confirm(
      "This will reset all your local data. Are you sure?"
    );
    if (!confirmed) return;

    clearMembership();
    setData(getMembership());
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearMembership();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="soft-card p-10 mb-8">
        <div className="inline-block px-5 py-3 rounded-full bg-[#fff1f5] text-[#8f5d6f] mb-6">
          {badge}
        </div>

        <h1 className="text-5xl mb-4">My Account</h1>

        {user && (
          <p className="text-[#b98fa1] text-sm mb-2">{user.email}</p>
        )}

        <p className="text-[#7b6870] text-lg">
          {premium
            ? "Your premium access is active."
            : data.status === "expired"
              ? "Your membership expired."
              : "Upgrade anytime to unlock premium."}
        </p>
      </section>

      {/* STATS */}
      <section className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">Plan</div>
          <div className="text-3xl capitalize">{data.plan}</div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">Status</div>
          <div className="text-3xl capitalize">{data.status}</div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">Days Left</div>
          <div className="text-3xl">{data.daysRemaining}</div>
        </div>

        <div className="soft-card p-6">
          <div className="text-sm text-[#7b6870] mb-2">Expiry</div>
          <div className="text-lg">
            {data.expiryDate
              ? new Date(data.expiryDate).toLocaleDateString()
              : "—"}
          </div>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="soft-card p-8 mb-8">
        <h2 className="text-4xl mb-6">Membership Actions</h2>

        <div className="flex flex-wrap gap-4">
          {!premium && (
            <Link href="/pricing" className="btn-primary">
              Upgrade Now
            </Link>
          )}

          {data.plan === "glow" && premium && (
            <Link href="/plans/elite" className="btn-primary">
              Upgrade to Elite
            </Link>
          )}

          <Link href="/dashboard" className="btn-outline">
            Dashboard
          </Link>

          {premium && (
            <button onClick={handleCancel} className="btn-outline">
              Cancel Membership
            </button>
          )}

          <button onClick={handleReset} className="btn-outline">
            Reset Account
          </button>

          <button
            onClick={handleSignOut}
            className="btn-outline !border-red-200 !text-red-400 hover:!bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </section>

      {/* RETENTION */}
      {premium && data.daysRemaining <= 7 && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-4">Renew Soon</h2>
          <p className="text-[#7b6870] mb-6">
            Your access ends in {data.daysRemaining} days.
          </p>
          <Link href="/pricing" className="btn-primary">
            Renew Membership
          </Link>
        </section>
      )}

      {data.status === "expired" && (
        <section className="soft-card p-8">
          <h2 className="text-4xl mb-4">Welcome Back</h2>
          <p className="text-[#7b6870] mb-6">
            Reactivate your premium plan anytime.
          </p>
          <Link href="/pricing" className="btn-primary">
            Reactivate Now
          </Link>
        </section>
      )}
    </main>
  );
}
