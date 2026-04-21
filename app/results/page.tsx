import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-8">
          Recovery Potential: High
        </h1>

        <p className="text-xl text-zinc-300 mb-12">
          Based on your answers, posture correction + mobility can strongly help.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Lower Back Relief
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Shoulder Reset
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            Daily Mobility
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-blue-600"
          >
            Continue Free
          </Link>

          <Link
            href="/pricing"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500"
          >
            Unlock Premium
          </Link>
        </div>
      </div>
    </main>
  );
}
