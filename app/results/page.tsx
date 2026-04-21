import React from "react";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Your Results</h1>
      <Link href="/">
        <PrimaryButton text="Go Back Home" />
      </Link>
    </div>
  );
}
