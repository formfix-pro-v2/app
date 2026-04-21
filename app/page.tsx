import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.16),transparent_35%)]" />

      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-orange-300 bg-clip-text">
          FormFix Pro
        </h1>

        <Link
          href="/quiz"
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20"
        >
          Start Free
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase text-blue-300 tracking-[0.3em] text-sm mb-5">
            Trusted by 12,000+ users
          </p>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">
            Fix Pain.
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-orange-300 bg-clip-text">
              Improve Posture.
            </span>
            Feel Younger.
          </h2>

          <p className="mt-8 text-zinc-300 text-xl max-w-xl">
            Personalized daily plans that help reduce back pain, stiffness and bad posture in just 10 minutes a day.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:scale-105 transition"
            >
              Free AI Assessment
            </Link>

            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5"
            >
              See Plans
            </Link>
          </div>

          <p className="mt-6 text-orange-300 font-semibold">
            Limited launch discount available today
          </p>
        </div>

        <div className="rounded-[2rem] p-8 bg-white/5 border border-white/10">
          <h3 className="text-3xl font-bold mb-8">
            Typical Results in 30 Days
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-blue-500/20">
              ✅ Better posture
            </div>

            <div className="p-5 rounded-2xl bg-green-500/20">
              ✅ Less back pain
            </div>

            <div className="p-5 rounded-2xl bg-orange-500/20">
              ✅ More energy
            </div>
          </div>

          <Link
            href="/quiz"
            className="block mt-8 text-center p-4 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500"
          >
            Start Free
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/5">
            ⭐⭐⭐⭐⭐ “Back pain reduced in 2 weeks.”
          </div>

          <div className="p-6 rounded-3xl bg-white/5">
            ⭐⭐⭐⭐⭐ “I finally stand straight again.”
          </div>

          <div className="p-6 rounded-3xl bg-white/5">
            ⭐⭐⭐⭐⭐ “Best money I spent this year.”
          </div>
        </div>
      </section>
    </main>
  );
}
