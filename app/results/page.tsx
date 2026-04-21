import React from "react";
import Link from "next/link";
import PrimaryButton from "../../../components/PrimaryButton";

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Vaši rezultati</h1>
      <p className="mb-8 text-gray-400">Čestitamo na završenom testu!</p>
      <Link href="/">
        <PrimaryButton text="Nazad na početnu" />
      </Link>
    </div>
  );
}
