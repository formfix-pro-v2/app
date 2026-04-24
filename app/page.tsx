import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-5">
            Menopause Wellness for Women 40+
          </p>

          <h1 className="text-6xl md:text-7xl leading-tight mb-6">
            Feel Balanced.
            <br />
            Move Gracefully.
            <br />
            Glow Again.
          </h1>

          <p className="text-xl text-[#7b6870] max-w-xl leading-relaxed">
            Personalized programs for hot flashes, sleep disruption,
            stubborn belly fat, mood swings, joint stiffness and confidence.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/quiz" className="btn-primary">
              Start Free Plan
            </Link>

            <Link href="/pricing" className="btn-outline">
              View Membership
            </Link>
          </div>

          <div className="mt-8 text-[#7b6870]">
            Trusted by women building strength through midlife.
          </div>
        </div>

        <div className="soft-card p-10">
          <h2 className="text-4xl mb-6">
            What You Receive
          </h2>

          <div className="space-y-4 text-lg text-[#7b6870]">
            <div>✓ Daily movement sessions</div>
            <div>✓ Menopause symptom support plans</div>
            <div>✓ Posture & confidence routines</div>
            <div>✓ Better sleep reset habits</div>
            <div>✓ Nutrition guidance</div>
          </div>

          <Link
            href="/dashboard"
            className="btn-primary inline-block mt-8"
          >
            View Example Dashboard
          </Link>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="benefits"
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="soft-card p-8">
            <h3 className="text-3xl mb-4">Hormone Calm</h3>
            <p className="text-[#7b6870]">
              Support nervous system balance and reduce daily overwhelm.
            </p>
          </div>

          <div className="soft-card p-8">
            <h3 className="text-3xl mb-4">Lean Strength</h3>
            <p className="text-[#7b6870]">
              Gentle strength sessions to improve shape and metabolism.
            </p>
          </div>

          <div className="soft-card p-8">
            <h3 className="text-3xl mb-4">Elegant Energy</h3>
            <p className="text-[#7b6870]">
              Restore vitality without punishing workouts.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-5xl text-center mb-14">
          Signature Programs
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="soft-card p-8">
            <h3 className="text-3xl mb-3">Sleep & Hot Flash Reset</h3>
            <p className="text-[#7b6870]">
              Evening routines, cooling habits and nervous system support.
            </p>
          </div>

          <div className="soft-card p-8">
            <h3 className="text-3xl mb-3">Belly Tone After 40</h3>
            <p className="text-[#7b6870]">
              Strength + walking + metabolism support.
            </p>
          </div>

          <div className="soft-card p-8">
            <h3 className="text-3xl mb-3">Joint Ease & Mobility</h3>
            <p className="text-[#7b6870]">
              Reduce stiffness in hips, knees and shoulders.
            </p>
          </div>

          <div className="soft-card p-8">
            <h3 className="text-3xl mb-3">Confidence & Posture</h3>
            <p className="text-[#7b6870]">
              Stand taller, feel feminine and move beautifully.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="pricing"
        className="max-w-5xl mx-auto px-6 pb-24"
      >
        <div className="soft-card p-12 text-center">
          <h2 className="text-5xl mb-5">
            Your Next Chapter Can Feel Amazing
          </h2>

          <p className="text-xl text-[#7b6870] mb-8">
            Begin with a personalized wellness assessment today.
          </p>

          <Link href="/quiz" className="btn-primary">
            Start Free Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
