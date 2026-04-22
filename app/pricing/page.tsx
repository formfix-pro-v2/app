import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-14">
          Choose Your Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-5xl font-black mb-6">$0</p>
            <p className="mb-8 text-zinc-300">
              Basic starter program
            </p>

            <Link
              href="/dashboard"
              className="block p-4 rounded-2xl bg-white/10"
            >
              Continue Free
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-blue-500/15 border border-blue-400 scale-105">
            <p className="text-orange-300 font-bold mb-3">
              MOST POPULAR
            </p>

            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <p className="text-5xl font-black mb-6">$19</p>

            <p className="mb-8 text-zinc-200">
              Full 30-day transformation system
            </p>

            <Link
              href="/dashboard"
              className="block p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
            >
              Start Pro
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Elite</h2>
            <p className="text-5xl font-black mb-6">$39</p>

            <p className="mb-8 text-zinc-300">
              90-day premium coaching path
            </p>

            <Link
              href="/dashboard"
              className="block p-4 rounded-2xl bg-white/10"
            >
              Start Elite
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
