export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <section className="soft-card p-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
          Legal
        </p>
        <h1 className="text-5xl mb-6 text-[#4a3f44]">Terms of Service</h1>

        <div className="space-y-6 text-[#7b6870] leading-relaxed">
          <p>
            By using Veronica Method, you agree to use the service responsibly and in
            accordance with these terms.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Service Description</h2>
          <p>
            Veronica Method provides personalized wellness programs, exercise routines,
            and nutrition guidance for women navigating menopause.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Membership</h2>
          <p>
            Premium memberships (Glow and Elite) are one-time purchases with
            fixed durations. A 30-day money-back guarantee is included.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Health Disclaimer</h2>
          <p>
            Veronica Method is not a substitute for professional medical advice. Always
            consult your healthcare provider before starting any new exercise or
            nutrition program.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Cancellation</h2>
          <p>
            You may cancel your membership at any time from your account page.
            Refund requests within 30 days of purchase will be honored.
          </p>
        </div>
      </section>
    </main>
  );
}
