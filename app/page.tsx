"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    /* Koristimo bg-transparent da bi ruže iz globals.css bile vidljive */
    <main className="relative min-h-screen bg-transparent">
      
      {/* HERO SECTION - Smanjen padding (pt-6) i gap (gap-6) */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-8 grid lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#d8a7b5] bg-[#fdf2f5]/60 w-fit px-3 py-1 rounded-full">
              Menopause Wellness for Women 40+
            </p>

            <h1 className="text-5xl md:text-[62px] leading-[1.05] text-[#4a3f44] tracking-tight">
              Feel Balanced.
              <br />
              <span className="italic font-light text-[#d8a7b5]">Move Gracefully.</span>
              <br />
              Glow Again.
            </h1>

            <p className="text-lg text-[#7b6870] max-w-xl leading-relaxed font-light">
              Personalized programs for <span className="font-medium text-[#4a3f44]">hot flashes</span>, 
              sleep, belly fat and joint stiffness.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/quiz" className="btn-primary">
              Start Free Plan
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Membership
            </Link>
          </div>
          
          <div className="flex items-center gap-2 pt-2 opacity-80">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#d8a7b5]/30" />
                ))}
             </div>
             <p className="text-[11px] italic text-[#7b6870]">Trusted by women building strength through midlife.</p>
          </div>
        </div>

        {/* PREVIEW CARD - Koristi glassmorphism iz globals.css */}
        <div className="soft-card p-6 md:p-8">
          <h2 className="text-2xl text-[#4a3f44] mb-4 font-light italic text-center lg:text-left">Inside Your Reset:</h2>
          <div className="space-y-3">
            {[
              "Daily movement sessions",
              "Menopause symptom support plans",
              "Posture & confidence routines",
              "Better sleep reset habits",
              "Nutrition guidance"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-[15px] text-[#4a3f44]">
                <span className="w-5 h-5 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#d8a7b5] text-[10px] font-bold">✓</span>
                {text}
              </div>
            ))}
          </div>
          <Link href="/dashboard" className="btn-primary w-full mt-6 py-3 text-sm uppercase tracking-widest bg-gradient-to-r from-[#d8a7b5] to-[#c58d9d]">
            View Example Dashboard
          </Link>
        </div>
      </section>

      {/* THREE PILLARS - Smanjen py-4 i gap-4 */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Hormone Calm", desc: "Support nervous system balance and reduce daily overwhelm." },
            { title: "Lean Strength", desc: "Gentle strength sessions to improve shape and metabolism." },
            { title: "Elegant Energy", desc: "Restore vitality without punishing workouts." }
          ].map((item) => (
            <div key={item.title} className="soft-card p-6 text-center hover:scale-[1.02] transition-transform">
              <h3 className="text-xl text-[#4a3f44] mb-2 font-medium">{item.title}</h3>
              <p className="text-[13px] text-[#7b6870] leading-relaxed italic font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PROGRAMS - Smanjen mb-4 */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl text-center mb-6 text-[#4a3f44] tracking-tight italic">Signature Programs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Sleep & Hot Flash Reset", desc: "Evening routines, cooling habits and nervous system support." },
            { title: "Belly Tone After 40", desc: "Strength + walking + metabolism support." },
            { title: "Joint Ease & Mobility", desc: "Reduce stiffness in hips and shoulders." },
            { title: "Confidence & Posture", desc: "Stand taller and feel more feminine." }
          ].map((prog) => (
            <div key={prog.title} className="soft-card p-6 group hover:border-[#d8a7b5] transition-colors">
              <h3 className="text-2xl text-[#4a3f44] mb-1 font-light group-hover:text-[#d8a7b5] transition-colors">{prog.title}</h3>
              <p className="text-[#7b6870] text-[14px] font-light leading-relaxed">
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA - Kompaktniji padding */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="soft-card p-8 md:p-12 text-center relative overflow-hidden border-[#d8a7b5]/20">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#4a3f44] tracking-tight leading-tight">
            Your Next Chapter <br />Can Feel <span className="italic text-[#d8a7b5]">Amazing</span>
          </h2>
          <p className="text-base text-[#7b6870] mb-6 max-w-sm mx-auto font-light leading-relaxed">
            Begin with a personalized assessment today.
          </p>
          <Link href="/quiz" className="btn-primary px-10 py-4 text-lg">
            Start Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
