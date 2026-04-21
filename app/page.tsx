import React from "react";
import Image from "next/image";
import Link from "next/link";
// Izlazimo iz drugog app, pa iz prvog app foldera
import PrimaryButton from "../../components/PrimaryButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8">
      <main className="flex flex-col gap-8 items-center text-center">
        <Image
          src="/app/next.svg"
          alt="Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mt-4">FormFix Pro v2</h1>
        <div className="mt-8">
          <Link href="/quiz">
            <PrimaryButton text="Start Quiz" />
          </Link>
        </div>
      </main>
    </div>
  );
}
