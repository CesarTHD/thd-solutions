import Link from "next/link";
import { siteConfig } from "@/config/site";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-navy-900" />
      <path d="M11 16h10" stroke="#5f8bff" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 10.5v11" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="16" r="3.25" fill="#fff" />
      <circle cx="21.5" cy="16" r="3.25" fill="#3866ff" />
      <circle cx="11" cy="9.5" r="1.6" fill="#fff" fillOpacity=".6" />
      <circle cx="11" cy="22.5" r="1.6" fill="#fff" fillOpacity=".6" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label={`${siteConfig.name} — início`}>
      <LogoMark />
      <span
        className={`text-[1.0625rem] font-semibold tracking-tight ${tone === "light" ? "text-white" : "text-navy-900"}`}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
