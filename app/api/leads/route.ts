import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Try to save to Supabase (if leads table exists)
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("leads").insert({
      email,
      source: body.source || "website",
      created_at: new Date().toISOString(),
    });
  } catch {
    // Table might not exist yet — that's ok
  }

  return NextResponse.json({ success: true });
}
