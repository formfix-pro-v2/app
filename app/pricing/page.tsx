import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {/* HERO */}
      <section className="text-center mb-16">
        <p className="uppercase tracking-[0.25em] text-sm text-[#b98fa1] mb-4">
          Membership Options
        </p>

        <h1 className="text-6xl md:text-7xl leading-tight mb-6">
          Choose Your
          <br />
          Wellness Path
        </h1>

        <p className="text-xl text-[#7b6870] max-w-2xl mx-auto">
          Elegant support for every stage of menopause —
          from gentle beginnings to full transformation.
        </p>
      </section>

      {/* CARDS */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* FREE */}
        <div className="soft-card p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-4">
            Starter
          </p>

          <h2 className="text-4xl mb-3">Free</h2>

          <div className="text-5xl mb-6">€0</div>

          <div className="space-y-4 text-[#7b6870] mb-10">
            <div>✓ 7-day starter program</div>
            <div>✓ Symptom assessment</div>
            <div>✓ Daily movement basics</div>
            <div>✓ Wellness dashboard</div>
          </div>

          <Link href="/quiz" className="btn-outline block text-center">
            Begin Free
          </Link>
        </div>

        {/* MOST POPULAR */}
        <div className="soft-card p-10 border-2 border-[#d6a7b1] scale-[1.02]">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-4">
            Most Loved
          </p>

          <h2 className="text-4xl mb-3">Glow</h2>

          <div className="text-5xl mb-6">€19</div>

          <div className="space-y-4 text-[#7b6870] mb-10">
            <div>✓ Full 90-day programs</div>
            <div>✓ Belly tone after 40</div>
            <div>✓ Sleep + hot flash reset</div>
            <div>✓ Premium dashboard tools</div>
            <div>✓ New weekly routines</div>
          </div>

          <Link
            href="/results"
            className="btn-primary block text-center"
          >
            Choose Glow
          </Link>
        </div>

        {/* ELITE */}
        <div className="soft-card p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b98fa1] mb-4">
            Concierge
          </p>

          <h2 className="text-4xl mb-3">Elite</h2>

          <div className="text-5xl mb-6">€39</div>

          <div className="space-y-4 text-[#7b6870] mb-10">
            <div>✓ Everything in Glow</div>
            <div>✓ Nutrition guidance</div>
            <div>✓ Symptom priority plans</div>
            <div>✓ Confidence coaching</div>
            <div>✓ VIP updates</div>
          </div>

          <Link
            href="/results"
            className="btn-outline block text-center"
          >
            Join Elite
          </Link>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="mt-16">
        <div className="soft-card p-10 text-center">
          <h3 className="text-4xl mb-4">
            Feel Better In Weeks
          </h3>

          <p className="text-[#7b6870] text-lg max-w-2xl mx-auto">
            Better sleep, improved posture, calmer energy and
            renewed confidence through sustainable daily routines.
          </p>
        </div>
      </section>
    </main>
  );
}
