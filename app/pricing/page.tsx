import React from "react";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Basic</h2>
          <PrimaryButton text="Get Started" />
        </div>
        <div className="border p-8 rounded-lg border-blue-500">
          <h2 className="text-xl font-semibold mb-6">Pro</h2>
          <PrimaryButton text="Upgrade Now" />
        </div>
      </div>
    </div>
  );
}
