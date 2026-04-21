import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-7xl font-black mb-4">404</h1>
        <p className="text-zinc-400 mb-8">Page not found.</p>

        <Link href="/" className="luxury-btn inline-block">
          Back Home
        </Link>
      </div>
    </main>
  );
}
