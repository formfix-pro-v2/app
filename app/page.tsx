export default function FormFixPro() {
  const plans = [
    {
      name: "Free",
      price: "€0",
      features: ["1 AI plan weekly", "Ads supported", "Basic workouts"],
    },
    {
      name: "Pro",
      price: "€9/mo",
      features: ["Unlimited AI plans", "No ads", "Progress tracking"],
    },
    {
      name: "Coach",
      price: "€29/mo",
      features: ["Nutrition support", "Priority AI", "Advanced analytics"],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center py-12">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 mb-3">
            FormFix Pro v2
          </div>

          <h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
            AI Fitness That Actually Fits You
          </h1>

          <p className="mt-6 text-zinc-300 text-lg">
            Personalized plans for menopause, fat loss, mobility, rehab and
            office recovery.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-2xl bg-fuchsia-600 font-bold">
              Start Free
            </button>

            <button className="px-6 py-3 rounded-2xl border border-zinc-700">
              Watch Demo
            </button>
          </div>
        </div>

        {/* DASHBOARD CARD */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-900 p-4">
              <div className="text-zinc-400 text-sm">Current Streak</div>
              <div className="text-4xl font-black">18🔥</div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-4">
              <div className="text-zinc-400 text-sm">Calories</div>
              <div className="text-4xl font-black">2,340</div>
            </div>

            <div className="col-span-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5">
              <div className="font-bold">Today's Workout</div>
              <div className="text-2xl font-black mt-2">
                20 min Office Recovery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto py-8 grid md:grid-cols-3 gap-5">
        {["AI Plans", "Progress Tracking", "Premium Coaching"].map((x) => (
          <div
            key={x}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <h3 className="text-xl font-bold">{x}</h3>
            <p className="text-zinc-400 mt-2">
              Upgrade your health with smart automation.
            </p>
          </div>
        ))}
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-black mb-6">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="text-2xl font-black">{p.name}</div>
              <div className="text-4xl font-black mt-3">{p.price}</div>

              <ul className="mt-4 space-y-2 text-zinc-400">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>

              <button className="mt-6 w-full rounded-2xl bg-fuchsia-600 py-3 font-bold">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BACKEND + AI */}
      <section className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">Auth Ready</h3>
          <p className="text-zinc-400 mt-3">
            Connect Supabase for Google, Apple and Email login.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-black">AI Generator</h3>
          <p className="text-zinc-400 mt-3">
            Use OpenAI API route to generate personalized weekly plans.
          </p>
        </div>
      </section>
    </main>
  );
}
