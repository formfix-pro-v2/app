"use client";

import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
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

            <p className="text-base text-[#7b6870] max-w-xl leading-relaxed font-light">
              {t("Personalized programs for hot flashes, sleep, belly fat and joint stiffness.")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/quiz" className="btn-primary">{t("Start Free Plan")}</Link>
            <Link href="/pricing" className="btn-outline">{t("View Membership")}</Link>
          </div>

          <div className="flex items-center gap-2 pt-2 opacity-80">
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

        <div className="soft-card p-5 md:p-6">
          <h2 className="text-xl text-[#4a3f44] mb-3 font-light italic text-center lg:text-left">
            {t("Inside Your Reset:")}
          </h2>
          <div className="space-y-3">
            {[
              t("Daily movement sessions"),
              t("Menopause symptom support plans"),
              t("Posture & confidence routines"),
              t("Better sleep reset habits"),
              t("Nutrition guidance"),
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-[#4a3f44]">
                <span className="w-4 h-4 rounded-full bg-[#fdf2f5] flex items-center justify-center text-[#d8a7b5] text-[9px] font-bold shrink-0">✓</span>
                {text}
              </div>
            ))}
          </div>
          <Link href="/dashboard" className="btn-primary w-full mt-4 py-2.5 text-xs uppercase tracking-widest bg-gradient-to-r from-[#d8a7b5] to-[#c58d9d]">
            {t("View Example Dashboard")}
          </Link>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="max-w-7xl mx-auto px-6 py-3">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: t("Hormone Calm"), desc: t("Support nervous system balance and reduce daily overwhelm.") },
            { title: t("Lean Strength"), desc: t("Gentle strength sessions to improve shape and metabolism.") },
            { title: t("Elegant Energy"), desc: t("Restore vitality without punishing workouts.") },
          ].map((item) => (
            <div key={item.title} className="soft-card p-6 text-center hover:scale-[1.02] transition-transform">
              <h3 className="text-xl text-[#4a3f44] mb-2 font-medium">{item.title}</h3>
              <p className="text-[13px] text-[#7b6870] leading-relaxed italic font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PROGRAMS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl text-center mb-6 text-[#4a3f44] tracking-tight italic">{t("Signature Programs")}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Sleep & Hot Flash Reset", desc: "Evening routines, cooling habits and nervous system support." },
            { title: "Belly Tone After 40", desc: "Strength + walking + metabolism support." },
            { title: "Joint Ease & Mobility", desc: "Reduce stiffness in hips and shoulders." },
            { title: "Confidence & Posture", desc: "Stand taller and feel more feminine." },
          ].map((prog) => (
            <div key={prog.title} className="soft-card p-6 group hover:border-[#d8a7b5] transition-colors">
              <h3 className="text-2xl text-[#4a3f44] mb-1 font-light group-hover:text-[#d8a7b5] transition-colors">{prog.title}</h3>
              <p className="text-[#7b6870] text-[14px] font-light leading-relaxed">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl text-center mb-8 text-[#4a3f44] tracking-tight italic">{t("Real Women, Real Results")}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { quote: "I sleep through the night again. The breathing routines before bed changed everything for me.", name: "Marina, 52", result: "Better sleep in 10 days" },
            { quote: "The meal plans cost me less than €6 a day and I've lost 4kg in the first month without feeling hungry.", name: "Jelena, 47", result: "4kg lost in 30 days" },
            { quote: "My knee pain is almost gone. The mobility exercises are so gentle but they actually work.", name: "Ana, 55", result: "Joint pain reduced 80%" },
          ].map((item) => (
            <div key={item.name} className="soft-card p-6 hover:scale-[1.02] transition-transform">
              <p className="text-[#6f5a62] text-sm leading-relaxed mb-4 italic font-light">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f8d8df] to-[#d5a6b1] flex items-center justify-center text-white text-xs font-bold">{item.name[0]}</div>
                  <span className="text-sm text-[#4a3f44] font-medium">{item.name}</span>
                </div>
                <span className="text-[9px] px-2 py-1 rounded-full bg-green-50 text-green-600 font-bold uppercase tracking-widest border border-green-100">{item.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="soft-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,200+", label: t("Active Members") },
              { value: "€5.80", label: t("Avg Daily Meal Cost") },
              { value: "92%", label: t("Sleep Improvement") },
              { value: "30 days", label: t("Money-Back Guarantee") },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-light text-[#4a3f44]">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#b98fa1] font-bold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="soft-card p-8 md:p-12 text-center relative overflow-hidden border-[#d8a7b5]/20">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#4a3f44] tracking-tight leading-tight">
            {t("Your Next Chapter")} <br />{t("Can Feel")} <span className="italic text-[#d8a7b5]">{t("Amazing")}</span>
          </h2>
          <p className="text-base text-[#7b6870] mb-6 max-w-sm mx-auto font-light leading-relaxed">
            {t("Begin with a personalized assessment today.")}
          </p>
          <Link href="/quiz" className="btn-primary px-10 py-4 text-lg">{t("Start Assessment")}</Link>
        </div>
      </section>

      <EmailCapture />
    </main>
  );
}
