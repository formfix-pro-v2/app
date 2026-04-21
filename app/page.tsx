import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white overflow-hidden">
      {/* Glow Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,138,61,0.16),transparent_35%),radial-gradient(circle_at_center,rgba(255,90,122,0.10),transparent_45%)]" />

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 to-orange-300 text-transparent bg-clip-text"
        >
          VIORA
        </Link>

        <nav className="hidden md:flex gap-8 text-zinc-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#results" className="hover:text-white transition">
            Results
          </a>
          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>
        </nav>

        <Link
          href="/login"
          className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
        >
          Login
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.35em] text-orange-300 text-sm font-semibold mb-5">
            AI Wellness For Women 35+
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Feel Younger.
            <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-300 to-orange-300 text-transparent bg-clip-text">
              Stronger.
            </span>
            Confident Again.
          </h1>

          <p className="mt-7 text-zinc-300 text-xl max-w-xl leading-relaxed">
            Personalized plans for belly fat, menopause, pelvic floor, posture,
            energy and confidence.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <PrimaryButton href="/quiz">
              Start Free Quiz
            </PrimaryButton>

            <PrimaryButton
              href="/pricing"
              className="bg-none bg-transparent border border-white/10 shadow-none hover:bg-white/5"
            >
              View Pricing
            </PrimaryButton>
          </div>

          <div className="mt-8 text-zinc-400 text-sm">
            ⭐ Trusted by women transforming health after 40
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold mb-8">Your Daily Glow Plan</h3>

          <div className="space-y-4">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-400/20">
              🔥 Belly Fat Burn Reset
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/20">
              ⚡ Menopause Energy Boost
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/20">
              💪 10 Min Confidence Sculpt
            </div>
          </div>

          <PrimaryButton href="/pricing" className="mt-8 w-full">
            Unlock Premium
          </PrimaryButton>
        </div>
      </section>

      {/* PREMIUM FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold mb-3">AI Body Scan</h3>
            <p className="text-zinc-300 text-sm">
              Detect posture issues, weak zones and personalized next steps.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold mb-3">Recovery Score</h3>
            <p className="text-zinc-300 text-sm">
              Daily wellness score based on movement, pain and energy.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold mb-3">Private Coach</h3>
            <p className="text-zinc-300 text-sm">
              Premium AI coach available 24/7 for support and motivation.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-16">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">AI Custom Plans</h3>
            <p className="text-zinc-300">
              Personalized workouts based on age, goals and body changes.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-zinc-300">
              Build streaks, measure wins and stay motivated.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-3">AI Coach</h3>
            <p className="text-zinc-300">
              Motivation, guidance and support whenever you need it.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        id="results"
        className="py-24 px-6 bg-gradient-to-r from-fuchsia-700 to-orange-500"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">
            “I feel 10 years younger.”
          </h2>

          <p className="text-xl opacity-90">
            Lost belly fat, improved posture and finally got my energy back.
          </p>

          <p className="mt-6 opacity-80">— Sarah, 46</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-16">
          Choose Your Glow
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-4xl font-black mb-6">€0</p>
            <p className="text-zinc-300 mb-8">3 workouts + starter quiz</p>

            <PrimaryButton href="/quiz" className="w-full">
              Start
            </PrimaryButton>
          </div>

          <div className="rounded-3xl bg-gradient-to-b from-fuchsia-600/20 to-orange-500/20 border border-fuchsia-400/30 p-8 scale-105 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Glow</h3>
            <p className="text-4xl font-black mb-6">€19</p>
            <p className="text-zinc-200 mb-8">Full workouts + tracking</p>

            <PrimaryButton href="/pricing" className="w-full">
              Most Popular
            </PrimaryButton>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Elite</h3>
            <p className="text-4xl font-black mb-6">€39</p>
            <p className="text-zinc-300 mb-8">AI plans + nutrition coach</p>

            <PrimaryButton href="/pricing" className="w-full">
              Upgrade
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto text-center px-6 pb-24">
        <h2 className="text-5xl font-black mb-6">
          Ready To Transform?
        </h2>

        <p className="text-zinc-300 text-xl mb-10">
          Start your personalized glow-up today.
        </p>

        <PrimaryButton href="/quiz">
          Start Free Quiz
        </PrimaryButton>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between text-zinc-400 text-sm">
          <p>© 2026 VIORA. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
