import React from "react";
import Link from "next/link";
import PrimaryButton from "../Components/primaryButton";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-8 rounded-lg shadow-sm flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Basic</h2>
          <p className="text-2xl font-bold mb-6">$0/mo</p>
          <PrimaryButton text="Get Started" />
        </div>
        <div className="border p-8 rounded-lg shadow-sm border-blue-500 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="text-2xl font-bold mb-6">$19/mo</p>
          <PrimaryButton text="Upgrade Now" />
        </div>
      </div>
    </div>
  );
}
