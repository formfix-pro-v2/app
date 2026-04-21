import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.16),transparent_35%)]" />

      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-orange-300 bg-clip-text">
          FormFix Pro
        </h1>

        <Link
          href="/quiz"
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
        >
          Start Free
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase text-blue-300 tracking-[0.3em] text-sm mb-5">
            AI Recovery Platform
          </p>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">
            Fix Pain.
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-orange-300 bg-clip-text">
              Move Better.
            </span>
            Feel Strong Again.
          </h2>

          <p className="mt-8 text-zinc-300 text-xl max-w-xl">
            Personalized posture correction, back pain relief and mobility plans
            powered by AI.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:scale-105 transition"
            >
              Start Free Assessment
            </Link>

            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5"
            >
              Pricing
            </Link>
          </div>

          <p className="mt-6 text-zinc-400 text-sm">
            ⭐ Trusted by users improving posture daily
          </p>
        </div>

        {/* RIGHT */}
        <div className="rounded-[2rem] p-8 bg-white/5 border border-white/10 backdrop-blur-xl">
          <h3 className="text-3xl font-bold mb-8">Your Recovery Plan</h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-blue-500/20">
              🔥 Lower Back Pain Reset
            </div>

            <div className="p-5 rounded-2xl bg-purple-500/20">
              ⚡ Posture Rebuild Program
            </div>

            <div className="p-5 rounded-2xl bg-orange-500/20">
              💪 10 Min Daily Mobility
            </div>
          </div>

          <Link
            href="/pricing"
            className="block mt-8 text-center p-4 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500"
          >
            Unlock Premium
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold mb-3">AI Scan</h3>
          <p className="text-zinc-300">
            Detect weak points, mobility limits and posture issues.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold mb-3">Daily Plans</h3>
          <p className="text-zinc-300">
            Personalized routines that take only 10 minutes.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
          <p className="text-zinc-300">
            See pain reduction and posture improvements weekly.
          </p>
        </div>
      </section>
    </main>
  );
}
