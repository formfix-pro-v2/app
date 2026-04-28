"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email.includes("@") || password.length < 6) {
      setError("Please enter a valid email and password (min 6 characters).");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const result = await signUp(email, password);
      if (result.success) {
        setMessage("Check your email for a confirmation link.");
      } else {
        setError(result.error || "Sign up failed. Please try again.");
      }
    } else {
      const result = await signIn(email, password);
      if (result.success) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(result.error || "Invalid email or password.");
      }
    }

    setLoading(false);
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="soft-card p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-2 text-[#4a3f44]">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-[#7b6870]">
              {isSignUp
                ? "Start your wellness journey today"
                : "Sign in to continue your journey"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-600 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors"
                required
                minLength={6}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </span>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setMessage("");
              }}
              className="text-sm text-[#b98fa1] hover:text-[#8f5d6f] transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-[#7b6870] hover:text-[#4a3f44] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-[#b98fa1]">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
