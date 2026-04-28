import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  // Verify user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const all = profiles || [];
  const now = new Date();

  const free = all.filter((p) => p.plan === "free" || !p.plan).length;
  const glow = all.filter((p) => p.plan === "glow").length;
  const elite = all.filter((p) => p.plan === "elite").length;
  const active = all.filter(
    (p) => p.premium && p.expiry_date && new Date(p.expiry_date) > now
  ).length;
  const expired = all.filter(
    (p) => p.premium && p.expiry_date && new Date(p.expiry_date) <= now
  ).length;

  // Revenue estimate
  const revenueEstimate = glow * 29 + elite * 79;

  return NextResponse.json({
    profiles: all,
    stats: {
      total: all.length,
      free,
      glow,
      elite,
      active,
      expired,
      revenueEstimate,
    },
  });
}
