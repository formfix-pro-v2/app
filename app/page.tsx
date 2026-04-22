import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.16),transparent_35%),radial-gradient(circle_at_center,rgba(236,72,153,0.10),transparent_45%)]" />

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-orange-300 text-transparent bg-clip-text">
          FormFix Pro
        </div>

        <nav className="hidden md:flex gap-8 text-zinc-300">
          <a href="#programs" className="hover:text-white transition">
            Programs
          </a>
          <a href="#results" className="hover:text-white transition">
            Results
          </a>
          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>
        </nav>

        <Link
          href="/quiz"
          className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
        >
          Free Assessment
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="uppercase tracking-[0.35em] text-orange-300 text-sm font-semibold mb-5">
            Personalized wellness systems
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Fix Pain.
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-300 text-transparent bg-clip-text">
              Restore Confidence.
            </span>
            Feel Better Fast.
          </h1>

          <p className="mt-7 text-zinc-300 text-xl max-w-xl leading-relaxed">
            Smart programs for menopause symptoms, office-worker pain and pelvic
            floor recovery.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:scale-105 transition"
            >
              Start Free Quiz
            </Link>

            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5"
            >
              View Plans
            </Link>
          </div>

          <div className="mt-8 text-zinc-400 text-sm">
            Trusted by users improving posture, energy and confidence
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold mb-8">
            What You Get
          </h3>

          <div className="space-y-4">
            <div className="rounded-2xl p-5 bg-blue-500/20">
              💻 Office Worker Recovery
            </div>

            <div className="rounded-2xl p-5 bg-pink-500/20">
              🌸 Menopause Relief Program
            </div>

            <div className="rounded-2xl p-5 bg-green-500/20">
              💪 Pelvic Confidence Program
            </div>
          </div>

          <Link
            href="/quiz"
            className="block mt-8 w-full text-center rounded-2xl p-4 font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500"
          >
            Find My Plan
          </Link>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <h2 className="text-5xl font-black text-center mb-16">
          Programs Built For Real Problems
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-2xl font-bold mb-3">Menopause</h3>
            <p className="text-zinc-300">
              Hot flashes, dry eyes, low energy, joint pain and sleep support.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-2xl font-bold mb-3">Office Worker</h3>
            <p className="text-zinc-300">
              Neck pain, posture damage, tight hips, back pain and eye strain.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-2xl font-bold mb-3">Pelvic Floor</h3>
            <p className="text-zinc-300">
              Leakage, urgency, postpartum weakness and bladder confidence.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section
        id="results"
        className="py-24 px-6 bg-gradient-to-r from-blue-700 to-orange-500"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">
            “I feel like myself again.”
          </h2>

          <p className="text-xl opacity-90">
            Better posture, less pain and more confidence in weeks.
          </p>

          <p className="mt-6 opacity-80">
            — Verified Member
          </p>
        </div>
      </section>

      {/* PRICING CTA */}
      <section
        id="pricing"
        className="max-w-4xl mx-auto text-center px-6 py-24"
      >
        <h2 className="text-5xl font-black mb-6">
          Ready To Start?
        </h2>

        <p className="text-zinc-300 text-xl mb-10">
          Get your personalized program now.
        </p>

        <Link
          href="/pricing"
          className="inline-block px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:scale-105 transition"
        >
          See Pricing
        </Link>
      </section>
    </main>
  );
}
