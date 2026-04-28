import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

// Use service-level Supabase client for webhooks (no user session)
function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  // If webhook secret is configured, verify signature
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // For development without webhook secret
      event = JSON.parse(body);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as "glow" | "elite";

    if (userId && plan) {
      const supabase = getAdminSupabase();

      const durationDays = plan === "elite" ? 90 : 30;
      const now = new Date();
      const expiry = new Date(now);
      expiry.setDate(expiry.getDate() + durationDays);

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            plan,
            premium: true,
            current_day: 1,
            purchase_date: now.toISOString(),
            expiry_date: expiry.toISOString(),
            updated_at: now.toISOString(),
          },
          { onConflict: "id" }
        );

      if (error) {
        console.error("Failed to activate subscription:", error.message);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }

      console.log(`Subscription activated: ${userId} → ${plan}`);
    }
  }

  return NextResponse.json({ received: true });
}
