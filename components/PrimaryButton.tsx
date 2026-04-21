"use client";

import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function PrimaryButton({
  href,
  children,
  onClick,
  className = "",
}: Props) {
  const styles =
    "inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:scale-105 transition shadow-2xl";

  if (href) {
    return (
      <Link href={href} className={`${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${styles} ${className}`}>
      {children}
    </button>
  );
}
