import React from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8">
      <main className="flex flex-col gap-12 items-center text-center max-w-3xl">
        <div className="relative w-[280px] h-[60px]">
          <Image
            src="/app/next.svg"
            alt="FormFix Pro Logo"
            width={280}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            Usavrši svoju formu, <br />
            <span className="text-blue-500">Gradi pravu snagu.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-[600px] leading-relaxed font-light">
            FormFix Pro koristi AI analizu za optimizaciju tvoje tehnike dizanja. 
            Započni procenu da bi ostvario bolje rezultate.
          </p>
        </div>
        
        <div className="mt-4 scale-110">
          <Link href="/quiz">
            <PrimaryButton text="Započni kviz" />
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 text-gray-600 text-sm tracking-widest uppercase">
        © 2026 FormFix Pro v2
      </footer>
    </div>
  );
}
