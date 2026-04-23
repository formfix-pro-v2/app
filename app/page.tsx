import Link from "next/link";

export default function HomePage() {
  const symptoms = [
    "Hot flashes",
    "Weight gain",
    "Poor sleep",
    "Joint pain",
    "Dry eyes",
    "Brain fog",
    "Low energy",
    "Mood swings",
    "Low libido",
  ];

  return (
    <main className="min-h-screen bg-[#160d14] text-white overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.18),transparent_35%),radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_45%)]" />

      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-7 flex items-center justify-between">
        <div className="text-3xl md:text-4xl font-light tracking-wide text-pink-100">
          Viora Woman
        </div>

        <Link
          href="/quiz"
          className="px-5 py-3 rounded-full bg-pink-300 text-[#2a1620] font-medium"
        >
          Free Assessment
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="uppercase tracking-[0.35em] text-pink-200/80 text-xs mb-5">
            Menopause wellness support
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight text-pink-50">
            Feel balanced.
            <span className="block text-pink-300">
              Feel feminine.
            </span>
            Feel like you again.
          </h1>

          <p className="mt-8 text-pink-100/80 text-xl leading-relaxed max-w-xl">
            Personalized movement, recovery and symptom support for women in
            perimenopause and menopause.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-full bg-pink-300 text-[#2a1620] font-semibold"
            >
              Find My Plan
            </Link>

            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full border border-pink-100/20"
            >
              Membership
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/5 border border-white/10 p-8">
          <h3 className="text-3xl font-light mb-6">
            Support for symptoms like:
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((item) => (
              <div
                key={item}
                className="p-4 rounded-2xl bg-pink-400/10"
              >
                ✨ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
