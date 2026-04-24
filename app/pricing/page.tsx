"use client";

import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Glow",
      price: "€29",
      badge: "Most Popular",
      subtitle:
        "30-day feminine reset for sleep, confidence and body comfort.",
      href: "/plans/glow",
      cta: "Explore Glow",
      features: [
        "30-Day Program",
        "Daily guided sessions",
        "Sleep + hot flash support",
        "Belly tone routines",
        "Progress dashboard",
      ],
    },
    {
      name: "Elite",
      price: "€79",
      badge: "Best Value",
      subtitle:
        "90-day premium transformation with advanced systems.",
      href: "/plans/elite",
      cta: "Explore Elite",
      features: [
        "Everything in Glow",
        "90-Day Roadmap",
        "Pelvic floor restore",
        "Monthly reassessments",
        "VIP premium library",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="text-center mb-14">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Choose Your Membership
        </p>

        <h1 className="text-5xl md:text-7xl mb-6">
          Premium Plans Designed For Women 40+
        </h1>

        <p className="max-w-3xl mx-auto text-[#7b6870] text-xl leading-relaxed">
          Compare your options, explore benefits and choose
          the transformation path that fits you best.
        </p>
      </section>

      {/* CARDS */}
      <section className="grid lg:grid-cols-2 gap-8 mb-14">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="soft-card p-8 relative"
          >
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#ffe7ef] text-[#8f5d6f] text-sm">
              {plan.badge}
            </div>

            <h2 className="text-5xl mb-3">
              {plan.name}
            </h2>

            <p className="text-[#7b6870] text-lg mb-6">
              {plan.subtitle}
            </p>

            <div className="text-6xl mb-8">
              {plan.price}
            </div>

            <div className="space-y-4 mb-10">
              {plan.features.map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-2xl bg-white border border-[#f0e3e8]"
                >
                  ✓ {item}
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

      {/* COMPARE */}
      <section className="soft-card p-10 mb-14">
        <h2 className="text-5xl mb-8 text-center">
          Quick Comparison
        </h2>

        <div className="space-y-4">
          {[
            ["Program Length", "30 Days", "90 Days"],
            ["Guided Sessions", "Yes", "Premium Library"],
            ["Reassessments", "Basic", "Monthly Smart"],
            ["Pelvic Floor Restore", "—", "Yes"],
            ["Advanced Sculpt Phases", "—", "Yes"],
          ].map(([f, g, e]) => (
            <div
              key={f}
              className="grid md:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-[#f0e3e8]"
            >
              <div className="text-[#7b6870]">
                {f}
              </div>
              <div>{g}</div>
              <div>{e}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-5">
          Explore Before You Decide
        </h2>

        <p className="text-[#7b6870] text-lg mb-8">
          View every feature inside Glow and Elite before
          checkout.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/plans/glow"
            className="btn-outline"
          >
            View Glow
          </Link>

          <Link
            href="/plans/elite"
            className="btn-primary"
          >
            View Elite
          </Link>
        </div>
      </section>
    </main>
  );
}
