import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#140b12] text-white overflow-hidden">
      {/* soft feminine background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.20),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.18),transparent_35%),radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_45%)]" />

      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-7 flex items-center justify-between">
        <div className="text-3xl md:text-4xl font-light tracking-wide text-pink-100">
          Viora Woman
        </div>

        <nav className="hidden md:flex gap-8 text-pink-100/80 text-[15px]">
          <a href="#programs" className="hover:text-white transition">
            Programs
          </a>
          <a href="#stories" className="hover:text-white transition">
            Stories
          </a>
          <a href="#plans" className="hover:text-white transition">
            Membership
          </a>
        </nav>

        <Link
          href="/quiz"
          className="px-5 py-3 rounded-full bg-pink-300 text-[#2b1620] font-medium hover:scale-105 transition"
        >
          Begin
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="uppercase tracking-[0.35em] text-pink-200/80 text-xs mb-5">
            Gentle wellness for women
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight text-pink-50">
            Feel softer.
            <span className="block text-pink-300">
              Stronger.
            </span>
            Like yourself again.
          </h1>

          <p className="mt-8 text-pink-100/80 text-xl leading-relaxed max-w-xl">
            Personalized wellness plans created for women navigating
            hormonal changes, body discomfort, pelvic weakness and
            everyday stress.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-full bg-pink-300 text-[#2b1620] font-semibold hover:scale-105 transition"
            >
              Find My Plan
            </Link>

            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full border border-pink-200/20 hover:bg-white/5 transition"
            >
              View Membership
            </Link>
          </div>

          <p className="mt-6 text-pink-200/70">
            Trusted by women improving confidence, comfort and energy.
          </p>
        </div>

        {/* right emotional card */}
        <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8">
          <h3 className="text-3xl font-light text-pink-50 mb-8">
            What changes first
          </h3>

          <div className="space-y-4">
            <div className="rounded-2xl p-5 bg-pink-400/15">
              ✨ Less bloating & discomfort
            </div>

            <div className="rounded-2xl p-5 bg-rose-400/15">
              ✨ Better posture & body tone
            </div>

            <div className="rounded-2xl p-5 bg-fuchsia-400/15">
              ✨ More calm energy daily
            </div>
          </div>

          <Link
            href="/quiz"
            className="block mt-8 text-center rounded-full p-4 bg-pink-300 text-[#2b1620] font-semibold"
          >
            Start Free Assessment
          </Link>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <h2 className="text-5xl font-light text-center text-pink-50 mb-16">
          Programs Designed For Women
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-5">🌸</div>

            <h3 className="text-2xl font-medium mb-4 text-pink-100">
              Menopause Balance
            </h3>

            <p className="text-pink-100/75 leading-relaxed">
              Support for hot flashes, dry eyes, sleep disruption,
              weight gain, low mood, joint discomfort and daily fatigue.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-5">💗</div>

            <h3 className="text-2xl font-medium mb-4 text-pink-100">
              Pelvic Confidence
            </h3>

            <p className="text-pink-100/75 leading-relaxed">
              Gentle recovery for leakage, postpartum weakness,
              urgency, weak core connection and bladder confidence.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <div className="text-4xl mb-5">🪞</div>

            <h3 className="text-2xl font-medium mb-4 text-pink-100">
              Desk Body Reset
            </h3>

            <p className="text-pink-100/75 leading-relaxed">
              Neck tension, posture collapse, lower back pain,
              stiff hips, headaches and tired eyes from screen time.
            </p>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section
        id="stories"
        className="px-6 py-24 bg-gradient-to-r from-pink-700/70 to-rose-600/70"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-6">
            “I feel feminine and strong again.”
          </h2>

          <p className="text-xl opacity-90">
            My body feels lighter, posture better and I finally have
            energy again.
          </p>

          <p className="mt-6 opacity-80">
            — Emma, 48
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        id="plans"
        className="max-w-4xl mx-auto text-center px-6 py-24"
      >
        <h2 className="text-5xl font-light mb-6 text-pink-50">
          Ready to feel good in your body again?
        </h2>

        <p className="text-pink-100/75 text-xl mb-10">
          Start with a short personal assessment and receive your plan.
        </p>

        <Link
          href="/quiz"
          className="inline-block px-10 py-5 rounded-full bg-pink-300 text-[#2b1620] font-semibold hover:scale-105 transition"
        >
          Begin Now
        </Link>
      </section>
    </main>
  );
}
