import PrimaryButton from "@/components/PrimaryButton";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#09060f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-14">
          Choose Your Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-white/10 p-8 bg-white/5">
            <h2 className="text-3xl font-bold mb-4">Free</h2>
            <p className="text-5xl font-black mb-6">€0</p>
            <PrimaryButton href="/quiz" className="w-full">
              Start
            </PrimaryButton>
          </div>

          <div className="rounded-3xl border border-fuchsia-400/30 p-8 bg-white/10 scale-105">
            <h2 className="text-3xl font-bold mb-4">Glow</h2>
            <p className="text-5xl font-black mb-6">€19</p>
            <PrimaryButton href="/contact" className="w-full">
              Join Now
            </PrimaryButton>
          </div>

          <div className="rounded-3xl border border-white/10 p-8 bg-white/5">
            <h2 className="text-3xl font-bold mb-4">Elite</h2>
            <p className="text-5xl font-black mb-6">€39</p>
            <PrimaryButton href="/contact" className="w-full">
              Upgrade
            </PrimaryButton>
          </div>
        </div>
      </div>
    </main>
  );
}
