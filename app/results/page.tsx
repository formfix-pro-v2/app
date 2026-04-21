import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-orange-300 font-semibold mb-4">
          Analysis Complete
        </p>

        <h1 className="text-6xl font-black mb-8">
          You Can Improve Fast
        </h1>

        <p className="text-xl text-zinc-300 mb-12">
          Based on your answers, posture correction + mobility work could significantly improve your daily comfort.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/5">
            Week 1 Pain Relief
          </div>

          <div className="p-6 rounded-3xl bg-white/5">
            Week 2 Posture Reset
          </div>

          <div className="p-6 rounded-3xl bg-white/5">
            Week 3 Strength Return
          </div>
        </div>

        <p className="mb-8 text-orange-300">
          Your custom plan is ready now.
        </p>

        <Link
          href="/pricing"
          className="px-10 py-5 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500"
        >
          Unlock My Plan
        </Link>
      </div>
    </main>
  );
}
