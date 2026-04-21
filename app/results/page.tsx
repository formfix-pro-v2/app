import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-8">
          Your Recovery Score: 72%
        </h1>

        <p className="text-xl text-zinc-300 mb-12">
          You likely need posture correction + lower back mobility work.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Day 1 Pain Relief Routine
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Core Stability Program
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Weekly Progress Plan
          </div>
        </div>

        <Link
          href="/pricing"
          className="px-10 py-5 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500"
        >
          Unlock Full Program
        </Link>
      </div>
    </main>
  );
}
