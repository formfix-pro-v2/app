import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <h1 className="text-6xl font-black text-center mb-16">
        Choose Your Plan
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Free</h2>
          <p className="text-5xl font-black mb-6">$0</p>
          <Link href="/quiz" className="block text-center p-4 rounded-2xl bg-white/10">
            Start
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-blue-500/20 border border-blue-400/40 scale-105">
          <h2 className="text-2xl font-bold mb-4">Pro</h2>
          <p className="text-5xl font-black mb-6">$19</p>
          <Link href="/contact" className="block text-center p-4 rounded-2xl bg-blue-600">
            Most Popular
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Elite</h2>
          <p className="text-5xl font-black mb-6">$39</p>
          <Link href="/contact" className="block text-center p-4 rounded-2xl bg-white/10">
            Upgrade
          </Link>
        </div>
      </div>
    </main>
  );
}
