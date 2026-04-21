"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { saveUser } from "@/lib/storage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function submit() {
    const res = await login(email);

    if (res.success) {
      saveUser(email);
      router.push("/onboarding");
    }
  }

  return (
    <main className="min-h-screen bg-[#09060f] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10">
        <h1 className="text-4xl font-black mb-6">
          Continue
        </h1>

        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 mb-4"
        />

        <button
          onClick={submit}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 font-bold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
