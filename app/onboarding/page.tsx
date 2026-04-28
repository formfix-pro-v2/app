"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <section className="soft-card p-12 text-center">
          <div className="text-5xl mb-6">✨</div>

          <h1 className="text-5xl mb-4 text-[#4a3f44]">
            Your Plan Is Ready
          </h1>

          <p className="text-[#7b6870] text-xl mb-10 leading-relaxed">
            We&apos;ve created your personalized recovery roadmap based on your
            assessment results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/results" className="btn-primary px-10 py-4 text-lg">
              View My Results
            </Link>
            <Link href="/pricing" className="btn-outline px-10 py-4">
              Unlock Premium
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
