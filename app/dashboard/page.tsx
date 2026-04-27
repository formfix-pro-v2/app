"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#fffcfd]">
      {/* DEKORATIVNE RUŽE U POZADINI */}
      <div className="absolute top-10 -left-10 w-64 h-64 opacity-[0.03] pointer-events-none animate-float select-none">
        <img src="https://www.svgrepo.com/show/402439/rose.svg" alt="rose-decor" />
      </div>
      <div className="absolute bottom-20 -right-10 w-96 h-96 opacity-[0.02] pointer-events-none select-none" style={{ transform: 'rotate(45deg)' }}>
        <img src="https://www.svgrepo.com/show/402439/rose.svg" alt="rose-decor" />
      </div>

      {/* HERO SECTION - Smanjen pt (padding-top) */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-[#b98fa1] bg-[#fdf2f5] w-fit px-3 py-1 rounded-full">
              Menopause Wellness for Women 40+
            </p>

            <h1 className="text-5xl md:text-[68px] leading-[1.1] text-[#4a3f44] tracking-tight">
              Feel Balanced.
              <br />
              <span className="italic font-light text-[#b98fa1]">Move Gracefully.</span>
              <br />
              Glow Again.
            </h1>

            <p className="text-lg text-[#7b6870] max-w-xl leading-relaxed font-light">
              Personalized programs for <span className="font-medium">hot flashes</span>, sleep, 
              belly fat and joint stiffness.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/quiz" className="btn-primary px-8 py-4 text-base shadow-lg hover:scale-105 transition-transform">
              Start Free Plan
            </Link>
            <Link href="/pricing" className="btn-outline px-8 py-4 text-base hover:bg-[#fdf2f5]">
              View Membership
            </Link>
          </div>
        </div>

        {/* PREVIEW CARD */}
        <div className="soft-card p-1 bg-white/40 backdrop-blur-sm border border-[#f0e3e8]">
          <div className="bg-white rounded-[32px] p-8 shadow-sm">
            <h2 className="text-2xl text-[#4a3f44] mb-6 font-light italic">Inside Your Reset:</h2>
            <div className="space-y-4">
              {[
                "Daily movement sessions",
                "Symptom support plans",
                "Posture & confidence routines",
                "Nutrition guidance"
              ].map((text) => (
                <div key={text} className="flex items-center gap-3 text-base text-[#6f5a62]">
                  <span className="w-5 h-5 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#d6a7b1] text-[10px] font-bold font-sans">✓</span>
                  {text}
                </div>
              ))}
            </div>
            <Link href="/dashboard" className="btn-primary w-full mt-8 text-center py-3 bg-gradient-to-r from-[#b98fa1] to-[#d6a7b1] text-sm uppercase tracking-widest">
              View Example Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS - Smanjen gap i py */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Hormone Calm", desc: "Support nervous system balance and reduce overwhelm." },
            { title: "Lean Strength", desc: "Gentle strength sessions to improve metabolism." },
            { title: "Elegant Energy", desc: "Restore vitality without punishing workouts." }
          ].map((item) => (
            <div key={item.title} className="soft-card p-6 bg-white border-b-2 border-b-[#fdf2f5] hover:border-b-[#d6a7b1] transition-all">
              <h3 className="text-xl text-[#4a3f44] mb-2 font-medium">{item.title}</h3>
              <p className="text-sm text-[#7b6870] leading-relaxed italic font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PROGRAMS - Smanjen py */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl text-center mb-10 text-[#4a3f44] tracking-tight italic">Signature Programs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Sleep & Hot Flash Reset", desc: "Evening routines and cooling habits." },
            { title: "Belly Tone After 40", desc: "Strength + walking + metabolism support." },
            { title: "Joint Ease & Mobility", desc: "Reduce stiffness in hips and shoulders." },
            { title: "Confidence & Posture", desc: "Stand taller and feel feminine." }
          ].map((prog) => (
            <div key={prog.title} className="soft-card p-6 group hover:bg-white transition-colors border border-[#f0e3e8]">
              <h3 className="text-2xl text-[#4a3f44] mb-2 group-hover:text-[#b98fa1] transition-colors font-light">{prog.title}</h3>
              <p className="text-[#7b6870] text-sm font-light leading-relaxed">
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA - Smanjen pb */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="soft-card p-10 text-center bg-gradient-to-tr from-[#fdf2f5] to-white border border-[#f0e3e8] relative">
          {/* Mala dekorativna ruža u uglu CTA sekcije */}
          <div className="absolute -top-4 -right-4 w-12 h-12 opacity-10">
             <img src="https://www.svgrepo.com/show/402439/rose.svg" alt="rose" />
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-6 text-[#4a3f44] tracking-tight leading-tight">
            Your Next Chapter <br />Can Feel <span className="italic text-[#b98fa1]">Amazing</span>
          </h2>
          <p className="text-lg text-[#7b6870] mb-8 max-w-sm mx-auto font-light leading-relaxed">
            Begin with a personalized assessment today.
          </p>
          <Link href="/quiz" className="btn-primary px-12 py-4 text-lg shadow-xl hover:scale-105 transition-all">
            Start Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
