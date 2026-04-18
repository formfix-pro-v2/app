import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-pink-600 font-semibold mb-3">
            Personalized Fitness For Women 35+
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Feel Stronger, Leaner & Pain-Free After 40
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Workouts for belly fat, menopause, pelvic floor, posture and energy.
            Get your custom plan in under 1 minute.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/quiz"
              className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-700 transition"
            >
              Start Free Quiz
            </Link>

            <a
              href="#features"
              className="border border-gray-300 px-8 py-4 rounded-2xl font-bold hover:bg-white"
            >
              Learn More
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            ⭐ Trusted by women improving strength, confidence & wellness
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border">
          <h3 className="text-2xl font-bold mb-6">Today’s Personalized Plan</h3>

          <div className="space-y-4">

            <div className="p-4 rounded-2xl bg-pink-50">
              🔥 Belly Fat after 40
            </div>

            <div className="p-4 rounded-2xl bg-purple-50">
              ⚡ Menopause Energy Reset
            </div>

            <div className="p-4 rounded-2xl bg-green-50">
              💪 10 Min Morning Reset
            </div>

          </div>

          <button className="mt-6 w-full bg-black text-white p-4 rounded-2xl font-bold">
            Unlock Full Access
          </button>
        </div>

      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Personalized Plans</h3>
            <p className="text-gray-600">
              Get workout programs matched to your body, goals and lifestyle.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-3xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold mb-3">Quick Workouts</h3>
            <p className="text-gray-600">
              7, 10 or 20 minute sessions designed for busy women.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Build streaks, stay consistent and feel stronger every week.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-pink-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            “I feel 10 years younger.”
          </h2>

          <p className="text-xl opacity-90">
            Lost belly fat, fixed my posture and finally got my energy back.
          </p>

          <p className="mt-6 opacity-80">— Sarah, 46</p>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6">

        <h2 className="text-4xl font-bold mb-6">
          Ready To Feel Better?
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          Get your personalized wellness plan now.
        </p>

        <Link
          href="/quiz"
          className="bg-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-pink-700"
        >
          Start Free Quiz
        </Link>

      </section>

    </main>
  );
}
