import React from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center">
        {/* Putanja do slike mora imati /app/ ispred zbog GitHub Pages */}
        <Image
          className="dark:invert"
          src="/app/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/quiz">
            <PrimaryButton text="Start Quiz" />
          </Link>
        </div>
      </main>
    </div>
  );
}
