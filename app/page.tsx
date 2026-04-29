"use client";

import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ExitIntent from "@/components/ExitIntent";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* HERO */}
      <section className="max-w-7xl mx-auto pt-4 pb-6 grid lg:grid-cols-2 gap-5 items-center">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#d8a7b5] bg-[#fdf2f5]/60 w-fit px-3 py-1 rounded-full">
              {t("Menopause Wellness for Women 40+")}
            </p>

            <h1 className="text-4xl md:text-[52px] leading-[1.08] text-[#4a3f44] tracking-tight">
              {t("Feel Balanced.")}
              <br />
              <span className="italic font-light text-[#d8a7b5]">{t("Move Gracefully.")}</span>
              <br />
              {t("Glow Again.")}
            </h1>

            <p className="text-base text-[#7b6870] max-w-xl leading-relaxed">
              The complete menopause wellness system: <strong className="text-[#4a3f44]">personalized exercises</strong>,{" "}
              <strong className="text-[#4a3f44]">budget meal plans under €7/day</strong>,{" "}
              <strong className="text-[#4a3f44]">supplement guidance</strong> and daily support for hot flashes, sleep, joint pain and confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/quiz" className="btn-primary">{t("Start Free Plan")}</Link>
            <Link href="/pricing" className="btn-outline">{t("View Membership")}</Link>
          </div>

          <div className="flex items-center gap-2 pt-1 opacity-80">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#d8a7b5]/30" />
              ))}
            </div>
            <p className="text-[11px] italic text-[#7b6870]">
              {t("Trusted by women building strength through midlife.")}
            </p>
          </div>
        </div>

        {/* WHAT YOU GET CARD */}
        <div className="soft-card p-5 md:p-6">
          <h2 className="text-xl text-[#4a3f44] mb-3 font-light italic text-center lg:text-left">
            Everything In Your Program:
          </h2>
          <div className="space-y-2">
            {[
              { icon: "🧘‍♀️", text: "Daily exercise sessions (10-30 min, no equipment)" },
              { icon: "🥗", text: "Personalized meal plans under €7/day" },
              { icon: "💊", text: "Supplement guide: vitamins, minerals & doses" },
              { icon: "😴", text: "Sleep & hot flash recovery routines" },
              { icon: "📊", text: "Progress tracking with weekly reports" },
              { icon: "🛒", text: "Auto-generated shopping lists" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-sm text-[#4a3f44]">
                <span className="text-base shrink-0">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
          <Link href="/quiz" className="btn-primary w-full mt-4 py-2.5 text-xs uppercase tracking-widest">
            Get My Personalized Plan — Free
          </Link>
        </div>
      </section>

      {/* WHAT IS VELORA - Clear value proposition */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <h2 className="text-3xl text-center text-[#4a3f44] mb-2 italic">
            Built Specifically for Menopause
          </h2>
          <p className="text-center text-sm text-[#7b6870] mb-6 max-w-2xl mx-auto">
            Every exercise, meal and supplement recommendation is designed for the hormonal changes women experience after 40.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                icon: "🧘‍♀️",
                title: "Smart Exercises",
                points: ["Tailored to your symptoms", "Progressive 4-phase system", "Gentle start, real results", "No equipment needed"],
              },
              {
                icon: "🥗",
                title: "Budget Nutrition",
                points: ["Full meal plans under €7/day", "32+ hormone-friendly recipes", "Ingredients & prep steps", "Printable shopping lists"],
              },
              {
                icon: "💊",
                title: "Supplement Guide",
                points: ["Vitamins for hormone balance", "Minerals for bone & joints", "Exact daily doses", "Budget-friendly brands"],
              },
              {
                icon: "📈",
                title: "Track & Improve",
                points: ["Daily check-ins", "Sleep & energy graphs", "Achievement badges", "Weekly progress reports"],
              },
            ].map((col) => (
              <div key={col.title} className="text-center">
                <div className="text-3xl mb-2">{col.icon}</div>
                <h3 className="text-lg text-[#4a3f44] font-medium mb-2">{col.title}</h3>
                <ul className="space-y-1">
                  {col.points.map((p) => (
                    <li key={p} className="text-xs text-[#7b6870] flex items-center gap-1.5 justify-center">
                      <span className="text-[#d8a7b5] text-[10px]">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENOPAUSE SYMPTOMS WE TARGET */}
      <section className="max-w-7xl mx-auto py-4">
        <h2 className="text-3xl text-center text-[#4a3f44] mb-5 italic">
          We Help With These Symptoms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { symptom: "Hot Flashes", icon: "🌡️", desc: "Cooling exercises & breathing techniques" },
            { symptom: "Poor Sleep", icon: "😴", desc: "Evening routines & wind-down sequences" },
            { symptom: "Weight Gain", icon: "⚖️", desc: "Metabolism-boosting movement & meals" },
            { symptom: "Joint Pain", icon: "🦴", desc: "Gentle mobility & anti-inflammatory food" },
            { symptom: "Low Energy", icon: "⚡", desc: "Energizing exercises & nutrition" },
            { symptom: "Mood Swings", icon: "🧠", desc: "Breathing, balance & mood-lifting meals" },
            { symptom: "Bloating", icon: "🫧", desc: "Gut-friendly meals & digestive movement" },
            { symptom: "Low Confidence", icon: "💪", desc: "Posture training & strength building" },
          ].map((s) => (
            <div key={s.symptom} className="soft-card p-4 text-center hover:border-[#d8a7b5] transition-colors">
              <div className="text-2xl mb-1">{s.icon}</div>
              <h3 className="text-sm font-medium text-[#4a3f44] mb-0.5">{s.symptom}</h3>
              <p className="text-[11px] text-[#7b6870]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPLEMENT PREVIEW */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#d8a7b5] mb-1">Included In Your Plan</p>
              <h2 className="text-3xl text-[#4a3f44] italic">Menopause Supplement Guide</h2>
            </div>
            <Link href="/quiz" className="btn-outline text-sm shrink-0">Get My Personalized Doses</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              {
                name: "Vitamin D3",
                dose: "2,000-4,000 IU/day",
                why: "Bone density drops sharply during menopause. D3 is essential for calcium absorption.",
                icon: "☀️",
              },
              {
                name: "Magnesium Glycinate",
                dose: "300-400mg before bed",
                why: "Improves sleep quality, reduces muscle cramps and supports 300+ enzyme reactions.",
                icon: "🌙",
              },
              {
                name: "Omega-3 (EPA/DHA)",
                dose: "1,000-2,000mg/day",
                why: "Reduces joint inflammation, supports brain function and heart health.",
                icon: "🐟",
              },
              {
                name: "Calcium",
                dose: "500-600mg/day",
                why: "Prevents bone loss. Best absorbed in smaller doses with food.",
                icon: "🦴",
              },
              {
                name: "Vitamin B Complex",
                dose: "1 capsule/day",
                why: "Supports energy production, mood regulation and nervous system health.",
                icon: "⚡",
              },
              {
                name: "Ashwagandha",
                dose: "300-600mg/day",
                why: "Adaptogen that reduces cortisol, improves sleep and balances stress hormones.",
                icon: "🌿",
              },
            ].map((supp) => (
              <div key={supp.name} className="p-4 rounded-xl bg-white/50 border border-[#f0e3e8]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{supp.icon}</span>
                  <h3 className="text-sm font-medium text-[#4a3f44]">{supp.name}</h3>
                </div>
                <p className="text-xs font-bold text-[#d8a7b5] mb-1">{supp.dose}</p>
                <p className="text-[11px] text-[#7b6870] leading-relaxed">{supp.why}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#b98fa1] mt-4 text-center italic">
            Always consult your doctor before starting supplements. Doses are general guidelines based on current research.
          </p>
        </div>
      </section>

      {/* BUDGET COMPARISON */}
      <section className="max-w-5xl mx-auto py-4">
        <div className="soft-card p-6">
          <h2 className="text-2xl text-center text-[#4a3f44] mb-4 italic">How Much You Save</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 text-center">
              <p className="text-xs text-red-400 uppercase font-bold tracking-widest mb-1">Without Velora</p>
              <p className="text-2xl font-light text-red-500 line-through">€180+/mo</p>
              <p className="text-[10px] text-red-400 mt-1">Gym + nutritionist + supplements advice</p>
            </div>
            <div className="p-4 rounded-xl bg-[#fdf2f5] border-2 border-[#d8a7b5] text-center">
              <p className="text-xs text-[#d8a7b5] uppercase font-bold tracking-widest mb-1">Velora Glow</p>
              <p className="text-2xl font-light text-[#4a3f44]">€29 <span className="text-sm">one-time</span></p>
              <p className="text-[10px] text-[#7b6870] mt-1">30 days of everything included</p>
            </div>
            <div className="p-4 rounded-xl bg-[#fdf2f5] border border-[#f0e3e8] text-center">
              <p className="text-xs text-[#d8a7b5] uppercase font-bold tracking-widest mb-1">Velora Elite</p>
              <p className="text-2xl font-light text-[#4a3f44]">€79 <span className="text-sm">one-time</span></p>
              <p className="text-[10px] text-[#7b6870] mt-1">90 days + advanced features</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="soft-card p-8 text-center border-[#d8a7b5]/20">
          <h2 className="text-3xl md:text-4xl mb-3 text-[#4a3f44] tracking-tight leading-tight">
            {t("Your Next Chapter")} {t("Can Feel")} <span className="italic text-[#d8a7b5]">{t("Amazing")}</span>
          </h2>
          <p className="text-sm text-[#7b6870] mb-5 max-w-md mx-auto">
            Take our free 2-minute assessment. Get personalized exercises, meals, supplements and a complete wellness plan.
          </p>
          <Link href="/quiz" className="btn-primary px-10 py-3 text-base">{t("Start Assessment")}</Link>
        </div>
      </section>

      <EmailCapture />
      <ExitIntent />
    </main>
  );
}
