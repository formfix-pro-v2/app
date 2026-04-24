"use client";

import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Glow",
      price: "€29",
      subtitle: "Feel lighter, brighter and more like yourself again.",
      badge: "Most Popular",
      cta: "Choose Glow",
      href: "/checkout?plan=glow",
      features: [
        "30-Day Menopause Transformation Plan",
        "Daily guided sessions",
        "Sleep + hot flash support routines",
        "Belly tone + metabolism reset",
        "Posture & feminine confidence flows",
        "Progress dashboard",
        "Smart symptom adjustments",
        "Nutrition habit checklist",
      ],
    },
    {
      name: "Elite",
      price: "€79",
      subtitle: "Full premium system for serious transformation.",
      badge: "Best Value",
      cta: "Choose Elite",
      href: "/checkout?plan=elite",
      features: [
        "Everything in Glow",
        "90-Day premium transformation roadmap",
        "Advanced body sculpt phases",
        "Pelvic floor recovery system",
        "Joint pain & mobility protocols",
        "Monthly reassessment engine",
        "Priority future updates",
        "VIP premium workout library",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="text-center mb-14">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Premium Membership
        </p>

        <h1 className="text-5xl md:text-7xl mb-6">
          Feel Like Yourself Again
        </h1>

        <p className="max-w-3xl mx-auto text-[#7b6870] text-xl leading-relaxed">
          Personalized menopause support built for real women:
          sleep, weight, confidence, mobility, energy and glow.
        </p>
      </section>

      {/* VALUE STRIP */}
      <section className="grid md:grid-cols-4 gap-4 mb-12">
        {[
          "Better Sleep",
          "Flatter Waist",
          "More Energy",
          "Less Joint Pain",
        ].map((item) => (
          <div
            key={item}
            className="soft-card p-5 text-center text-lg"
          >
            ✨ {item}
          </div>
        ))}
      </section>

      {/* PLANS */}
      <section className="grid lg:grid-cols-2 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="soft-card p-8 relative"
          >
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#ffe7ef] text-[#8f5d6f] text-sm font-medium">
              {plan.badge}
            </div>

            <h2 className="text-5xl mb-2">
              {plan.name}
            </h2>

            <p className="text-[#7b6870] mb-6 text-lg">
              {plan.subtitle}
            </p>

            <div className="text-6xl mb-8">
              {plan.price}
            </div>

            <div className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="p-4 rounded-2xl bg-white border border-[#f0e3e8]"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>

            <Link
              href={plan.href}
              className={
                plan.name === "Elite"
                  ? "btn-primary w-full text-center"
                  : "btn-outline w-full text-center"
              }
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* REASSESSMENT */}
      <section className="soft-card p-10 mb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
              Smart Assessment System
            </p>

            <h3 className="text-5xl mb-6">
              Plans That Adapt With You
            </h3>

            <p className="text-[#7b6870] text-lg leading-relaxed">
              Every month we reassess symptoms, sleep,
              confidence, body changes and pain levels —
              then update your program automatically.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Sleep Score Review",
              "Weight / Shape Progress",
              "Pain Level Check",
              "Confidence Score",
              "New Symptom Adjustments",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-3xl bg-white border border-[#f0e3e8]"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="grid md:grid-cols-3 gap-6 mb-14">
        {[
          "I sleep through the night again.",
          "My belly reduced and I feel feminine again.",
          "Best investment I made after 45.",
        ].map((quote, i) => (
          <div
            key={i}
            className="soft-card p-6"
          >
            ⭐⭐⭐⭐⭐
            <p className="mt-4 text-[#7b6870]">
              {quote}
            </p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="soft-card p-10 text-center">
        <h3 className="text-5xl mb-5">
          Your Next 30 Days Can Change Everything
        </h3>

        <p className="text-[#7b6870] text-lg mb-8 max-w-2xl mx-auto">
          Start now and rebuild energy, confidence and body
          comfort with a premium feminine system.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/checkout?plan=glow"
            className="btn-outline"
          >
            Start Glow
          </Link>

          <Link
            href="/checkout?plan=elite"
            className="btn-primary"
          >
            Start Elite
          </Link>
        </div>
      </section>
    </main>
  );
}
