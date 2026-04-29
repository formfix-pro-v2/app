"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string;
  plan: string;
  premium: boolean;
  current_day: number;
  purchase_date: string | null;
  expiry_date: string | null;
  created_at: string;
};

type Stats = {
  total: number;
  free: number;
  glow: number;
  elite: number;
  active: number;
  expired: number;
  revenueEstimate: number;
};

// Add your admin email(s) here
const ADMIN_EMAILS = ["admin@Veronica Method.com"];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    free: 0,
    glow: 0,
    elite: 0,
    active: 0,
    expired: 0,
    revenueEstimate: 0,
  });
  const [adminKey, setAdminKey] = useState("");
  const [keyEntered, setKeyEntered] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      if (u && ADMIN_EMAILS.includes(u.email || "")) {
        setAuthorized(true);
        setKeyEntered(true);
        fetchData();
      }
      setLoading(false);
    });
  }, []);

  function handleKeySubmit() {
    // Simple passkey for admin access (change this!)
    if (adminKey === "Veronica Method2024") {
      setKeyEntered(true);
      setAuthorized(true);
      fetchData();
    } else {
      alert("Invalid admin key.");
    }
  }

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setProfiles(data.profiles || []);
        setStats(data.stats || stats);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    }
  }

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-[#b98fa1]">Loading...</div>
      </main>
    );
  }

  if (!authorized && !keyEntered) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="soft-card p-10 max-w-md w-full text-center">
          <h1 className="text-3xl mb-4 text-[#4a3f44]">Admin Access</h1>
          <p className="text-[#7b6870] mb-6 text-sm">
            Enter admin key to continue.
          </p>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleKeySubmit()}
            placeholder="Admin key"
            className="w-full p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] mb-4"
          />
          <button onClick={handleKeySubmit} className="btn-primary w-full py-3">
            Enter
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* HEADER */}
      <section className="soft-card p-10 mb-8">
        <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
          Admin Panel
        </p>
        <h1 className="text-5xl mb-2 text-[#4a3f44]">Business Dashboard</h1>
        <p className="text-[#7b6870]">
          Overview of users, subscriptions and revenue.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats.total, color: "text-[#4a3f44]" },
          { label: "Free", value: stats.free, color: "text-[#7b6870]" },
          { label: "Glow", value: stats.glow, color: "text-[#d8a7b5]" },
          { label: "Elite", value: stats.elite, color: "text-[#8f5d6f]" },
        ].map((s) => (
          <div key={s.label} className="soft-card p-6 text-center">
            <div className="text-[9px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">
              {s.label}
            </div>
            <div className={`text-4xl font-light ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="soft-card p-6 text-center">
          <div className="text-[9px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">
            Active Premium
          </div>
          <div className="text-4xl font-light text-green-600">{stats.active}</div>
        </div>
        <div className="soft-card p-6 text-center">
          <div className="text-[9px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">
            Expired
          </div>
          <div className="text-4xl font-light text-amber-600">{stats.expired}</div>
        </div>
        <div className="soft-card p-6 text-center">
          <div className="text-[9px] uppercase tracking-widest text-[#b98fa1] mb-2 font-bold">
            Est. Revenue
          </div>
          <div className="text-4xl font-light text-[#4a3f44]">
            €{stats.revenueEstimate}
          </div>
        </div>
      </section>

      {/* CONVERSION */}
      <section className="soft-card p-8 mb-8">
        <h2 className="text-2xl text-[#4a3f44] mb-4">Conversion Rate</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="h-4 bg-[#fdf2f5] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d8a7b5] to-[#8f5d6f] rounded-full transition-all"
                style={{
                  width: `${stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(0) : 0}%`,
                }}
              />
            </div>
          </div>
          <span className="text-2xl font-light text-[#4a3f44]">
            {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(1) : 0}%
          </span>
        </div>
        <p className="text-xs text-[#7b6870] mt-2">
          {stats.active} of {stats.total} users have an active premium plan.
        </p>
      </section>

      {/* USERS TABLE */}
      <section className="soft-card p-8">
        <h2 className="text-2xl text-[#4a3f44] mb-6">
          Recent Users ({profiles.length})
        </h2>

        {profiles.length === 0 ? (
          <p className="text-[#7b6870] italic">
            No user data available. Users will appear here after they sign up.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-[#b98fa1] border-b border-[#f0e3e8]">
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Plan</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Day</th>
                  <th className="pb-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => {
                  const isActive =
                    p.premium && p.expiry_date && new Date(p.expiry_date) > new Date();
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-[#f0e3e8]/50 hover:bg-[#fdf2f5]/30"
                    >
                      <td className="py-3 pr-4 text-[#4a3f44]">
                        {p.email || "—"}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest ${
                            p.plan === "elite"
                              ? "bg-purple-50 text-purple-600"
                              : p.plan === "glow"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          {p.plan}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                            isActive
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-[#7b6870]">
                        {p.current_day || 1}
                      </td>
                      <td className="py-3 text-[#7b6870]">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
