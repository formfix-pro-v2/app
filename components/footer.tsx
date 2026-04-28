import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#f0e3e8]/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f8d8df] to-[#d5a6b1] flex items-center justify-center">
                <span className="text-white text-xs">✦</span>
              </div>
              <span className="text-xl font-semibold text-[#7f5665]">
                Velora
              </span>
            </div>
            <p className="text-sm text-[#7b6870] leading-relaxed">
              Premium wellness for women navigating menopause with grace and
              confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-[#4a3f44] uppercase tracking-widest mb-3">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                ["Dashboard", "/dashboard"],
                ["Assessment", "/quiz"],
                ["Progress", "/progress"],
                ["Shopping List", "/shopping"],
                ["Nutrition", "/nutrition"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-[#7b6870] hover:text-[#d8a7b5] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-[#4a3f44] uppercase tracking-widest mb-3">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-[#7b6870] hover:text-[#d8a7b5] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#f0e3e8]/50 text-center">
          <p className="text-xs text-[#b98fa1]">
            © {new Date().getFullYear()} Velora Wellness Maison. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
