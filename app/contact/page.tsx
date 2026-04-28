"use client";

import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    // Store locally for now - will be replaced with API
    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    leads.push({ email, message, date: new Date().toISOString() });
    localStorage.setItem("leads", JSON.stringify(leads));
    setDone(true);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <section className="soft-card p-10">
        {!done ? (
          <>
            <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-4 font-bold">
              Get In Touch
            </p>
            <h1 className="text-5xl mb-4 text-[#4a3f44]">Contact Us</h1>
            <p className="text-[#7b6870] text-lg mb-8">
              Have a question or want to learn more? We&apos;d love to hear from
              you.
            </p>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase font-bold text-[#b98fa1] tracking-widest ml-1"
                >
                  Message (optional)
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className="w-full mt-1 p-4 rounded-2xl border border-[#ead8de] outline-none focus:border-[#d6a7b1] transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4">
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-5xl mb-6">🌸</div>
            <h2 className="text-4xl mb-4 text-[#4a3f44]">
              Thank you!
            </h2>
            <p className="text-[#7b6870] text-lg">
              We&apos;ll get back to you soon.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
