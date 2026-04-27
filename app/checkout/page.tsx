"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlan } from "@/lib/checkout";
import { startMembership } from "@/lib/subscription";

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Stanje za jednostavnu validaciju forme
  const [email, setEmail] = useState("");

  const rawPlan = params.get("plan");
  const data = useMemo(() => getPlan(rawPlan), [rawPlan]);

  function completePurchase() {
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulacija API poziva ka Stripe-u ili PayPal-u
    setTimeout(() => {
      /* local storage membership */
      startMembership(data.id);

      /* cookie for middleware lock - 365 dana */
      document.cookie = "premium=true; path=/; max-age=31536000; SameSite=Lax";
      document.cookie = `plan=${data.id}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Čuvamo email za personalizaciju dashboarda ako zatreba
      localStorage.setItem("userEmail", email);

      router.push("/checkout/success");
    }, 2000);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* LEFT: Order Summary */}
        <section className="space-y-8">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
              Selected Plan
            </p>
            <h1 className="text-5xl mb-4 text-[#4a3f44] tracking-tight">
              {data.name}
            </h1>
            <p className="text-[#7b6870] text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="soft-card p-8 bg-[#fffcfd] border border-[#f0e3e8]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-6xl font-light text-[#4a3f44]">€{data.price}</span>
                <span className="text-[#b98fa1] ml-2">/ one-time</span>
              </div>
            </div>

            <div className="space-y-3">
              {data.features.map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#6f5a62]">
                  <span className="text-[#d6a7b1]">✦</span>
                  {item}
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#f0e3e8] text-sm text-[#b98fa1] italic">
              "Joining 1,200+ women on their hormone-reset journey this month."
            </div>
          </div>
        </section>

        {/* RIGHT: Payment Form */}
        <section className="soft-card p-10 bg-white shadow-xl shadow-[#f0e3e8]/50 border border-[#f0e3e8]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-[#4a3f44]">Secure Payment</h2>
            <div className="flex gap-2">
              <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded border border-green-100 font-bold uppercase tracking-tighter">
                SSL Encrypted
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1">Account Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maja@example.com"
                className="w-full mt-1 p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1">Card Information</label>
              <div className="relative mt-1">
                <input
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors pl-12"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-30">💳</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM / YY"
                className="w-full p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors text-center"
              />
              <input
                placeholder="CVC"
                className="w-full p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors text-center"
              />
            </div>
          </div>

          <button
            onClick={completePurchase}
            disabled={loading}
            className="btn-primary w-full mt-10 py-5 text-lg shadow-lg disabled:opacity-60 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authorizing...
              </span>
            ) : (
              `Pay €${data.price} & Start Plan`
            )}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-4 opacity-40 grayscale contrast-125">
             {/* Ovde bi išli logo-i Visa, Master, PayPal */}
             <div className="text-[10px] text-center font-bold border rounded p-1">VISA</div>
             <div className="text-[10px] text-center font-bold border rounded p-1">MASTERCARD</div>
             <div className="text-[10px] text-center font-bold border rounded p-1">PAYPAL</div>
          </div>

          <p className="text-[11px] text-[#b98fa1] mt-6 text-center leading-relaxed">
            By completing this purchase, you agree to our Terms of Service. <br />
            <strong>30-Day Money-Back Guarantee included.</strong>
          </p>
        </section>

      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-[#b98fa1] animate-pulse uppercase tracking-[0.3em] text-sm">
          Preparing Secure Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
