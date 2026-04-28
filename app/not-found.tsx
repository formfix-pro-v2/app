import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <div className="text-6xl mb-6">🌸</div>
        <h1 className="text-7xl mb-4 text-[#4a3f44]">404</h1>
        <p className="text-[#7b6870] mb-8 text-lg">
          This page doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary">
          Back Home
        </Link>
      </div>
    </main>
  );
}
