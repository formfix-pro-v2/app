import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, welcomeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Proveri da li je ovo nova registracija (profil tek kreiran)
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("created_at, updated_at")
            .eq("id", user.id)
            .single();

          // Ako je profil kreiran u poslednjih 60 sekundi → nova registracija
          if (profile?.created_at) {
            const createdAt = new Date(profile.created_at).getTime();
            const now = Date.now();
            if (now - createdAt < 60_000) {
              const email = welcomeEmail();
              sendEmail({ to: user.email, ...email }).catch(() => {
                // Ne blokiramo redirect ako email ne uspe
              });
            }
          }
        }
      } catch {
        // Email slanje nije kritično — ne blokiramo auth flow
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
