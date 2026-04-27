"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#fffcfd]">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="uppercase tracking-[0.3em] text-[11px] font-bold text-[#b98fa1] bg-[#fdf2f5] w-fit px-3 py-1 rounded-full">
              Menopause Wellness for Women 40+
            </p>

            <h1 className="text-6xl md:text-[80px] leading-[1.1] text-[#4a3f44] tracking-tight">
              Feel Balanced.
              <br />
              <span className="italic font-light">Move Gracefully.</span>
              <br />
              Glow Again.
            </h1>

            <p className="text-xl text-[#7b6870] max-w-xl leading-relaxed font-light">
              Personalized programs for <span className="text-[#b98fa1] font-medium text-lg">hot flashes</span>, sleep disruption,
              stubborn belly fat, mood swings, joint stiffness and confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <Link href="/quiz" className="btn-primary px-10 py-5 text-lg shadow-xl hover:scale-105 transition-transform">
              Start Free Plan
            </Link>

            <Link href="/pricing" className="btn-outline px-10 py-5 text-lg hover:bg-[#fdf2f5]">
              View Membership
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[#b98fa1] font-medium italic text-sm">
             <span className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#ead8de]" />
                ))}
             </span>
             Trusted by women building strength through midlife.
          </div>
        </div>

        {/* PREVIEW CARD - Sa tvoje prve slike */}
        <div className="soft-card p-2 bg-white/50 backdrop-blur-sm border border-[#f0e3e8]">
          <div className="bg-white rounded-[40px] p-10 shadow-inner">
            <h2 className="text-3xl text-[#4a3f44] mb-8 font-light italic">Inside Your Reset:</h2>
            
            <div className="space-y-6">
              {[
                "Daily movement sessions",
                "Menopause symptom support plans",
                "Posture & confidence routines",
                "Better sleep reset habits",
                "Nutrition guidance"
              ].map((text) => (
                <div key={text} className="flex items-center gap-4 text-lg text-[#6f5a62]">
                  <span className="w-6 h-6 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#d6a7b1] text-xs font-bold">✓</span>
                  {text}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="btn-primary w-full mt-10 text-center py-4 bg-gradient-to-r from-[#b98fa1] to-[#d6a7b1]"
            >
              View Example Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS - Sa tvoje treće slike */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Hormone Calm", desc: "Support nervous system balance and reduce daily overwhelm." },
            { title: "Lean Strength", desc: "Gentle strength sessions to improve shape and metabolism." },
            { title: "Elegant Energy", desc: "Restore vitality without punishing workouts." }
          ].map((item) => (
            <div key={item.title} className="soft-card p-10 bg-white border-b-4 border-b-[#fdf2f5] hover:border-b-[#d6a7b1] transition-all">
              <h3 className="text-2xl text-[#4a3f44] mb-4 font-medium">{item.title}</h3>
              <p className="text-[#7b6870] leading-relaxed italic font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PROGRAMS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl text-center mb-16 text-[#4a3f44] tracking-tight italic">Signature Programs</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Sleep & Hot Flash Reset", desc: "Evening routines, cooling habits and nervous system support." },
            { title: "Belly Tone After 40", desc: "Strength + walking + metabolism support." },
            { title: "Joint Ease & Mobility", desc: "Reduce stiffness in hips, knees and shoulders." },
            { title: "Confidence & Posture", desc: "Stand taller, feel feminine and move beautifully." }
          ].map((prog) => (
            <div key={prog.title} className="soft-card p-10 group hover:bg-[#fffcfd] transition-colors border border-[#f0e3e8]">
              <h3 className="text-3xl text-[#4a3f44] mb-4 group-hover:text-[#b98fa1] transition-colors">{prog.title}</h3>
              <p className="text-[#7b6870] text-lg font-light leading-relaxed">
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="soft-card p-16 text-center bg-gradient-to-tr from-[#fdf2f5] to-white border border-[#f0e3e8]">
          <h2 className="text-5xl md:text-6xl mb-8 text-[#4a3f44] tracking-tight">
            Your Next Chapter <br />Can Feel <span className="italic">Amazing</span>
          </h2>

          <p className="text-xl text-[#7b6870] mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Begin with a personalized wellness assessment today and discover how to glow at every age.
          </p>

          <Link href="/quiz" className="btn-primary px-16 py-6 text-xl shadow-2xl hover:scale-105 transition-all">
            Start Free Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
