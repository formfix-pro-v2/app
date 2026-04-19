```tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_30%)]" />

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <p className="text-orange-300 font-semibold tracking-widest uppercase mb-4">
            Premium Wellness For Women 35+
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Feel Stronger,
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-300 text-transparent bg-clip-text">
              Leaner & Pain-Free
            </span>
          </h1>

          <p className="mt-6 text-zinc-300 text-xl max-w-xl leading-relaxed">
            Luxury fitness platform designed for women after 35.
            Burn belly fat, restore posture, boost energy and feel confident again.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">

            <Link
              href="/quiz"
              className="bg-gradient-to-r from-fuchsia-600 to-orange-500 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition"
            >
              Start Free Quiz
            </Link>

            <a
              href="#features"
              className="border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition"
            >
              Learn More
            </a>

          </div>

          <div className="mt-8 text-sm text-zinc-400">
            ⭐ Trusted by thousands of women improving strength & confidence
          </div>
        </div>

        {/* RIGHT PREMIUM CARD */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl p-8">

          <h3 className="text-3xl font-bold mb-8">
            Today’s Personalized Plan
          </h3>

          <div className="space-y-4">

            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-400/20">
              🔥 Belly Fat Reset
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/20">
              ⚡ Menopause Energy Boost
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/20">
              💪 10 Min Morning Sculpt
            </div>

          </div>

          <button className="mt-8 w-full bg-gradient-to-r from-fuchsia-600 to-orange-500 p-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition">
            Unlock Full Access
          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative max-w-7xl mx-auto px-6 py-24"
      >

        <h2 className="text-5xl font-black text-center mb-16">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">AI Personalized Plans</h3>
            <p className="text-zinc-300">
              Smart fitness programs based on age, body type and goals.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-2xl font-bold mb-3">Quick Sessions</h3>
            <p className="text-zinc-300">
              7, 10 or 20 minute workouts designed for busy schedules.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-zinc-300">
              Daily streaks, body progress and wellness analytics.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 px-6 bg-gradient-to-r from-fuchsia-700 to-orange-500">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-6">
            “I feel 10 years younger.”
          </h2>

          <p className="text-xl opacity-90">
            Lost belly fat, fixed posture and got my energy back.
          </p>

          <p className="mt-6 opacity-80">
            — Sarah, 46
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center py-24 px-6">

        <h2 className="text-5xl font-black mb-6">
          Ready To Feel Better?
        </h2>

        <p className="text-zinc-300 text-xl mb-10">
          Start your personalized wellness transformation today.
        </p>

        <Link
          href="/quiz"
          className="bg-gradient-to-r from-fuchsia-600 to-orange-500 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition inline-block"
        >
          Start Free Quiz
        </Link>

      </section>

    </main>
  );
}
```
