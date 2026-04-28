export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <section className="soft-card p-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
          Legal
        </p>
        <h1 className="text-5xl mb-6 text-[#4a3f44]">Privacy Policy</h1>

        <div className="space-y-6 text-[#7b6870] leading-relaxed">
          <p>
            At Velora, we respect your privacy. Your personal data is securely
            stored and never sold to third parties.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Data We Collect</h2>
          <p>
            We collect your email address for account creation, quiz responses
            for personalization, and usage data to improve our service.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">How We Use It</h2>
          <p>
            Your data is used exclusively to provide personalized wellness
            programs, nutrition plans, and to improve your experience.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Your Rights</h2>
          <p>
            You can request deletion of your data at any time by contacting us
            through our contact page or by emailing support.
          </p>

          <h2 className="text-2xl text-[#4a3f44] mt-8">Security</h2>
          <p>
            We use industry-standard encryption and secure authentication
            powered by Supabase to protect your information.
          </p>
        </div>
      </section>
    </main>
  );
}
