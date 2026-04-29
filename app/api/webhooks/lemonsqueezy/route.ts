import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();

  const eventName = body.meta?.event_name;

  // Only process successful orders
  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const customData = body.meta?.custom_data || {};
  const userId = customData.user_id;
  const plan = customData.plan as "glow" | "elite";
  const email = body.data?.attributes?.user_email;

  if (!plan || !["glow", "elite"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const durationDays = plan === "elite" ? 90 : 30;
  const now = new Date();
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + durationDays);

  // Update profile in Supabase
  if (userId) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase.from("profiles").upsert(
        {
          id: userId,
          email: email || undefined,
          plan,
          premium: true,
          current_day: 1,
          purchase_date: now.toISOString(),
          expiry_date: expiry.toISOString(),
          updated_at: now.toISOString(),
        },
        { onConflict: "id" }
      );

      console.log(`LemonSqueezy: Activated ${plan} for user ${userId}`);
    } catch (err) {
      console.error("Failed to activate subscription:", err);
    }
  }

  return NextResponse.json({ received: true });
}
